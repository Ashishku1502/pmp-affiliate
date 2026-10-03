'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/components/AppProvider';
import { PRICE, R } from '@/lib/constants';
import { BookMarked, X, CheckCircle, AlertCircle, Lock } from 'lucide-react';

export default function Seats() {
  const { user, seats, book } = useApp();
  const [flt, setFlt] = useState('All');
  const [sel, setSel] = useState(null);
  const [f, setF] = useState({ candidate: '', mobile: '', otp: '', paid: false });
  const seat = seats.find((s) => s.id === sel);

  const submit = async () => {
    if (!f.candidate.trim() || f.mobile.trim().length < 10 || f.otp.length < 4) return alert('Naam, mobile aur 4 ank ka OTP bhariye.');
    try { await book(sel, f); setSel(null); setF({ candidate: '', mobile: '', otp: '', paid: false }); } catch (e) { alert(e.message); }
  };

  const tag = (s) => s.by === 'me'
    ? (s.paid
      ? <span className="tag ok"><CheckCircle size={12} className="nav-icon" /> Booked · Paid</span>
      : <span className="tag no"><AlertCircle size={12} className="nav-icon" /> Booked · Unpaid</span>)
    : s.by
      ? <span className="tag gr"><Lock size={12} className="nav-icon" /> Booked</span>
      : <span className="tag ok"><CheckCircle size={12} className="nav-icon" /> Available</span>;

  return (
    <section className="sec"><div className="w">
      <h2>MLA / Pradhan Seats</h2>
      <p style={{ color: 'var(--muted)' }}>Demo ke sample seats. Booked seat read-only hoti hai.</p>
      {!user && <div className="note">Seat book karne ke liye pehle <Link href="/join">affiliate banein</Link>.</div>}
      <div className="tabs">{['All', 'MLA', 'Pradhan'].map((t) => <button key={t} className={'btn s ' + (flt === t ? '' : 'o')} onClick={() => setFlt(t)}>{t}</button>)}</div>
      <div className="grid">
        {seats.filter((s) => flt === 'All' || s.t === flt).map((s) => {
          const out = user && user.md === 'Single' && s.a !== user.ar;
          return (
            <div className="card" key={s.id}><h3>{s.t} · {s.a}</h3><p>{tag(s)}</p>
              {!s.by && user && (out
                ? <small style={{ color: 'var(--muted)' }}>Ye aapke territory ke bahar hai</small>
                : <button className="btn s" onClick={() => setSel(s.id)}><BookMarked size={13} className="nav-icon" /> Book kijiye</button>)}
            </div>);
        })}
      </div>
      {seat && (
        <div className="card" style={{ marginTop: 28, maxWidth: 520 }}>
          <h3>Booking: {seat.t} · {seat.a}</h3>
          <label>Candidate ka naam</label><input value={f.candidate} onChange={(e) => setF({ ...f, candidate: e.target.value })} />
          <label>Candidate ka mobile</label><input type="tel" inputMode="numeric" value={f.mobile} onChange={(e) => setF({ ...f, mobile: e.target.value })} />
          <label>OTP (demo: koi bhi 4 ank)</label><input maxLength={4} inputMode="numeric" value={f.otp} onChange={(e) => setF({ ...f, otp: e.target.value })} />
          <label className="opt" style={{ marginTop: 14 }}><input type="checkbox" checked={f.paid} onChange={(e) => setF({ ...f, paid: e.target.checked })} />Abhi payment karein ({R(PRICE)}). Nahi to baad mein.</label>
          <button className="btn" onClick={submit}><BookMarked size={15} className="nav-icon" /> Seat book kijiye</button>{' '}
          <button className="btn o" onClick={() => setSel(null)}><X size={15} className="nav-icon" /> Cancel</button>
        </div>)}
    </div></section>
  );
}
