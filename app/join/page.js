'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/components/AppProvider';
import { AREAS, PLAN, R } from '@/lib/constants';
import { ArrowRight, ShieldCheck, CreditCard, LayoutDashboard } from 'lucide-react';

const T = ['Details', 'Verify', 'Area', 'Deposit', 'Live'];

export default function Join() {
  const { user, join } = useApp();
  const [step, setStep] = useState(0);
  const [f, setF] = useState({ n: '', m: '', k: '', md: 'Single', ar: AREAS[0] });
  const [otp, setOtp] = useState('');
  const [pay, setPay] = useState(0);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const s = user ? 4 : step;

  const next = async () => {
    if (step === 0 && (!f.n.trim() || f.m.trim().length < 10 || !f.k.trim())) return alert('Naam, 10 ank ka mobile aur KYC bhariye.');
    if (step === 1 && otp.length < 4) return alert('4 ank ka OTP daaliye.');
    if (step === 3) {
      try { setBusy(true); await join(f); } catch (e) { alert(e.message); } finally { setBusy(false); }
      return;
    }
    setStep(step + 1);
  };

  return (
    <section className="sec"><div className="w" style={{ maxWidth: 560 }}>
      <h2>Affiliate banein</h2>
      <div className="steps">{T.map((t, i) => <span key={t} className={i <= s ? 'd' : ''} />)}</div>
      <p style={{ color: 'var(--muted)' }}>Step {s + 1}/5 · {T[s]}</p>
      <div className="card">
        {s === 0 && <>
          <label>Poora naam</label><input value={f.n} onChange={set('n')} />
          <label>Mobile number</label><input type="tel" inputMode="numeric" value={f.m} onChange={set('m')} />
          <label>Aadhaar / PAN (KYC)</label><input value={f.k} onChange={set('k')} />
          <p className="note">Ye demo hai, asli KYC nahi hota.</p>
          <button className="btn" onClick={next}><ArrowRight size={15} className="nav-icon" /> Aage badhein</button></>}
        {s === 1 && <>
          <p>{f.m} par SMS se OTP bheja gaya hai. Demo mein koi bhi 4 ank chalega.</p>
          <label>OTP</label><input inputMode="numeric" maxLength={4} value={otp} onChange={(e) => setOtp(e.target.value)} /><br /><br />
          <button className="btn" onClick={next}><ShieldCheck size={15} className="nav-icon" /> Verify kijiye</button></>}
        {s === 2 && <>
          {[['Single', 'Specific Area', 'Ek ward / territory aapke liye lock'], ['Freehand', 'Freehand', 'Kisi bhi city / zone mein kaam kijiye']].map(([v, t, d]) =>
            <label className="opt" key={v}><input type="radio" name="md" checked={f.md === v} onChange={() => setF({ ...f, md: v })} /><b>{t}</b><br />{d}</label>)}
          <label>Aapka area</label>
          <select value={f.ar} onChange={set('ar')}>{AREAS.map((a) => <option key={a}>{a}</option>)}</select><br /><br />
          <button className="btn" onClick={next}><ArrowRight size={15} className="nav-icon" /> Aage badhein</button></>}
        {s === 3 && <>
          <div className="note"><b>Refundable Security Deposit</b><br />{f.md === 'Single' ? 'Specific Area: ' + f.ar : 'Freehand'}<br />Ye amount refundable hai.<br /><b style={{ fontSize: '1.4rem' }}>{R(PLAN.fee)}</b></div>
          {['UPI (GPay / PhonePe / Paytm)', 'Debit / Credit Card', 'Net Banking'].map((x, i) =>
            <label className="opt" key={x}><input type="radio" name="py" checked={pay === i} onChange={() => setPay(i)} />{x}</label>)}
          <button className="btn" disabled={busy} onClick={next}>
            {busy ? 'Rukiye...' : <><CreditCard size={15} className="nav-icon" /> Deposit jama kijiye</>}
          </button></>}
        {s === 4 && user && <>
          <h3>Badhai ho, {user.n}!</h3><p>Aapka Affiliate Code:</p>
          <div className="price" style={{ color: 'var(--gold)' }}>{user.code}</div>
          <p>{user.plan.n} · {user.md === 'Single' ? user.ar + ' territory' : 'Freehand'} · <span className="tag ok">Active</span></p>
          <Link className="btn" href="/dashboard"><LayoutDashboard size={15} className="nav-icon" /> Dashboard kholiye</Link></>}
      </div>
    </div></section>
  );
}
