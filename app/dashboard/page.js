'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/components/AppProvider';
import { PRICE, R } from '@/lib/constants';
import {
  LayoutDashboard, Map as MapIcon, BookOpen, ClipboardList, HelpCircle,
  Settings as SettingsIcon, TrendingUp, MapPin, AlertCircle,
  Lock, Check, CheckCircle, LogOut, Ticket, Award, IndianRupee, ShieldCheck,
  Building, Home, User, Layers
} from 'lucide-react';

const TABS = ['Dashboard', 'Territory', 'Learnings', 'Bookings', 'Help', 'Settings'];
const TAB_ICONS = {
  Dashboard: LayoutDashboard,
  Territory: MapIcon,
  Learnings: BookOpen,
  Bookings: ClipboardList,
  Help: HelpCircle,
  Settings: SettingsIcon,
};
const COURSE = [
  { title: 'Poll Craft ka parichay',          desc: 'Platform ka overview aur affiliate program kaise kaam karta hai.' },
  { title: 'Pradhan se kaise milein',   desc: 'Ground outreach tips — pehli meeting ke liye kya bolein.' },
  { title: 'Demo kaise dikhayein',      desc: 'Live demo ka step-by-step walkthrough jo leads convert kare.' },
  { title: 'OTP aur booking process',   desc: 'Candidate OTP verify karein aur seat book karein — end to end.' },
  { title: 'Commission aur payout',     desc: 'Commission kab credit hoti hai aur payout kaise release hota hai.' },
];

