'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { PRICE } from '@/lib/constants';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

async function post(url, body) {
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.error || 'Kuch galat ho gaya.');
  return d;
}

export default function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [seats, setSeats] = useState([]);
  const [learn, setLearn] = useState({});
  const [tix, setTix] = useState([]);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async (code) => {
    const r = await fetch('/api/seats' + (code ? `?code=${code}` : ''), { cache: 'no-store' });
    setSeats((await r.json()).seats);
  }, []);

  useEffect(() => {
    let u = null;
    try {
      const s = JSON.parse(localStorage.getItem('pmp') || '{}');
      u = s.user || null; setUser(u); setLearn(s.learn || {}); setTix(s.tix || []);
    } catch {}
    setReady(true);
    refresh(u?.code);
  }, [refresh]);

  useEffect(() => {
    if (ready) try { localStorage.setItem('pmp', JSON.stringify({ user, learn, tix })); } catch {}
  }, [user, learn, tix, ready]);

  const join = async (f) => { const { user } = await post('/api/affiliates', f); setUser(user); await refresh(user.code); return user; };
  const book = async (id, d) => { await post(`/api/seats/${id}`, { action: 'book', code: user.code, ...d }); await refresh(user.code); };
  const pay = async (id) => { await post(`/api/seats/${id}`, { action: 'pay', code: user.code }); await refresh(user.code); };
  const logout = () => { setUser(null); setLearn({}); setTix([]); };

  const mine = seats.filter((s) => s.by === 'me');
  const earned = user ? mine.filter((s) => s.paid).length * PRICE * user.r / 100 : 0;

  return (
    <Ctx.Provider value={{ user, seats, mine, earned, learn, setLearn, tix, setTix, join, book, pay, logout, ready }}>
      {children}
    </Ctx.Provider>
  );
}
