'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/components/AppProvider';
import { PRICE, R } from '@/lib/constants';
import { BookMarked, X, CheckCircle, AlertCircle, Lock, User, Phone, ShieldCheck, MapPin, Building, Home } from 'lucide-react';

export default function Seats() {
  const { user, seats, book } = useApp();
  const [flt, setFlt] = useState('All');
  const [sel, setSel] = useState(null);
  const [f, setF] = useState({ candidate: '', mobile: '', otp: '', paid: false });
  const [expectedOtp, setExpectedOtp] = useState('');
  const seat = seats.find((s) => s.id === sel);

  const sendOtp = () => {
    if (f.mobile.trim().length < 10) return alert('Pehle 10 ank ka mobile number daalein.');
    const generated = Math.floor(1000 + Math.random() * 9000).toString();
    setExpectedOtp(generated);
    setF({ ...f, otp: '' });
    alert(`[PMP Demo SMS to ${f.mobile}]\nCandidate booking OTP hai: ${generated}`);
  };

  const submit = async () => {
    if (!f.candidate.trim() || f.mobile.trim().length < 10) return alert('Candidate ka naam aur mobile bhariye.');
    if (f.otp.length < 4 || (f.otp !== expectedOtp && f.otp !== '0000')) return alert('Galat OTP! Kripya sahi OTP daalein (Demo fallback: 0000).');
    try { 
      await book(sel, f); 
      setSel(null); 
      setF({ candidate: '', mobile: '', otp: '', paid: false }); 
      setExpectedOtp('');
    } catch (e) { alert(e.message); }
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
      <div className="tabs" style={{ background: 'var(--card)', padding: '8px', borderRadius: '12px', border: '1px solid var(--line)', gap: '6px', marginBottom: '24px', display: 'inline-flex' }}>
        {['All', 'MLA', 'Pradhan'].map((t) => <button key={t} className={'btn s ' + (flt === t ? '' : 'o')} style={{ minWidth: '100px', border: flt === t ? 'none' : 'none', background: flt === t ? 'var(--gold)' : 'transparent', color: flt === t ? '#1a1200' : 'var(--muted)', fontWeight: flt === t ? '900' : '600' }} onClick={() => setFlt(t)}>{t}</button>)}
      </div>
      <div className="grid">
        {seats.filter((s) => flt === 'All' || s.t === flt).map((s) => {
            <div className="card" key={s.id} style={{ position: 'relative', borderTop: s.by ? '4px solid var(--line)' : '4px solid var(--gold)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ margin: '0 0 6px', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {s.t === 'MLA' ? <Building size={16} style={{ color: 'var(--blue)' }} /> : <Home size={16} style={{ color: 'var(--navy)' }} />}
                    {s.t}
                  </h3>
                  <div style={{ color: 'var(--muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={13} /> {s.a}
                  </div>
                </div>
                {tag(s)}
              </div>
              
              {!s.by && user && (out
                ? <div style={{ background: 'var(--pale)', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--muted)', textAlign: 'center' }}><Lock size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Aapke territory (<b>{user.ar}</b>) ke bahar</div>
                : <button className="btn s" onClick={() => setSel(s.id)} style={{ width: '100%', fontSize: '0.95rem', padding: '10px' }}><BookMarked size={15} className="nav-icon" /> Seat Book Kijiye</button>)}
            </div>);
        })}
      </div>
      {seat && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(13, 20, 49, 0.85)', zIndex: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ width: '100%', maxWidth: 480, padding: '32px', position: 'relative', borderTop: '5px solid var(--gold)', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => { setSel(null); setExpectedOtp(''); }} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}><X size={24} /></button>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
               <h3 style={{ margin: '0 0 8px', fontSize: '1.5rem' }}>Book {seat.t} Seat</h3>
               <p style={{ color: 'var(--muted)', margin: 0 }}><MapPin size={14} style={{ verticalAlign: 'middle' }} /> {seat.a}</p>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={16} /> Candidate ka naam</label>
              <input placeholder="Jaise: Ramesh Singh" value={f.candidate} onChange={(e) => setF({ ...f, candidate: e.target.value })} />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={16} /> Candidate ka mobile</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input style={{ flex: 1 }} type="tel" inputMode="numeric" maxLength={10} placeholder="9876543210" value={f.mobile} onChange={(e) => setF({ ...f, mobile: e.target.value })} />
                <button className="btn o" style={{ whiteSpace: 'nowrap', padding: '0 16px', background: 'var(--pale)' }} onClick={sendOtp}>Get OTP</button>
              </div>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={16} /> OTP Verify Karein</label>
              <input maxLength={4} inputMode="numeric" placeholder="••••" style={{ letterSpacing: '4px', textAlign: 'center', fontSize: '1.2rem' }} value={f.otp} onChange={(e) => setF({ ...f, otp: e.target.value })} />
            </div>
            
            <label className="opt" style={{ marginBottom: '24px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', background: f.paid ? 'var(--pale)' : 'transparent', border: f.paid ? '2px solid var(--gold)' : '2px solid var(--line)' }}>
              <input type="checkbox" style={{ width: '22px', height: '22px', margin: 0 }} checked={f.paid} onChange={(e) => setF({ ...f, paid: e.target.checked })} />
              <div>
                <b style={{ display: 'block', fontSize: '1rem', color: 'var(--navy)' }}>Abhi payment karein ({R(PRICE)})</b>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Unpaid booking cancel ho sakti hai.</span>
              </div>
            </label>
            
            <button className="btn" onClick={submit} style={{ width: '100%', padding: '14px', fontSize: '1.05rem' }}><BookMarked size={18} className="nav-icon" style={{ marginRight: '6px' }} /> Confirm Booking</button>
          </div>
        </div>
      )}
    </div></section>
  );
}
