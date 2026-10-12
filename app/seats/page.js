'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/components/AppProvider';
import { PRICE, R } from '@/lib/constants';
import { 
  BookMarked, X, CheckCircle, AlertCircle, Lock, User, Phone, 
  ShieldCheck, MapPin, Building, Home, Map as MapIcon, CreditCard, 
  Layers, Check, Sparkles, ArrowRight
} from 'lucide-react';

export default function Seats() {
  const { user, seats, book, pay } = useApp();
  const [flt, setFlt] = useState('All');
  const [sel, setSel] = useState(null);
  const [f, setF] = useState({ candidate: '', mobile: '', otp: '', paid: false });
  const [expectedOtp, setExpectedOtp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(null);
  
  const seat = seats.find((s) => s.id === sel);

  const sendOtp = () => {
    if (f.mobile.trim().length < 10) return alert('Pehle 10 ank ka mobile number daalein.');
    const generated = Math.floor(1000 + Math.random() * 9000).toString();
    setExpectedOtp(generated);
    setF({ ...f, otp: '' });
    alert(`[Poll Craft SMS to +91 ${f.mobile}]\nCandidate booking OTP hai: ${generated}`);
  };

  const submit = async () => {
    if (!f.candidate.trim() || f.mobile.trim().length < 10) return alert('Candidate ka naam aur 10 ank ka mobile bhariye.');
    if (f.otp.length < 4 || f.otp !== expectedOtp) return alert('Galat OTP! Kripya sahi 4-digit OTP daalein.');
    
    setSubmitting(true);
    try { 
      await book(sel, f); 
      const bookedSeat = seat;
      setSel(null); 
      setF({ candidate: '', mobile: '', otp: '', paid: false }); 
      setExpectedOtp('');
      setSuccessNotice({
        seat: `${bookedSeat?.t} — ${bookedSeat?.a}`,
        paid: f.paid
      });
      setTimeout(() => setSuccessNotice(null), 6000);
    } catch (e) { 
      alert(e.message); 
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickPay = async (seatId) => {
    try {
      await pay(seatId);
      alert('Payment kamiyabi se complete hui! Seat ab paid ho chuki hai.');
    } catch (e) {
      alert(e.message || 'Payment fail ho gayi.');
    }
  };

  const tag = (s) => s.by === 'me'
    ? (s.paid
      ? <span className="tag ok" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', fontWeight: '700' }}><CheckCircle size={13} className="nav-icon" /> Paid (Aapki)</span>
      : <span className="tag no" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', fontWeight: '700' }}><AlertCircle size={13} className="nav-icon" /> Unpaid (Aapki)</span>)
    : s.by
      ? <span className="tag gr" style={{ background: 'rgba(15, 23, 42, 0.05)', color: 'var(--muted)', fontWeight: '600' }}><Lock size={12} className="nav-icon" /> Booked</span>
      : <span className="tag ok" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--blue)', fontWeight: '700' }}><CheckCircle size={13} className="nav-icon" /> Available</span>;

  const inputStyle = { 
    padding: '16px', 
    borderRadius: '12px', 
    border: '1px solid var(--line)', 
    background: '#f8fafc', 
    fontSize: '1.05rem', 
    width: '100%', 
    outline: 'none', 
    transition: 'all 0.2s ease', 
    color: 'var(--navy)' 
  };

  return (
    <section className="sec" style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div className="w">
        {/* Header Section */}
        <div className="fade-in" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px', gap: '20px' }}>
          <div>
            <span className="tag" style={{ background: 'rgba(245, 158, 11, 0.12)', color: 'var(--gold)', marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}>
              <MapIcon size={14} /> Available Territories
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', margin: 0, letterSpacing: '-1px' }}>
              Book <span style={{ color: 'var(--blue)' }}>Seats</span>
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '1.05rem', marginTop: '8px' }}>
              MLA, Zila Panchayat aur Gram Pradhan seats book kijiye aur apna commission confirm karein.
            </p>
          </div>
          {!user && (
            <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '16px 24px', borderRadius: '16px', border: '1px solid rgba(245, 158, 11, 0.25)', maxWidth: '340px' }}>
              <p style={{ margin: '0 0 12px', color: 'var(--navy)', fontWeight: '600', fontSize: '0.95rem' }}>
                Seat book karne ke liye affiliate account login karein.
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link href="/join" className="btn s" style={{ flex: 1, justifyContent: 'center' }}>Affiliate Banein</Link>
                <Link href="/login" className="btn s o" style={{ flex: 1, justifyContent: 'center' }}>Login</Link>
              </div>
            </div>
          )}
        </div>

        {/* Success Notice Toast */}
        {successNotice && (
          <div className="fade-in" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderLeft: '6px solid #10b981', borderRadius: '16px', padding: '18px 24px', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#10b981', color: '#fff', borderRadius: '50%', padding: '6px', display: 'flex' }}>
                <Check size={20} />
              </div>
              <div>
                <strong style={{ color: '#065f46', fontSize: '1.05rem', display: 'block' }}>Seat Booking Confirmed!</strong>
                <span style={{ color: '#047857', fontSize: '0.92rem' }}>
                  <b>{successNotice.seat}</b> kamiyabi se book ho gayi hai. {successNotice.paid ? 'Payment ho chuki hai.' : '24 ghante mein payment complete karein.'}
                </span>
              </div>
            </div>
            <Link href="/dashboard" className="btn s" style={{ background: '#10b981', color: '#fff', border: 'none', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              Dashboard Dekhein <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="tabs fade-in delay-1" style={{ background: '#fff', padding: '8px 12px', borderRadius: '16px', border: '1px solid var(--line)', gap: '8px', marginBottom: '32px', display: 'flex', overflowX: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          {['All', 'MLA', 'Zila Panchayat', 'Pradhan'].map((t) => (
            <button 
              key={t} 
              className={'btn s ' + (flt === t ? '' : 'o')} 
              style={{ 
                flex: '1 0 auto', 
                minWidth: '100px', 
                padding: '10px 20px', 
                fontSize: '0.95rem', 
                border: 'none', 
                borderRadius: '10px', 
                background: flt === t ? 'var(--blue)' : 'transparent', 
                color: flt === t ? '#fff' : 'var(--muted)', 
                fontWeight: flt === t ? '700' : '600', 
                transition: 'all 0.2s', 
                cursor: 'pointer' 
              }} 
              onClick={() => setFlt(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Seats Grid */}
        <div className="grid fade-in delay-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '20px' }}>
          {seats.filter((s) => flt === 'All' || s.t === flt).map((s) => {
            const isMe = s.by === 'me';
            const isBookedByOther = s.by && !isMe;
            const topColor = s.by 
              ? (isMe ? (s.paid ? '#10b981' : '#ef4444') : 'var(--line)')
              : (s.t === 'Zila Panchayat' ? '#10b981' : s.t === 'MLA' ? 'var(--blue)' : 'var(--gold)');

            return (
              <div 
                className="card" 
                key={s.id} 
                style={{ 
                  position: 'relative', 
                  borderTop: `4px solid ${topColor}`, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between', 
                  padding: '28px', 
                  background: isBookedByOther ? 'var(--pale)' : '#fff', 
                  opacity: isBookedByOther ? 0.75 : 1,
                  borderRadius: '20px',
                  boxShadow: isBookedByOther ? 'none' : '0 6px 18px rgba(0,0,0,0.04)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div>
                      <h3 style={{ margin: '0 0 8px', fontSize: '1.35rem', display: 'flex', alignItems: 'center', gap: '10px', color: isBookedByOther ? 'var(--muted)' : 'var(--navy)' }}>
                        {s.t === 'MLA' ? (
                          <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '10px', color: 'var(--blue)', display: 'flex' }}>
                            <Building size={18} />
                          </div>
                        ) : s.t === 'Zila Panchayat' ? (
                          <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.12)', borderRadius: '10px', color: '#10b981', display: 'flex' }}>
                            <Layers size={18} />
                          </div>
                        ) : (
                          <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.12)', borderRadius: '10px', color: 'var(--gold)', display: 'flex' }}>
                            <Home size={18} />
                          </div>
                        )}
                        <span>{s.t}</span>
                      </h3>
                      <div style={{ color: 'var(--muted)', fontSize: '0.98rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                        <MapPin size={15} style={{ color: 'var(--gold)' }} /> {s.a}
                      </div>
                    </div>
                    {tag(s)}
                  </div>

                  <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: '0 0 20px', lineHeight: '1.5' }}>
                    {s.t === 'MLA' 
                      ? `Assembly territory election software license for ${s.a}.`
                      : s.t === 'Zila Panchayat'
                      ? `District council & ward analytics operations rights for ${s.a}.`
                      : `Gram Panchayat ground voter module rights for ${s.a}.`}
                  </p>
                </div>

                {/* Card Actions */}
                <div>
                  {!s.by && (
                    user ? (
                      <button 
                        className="btn s" 
                        onClick={() => { setSel(s.id); setExpectedOtp(''); }} 
                        style={{ 
                          width: '100%', 
                          fontSize: '1rem', 
                          padding: '14px', 
                          borderRadius: '12px', 
                          background: s.t === 'Zila Panchayat' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)', 
                          color: s.t === 'Zila Panchayat' ? '#10b981' : 'var(--blue)', 
                          border: s.t === 'Zila Panchayat' ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(59, 130, 246, 0.25)', 
                          boxShadow: 'none',
                          fontWeight: '700'
                        }}
                      >
                        <BookMarked size={16} className="nav-icon" /> Book Kijiye
                      </button>
                    ) : (
                      <Link 
                        href="/login" 
                        className="btn s o" 
                        style={{ 
                          width: '100%', 
                          fontSize: '0.95rem', 
                          padding: '12px', 
                          borderRadius: '12px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: '8px', 
                          textDecoration: 'none' 
                        }}
                      >
                        <Lock size={15} /> Login to Book
                      </Link>
                    )
                  )}

                  {isMe && (
                    !s.paid ? (
                      <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                        <button 
                          onClick={() => handleQuickPay(s.id)} 
                          className="btn s" 
                          style={{ 
                            flex: 1, 
                            background: '#ef4444', 
                            color: '#fff', 
                            border: 'none', 
                            fontSize: '0.92rem', 
                            padding: '12px', 
                            borderRadius: '10px' 
                          }}
                        >
                          <CreditCard size={15} /> Pay ({R(PRICE)})
                        </button>
                        <Link 
                          href="/dashboard" 
                          className="btn s o" 
                          style={{ 
                            padding: '12px 16px', 
                            borderRadius: '10px', 
                            fontSize: '0.92rem' 
                          }}
                        >
                          Dashboard
                        </Link>
                      </div>
                    ) : (
                      <Link 
                        href="/dashboard" 
                        className="btn s" 
                        style={{ 
                          width: '100%', 
                          background: 'rgba(16, 185, 129, 0.12)', 
                          color: '#059669', 
                          border: '1px solid rgba(16, 185, 129, 0.25)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: '8px',
                          textDecoration: 'none',
                          fontWeight: '700'
                        }}
                      >
                        <CheckCircle size={16} /> View in Dashboard
                      </Link>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Booking Modal */}
        {seat && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.85)', zIndex: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backdropFilter: 'blur(8px)' }} className="fade-in">
            <div className="card" style={{ width: '100%', maxWidth: 520, padding: 'clamp(22px, 5vw, 36px)', position: 'relative', borderTop: seat.t === 'Zila Panchayat' ? '5px solid #10b981' : seat.t === 'MLA' ? '5px solid var(--blue)' : '5px solid var(--gold)', maxHeight: '90vh', overflowY: 'auto', background: '#fff', borderRadius: '24px', boxShadow: '0 24px 48px rgba(0,0,0,0.2)' }}>
              <button onClick={() => { setSel(null); setExpectedOtp(''); }} style={{ position: 'absolute', top: 18, right: 18, background: 'rgba(15, 23, 42, 0.05)', border: 'none', cursor: 'pointer', color: 'var(--muted)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} aria-label="Close modal"><X size={20} /></button>
              
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                 <div style={{ 
                   display: 'inline-flex', 
                   padding: '16px', 
                   background: seat.t === 'Zila Panchayat' ? 'rgba(16, 185, 129, 0.12)' : seat.t === 'MLA' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(245, 158, 11, 0.12)', 
                   borderRadius: '50%', 
                   color: seat.t === 'Zila Panchayat' ? '#10b981' : seat.t === 'MLA' ? 'var(--blue)' : 'var(--gold)', 
                   marginBottom: '14px' 
                 }}>
                   {seat.t === 'MLA' ? <Building size={32} /> : seat.t === 'Zila Panchayat' ? <Layers size={32} /> : <Home size={32} />}
                 </div>
                 <h3 style={{ margin: '0 0 8px', fontSize: '1.6rem', color: 'var(--navy)', letterSpacing: '-0.5px' }}>
                   Book {seat.t} Seat
                 </h3>
                 <p style={{ color: 'var(--muted)', margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                   <MapPin size={16} style={{ color: 'var(--gold)' }} /> {seat.a}
                 </p>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', marginBottom: '8px', color: 'var(--navy)', fontSize: '0.95rem' }}>
                  <User size={16} style={{ color: 'var(--blue)' }} /> Candidate ka naam
                </label>
                <input 
                  placeholder="Jaise: Ramesh Singh" 
                  value={f.candidate} 
                  onChange={(e) => setF({ ...f, candidate: e.target.value })} 
                  style={inputStyle} 
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', marginBottom: '8px', color: 'var(--navy)', fontSize: '0.95rem' }}>
                  <Phone size={16} style={{ color: 'var(--blue)' }} /> Candidate ka mobile
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'stretch', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden', background: '#f8fafc' }}>
                    <div style={{ padding: '0 14px', background: 'var(--pale)', color: 'var(--navy)', fontWeight: '800', borderRight: '1px solid var(--line)', display: 'flex', alignItems: 'center', fontSize: '0.95rem' }}>+91</div>
                    <input 
                      type="tel" 
                      inputMode="numeric" 
                      maxLength={10} 
                      placeholder="9876543210" 
                      value={f.mobile} 
                      onChange={(e) => setF({ ...f, mobile: e.target.value })} 
                      style={{ border: 'none', borderRadius: 0, flex: 1, margin: 0, outline: 'none', padding: '14px', fontSize: '1rem', background: 'transparent' }} 
                    />
                  </div>
                  <button 
                    className="btn o" 
                    type="button"
                    style={{ flex: '0 0 auto', whiteSpace: 'nowrap', padding: '0 20px', minHeight: '48px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--blue)', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }} 
                    onClick={sendOtp}
                  >
                    Get OTP
                  </button>
                </div>
                {expectedOtp && (
                  <div style={{ marginTop: '10px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '8px 14px', borderRadius: '10px', color: 'var(--blue)', fontSize: '0.88rem', fontWeight: '600', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <span>Candidate Demo OTP: <strong style={{ letterSpacing: '3px', fontSize: '1.05rem' }}>{expectedOtp}</strong></span>
                    <button type="button" onClick={() => setF({ ...f, otp: expectedOtp })} style={{ background: 'var(--blue)', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '700' }}>Auto-fill</button>
                  </div>
                )}
              </div>
              
              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', marginBottom: '8px', color: 'var(--navy)', fontSize: '0.95rem' }}>
                  <ShieldCheck size={16} style={{ color: '#10b981' }} /> Candidate OTP Verify Karein
                </label>
                <input 
                  maxLength={4} 
                  inputMode="numeric" 
                  placeholder="••••" 
                  style={{ letterSpacing: 'clamp(8px, 3vw, 16px)', textAlign: 'center', fontSize: 'clamp(1.5rem, 5vw, 2rem)', padding: '16px', borderRadius: '16px', background: '#f8fafc', fontWeight: '900', color: 'var(--navy)', border: '2px solid var(--line)', outline: 'none', width: '100%' }} 
                  value={f.otp} 
                  onChange={(e) => setF({ ...f, otp: e.target.value })} 
                />
              </div>
              
              <div
                role="checkbox"
                aria-checked={f.paid}
                tabIndex={0}
                onClick={() => setF(prev => ({ ...prev, paid: !prev.paid }))}
                onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setF(prev => ({ ...prev, paid: !prev.paid })); } }}
                className="opt"
                style={{
                  marginBottom: '32px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: f.paid ? 'rgba(59, 130, 246, 0.05)' : '#fff',
                  border: f.paid ? '2px solid var(--blue)' : '2px solid var(--line)',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  userSelect: 'none'
                }}
              >
                <div style={{ width: '24px', height: '24px', borderRadius: '8px', border: f.paid ? 'none' : '2px solid var(--muted)', background: f.paid ? 'var(--blue)' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {f.paid && <CheckCircle size={16} color="#fff" />}
                </div>
                <div>
                  <b style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', color: f.paid ? 'var(--blue)' : 'var(--navy)', marginBottom: '4px' }}>
                    <CreditCard size={18} /> Abhi payment karein ({R(PRICE)})
                  </b>
                  <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Unpaid booking 24 ghante mein cancel ho sakti hai.</span>
                </div>
              </div>
              
              <button 
                className="btn" 
                onClick={submit} 
                disabled={submitting}
                style={{ 
                  width: '100%', 
                  padding: '18px', 
                  fontSize: '1.1rem', 
                  borderRadius: '12px', 
                  background: seat.t === 'Zila Panchayat' ? '#10b981' : 'var(--blue)', 
                  boxShadow: seat.t === 'Zila Panchayat' ? '0 8px 16px rgba(16, 185, 129, 0.25)' : '0 8px 16px rgba(59, 130, 246, 0.25)',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.8 : 1
                }}
              >
                <BookMarked size={18} className="nav-icon" style={{ marginRight: '8px' }} /> 
                {submitting ? 'Booking confirm ho rahi hai...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
