'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { PRICE, AREAS, PLAN } from '@/lib/constants';
import { firestore } from '@/lib/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

const now = Date.now();
const dayMs = 24 * 60 * 60 * 1000;
const d = new Date().getDay();

const BASE_SEATS = [
  { id: 0, t: 'MLA',    a: 'Budhana',    by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 1, t: 'Pradhan',a: 'Budhana',    by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 2, t: 'Pradhan',a: 'Charthawal', by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 3, t: 'MLA',    a: 'Khatauli',   by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 4, t: 'Pradhan',a: 'Khatauli',   by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 5, t: 'Pradhan',a: 'Purkazi',    by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 6, t: 'MLA',    a: 'Shahpur',    by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 7, t: 'Pradhan',a: 'Shahpur',    by: null, cand: null, paid: false, day: null, bookedAt: null },
];

function loadUser() {
  try { return JSON.parse(localStorage.getItem('pmp_user') || 'null'); } catch { return null; }
}
function saveUser(u) {
  try { if (u) localStorage.setItem('pmp_user', JSON.stringify(u)); else localStorage.removeItem('pmp_user'); } catch {}
}

export default function AppProvider({ children }) {
  const [user,  setUser]  = useState(null);
  const [seats, setSeats] = useState(BASE_SEATS);
  const [learn, setLearn] = useState({});
  const [tix,   setTix]   = useState([]);
  const [ready, setReady] = useState(false);

  // Restore user session from localStorage on mount
  useEffect(() => {
    const u = loadUser();
    if (u) setUser(u);
    try {
      const rawL = JSON.parse(localStorage.getItem('pmp_learn') || '{}');
      // Normalise keys to numbers to avoid string/number mismatch after JSON.parse
      if (rawL && typeof rawL === 'object') {
        const normalised = {};
        Object.keys(rawL).forEach(k => { normalised[Number(k)] = rawL[k]; });
        setLearn(normalised);
      }
      const t = JSON.parse(localStorage.getItem('pmp_tix') || '[]');
      if (Array.isArray(t)) setTix(t);
    } catch {}
    setReady(true);
  }, []);

  // Real-time Firestore listener for seats
  useEffect(() => {
    const q = query(collection(firestore, 'seats'), orderBy('id'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        if (snap.empty) { setSeats(BASE_SEATS); return; }
        setSeats(snap.docs.map(d => d.data()));
      },
      () => setSeats(BASE_SEATS) // fallback to in-memory if Firestore unavailable
    );
    return () => unsub();
  }, []);

  // ── ACTIONS ─────────────────────────────────────────────

  const join = useCallback(async (f) => {
    const res  = await fetch('/api/affiliates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(f),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Join failed.');
    saveUser(data.user);
    setUser(data.user);
    return data.user;
  }, []);

  const login = useCallback(async (queryStr) => {
    const q = String(queryStr || '').trim();
    if (!q) throw new Error('Affiliate Code ya Mobile Number daalein.');
    const res  = await fetch(`/api/affiliates?query=${encodeURIComponent(q)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed.');
    saveUser(data.user);
    setUser(data.user);
    return data.user;
  }, []);

  const book = useCallback(async (id, f) => {
    if (!user) throw new Error('Affiliate nahi hain aap.');
    const res  = await fetch(`/api/seats/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'book', code: user.code, candidate: f.candidate, mobile: f.mobile, paid: f.paid }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Booking failed.');
  }, [user]);

  const pay = useCallback(async (id) => {
    if (!user) throw new Error('Affiliate nahi hain aap.');
    
    // Create Razorpay Order
    const resOrder = await fetch('/api/payment/create-order', { method: 'POST' });
    const orderData = await resOrder.json();
    
    if (!resOrder.ok) {
       console.warn("Razorpay failed, using mock payment.");
    } else {
       const loadScript = (src) => new Promise((resolve) => {
         const script = document.createElement('script');
         script.src = src;
         script.onload = () => resolve(true);
         script.onerror = () => resolve(false);
         document.body.appendChild(script);
       });
       await loadScript('https://checkout.razorpay.com/v1/checkout.js');

       return new Promise((resolve, reject) => {
         const options = {
           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_dummykey',
           amount: orderData.amount,
           currency: orderData.currency,
           name: 'Poll Craft Analytics',
           description: 'Seat Booking Payment',
           order_id: orderData.id,
           handler: async function (response) {
              try {
                const res  = await fetch(`/api/seats/${id}`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ action: 'pay', code: user.code, paymentId: response.razorpay_payment_id }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Payment failed.');
                resolve(true);
              } catch(e) {
                reject(e);
              }
           },
           prefill: { name: user.n, contact: user.m },
           theme: { color: '#0f172a' }
         };
         const paymentObject = new window.Razorpay(options);
         paymentObject.on('payment.failed', function (response) {
           reject(new Error(response.error.description));
         });
         paymentObject.open();
       });
    }

    const res  = await fetch(`/api/seats/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'pay', code: user.code }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Payment failed.');
  }, [user]);

  const logout = useCallback(() => {
    saveUser(null);
    setUser(null);
    setLearn({});
    setTix([]);
    try {
      localStorage.removeItem('pmp_learn');
      localStorage.removeItem('pmp_tix');
    } catch {}
  }, []);

  const handleSetLearn = useCallback((l) => {
    // Always store with numeric keys
    const normalised = {};
    Object.keys(l).forEach(k => { normalised[Number(k)] = l[k]; });
    setLearn(normalised);
    try { localStorage.setItem('pmp_learn', JSON.stringify(normalised)); } catch {}
  }, []);
  const handleSetTix   = useCallback((t) => {
    setTix(t);
    try { localStorage.setItem('pmp_tix', JSON.stringify(t)); } catch {}
  }, []);

  // Derive computed values
  const mine         = seats.filter(s => s.by === user?.code || s.by === 'me');
  const earned       = user ? mine.filter(s => s.paid).length * PRICE * (user.r ?? PLAN.r) / 100 : 0;
  const visibleSeats = seats.map(s => ({
    ...s,
    by: s.by === user?.code ? 'me' : s.by ? 'other' : null,
  }));

  return (
    <Ctx.Provider value={{
      user, seats: visibleSeats, mine, earned,
      learn, setLearn: handleSetLearn,
      tix,   setTix:   handleSetTix,
      join, login, book, pay, logout, ready,
    }}>
      {children}
    </Ctx.Provider>
  );
}
