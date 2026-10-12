'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/components/AppProvider';
import { AREAS, INDIAN_STATES, PLAN, R } from '@/lib/constants';
import { ArrowRight, ArrowLeft, ShieldCheck, CreditCard, LayoutDashboard, User, Phone, FileText, MessageSquare, MapPin, IndianRupee, Award, CheckCircle, Lock, Zap, RefreshCw, AlertCircle, Copy } from 'lucide-react';

const T = ['Details', 'Verify', 'Territory', 'Deposit', 'Active'];

export default function Join() {
  const { user, join, ready } = useApp();
  const statesList = Object.keys(INDIAN_STATES);
  const [step, setStep] = useState(0);
  const [f, setF] = useState({ n: '', m: '', k: '', md: 'Single', ar: 'Lucknow, Uttar Pradesh' });
  const [otp, setOtp] = useState('');
  const [expectedOtp, setExpectedOtp] = useState('');
  const [pay, setPay] = useState(0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [selectedCity, setSelectedCity] = useState(INDIAN_STATES['Uttar Pradesh'][0]);

  const set = (k) => (e) => {
    setErr('');
    setF({ ...f, [k]: e.target.value });
  };

  const handleStateChange = (e) => {
    const st = e.target.value;
    setSelectedState(st);
    const cities = INDIAN_STATES[st] || ['All India Open Access'];
    setSelectedCity(cities[0]);
    setF(prev => ({ ...prev, ar: `${cities[0]}, ${st}` }));
  };

  const handleCityChange = (e) => {
    const ct = e.target.value;
    setSelectedCity(ct);
    setF(prev => ({ ...prev, ar: `${ct}, ${selectedState}` }));
  };

  if (!ready) return null;
  const s = user ? 4 : step;

  const sendOtp = () => {
    setErr('');
    const generated = Math.floor(1000 + Math.random() * 9000).toString();
    setExpectedOtp(generated);
    setOtp('');
  };

  const next = async () => {
    setErr('');
    if (step === 0) {
      if (!f.n.trim()) { setErr('Kripya apna poora naam likhein.'); return; }
      if (f.m.trim().length < 10) { setErr('Kripya 10 ank ka valid mobile number daalein.'); return; }
      if (!f.k.trim()) { setErr('Kripya Aadhaar ya PAN number (KYC) bhariye.'); return; }
      sendOtp();
      setStep(1);
      return;
    }
    if (step === 1) {
      if (otp.length < 4) { setErr('Kripya 4 ank ka OTP darj karein.'); return; }
      if (otp !== expectedOtp) { setErr('Galat OTP! Kripya sahi OTP daalein ya Auto-fill click karein.'); return; }
      setStep(2);
      return;
    }
    if (step === 3) {
      setBusy(true);
      try {
        const res = await fetch('/api/payment/create-order', { method: 'POST' });
        const orderData = await res.json();
        
        if (!res.ok) {
           console.warn("Razorpay API failed (probably missing keys). Using mock payment.", orderData.error);
           await join(f);
           setStep(4);
           return;
        }

        const loadScript = (src) => new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });

        const resScript = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!resScript) {
          alert('Razorpay load fail ho gaya. Internet check karein.');
          setBusy(false);
          return;
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_dummykey',
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Poll Craft Analytics',
          description: 'Affiliate Security Deposit',
          order_id: orderData.id,
          handler: async function (response) {
             try {
                setBusy(true);
                await join({ ...f, paymentId: response.razorpay_payment_id });
                setStep(4);
             } catch(e) {
                alert(e.message);
             } finally {
                setBusy(false);
             }
          },
          prefill: { name: f.n, contact: f.m },
          theme: { color: '#0f172a' }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function (response) {
          alert(response.error.description);
        });
        paymentObject.open();

      } catch (e) { 
        alert(e.message); 
      } finally { 
        setBusy(false); 
      }
      return;
    }
    setStep(step + 1);
  };

  // Modern Input Style
  const inputStyle = { padding: '16px', borderRadius: '12px', border: '1px solid var(--line)', background: '#f8fafc', fontSize: '1rem', width: '100%', outline: 'none', transition: 'all 0.2s ease', color: 'var(--navy)' };

  return (
    <section className="sec" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', background: 'radial-gradient(circle at top, rgba(234, 179, 8, 0.05), transparent 40%)' }}>
      <div className="w" style={{ maxWidth: 540, width: '100%' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }} className="fade-in">
          <span className="tag" style={{ background: 'var(--pale)', color: 'var(--gold)', marginBottom: '12px', padding: '6px 14px', fontSize: '0.85rem' }}>
            <Award size={14} className="nav-icon" /> Partner Program
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 10px', color: 'var(--h)', letterSpacing: '-1px' }}>Affiliate Banein</h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem', margin: 0 }}>Poll Craft ke sath judkar apni monthly income badhayein.</p>
        </div>

        {/* Stepper Progress */}
        <div className="fade-in delay-1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', position: 'relative', width: '100%' }}>
          <div style={{ position: 'absolute', top: '14px', left: '8%', right: '8%', height: '2px', background: 'var(--line)', zIndex: 0 }} />
          <div style={{ position: 'absolute', top: '14px', left: '8%', right: `${Math.max(8, 100 - (s / (T.length - 1)) * 84)}%`, height: '2px', background: 'var(--gold)', zIndex: 0, transition: 'right 0.4s ease' }} />
          
          {T.map((t, i) => (
            <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 1, minWidth: '44px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: i <= s ? 'var(--gold)' : 'var(--bg)', border: i <= s ? '2px solid var(--gold)' : '2px solid var(--line)', color: i <= s ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.8rem', transition: 'all 0.3s ease' }}>
                {i < s ? <CheckCircle size={15} /> : i + 1}
              </div>
              <span style={{ fontSize: 'clamp(0.65rem, 2vw, 0.75rem)', fontWeight: i === s ? '800' : '600', color: i <= s ? 'var(--navy)' : 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {t}
              </span>
            </div>
          ))}
        </div>

        <div className="card fade-in delay-2" style={{ padding: 'clamp(20px, 4vw, 40px)', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '24px', background: '#fff' }}>
          
          {err && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '14px 18px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: '500' }}>
              <AlertCircle size={20} style={{ color: '#ef4444', flexShrink: 0 }} />
              <span>{err}</span>
            </div>
          )}

          {s === 0 && <>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', color: 'var(--blue)', marginBottom: '16px' }}>
                <User size={28} />
              </div>
              <h2 style={{ fontSize: '1.6rem', margin: '0 0 8px', color: 'var(--navy)' }}>Personal Details</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: 0 }}>Aapki jankari poori tarah surakshit hai.</p>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', color: 'var(--navy)' }}>
                <User size={16} className="nav-icon" style={{ color: 'var(--blue)' }} /> Poora naam
              </label>
              <input placeholder="Jaise: Rahul Kumar" value={f.n} onChange={set('n')} style={inputStyle} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', color: 'var(--navy)' }}>
                <Phone size={16} className="nav-icon" style={{ color: 'var(--blue)' }} /> Mobile number
              </label>
              <div style={{ display: 'flex', alignItems: 'stretch', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden', background: '#f8fafc' }}>
                <div style={{ padding: '0 16px', background: 'var(--pale)', color: 'var(--navy)', fontWeight: '800', borderRight: '1px solid var(--line)', display: 'flex', alignItems: 'center' }}>+91</div>
                <input type="tel" inputMode="numeric" maxLength={10} placeholder="9876543210" value={f.m} onChange={set('m')} style={{ padding: '16px', flex: 1, border: 'none', borderRadius: 0, outline: 'none', background: 'transparent', fontSize: '1rem', color: 'var(--navy)' }} />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: '8px 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}><ShieldCheck size={12} /> Is par OTP bheja jayega.</p>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', color: 'var(--navy)' }}>
                <FileText size={16} className="nav-icon" style={{ color: 'var(--blue)' }} /> Aadhaar / PAN (KYC)
              </label>
              <input placeholder="Aadhaar ya PAN number" value={f.k} onChange={set('k')} style={inputStyle} />
            </div>

            <button className="btn" onClick={next} style={{ width: '100%', padding: '18px', fontSize: '1.1rem', borderRadius: '12px', boxShadow: '0 8px 16px rgba(234, 179, 8, 0.2)' }}>
              Aage badhein <ArrowRight size={18} className="nav-icon" />
            </button>

            <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.95rem', color: 'var(--muted)' }}>
              Pehle se account hai? <Link href="/login" style={{ color: 'var(--blue)', fontWeight: '800', textDecoration: 'underline' }}>Login Karein</Link>
            </p>
          </>}

          {s === 1 && <>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'inline-flex', padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', color: '#10b981', marginBottom: '16px' }}>
                <MessageSquare size={32} />
              </div>
              <h2 style={{ fontSize: '1.6rem', margin: '0 0 8px', color: 'var(--navy)' }}>OTP Verify Karein</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: 0 }}>
                Humne <strong>+91 {f.m}</strong> par verification code bheja hai.
              </p>
              {expectedOtp && (
                <div style={{ marginTop: '14px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '10px 18px', borderRadius: '12px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '12px', color: '#065f46', fontSize: '0.95rem', fontWeight: '600' }}>
                  <span>Demo OTP: <strong style={{ color: '#047857', letterSpacing: '3px', fontSize: '1.15rem' }}>{expectedOtp}</strong></span>
                  <button type="button" onClick={() => { setOtp(expectedOtp); setErr(''); }} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Copy size={12} /> Auto-fill OTP
                  </button>
                </div>
              )}
            </div>
            
            <div style={{ marginBottom: '36px' }}>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', marginBottom: '16px', color: 'var(--navy)' }}>
                <ShieldCheck size={16} className="nav-icon" style={{ color: '#10b981' }} /> 4-digit verification code
              </label>
              <input 
                style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', letterSpacing: 'clamp(6px, 3vw, 14px)', textAlign: 'center', padding: '16px', borderRadius: '16px', fontWeight: '900', color: 'var(--navy)', background: '#f8fafc', border: '2px solid var(--line)', outline: 'none', width: '100%' }}
                inputMode="numeric" maxLength={4} placeholder="••••" value={otp} onChange={(e) => { setErr(''); setOtp(e.target.value); }} 
              />
            </div>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button type="button" className="btn o" onClick={() => { setErr(''); setStep(0); }} style={{ flex: '1 1 120px', padding: '16px', fontSize: '1rem', borderRadius: '12px', justifyContent: 'center' }}>
                <ArrowLeft size={16} className="nav-icon" /> Peechhe
              </button>
              <button className="btn" onClick={next} style={{ flex: '2 1 180px', padding: '16px', fontSize: '1.05rem', borderRadius: '12px', background: '#10b981', color: '#fff', boxShadow: '0 8px 16px rgba(16, 185, 129, 0.2)', justifyContent: 'center' }}>
                Verify kijiye <CheckCircle size={18} className="nav-icon" />
              </button>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button onClick={sendOtp} style={{ background: 'none', border: 'none', color: 'var(--blue)', fontWeight: '800', cursor: 'pointer', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <RefreshCw size={14} /> OTP nahi mila? Naya code bhejein
              </button>
            </div>
          </>}

          {s === 2 && <>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', padding: '16px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '50%', color: 'var(--gold)', marginBottom: '16px' }}>
                <MapPin size={32} />
              </div>
              <h2 style={{ fontSize: '1.6rem', margin: '0 0 8px', color: 'var(--navy)' }}>Territory Selection</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: 0 }}>Select your working area & mode option:</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
              {[
                ['Single', Lock, 'Specific Area', 'Select State → Select City (1 Exclusive Locked Territory for 1 Affiliate Partner).'],
                ['Freehand', Zap, 'Free Area', 'Select State (All Indian) — Open selection across any zone/seat without exclusive locks.']
              ].map(([v, Icon, t, d]) =>
                <label className="opt" key={v} style={{ margin: 0, display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '24px', borderRadius: '16px', border: f.md === v ? '2px solid var(--gold)' : '2px solid var(--line)', background: f.md === v ? '#fffbeb' : '#fff', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: f.md === v ? '0 8px 24px rgba(245, 158, 11, 0.1)' : 'none' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: f.md === v ? '6px solid var(--gold)' : '2px solid var(--muted)', flexShrink: 0, marginTop: '2px', transition: 'all 0.2s ease' }} />
                  <input type="radio" name="md" checked={f.md === v} onChange={() => {
                    setF(prev => ({ 
                      ...prev, 
                      md: v, 
                      ar: v === 'Freehand' ? `${selectedState} (All India Open)` : `${selectedCity}, ${selectedState}` 
                    }));
                  }} style={{ display: 'none' }} />
                  <div>
                    <b style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem', color: f.md === v ? 'var(--navy)' : 'var(--h)', marginBottom: '8px' }}>
                      <Icon size={20} style={{ color: f.md === v ? 'var(--gold)' : 'var(--muted)' }} /> {t}
                    </b>
                    <span style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: '1.5', display: 'block' }}>{d}</span>
                  </div>
                </label>
              )}
            </div>

            {/* Specific Area: Select State -> Select City */}
            {f.md === 'Single' ? (
              <div style={{ marginBottom: '36px', background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid var(--line)' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', color: 'var(--navy)' }}>
                    <MapPin size={16} style={{ color: 'var(--blue)' }} /> 1. Select State
                  </label>
                  <select value={selectedState} onChange={handleStateChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {statesList.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', color: 'var(--navy)' }}>
                    <Lock size={16} style={{ color: 'var(--gold)' }} /> 2. Select City / District
                  </label>
                  <select value={selectedCity} onChange={handleCityChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {(INDIAN_STATES[selectedState] || []).map(ct => <option key={ct} value={ct}>{ct}</option>)}
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--gold)', fontWeight: '800', background: '#fff', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(245,158,11,0.3)' }}>
                  <ShieldCheck size={18} /> Exclusive Locked Territory: <strong>{selectedCity}, {selectedState}</strong>
                </div>
              </div>
            ) : (
              /* Free Area: Select State (All Indian) */
              <div style={{ marginBottom: '36px', background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid var(--line)' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', color: 'var(--navy)' }}>
                    <Zap size={16} style={{ color: '#10b981' }} /> Select State (All Indian)
                  </label>
                  <select value={selectedState} onChange={(e) => {
                    const st = e.target.value;
                    setSelectedState(st);
                    setF(prev => ({ ...prev, ar: `${st} (All India Open)` }));
                  }} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="All Indian States (All India Open Access)">All Indian States (All India Open Access)</option>
                    {statesList.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#10b981', fontWeight: '800', background: '#fff', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <CheckCircle size={18} /> Free Area Mode: Open Access in <strong>{selectedState === 'All Indian States (All India Open Access)' ? 'All Indian States' : selectedState}</strong>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button type="button" className="btn o" onClick={() => { setErr(''); setStep(0); }} style={{ flex: '1 1 120px', padding: '16px', fontSize: '1rem', borderRadius: '12px', justifyContent: 'center' }}>
                <ArrowLeft size={16} className="nav-icon" /> Peechhe
              </button>
              <button className="btn" onClick={next} style={{ flex: '2 1 180px', padding: '18px', fontSize: '1.1rem', borderRadius: '12px', boxShadow: '0 8px 16px rgba(234, 179, 8, 0.2)', justifyContent: 'center' }}>
                Aage badhein <ArrowRight size={18} className="nav-icon" />
              </button>
            </div>
          </>}

          {s === 3 && <>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', color: 'var(--blue)', marginBottom: '16px' }}>
                <CreditCard size={32} />
              </div>
              <h2 style={{ fontSize: '1.6rem', margin: '0 0 8px', color: 'var(--navy)' }}>Security Deposit</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: 0 }}>Refundable deposit jama kijiye aur shuru karein.</p>
            </div>
            
            <div className="note" style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '32px', padding: '24px', background: 'linear-gradient(135deg, var(--navy) 0%, var(--deep) 100%)', borderRadius: '16px', color: '#fff', boxShadow: '0 12px 24px rgba(13, 20, 49, 0.15)' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
                <IndianRupee size={36} style={{ color: 'var(--gold)', display: 'block' }} />
              </div>
              <div>
                <span style={{ fontSize: '0.85rem', color: '#c3cbe8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800' }}>Refundable Deposit</span>
                <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#fff', margin: '4px 0', letterSpacing: '-1px' }}>{R(PLAN.fee)}</div>
                <span style={{ fontSize: '0.9rem', color: '#c3cbe8' }}>Plan: <strong style={{ color: 'var(--gold)' }}>{f.md === 'Single' ? `Specific Area (${f.ar})` : 'Freehand Mode'}</strong></span>
              </div>
            </div>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', marginBottom: '16px', color: 'var(--navy)' }}>
              <CreditCard size={16} className="nav-icon" style={{ color: 'var(--blue)' }} /> Payment Method
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
              {['UPI (GPay / PhonePe / Paytm)', 'Debit / Credit Card', 'Net Banking'].map((x, i) =>
                <label className="opt" key={x} style={{ margin: 0, padding: '20px', display: 'flex', alignItems: 'center', borderRadius: '12px', border: pay === i ? '2px solid var(--blue)' : '1px solid var(--line)', background: pay === i ? '#eff6ff' : '#fff', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: pay === i ? '6px solid var(--blue)' : '2px solid var(--muted)', flexShrink: 0, transition: 'all 0.2s ease' }} />
                  <input type="radio" name="py" checked={pay === i} onChange={() => setPay(i)} style={{ display: 'none' }} />
                  <span style={{ fontWeight: pay === i ? '700' : '600', marginLeft: '16px', color: pay === i ? 'var(--blue)' : 'var(--navy)', fontSize: '1.05rem' }}>{x}</span>
                </label>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button type="button" className="btn o" onClick={() => { setErr(''); setStep(2); }} style={{ flex: '1 1 120px', padding: '16px', fontSize: '1rem', borderRadius: '12px', justifyContent: 'center' }}>
                <ArrowLeft size={16} className="nav-icon" /> Peechhe
              </button>
              <button className="btn" disabled={busy} onClick={next} style={{ flex: '2 1 180px', padding: '18px', fontSize: '1.1rem', borderRadius: '12px', background: 'var(--navy)', color: '#fff', boxShadow: '0 8px 16px rgba(13, 20, 49, 0.2)', justifyContent: 'center' }}>
                {busy ? 'Process ho raha hai...' : <><Lock size={18} className="nav-icon" style={{ color: 'var(--gold)' }} /> Pay {R(PLAN.fee)} securely</>}
              </button>
            </div>
            
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--muted)', marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <ShieldCheck size={16} style={{ color: '#10b981' }} /> 100% surakshit. Ye amount poori tarah refundable hai.
            </p>
          </>}

          {s === 4 && user && <>
            <div className="fade-in" style={{ textAlign: 'center', marginBottom: '40px', padding: '16px 0 0' }}>
              <div style={{ display: 'inline-flex', padding: '28px', background: '#ecfdf5', borderRadius: '50%', color: '#10b981', marginBottom: '24px', boxShadow: '0 12px 32px rgba(16, 185, 129, 0.2)' }}>
                <Award size={64} />
              </div>
              <h2 style={{ margin: '0 0 16px', fontSize: '2.2rem', color: 'var(--navy)', letterSpacing: '-1px' }}>Badhai ho, {user.n}!</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1.1rem', margin: 0, lineHeight: '1.6' }}>
                Aap safaltapoorvak Poll Craft ke Affiliate Partner ban gaye hain.
              </p>
            </div>
            
            <div className="fade-in delay-1" style={{ background: '#f8fafc', border: '2px dashed var(--gold)', borderRadius: '20px', padding: '32px', textAlign: 'center', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--gold)' }} />
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', margin: '0 0 12px', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '1.5px' }}>Aapka Affiliate Code</p>
              <div style={{ fontSize: '3.2rem', fontWeight: '900', color: 'var(--navy)', letterSpacing: '4px', margin: '8px 0', fontFamily: 'Outfit' }}>{user.code}</div>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', margin: 0 }}>Is code ko apni saari bookings ke time use karein.</p>
            </div>
            
            <div className="fade-in delay-2" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
              <span className="tag" style={{ padding: '10px 20px', fontSize: '0.95rem', background: '#eff6ff', color: 'var(--blue)', fontWeight: '700' }}><Award size={16} className="nav-icon" /> {user?.plan?.n || 'Affiliate Plan'}</span>
              <span className="tag" style={{ padding: '10px 20px', fontSize: '0.95rem', background: 'var(--pale)', color: 'var(--gold)', fontWeight: '700' }}><MapPin size={16} className="nav-icon" /> {user?.md === 'Single' ? (user?.ar || '') + ' Territory' : 'Freehand Mode'}</span>
              <span className="tag ok" style={{ padding: '10px 20px', fontSize: '0.95rem', fontWeight: '700' }}><CheckCircle size={16} className="nav-icon" /> Active</span>
            </div>
            
            <Link className="btn fade-in delay-3" href="/dashboard" style={{ width: '100%', padding: '20px', fontSize: '1.15rem', borderRadius: '12px', boxShadow: '0 12px 24px rgba(234, 179, 8, 0.25)' }}>
              <LayoutDashboard size={20} className="nav-icon" /> Apna Dashboard kholiye
            </Link>
          </>}
        </div>
      </div>
    </section>
  );
}
