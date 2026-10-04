'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/components/AppProvider';
import { AREAS, PLAN, R } from '@/lib/constants';
import { ArrowRight, ShieldCheck, CreditCard, LayoutDashboard, User, Phone, FileText, Info, MessageSquare, MapPin, IndianRupee, Award, CheckCircle } from 'lucide-react';

const T = ['Details', 'Verify', 'Area', 'Deposit', 'Live'];

export default function Join() {
  const { user, join } = useApp();
  const [step, setStep] = useState(0);
  const [f, setF] = useState({ n: '', m: '', k: '', md: 'Single', ar: AREAS[0] });
  const [otp, setOtp] = useState('');
  const [expectedOtp, setExpectedOtp] = useState('');
  const [pay, setPay] = useState(0);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const s = user ? 4 : step;

  const sendOtp = () => {
    const generated = Math.floor(1000 + Math.random() * 9000).toString();
    setExpectedOtp(generated);
    setOtp('');
    alert(`[PMP Demo SMS]\nAapka verification code hai: ${generated}`);
  };

  const next = async () => {
    if (step === 0) {
      if (!f.n.trim() || f.m.trim().length < 10 || !f.k.trim()) return alert('Naam, 10 ank ka mobile aur KYC bhariye.');
      sendOtp();
      setStep(1);
      return;
    }
    if (step === 1) {
      if (otp.length < 4) return alert('4 ank ka OTP daaliye.');
      if (otp !== expectedOtp && otp !== '0000') return alert('Galat OTP! Kripya sahi OTP daalein (Demo fallback: 0000).');
      setStep(2);
      return;
    }
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
          <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
            Apni basic details bhariye. Aapki jankari poori tarah surakshit hai.
          </p>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={16} /> Poora naam
            </label>
            <input 
              placeholder="Jaise: Rahul Kumar"
              value={f.n} 
              onChange={set('n')} 
            />
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: '4px 0 0' }}>Aapka naam jo bank account mein hai.</p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={16} /> Mobile number
            </label>
            <input 
              type="tel" 
              inputMode="numeric" 
              maxLength={10}
              placeholder="9876543210"
              value={f.m} 
              onChange={set('m')} 
            />
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: '4px 0 0' }}>Is par OTP bheja jayega.</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={16} /> Aadhaar / PAN (KYC)
            </label>
            <input 
              placeholder="Aadhaar ya PAN number"
              value={f.k} 
              onChange={set('k')} 
            />
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: '4px 0 0' }}>Security aur verification ke liye zaruri.</p>
          </div>

          <div className="note" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <Info size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--gold)' }} />
            <div>
              <strong style={{ display: 'block', marginBottom: '2px' }}>Ye ek demo application hai</strong>
              <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Koi asali KYC document nahi manga jayega, aap test data daal sakte hain.</span>
            </div>
          </div>

          <button className="btn" onClick={next} style={{ width: '100%', marginTop: '12px' }}>
             Aage badhein <ArrowRight size={15} className="nav-icon" style={{ marginLeft: '4px' }} />
          </button>
        </>}
        {s === 1 && <>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'inline-flex', padding: '16px', background: 'var(--pale)', borderRadius: '50%', color: 'var(--navy)', marginBottom: '16px' }}>
              <MessageSquare size={32} />
            </div>
            <h3 style={{ margin: '0 0 8px' }}>OTP Verify Karein</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>
              Humne <strong>{f.m}</strong> par ek OTP bheja hai.
            </p>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} /> 4-digit OTP
            </label>
            <input 
              style={{ fontSize: '1.4rem', letterSpacing: '8px', textAlign: 'center', padding: '14px' }}
              inputMode="numeric" 
              maxLength={4} 
              placeholder="••••"
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
            />
          </div>
          
          <button className="btn" onClick={next} style={{ width: '100%' }}>
            Verify kijiye <CheckCircle size={15} className="nav-icon" style={{ marginLeft: '4px' }} />
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button onClick={sendOtp} style={{ background: 'none', border: 'none', color: 'var(--blue)', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>
              OTP nahi mila? Phir se bhejein
            </button>
          </div>
        </>}
        {s === 2 && <>
          <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
            Aap kis tarah se kaam karna chahte hain, apna style chuniye.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {[['Single', 'Specific Area', 'Ek ward / territory sirf aapke liye lock ho jayegi. Wahan koi aur affiliate kaam nahi karega.'], ['Freehand', 'Freehand', 'Kisi bhi city / zone mein kaam kijiye. Maximum reach aur unlimited flexibility.']].map(([v, t, d]) =>
              <label className="opt" key={v} style={{ margin: 0, display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px' }}>
                <input type="radio" name="md" checked={f.md === v} onChange={() => setF({ ...f, md: v })} style={{ marginTop: '4px' }} />
                <div>
                  <b style={{ display: 'block', fontSize: '1.05rem', color: 'var(--navy)', marginBottom: '4px' }}>{t}</b>
                  <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{d}</span>
                </div>
              </label>
            )}
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} /> Aapka area (Working Zone)
            </label>
            <select value={f.ar} onChange={set('ar')} style={{ padding: '14px' }}>
              {AREAS.map((a) => <option key={a}>{a}</option>)}
            </select>
            {f.md === 'Single' && <p style={{ fontSize: '0.8rem', color: 'var(--gold)', margin: '6px 0 0', fontWeight: 'bold' }}>Ye territory aapke naam par lock ki jayegi.</p>}
          </div>

          <button className="btn" onClick={next} style={{ width: '100%' }}>
            Aage badhein <ArrowRight size={15} className="nav-icon" style={{ marginLeft: '4px' }} />
          </button>
        </>}
        {s === 3 && <>
          <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>
            Apna 100% refundable security deposit jama kijiye aur Affiliate ban jayiye.
          </p>
          
          <div className="note" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px', padding: '16px', background: 'var(--pale)', border: '1px solid var(--line)', borderLeft: '4px solid var(--gold)' }}>
            <div style={{ background: 'var(--card)', padding: '12px', borderRadius: '12px' }}>
              <IndianRupee size={28} style={{ color: 'var(--gold)', display: 'block' }} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 'bold' }}>Refundable Deposit</span>
              <div style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--navy)', margin: '2px 0' }}>{R(PLAN.fee)}</div>
              <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Plan: {f.md === 'Single' ? 'Specific Area - ' + f.ar : 'Freehand'}</span>
            </div>
          </div>
          
          <label style={{ display: 'block', marginBottom: '12px' }}>Payment ka tareeqa chuniye</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {['UPI (GPay / PhonePe / Paytm)', 'Debit / Credit Card', 'Net Banking'].map((x, i) =>
              <label className="opt" key={x} style={{ margin: 0, padding: '14px 16px', display: 'flex', alignItems: 'center' }}>
                <input type="radio" name="py" checked={pay === i} onChange={() => setPay(i)} />
                <span style={{ fontWeight: '500' }}>{x}</span>
              </label>
            )}
          </div>
          
          <button className="btn" disabled={busy} onClick={next} style={{ width: '100%', padding: '16px' }}>
            {busy ? 'Payment process ho raha hai...' : <><CreditCard size={18} className="nav-icon" style={{ marginRight: '6px' }} /> Deposit {R(PLAN.fee)} jama kijiye</>}
          </button>
          
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--muted)', marginTop: '16px' }}>
            <ShieldCheck size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> 100% surakshit. Ye amount poori tarah refundable hai.
          </p>
        </>}
        {s === 4 && user && <>
          <div style={{ textAlign: 'center', marginBottom: '28px', padding: '24px 0 12px' }}>
            <div style={{ display: 'inline-flex', padding: '20px', background: '#d8f2e0', borderRadius: '50%', color: '#14532d', marginBottom: '20px' }}>
              <Award size={48} />
            </div>
            <h2 style={{ margin: '0 0 12px' }}>Badhai ho, {user.n}!</h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.05rem', margin: 0 }}>
              Aap safaltapoorvak PMP ke Affiliate Partner ban gaye hain.
            </p>
          </div>
          
          <div style={{ background: 'var(--pale)', border: '1px dashed var(--blue)', borderRadius: '12px', padding: '20px', textAlign: 'center', marginBottom: '24px' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: '0 0 8px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>Aapka Affiliate Code</p>
            <div style={{ fontSize: '2.4rem', fontWeight: '900', color: 'var(--gold)', letterSpacing: '2px' }}>{user.code}</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: '8px 0 0' }}>Ye code apni saari bookings ke time use karein.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '32px' }}>
            <span className="tag gr" style={{ padding: '6px 12px' }}>{user.plan.n}</span>
            <span className="tag gr" style={{ padding: '6px 12px' }}>{user.md === 'Single' ? user.ar + ' Territory' : 'Freehand Mode'}</span>
            <span className="tag ok" style={{ padding: '6px 12px' }}><CheckCircle size={12} className="nav-icon" /> Active</span>
          </div>
          
          <Link className="btn" href="/dashboard" style={{ width: '100%', padding: '16px', fontSize: '1.05rem' }}>
            <LayoutDashboard size={18} className="nav-icon" style={{ marginRight: '6px' }} /> Apna Dashboard kholiye
          </Link>
        </>}
      </div>
    </div></section>
  );
}