export default function Dashboard() {
  const { user, seats, mine, earned, learn, setLearn, tix, setTix, pay, logout, ready } = useApp();
  const [tab, setTab] = useState('Dashboard');
  const [msg, setMsg] = useState('');
  const router = useRouter();

  if (!ready) return null;
  if (!user) return (
    <section className="sec" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="w" style={{ maxWidth: 480, width: '100%' }}>
        <div className="card fade-in" style={{ textAlign: 'center', padding: '48px 32px' }}>
          <div style={{ display: 'inline-flex', padding: '20px', background: 'rgba(15, 23, 42, 0.05)', borderRadius: '50%', color: 'var(--muted)', marginBottom: '24px' }}>
            <Lock size={40} />
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--navy)', marginBottom: '12px' }}>Dashboard abhi locked hai</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Affiliate account se login karein tabhi dashboard khulega.</p>
          <Link className="btn" href="/join" style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}>Affiliate banein</Link>
          <div style={{ marginTop: '20px' }}>
            <Link href="/login" style={{ color: 'var(--blue)', fontWeight: '600' }}>Pehle se account hai? Login karein</Link>
          </div>
        </div>
      </div>
    </section>
  );

  const unp  = mine.some((s) => !s.paid);
  const done  = COURSE.filter((_, i) => !!learn[i]).length;
  
  const now = new Date();
  const today = now.getDay();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - today);
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfWeekMs = startOfWeek.getTime();
  
  const wk    = [0, 0, 0, 0, 0, 0, 0];
  mine.forEach((s) => { 
    if (s.day != null && (!s.bookedAt || s.bookedAt >= startOfWeekMs)) {
      wk[s.day]++; 
    }
  });
  
  const mx    = Math.max(...wk, 1);
  const totalWkBookings = wk.reduce((a, b) => a + b, 0);

  const inputStyle = { padding: '16px', borderRadius: '12px', border: '1px solid var(--line)', background: '#f8fafc', fontSize: '1.05rem', width: '100%', outline: 'none', transition: 'all 0.2s ease', color: 'var(--navy)', fontFamily: 'inherit' };

  return (
    <section className="sec" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="w">
        
        {/* Profile Banner */}
        <div className="card fade-in" style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--deep) 100%)', color: '#fff', border: 'none', position: 'relative', overflow: 'hidden', padding: 'clamp(20px, 4vw, 32px)', display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'center', borderRadius: '24px', boxShadow: '0 16px 32px rgba(15, 23, 42, 0.15)' }}>
          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '640px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
              <h2 style={{ margin: 0, color: '#fff', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', letterSpacing: '-0.5px' }}>Hello, {user.n} 👋</h2>
              <span className="tag ok" style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '6px 12px', fontSize: '0.8rem' }}><Check size={14} className="nav-icon" /> Active</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={15} style={{ color: 'var(--gold)' }} />
                <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>Code: <strong style={{ color: '#fff', letterSpacing: '0.5px' }}>{user.code}</strong></span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={15} style={{ color: 'var(--gold)' }} />
                <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>Plan: <strong style={{ color: '#fff' }}>{user?.plan?.n || 'Affiliate Plan'} ({user?.r || 40}%)</strong></span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={15} style={{ color: 'var(--gold)' }} />
                <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>Zone: <strong style={{ color: '#fff' }}>{user.md === 'Single' ? user.ar : 'Freehand'}</strong></span>
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', right: '-10%', top: '-30%', opacity: 0.05, transform: 'rotate(-10deg)', pointerEvents: 'none' }}>
            <LayoutDashboard size={240} />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="tabs fade-in delay-1" style={{ background: '#fff', padding: '8px 10px', borderRadius: '16px', border: '1px solid var(--line)', gap: '8px', margin: '24px 0', display: 'flex', overflowX: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          {TABS.map((x) => { 
            const I = TAB_ICONS[x]; 
            return (
              <button key={x} onClick={() => setTab(x)} style={{ flex: '0 0 auto', padding: '10px 16px', fontSize: '0.9rem', border: 'none', borderRadius: '10px', background: tab === x ? 'var(--blue)' : 'transparent', color: tab === x ? '#fff' : 'var(--muted)', fontWeight: tab === x ? '700' : '600', transition: 'all 0.2s ease', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <I size={16} style={{ opacity: tab === x ? 1 : 0.7 }} /> {x}
              </button>
            ); 
          })}
        </div>

        <div className="fade-in delay-2">
          {tab === 'Dashboard' && <>
            <div className="grid">
              <div className="card" style={{ padding: '32px', borderTop: '4px solid var(--gold)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <small style={{ color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.8rem' }}>Total Revenue</small>
                  <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--navy)', marginTop: '8px', fontFamily: 'Outfit', letterSpacing: '-1px' }}>{R(earned)}</div>
                </div>
                <div style={{ padding: '16px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '16px', color: 'var(--gold)' }}><IndianRupee size={28} /></div>
              </div>
              <div className="card" style={{ padding: '32px', borderTop: '4px solid var(--blue)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <small style={{ color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.8rem' }}>Booked Seats</small>
                  <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--blue)', marginTop: '8px', fontFamily: 'Outfit', letterSpacing: '-1px' }}>{mine.length}</div>
                </div>
                <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', color: 'var(--blue)' }}><MapPin size={28} /></div>
              </div>
              <div className="card" style={{ padding: '32px', borderTop: '4px solid #e11d48', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <small style={{ color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.8rem' }}>Unpaid Seats</small>
                  <div style={{ fontSize: '2.5rem', fontWeight: '900', color: mine.filter((s) => !s.paid).length > 0 ? '#e11d48' : 'var(--navy)', marginTop: '8px', fontFamily: 'Outfit', letterSpacing: '-1px' }}>{mine.filter((s) => !s.paid).length}</div>
                </div>
                <div style={{ padding: '16px', background: '#ffe4e6', borderRadius: '16px', color: '#e11d48' }}><AlertCircle size={28} /></div>
              </div>
            </div>

            <div className="card" style={{ marginTop: '32px', padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: 0, fontSize: '1.4rem', color: 'var(--navy)' }}>
                  <TrendingUp size={24} style={{ color: 'var(--blue)' }} /> Hafte ke Bookings
                </h3>
                <span className="tag" style={{ background: 'var(--pale)', color: 'var(--muted)' }}>
                  {totalWkBookings > 0 ? `${totalWkBookings} is hafte` : 'No bookings'}
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'clamp(4px, 1.8vw, 12px)', height: '180px', borderBottom: '2px solid var(--line)', paddingBottom: '12px', opacity: totalWkBookings === 0 ? 0.3 : 1 }}>
                  {wk.map((v, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '800', color: v > 0 ? 'var(--navy)' : 'transparent', marginBottom: '8px' }}>{v}</span>
                      <div style={{
                        width: '100%', maxWidth: '44px',
                        background: i === today ? 'var(--gold)' : (v > 0 ? 'var(--blue)' : 'var(--pale)'),
                        height: `${Math.max((v / mx) * 100, 5)}%`,
                        borderRadius: '6px 6px 0 0',
                        transition: 'height 0.8s cubic-bezier(0.4,0,0.2,1)',
                        opacity: i === today ? 1 : 0.85,
                        boxShadow: i === today ? '0 -4px 12px rgba(245, 158, 11, 0.3)' : 'none'
                      }} />
                    </div>
                  ))}
                </div>
                
                {totalWkBookings === 0 && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                    <div style={{ background: '#fff', padding: '20px 24px', borderRadius: '20px', boxShadow: '0 12px 32px rgba(0,0,0,0.1)', border: '1px solid var(--line)', textAlign: 'center' }}>
                      <TrendingUp size={28} style={{ color: 'var(--muted)', display: 'block', margin: '0 auto 10px' }} />
                      <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--muted)', fontWeight: '600' }}>Is hafte koi booking nahi.<br /><Link href="/seats" style={{ color: 'var(--blue)', fontWeight: '800', display: 'inline-block', marginTop: '6px' }}>Seat book karein →</Link></p>
                    </div>
                  </div>
                )}
                
                <div style={{ display: 'flex', gap: 'clamp(4px, 1.8vw, 12px)', marginTop: '14px', fontSize: 'clamp(0.7rem, 2vw, 0.85rem)', fontWeight: '700', textTransform: 'uppercase' }}>
                  {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d, i) => (
                    <span key={i} style={{ flex: 1, textAlign: 'center', color: i === today ? 'var(--gold)' : wk[i] > 0 ? 'var(--navy)' : 'var(--muted)', fontWeight: i === today ? '900' : '600' }}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>}

          {tab === 'Territory' && <>
            <div className="card" style={{ padding: '32px', marginBottom: '32px', background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ padding: '16px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '16px', color: 'var(--gold)' }}>
                  <MapPin size={32} />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px', fontSize: '1.4rem', color: 'var(--navy)' }}>Working Zone</h3>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '1rem' }}>
                    Aapka current mode: <strong style={{ color: 'var(--navy)' }}>{user.md}</strong>
                  </p>
                </div>
              </div>
              <div style={{ padding: '20px', background: '#fff', border: '1px solid var(--line)', borderRadius: '16px' }}>
                {user.md === 'Single' ? (
                  <p style={{ margin: 0, color: 'var(--navy)', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Lock size={18} style={{ color: 'var(--gold)' }} /> <strong>{user.ar}</strong> territory specifically aapke liye lock kar di gayi hai. Yahan koi aur affiliate kaam nahi karega.
                  </p>
                ) : (
                  <p style={{ margin: 0, color: 'var(--navy)', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapIcon size={18} style={{ color: 'var(--blue)' }} /> Aap Freehand mode mein hain. Aap kisi bhi city ya zone mein kaam kar sakte hain.
                  </p>
                )}
              </div>
            </div>

            <h3 style={{ margin: '0 0 20px', fontSize: '1.4rem', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={20} style={{ color: 'var(--blue)' }} /> Seat Locations</h3>
            {(() => {
              const territoryCity = user?.ar ? user.ar.split(',')[0].trim().toLowerCase() : '';
              const filteredSeats = seats.filter((s) => {
                if (user?.md !== 'Single') return true;
                if (!s.a) return false;
                const seatCity = s.a.toLowerCase().trim();
                return seatCity === territoryCity || 
                       (user?.ar && user.ar.toLowerCase().includes(seatCity)) || 
                       seatCity.includes(territoryCity);
              });

              if (filteredSeats.length === 0) {
                return (
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px dashed var(--line)', padding: '36px 24px', textAlign: 'center' }}>
                    <MapPin size={40} style={{ color: 'var(--muted)', opacity: 0.4, margin: '0 auto 12px', display: 'block' }} />
                    <h4 style={{ margin: '0 0 8px', color: 'var(--navy)', fontSize: '1.15rem' }}>
                      {user?.ar || 'Aapki Territory'} mein koi pre-configured seat nahi hai.
                    </h4>
                    <p style={{ margin: '0 0 20px', color: 'var(--muted)', fontSize: '0.95rem' }}>
                      Aap general territory list se kisi bhi available seat ko book kar sakte hain.
                    </p>
                    <Link href="/seats" className="btn s" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      Sabhi Available Seats Dekhein →
                    </Link>
                  </div>
                );
              }

              return (
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
                  {filteredSeats.map((s) => (
                    <div key={s.id} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                      <div style={{ padding: '12px', background: 'var(--pale)', borderRadius: '12px', color: 'var(--muted)' }}>
                        {s.t === 'MLA' ? <Building size={20} /> : s.t === 'Zila Panchayat' ? <Layers size={20} style={{ color: '#10b981' }} /> : <Home size={20} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px', fontSize: '1.1rem', color: 'var(--navy)' }}>{s.a}</h4>
                        <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: '600', textTransform: 'uppercase' }}>{s.t} Seat</span>
                      </div>
                      <div>
                        {s.by ? (
                          s.by === 'me' ? (
                            <span className="tag ok" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a' }}>Aapki</span>
                          ) : (
                            <span className="tag gr"><Lock size={12} className="nav-icon"/> Booked</span>
                          )
                        ) : (
                          <Link href="/seats" className="tag ok" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--blue)', textDecoration: 'none' }}>
                            Available →
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </>}

          {tab === 'Learnings' && <div className="card" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
              <div>
                <h3 style={{ margin: '0 0 8px', fontSize: '1.6rem', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <BookOpen size={24} style={{ color: 'var(--blue)' }} /> DRM Training Course
                </h3>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '1.05rem' }}>
                  {done === COURSE.length ? '🎉 Badhai ho! Aapne pura course complete kar liya.' : `${COURSE.length - done} module baaki hain. Inhe complete karke platform ka pura fayda uthayein.`}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: '900', color: done === COURSE.length ? '#10b981' : 'var(--navy)', fontFamily: 'Outfit' }}>
                  {done}<span style={{ color: 'var(--muted)', fontSize: '1.2rem' }}>/{COURSE.length}</span>
                </span>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Completed</div>
              </div>
            </div>
            
            <div style={{ height: '8px', background: 'var(--line)', borderRadius: '4px', overflow: 'hidden', marginBottom: '40px' }}>
              <div style={{ width: `${(done / COURSE.length) * 100}%`, height: '100%', background: 'var(--gold)', borderRadius: '4px', transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {COURSE.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '24px', background: learn[i] ? 'rgba(34, 197, 94, 0.05)' : '#fff', border: `2px solid ${learn[i] ? '#10b981' : 'var(--line)'}`, borderRadius: '16px', transition: 'all 0.3s ease', cursor: 'pointer' }} onClick={() => setLearn({ ...learn, [i]: !learn[i] })}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0, background: learn[i] ? '#10b981' : 'var(--bg)', border: learn[i] ? 'none' : '2px solid var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.3s ease' }}>
                    {learn[i] && <Check size={18} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '800', fontSize: '1.1rem', color: learn[i] ? '#065f46' : 'var(--navy)', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--muted)', marginRight: '8px' }}>Module {i + 1}:</span> {c.title}
                    </div>
                    <div style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: '1.6' }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>}

          {tab === 'Bookings' && <div className="card" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h3 style={{ margin: 0, fontSize: '1.6rem', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ClipboardList size={24} style={{ color: 'var(--blue)' }} /> Aapki Bookings
              </h3>
              <span className="tag" style={{ background: 'var(--pale)', color: 'var(--muted)' }}>
                Total: {mine.length} seats
              </span>
            </div>
            
            {unp && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '24px', background: '#fff1f2', border: '1px solid #fecdd3', borderLeft: '6px solid #e11d48', borderRadius: '16px', marginBottom: '32px' }}>
                <AlertCircle size={28} style={{ color: '#e11d48', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#be123c', display: 'block', marginBottom: '6px', fontSize: '1.1rem' }}>Payout Locked!</strong>
                  <span style={{ color: '#881337', fontSize: '0.95rem', lineHeight: '1.5' }}>Aapki kuch bookings <b>Unpaid</b> hain. Jab tak sabhi seats paid nahi hoti, aapka final payout block rahega. Niche list check karein aur pending payment puri karein.</span>
                </div>
              </div>
            )}
            
            {mine.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '64px 20px', background: '#f8fafc', borderRadius: '24px', border: '2px dashed var(--line)' }}>
                <ClipboardList size={48} style={{ color: 'var(--muted)', opacity: 0.3, marginBottom: '16px' }} />
                <p style={{ color: 'var(--muted)', fontWeight: '600', fontSize: '1.1rem', marginBottom: '24px' }}>Abhi tak aapne koi seat book nahi ki hai.</p>
                <Link href="/seats" className="btn" style={{ padding: '16px 32px' }}>Seat book karein →</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {mine.map((s, i) => (
                  <div key={s.id} style={{ background: s.paid ? '#fff' : '#fff1f2', border: `1px solid ${s.paid ? 'var(--line)' : '#fecdd3'}`, borderRadius: '16px', padding: '24px', display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'space-between', alignItems: 'center', boxShadow: s.paid ? '0 4px 12px rgba(0,0,0,0.02)' : '0 8px 24px rgba(225, 29, 72, 0.1)' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {s.t === 'MLA' ? <Building size={14} /> : s.t === 'Zila Panchayat' ? <Layers size={14} style={{ color: '#10b981' }} /> : <Home size={14} />} {s.t} Seat · {s.a}
                      </div>
                      <div style={{ fontWeight: '900', fontSize: '1.3rem', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <User size={18} style={{ color: 'var(--muted)' }} /> {s.cand}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: '800', marginBottom: '4px' }}>Commission</div>
                        {unp ? (
                          <span style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '800', fontSize: '1.1rem' }}>
                            <Lock size={16} /> Locked
                          </span>
                        ) : (
                          <span style={{ color: '#10b981', fontWeight: '900', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {R(PRICE * user.r / 100)}
                          </span>
                        )}
                      </div>
                      
                      <div style={{ width: '1px', height: '40px', background: 'var(--line)' }}></div>
                      
                      {s.paid ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '10px 16px', borderRadius: '30px', fontSize: '0.95rem', fontWeight: '800' }}>
                          <CheckCircle size={18} /> Paid
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e11d48', background: '#ffe4e6', padding: '10px 16px', borderRadius: '30px', fontSize: '0.95rem', fontWeight: '800' }}>
                            <AlertCircle size={18} /> Unpaid
                          </div>
                          <button className="btn" style={{ background: '#e11d48', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', boxShadow: '0 8px 16px rgba(225, 29, 72, 0.3)' }} onClick={() => pay(s.id)}>
                            Pay Now
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>}

          {tab === 'Help' && <div className="card" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'inline-flex', padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', color: 'var(--blue)', marginBottom: '16px' }}>
                <HelpCircle size={32} />
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: '1.6rem', color: 'var(--navy)' }}>Help & Support</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '1.05rem' }}>Agar aapko koi technical dikkat aa rahi hai toh ticket open karein.</p>
            </div>
            
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', color: 'var(--navy)' }}>Aapki problem describe karein</label>
              <textarea rows={4} placeholder="Type your issue here..." value={msg} onChange={(e) => setMsg(e.target.value)} style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }} />
            </div>
            <button className="btn" onClick={() => { if (msg.trim()) { setTix([...tix, msg.trim()]); setMsg(''); } }} style={{ width: '100%', padding: '16px', fontSize: '1.1rem', borderRadius: '12px', background: 'var(--navy)', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.2)' }}>
              <Ticket size={18} className="nav-icon" style={{ color: 'var(--gold)' }} /> Ticket Bhejiye
            </button>
            
            {tix.length > 0 && (
              <div style={{ marginTop: '48px' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><ClipboardList size={18} /> Aapki Tickets</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {tix.map((x, i) => (
                    <div key={i} style={{ padding: '20px', background: '#f8fafc', border: '1px solid var(--line)', borderRadius: '16px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <span className="tag" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>Open</span>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: '700', marginBottom: '4px' }}>Ticket #{1001 + i}</div>
                        <div style={{ color: 'var(--navy)', fontSize: '1rem', lineHeight: '1.5' }}>{x}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>}

          {tab === 'Settings' && <div className="card" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '1.3rem', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '10px' }}><IndianRupee size={20} style={{ color: 'var(--gold)' }} /> Payout Status</h3>
              <div style={{ padding: '24px', background: unp || !mine.length ? '#fff1f2' : '#f0fdf4', border: `1px solid ${unp || !mine.length ? '#fecdd3' : '#bbf7d0'}`, borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                {unp || !mine.length ? (
                  <>
                    <Lock size={24} style={{ color: '#e11d48' }} />
                    <span style={{ color: '#be123c', fontSize: '1.05rem', fontWeight: '500' }}>Payout abhi <b>locked</b> hai. Sabhi seats Paid hone par unlock hoga.</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={24} style={{ color: '#16a34a' }} />
                    <span style={{ color: '#14532d', fontSize: '1.05rem', fontWeight: '500' }}>Payout <b>unlocked</b>. Aapka total payout {R(earned)} clear hai.</span>
                  </>
                )}
              </div>
            </div>
            
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '1.3rem', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '10px' }}><MapPin size={20} style={{ color: 'var(--blue)' }} /> Territory Lock</h3>
              <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid var(--line)', borderRadius: '16px' }}>
                {user.md === 'Single' ? (
                  <span style={{ color: 'var(--navy)', fontSize: '1.05rem' }}>Aapke paas <b>{user.ar}</b> ki exclusive territory lock hai.</span>
                ) : (
                  <span style={{ color: 'var(--navy)', fontSize: '1.05rem' }}>Aap <b>Freehand</b> mode mein hain, isliye koi territory lock nahi hai.</span>
                )}
              </div>
            </div>
            
            <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '40px 0' }} />
            
            <div>
              <h3 style={{ margin: '0 0 16px', fontSize: '1.3rem', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '10px' }}><User size={20} style={{ color: 'var(--muted)' }} /> Account</h3>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '24px' }}>Aapka account logout karne par aap safe tareeqe se home page par aa jaayenge.</p>
              <button className="btn o" style={{ color: '#e11d48', borderColor: '#fecdd3', padding: '14px 24px', borderRadius: '12px' }} onClick={() => { logout(); router.push('/'); }}>
                <LogOut size={18} className="nav-icon" /> Logout karein
              </button>
            </div>
          </div>}
        </div>
      </div>
    </section>
  );
}
