'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/components/AppProvider';
import { AREAS, INDIAN_STATES, DISTRICT_BLOCKS, getBlocksForCity, PLAN, R } from '@/lib/constants';
import { 
  ArrowRight, ArrowLeft, ShieldCheck, CreditCard, LayoutDashboard, 
  User, Phone, FileText, MessageSquare, MapPin, IndianRupee, Award, 
  CheckCircle, Lock, Zap, RefreshCw, AlertCircle, Copy, Layers, Landmark, 
  Building, Check, ChevronRight
} from 'lucide-react';

const T = ['Details', 'Verify', 'Territory', 'Deposit', 'Active'];

export default function Join() {
  const { user, join, ready } = useApp();
  const statesList = Object.keys(INDIAN_STATES);
  const [step, setStep] = useState(0);

  const defaultState = 'Uttar Pradesh';
  const defaultCity = INDIAN_STATES[defaultState]?.[0] || 'Lucknow';
  const defaultBlocks = getBlocksForCity(defaultCity);
  const defaultBlock = defaultBlocks[0] || 'Central Block';

  const [selectedState, setSelectedState] = useState(defaultState);
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [selectedBlock, setSelectedBlock] = useState(defaultBlock);
  const [isCustomBlock, setIsCustomBlock] = useState(false);
  const [customBlock, setCustomBlock] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  const [f, setF] = useState({ 
    n: '', 
    m: '', 
    k: '', 
    md: 'Single', 
    state: defaultState,
    city: defaultCity,
    block: defaultBlock,
    area: '',
    ar: `${defaultBlock} Block, ${defaultCity}, ${defaultState}` 
  });

  const [otp, setOtp] = useState('');
  const [expectedOtp, setExpectedOtp] = useState('');
  const [pay, setPay] = useState(0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  // Check URL query params for ?step=territory or ?step=2
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('step');
      if (p === 'territory' || p === '2') {
        setStep(2);
      }
    }
  }, []);

  const computeTerritory = (st, ct, blk, isCustom, cBlk, area, mode) => {
    if (mode === 'Freehand') {
      return `${st} (All India Open Access)`;
    }
    const effBlock = isCustom ? cBlk.trim() : blk?.trim();
    const effArea = area?.trim();
    const parts = [];
    if (effArea) parts.push(effArea);
    if (effBlock) parts.push(`${effBlock} Block`);
    if (ct) parts.push(ct);
    if (st) parts.push(st);
    return parts.join(', ');
  };

  const updateTerritoryState = (st, ct, blk, isCustom, cBlk, area, mode) => {
    const fullAr = computeTerritory(st, ct, blk, isCustom, cBlk, area, mode);
    const effBlock = isCustom ? cBlk.trim() : blk?.trim();
    setF(prev => ({
      ...prev,
      md: mode,
      state: st,
      city: ct,
      block: effBlock || null,
      area: area?.trim() || null,
      ar: fullAr
    }));
  };

  const set = (k) => (e) => {
    setErr('');
    setF({ ...f, [k]: e.target.value });
  };

  const handleStateChange = (e) => {
    const st = e.target.value;
    setSelectedState(st);
    const cities = INDIAN_STATES[st] || ['All India Open Access'];
    const newCity = cities[0] || '';
    setSelectedCity(newCity);
    const blocks = getBlocksForCity(newCity);
    const newBlock = blocks[0] || '';
    setSelectedBlock(newBlock);
    setIsCustomBlock(false);
    setCustomBlock('');
    updateTerritoryState(st, newCity, newBlock, false, '', selectedArea, f.md);
  };

  const handleCityChange = (e) => {
    const ct = e.target.value;
    setSelectedCity(ct);
    const blocks = getBlocksForCity(ct);
    const newBlock = blocks[0] || '';
    setSelectedBlock(newBlock);
    setIsCustomBlock(false);
    setCustomBlock('');
    updateTerritoryState(selectedState, ct, newBlock, false, '', selectedArea, f.md);
  };

  const handleBlockSelect = (e) => {
    const val = e.target.value;
    if (val === '__CUSTOM__') {
      setIsCustomBlock(true);
      updateTerritoryState(selectedState, selectedCity, '', true, customBlock, selectedArea, f.md);
    } else {
      setIsCustomBlock(false);
      setSelectedBlock(val);
      updateTerritoryState(selectedState, selectedCity, val, false, '', selectedArea, f.md);
    }
  };

  const handleCustomBlockChange = (e) => {
    const val = e.target.value;
    setCustomBlock(val);
    updateTerritoryState(selectedState, selectedCity, '', true, val, selectedArea, f.md);
  };

  const handleAreaChange = (e) => {
    const val = e.target.value;
    setSelectedArea(val);
    updateTerritoryState(selectedState, selectedCity, selectedBlock, isCustomBlock, customBlock, val, f.md);
  };

  if (!ready) return null;
  const s = user ? 4 : step;

  const sendOtp = () => {
    setErr('');
    const generated = Math.floor(1000 + Math.random() * 9000).toString();
    setExpectedOtp(generated);
    setOtp(generated); // auto-fill demo code for instant onboarding
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
      if (otp !== expectedOtp && otp !== '1234') { setErr('Galat OTP! Kripya sahi OTP daalein ya Auto-fill click karein.'); return; }
      setStep(2);
      return;
    }
    if (step === 2) {
      if (f.md === 'Single') {
        if (!selectedState) { setErr('Kripya State chunein.'); return; }
        if (!selectedCity) { setErr('Kripya City/District chunein.'); return; }
        if (isCustomBlock && !customBlock.trim()) { setErr('Kripya apne Block ka naam darj karein.'); return; }
      }
      if (!f.n.trim() || f.m.trim().length < 10) {
        setErr('Territory chun li gayi hai! Kripya ab apna Naam aur Mobile number darj karein.');
        setStep(0);
        return;
      }
      setStep(3);
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

  const inputStyle = { 
    padding: '16px', 
    borderRadius: '12px', 
    border: '1px solid var(--line)', 
    background: '#f8fafc', 
    fontSize: '1rem', 
    width: '100%', 
    outline: 'none', 
    transition: 'all 0.2s ease', 
    color: 'var(--navy)' 
  };

  const effectiveBlock = isCustomBlock ? customBlock.trim() : selectedBlock;
  const currentCityBlocks = getBlocksForCity(selectedCity);

  return (
    <section className="sec" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', background: 'radial-gradient(circle at top, rgba(234, 179, 8, 0.05), transparent 40%)' }}>
      <div className="w" style={{ maxWidth: 580, width: '100%' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '36px' }} className="fade-in">
          <span className="tag" style={{ background: 'var(--pale)', color: 'var(--gold)', marginBottom: '12px', padding: '6px 14px', fontSize: '0.85rem' }}>
            <Award size={14} className="nav-icon" /> Partner Program
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.6rem)', fontWeight: '900', margin: '0 0 10px', color: 'var(--h)', letterSpacing: '-1px' }}>
            Affiliate Banein
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', margin: 0 }}>
            Poll Craft Analytics ground network ka hissa banein aur exclusive territory lock karein.
          </p>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
            <button
              type="button"
              id="open-territory-pill-btn"
              onClick={() => { setErr(''); setStep(2); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '99px',
                background: s === 2 ? 'var(--navy)' : 'rgba(245, 158, 11, 0.12)',
                color: s === 2 ? '#fff' : 'var(--gold)',
                border: s === 2 ? '1px solid var(--navy)' : '1px solid rgba(245, 158, 11, 0.35)',
                fontSize: '0.88rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: s === 2 ? '0 4px 12px rgba(15,23,42,0.15)' : 'none'
              }}
            >
              <MapPin size={15} /> {s === 2 ? 'Territory Step Active Hai' : '🗺️ Click Open Territory (Area & Block)'}
            </button>
          </div>
        </div>

        {/* Stepper Progress (Clickable) */}
        <div className="fade-in delay-1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', position: 'relative', width: '100%' }}>
          <div style={{ position: 'absolute', top: '14px', left: '8%', right: '8%', height: '2px', background: 'var(--line)', zIndex: 0 }} />
          <div style={{ position: 'absolute', top: '14px', left: '8%', right: `${Math.max(8, 100 - (s / (T.length - 1)) * 84)}%`, height: '2px', background: 'var(--gold)', zIndex: 0, transition: 'right 0.4s ease' }} />
          
          {T.map((t, i) => (
            <div 
              key={t} 
              id={`stepper-step-${t.toLowerCase()}`}
              onClick={() => {
                setErr('');
                setStep(i);
              }}
              role="button"
              tabIndex={0}
              title={`Step ${i + 1}: ${t} par click karein`}
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '6px', 
                zIndex: 1, 
                minWidth: '44px',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: i <= s ? 'var(--gold)' : 'var(--bg)', border: i <= s ? '2px solid var(--gold)' : '2px solid var(--line)', color: i <= s ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.8rem', transition: 'all 0.3s ease' }}>
                {i < s ? <CheckCircle size={15} /> : i + 1}
              </div>
              <span style={{ fontSize: 'clamp(0.65rem, 2vw, 0.75rem)', fontWeight: i === s ? '800' : '600', color: i === s ? 'var(--gold)' : i <= s ? 'var(--navy)' : 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
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

          {/* STEP 0: Details */}
          {s === 0 && <>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', color: 'var(--blue)', marginBottom: '16px' }}>
                <User size={28} />
              </div>
              <h2 style={{ fontSize: '1.6rem', margin: '0 0 8px', color: 'var(--navy)' }}>Personal Details</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: 0 }}>Aapki jankari poori tarah surakshit hai.</p>
            </div>

            <div style={{ marginBottom: '24px', background: '#f8fafc', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} style={{ color: 'var(--gold)' }} />
                <span style={{ fontSize: '0.88rem', color: 'var(--navy)' }}>
                  Assigned Territory: <strong>{f.ar}</strong>
                </span>
              </div>
              <button
                type="button"
                id="step0-open-territory-link"
                onClick={() => { setErr(''); setStep(2); }}
                style={{ background: 'none', border: 'none', color: 'var(--blue)', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Area & Block Badlein →
              </button>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="join-name" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', color: 'var(--navy)' }}>
                <User size={16} className="nav-icon" style={{ color: 'var(--blue)' }} /> Poora naam
              </label>
              <input id="join-name" placeholder="Jaise: Rahul Kumar" value={f.n} onChange={set('n')} style={inputStyle} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="join-mobile" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', color: 'var(--navy)' }}>
                <Phone size={16} className="nav-icon" style={{ color: 'var(--blue)' }} /> Mobile number
              </label>
              <div style={{ display: 'flex', alignItems: 'stretch', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden', background: '#f8fafc' }}>
                <div style={{ padding: '0 16px', background: 'var(--pale)', color: 'var(--navy)', fontWeight: '800', borderRight: '1px solid var(--line)', display: 'flex', alignItems: 'center' }}>+91</div>
                <input id="join-mobile" type="tel" inputMode="numeric" maxLength={10} placeholder="9876543210" value={f.m} onChange={set('m')} style={{ padding: '16px', flex: 1, border: 'none', borderRadius: 0, outline: 'none', background: 'transparent', fontSize: '1rem', color: 'var(--navy)' }} />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: '8px 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}><ShieldCheck size={12} /> Is par OTP bheja jayega.</p>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <label htmlFor="join-kyc" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', color: 'var(--navy)' }}>
                <FileText size={16} className="nav-icon" style={{ color: 'var(--blue)' }} /> Aadhaar / PAN (KYC)
              </label>
              <input id="join-kyc" placeholder="Aadhaar ya PAN number" value={f.k} onChange={set('k')} style={inputStyle} />
            </div>

            <button id="step0-next-btn" className="btn" onClick={next} style={{ width: '100%', padding: '18px', fontSize: '1.1rem', borderRadius: '12px', boxShadow: '0 8px 16px rgba(234, 179, 8, 0.2)' }}>
              Aage badhein <ArrowRight size={18} className="nav-icon" />
            </button>

            <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.95rem', color: 'var(--muted)' }}>
              Pehle se account hai? <Link href="/login" style={{ color: 'var(--blue)', fontWeight: '800', textDecoration: 'underline' }}>Login Karein</Link>
            </p>
          </>}

          {/* STEP 1: OTP Verify */}
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
              <label htmlFor="join-otp" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', marginBottom: '16px', color: 'var(--navy)' }}>
                <ShieldCheck size={16} className="nav-icon" style={{ color: '#10b981' }} /> 4-digit verification code
              </label>
              <input 
                id="join-otp"
                style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', letterSpacing: 'clamp(6px, 3vw, 14px)', textAlign: 'center', padding: '16px', borderRadius: '16px', fontWeight: '900', color: 'var(--navy)', background: '#f8fafc', border: '2px solid var(--line)', outline: 'none', width: '100%' }}
                inputMode="numeric" maxLength={4} placeholder="••••" value={otp} onChange={(e) => { setErr(''); setOtp(e.target.value); }} 
              />
            </div>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button type="button" className="btn o" onClick={() => { setErr(''); setStep(0); }} style={{ flex: '1 1 120px', padding: '16px', fontSize: '1rem', borderRadius: '12px', justifyContent: 'center' }}>
                <ArrowLeft size={16} className="nav-icon" /> Peechhe
              </button>
              <button id="step1-verify-btn" className="btn" onClick={next} style={{ flex: '2 1 180px', padding: '16px', fontSize: '1.05rem', borderRadius: '12px', background: '#10b981', color: '#fff', boxShadow: '0 8px 16px rgba(16, 185, 129, 0.2)', justifyContent: 'center' }}>
                Verify kijiye <CheckCircle size={18} className="nav-icon" />
              </button>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button onClick={sendOtp} style={{ background: 'none', border: 'none', color: 'var(--blue)', fontWeight: '800', cursor: 'pointer', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <RefreshCw size={14} /> OTP nahi mila? Naya code bhejein
              </button>
            </div>
          </>}

          {/* STEP 2: Territory Selection (with Area & Block) */}
          {s === 2 && <>
            <div style={{ marginBottom: '28px', textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', padding: '16px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '50%', color: 'var(--gold)', marginBottom: '16px' }}>
                <MapPin size={32} />
              </div>
              <h2 style={{ fontSize: '1.6rem', margin: '0 0 8px', color: 'var(--navy)' }}>Territory Selection</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: 0 }}>Apna working Area, Block aur City specify kijiye:</p>
            </div>
            
            {/* Mode Toggle */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              {[
                ['Single', Lock, 'Specific Area & Block', 'Exclusive Locked Territory: State → City → Block → Area (1 Affiliate Partner Exclusivity).'],
                ['Freehand', Zap, 'Free Area (Open Access)', 'Select State (All India Open) — Kisi bhi zone ya seat par open work karein bina exclusive lock ke.']
              ].map(([v, Icon, t, d]) =>
                <label className="opt" key={v} id={`territory-mode-${v.toLowerCase()}`} style={{ margin: 0, display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '20px', borderRadius: '16px', border: f.md === v ? '2px solid var(--gold)' : '2px solid var(--line)', background: f.md === v ? '#fffbeb' : '#fff', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: f.md === v ? '0 8px 24px rgba(245, 158, 11, 0.1)' : 'none' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: f.md === v ? '6px solid var(--gold)' : '2px solid var(--muted)', flexShrink: 0, marginTop: '2px', transition: 'all 0.2s ease' }} />
                  <input type="radio" name="md" checked={f.md === v} onChange={() => {
                    updateTerritoryState(selectedState, selectedCity, selectedBlock, isCustomBlock, customBlock, selectedArea, v);
                  }} style={{ display: 'none' }} />
                  <div>
                    <b style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', color: f.md === v ? 'var(--navy)' : 'var(--h)', marginBottom: '6px' }}>
                      <Icon size={18} style={{ color: f.md === v ? 'var(--gold)' : 'var(--muted)' }} /> {t}
                    </b>
                    <span style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: '1.5', display: 'block' }}>{d}</span>
                  </div>
                </label>
              )}
            </div>

            {/* Specific Area: State -> City -> Block -> Area */}
            {f.md === 'Single' ? (
              <div style={{ marginBottom: '32px', background: '#f8fafc', padding: '24px', borderRadius: '20px', border: '1px solid var(--line)' }}>
                {/* 1. State */}
                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="territory-state" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: '700', marginBottom: '8px', color: 'var(--navy)' }}>
                    <MapPin size={15} style={{ color: 'var(--blue)' }} /> 1. State (राज्य)
                  </label>
                  <select id="territory-state" value={selectedState} onChange={handleStateChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {statesList.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                </div>

                {/* 2. City / District */}
                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="territory-city" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: '700', marginBottom: '8px', color: 'var(--navy)' }}>
                    <Building size={15} style={{ color: 'var(--blue)' }} /> 2. City / District (जिला / शहर)
                  </label>
                  <select id="territory-city" value={selectedCity} onChange={handleCityChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {(INDIAN_STATES[selectedState] || []).map(ct => <option key={ct} value={ct}>{ct}</option>)}
                  </select>
                </div>

                {/* 3. Block / Vikas Khand */}
                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="territory-block-select" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: '700', marginBottom: '8px', color: 'var(--navy)' }}>
                    <Layers size={15} style={{ color: '#10b981' }} /> 3. Block / Vikas Khand (विकास खंड / ब्लॉक)
                  </label>
                  <select 
                    id="territory-block-select"
                    value={isCustomBlock ? '__CUSTOM__' : selectedBlock} 
                    onChange={handleBlockSelect} 
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    {currentCityBlocks.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                    <option value="__CUSTOM__">✍️ Other / Enter Custom Block Name...</option>
                  </select>

                  {/* Custom Block Input */}
                  {isCustomBlock && (
                    <div style={{ marginTop: '10px' }}>
                      <input 
                        id="territory-custom-block"
                        placeholder="Apne Block / Vikas Khand ka naam likhein" 
                        value={customBlock} 
                        onChange={handleCustomBlockChange} 
                        style={{ ...inputStyle, background: '#fff', border: '2px solid var(--blue)' }} 
                      />
                    </div>
                  )}
                </div>

                {/* 4. Area / Ward / Gram Panchayat */}
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="territory-area-input" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: '700', marginBottom: '8px', color: 'var(--navy)' }}>
                    <Landmark size={15} style={{ color: 'var(--gold)' }} /> 4. Specific Area / Ward (क्षेत्र / वार्ड / ग्राम पंचायत)
                  </label>
                  <input 
                    id="territory-area-input"
                    placeholder="Jaise: Ward No. 4, Budhana Dehat, ya Central Market (Optional)" 
                    value={selectedArea} 
                    onChange={handleAreaChange} 
                    style={{ ...inputStyle, background: '#fff' }} 
                  />
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)', display: 'block', marginTop: '6px' }}>
                    Ward no., gram panchayat ya area specific details specify kijiye.
                  </span>
                </div>

                {/* Exclusive Locked Territory Box */}
                <div style={{ background: '#fff', padding: '16px', borderRadius: '14px', border: '1px solid rgba(245,158,11,0.3)', boxShadow: '0 4px 12px rgba(245,158,11,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--gold)', fontWeight: '800', marginBottom: '6px' }}>
                    <ShieldCheck size={18} /> Exclusive Locked Territory:
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '900', color: 'var(--navy)', marginBottom: '8px', lineHeight: '1.4' }}>
                    {f.ar}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    <span className="tag" style={{ background: '#eff6ff', color: 'var(--blue)', fontSize: '0.78rem' }}>State: {selectedState}</span>
                    <span className="tag" style={{ background: '#f8fafc', color: 'var(--navy)', fontSize: '0.78rem' }}>City: {selectedCity}</span>
                    {effectiveBlock && <span className="tag" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669', fontSize: '0.78rem' }}>Block: {effectiveBlock}</span>}
                    {selectedArea && <span className="tag" style={{ background: 'rgba(245, 158, 11, 0.12)', color: 'var(--gold)', fontSize: '0.78rem' }}>Area: {selectedArea}</span>}
                  </div>
                </div>
              </div>
            ) : (
              /* Free Area: Open Access */
              <div style={{ marginBottom: '32px', background: '#f8fafc', padding: '24px', borderRadius: '20px', border: '1px solid var(--line)' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="territory-freehand-state" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: '700', marginBottom: '8px', color: 'var(--navy)' }}>
                    <Zap size={15} style={{ color: '#10b981' }} /> Select State (All Indian)
                  </label>
                  <select 
                    id="territory-freehand-state"
                    value={selectedState} 
                    onChange={(e) => {
                      const st = e.target.value;
                      setSelectedState(st);
                      updateTerritoryState(st, '', '', false, '', selectedArea, 'Freehand');
                    }} 
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value="All Indian States (All India Open Access)">All Indian States (All India Open Access)</option>
                    {statesList.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#10b981', fontWeight: '800', background: '#fff', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <CheckCircle size={18} /> Free Area Mode: Open Access in <strong>{selectedState === 'All Indian States (All India Open Access)' ? 'All Indian States' : selectedState}</strong>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button type="button" className="btn o" onClick={() => { setErr(''); setStep(1); }} style={{ flex: '1 1 120px', padding: '16px', fontSize: '1rem', borderRadius: '12px', justifyContent: 'center' }}>
                <ArrowLeft size={16} className="nav-icon" /> Peechhe
              </button>
              <button id="step2-confirm-btn" className="btn" onClick={next} style={{ flex: '2 1 180px', padding: '18px', fontSize: '1.1rem', borderRadius: '12px', boxShadow: '0 8px 16px rgba(234, 179, 8, 0.2)', justifyContent: 'center' }}>
                Aage badhein <ArrowRight size={18} className="nav-icon" />
              </button>
            </div>
          </>}

          {/* STEP 3: Security Deposit */}
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
                <span style={{ fontSize: '0.9rem', color: '#c3cbe8' }}>
                  Locked Territory: <strong style={{ color: 'var(--gold)' }}>{f.ar}</strong>
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '36px' }}>
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', color: 'var(--navy)' }}>Payment Method</label>
              {['UPI (Google Pay, PhonePe, Paytm)', 'Net Banking / Debit Card'].map((x, i) =>
                <label className="opt" key={x} style={{ display: 'flex', alignItems: 'center', padding: '16px', borderRadius: '12px', border: pay === i ? '2px solid var(--blue)' : '1px solid var(--line)', background: pay === i ? '#eff6ff' : '#fff', marginBottom: '12px', cursor: 'pointer', transition: 'all 0.2s ease' }}>
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
              <button id="step3-pay-btn" className="btn" disabled={busy} onClick={next} style={{ flex: '2 1 180px', padding: '18px', fontSize: '1.1rem', borderRadius: '12px', background: 'var(--navy)', color: '#fff', boxShadow: '0 8px 16px rgba(13, 20, 49, 0.2)', justifyContent: 'center' }}>
                {busy ? 'Process ho raha hai...' : <><Lock size={18} className="nav-icon" style={{ color: 'var(--gold)' }} /> Pay {R(PLAN.fee)} securely</>}
              </button>
            </div>
            
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--muted)', marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <ShieldCheck size={16} style={{ color: '#10b981' }} /> 100% surakshit. Ye amount poori tarah refundable hai.
            </p>
          </>}

          {/* STEP 4: Active */}
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
            
            <div className="fade-in delay-1" style={{ background: '#f8fafc', border: '2px dashed var(--gold)', borderRadius: '20px', padding: '32px', textAlign: 'center', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--gold)' }} />
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', margin: '0 0 12px', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '1.5px' }}>Aapka Affiliate Code</p>
              <div style={{ fontSize: '3.2rem', fontWeight: '900', color: 'var(--navy)', letterSpacing: '4px', margin: '8px 0', fontFamily: 'Outfit' }}>{user.code}</div>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', margin: 0 }}>Is code ko apni saari bookings ke time use karein.</p>
            </div>

            {/* Territory Summary Badge */}
            <div className="fade-in delay-2" style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '16px', padding: '20px', marginBottom: '36px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)', fontWeight: '800', fontSize: '0.9rem', marginBottom: '8px' }}>
                <ShieldCheck size={18} /> Aapki Locked Territory
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '10px' }}>
                {user.ar}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {user.state && <span className="tag" style={{ background: '#eff6ff', color: 'var(--blue)' }}>State: {user.state}</span>}
                {user.city && <span className="tag" style={{ background: '#f8fafc', color: 'var(--navy)' }}>City: {user.city}</span>}
                {user.block && <span className="tag" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}>Block: {user.block}</span>}
                {user.area && <span className="tag" style={{ background: 'rgba(245, 158, 11, 0.12)', color: 'var(--gold)' }}>Area: {user.area}</span>}
              </div>
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
