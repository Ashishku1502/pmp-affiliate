import { getAdminDb } from '@/lib/firebase-admin';
import Link from 'next/link';
import { 
  Users, Map as MapIcon, ShieldCheck, 
  ArrowLeft, CheckCircle, AlertCircle, TrendingUp, IndianRupee, Unlock, RefreshCw 
} from 'lucide-react';
import { PRICE } from '@/lib/constants';
import { toggleSeatPaid, toggleKyc, releaseSeat } from './actions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboard() {
  let affiliates = [];
  let seats = [];
  let error = null;

  try {
    const db = getAdminDb();
    const [affSnap, seatSnap] = await Promise.all([
      db.collection('affiliates').get(),
      db.collection('seats').orderBy('id').get()
    ]);

    affiliates = affSnap.docs.map(d => d.data());
    seats = seatSnap.docs.map(d => d.data());
  } catch (err) {
    error = err.message;
  }

  const bookedSeats = seats.filter(s => s.by);
  const paidSeats = seats.filter(s => s.paid);
  const unpaidSeats = bookedSeats.filter(s => !s.paid);

  return (
    <section className="sec" style={{ padding: '60px 0', minHeight: '100vh', background: 'var(--bg)' }}>
      <div className="w" style={{ maxWidth: '1200px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', gap: '20px' }} className="fade-in">
          <div>
            <span className="tag" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--blue)', marginBottom: '12px' }}>
              <ShieldCheck size={14} className="nav-icon" /> Administrator
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', margin: 0, letterSpacing: '-1px' }}>
              Admin <span style={{ color: 'var(--gold)' }}>Dashboard</span>
            </h1>
          </div>
          <Link href="/" className="btn g" style={{ background: 'var(--card)', color: 'var(--h)', border: '1px solid var(--line)', padding: '12px 24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <ArrowLeft size={18} className="nav-icon" /> Back to Home
          </Link>
        </div>

        {error ? (
          <div className="card fade-in" style={{ borderLeft: '4px solid #ef4444', background: '#fef2f2' }}>
            <div style={{ color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem' }}>
              <AlertCircle size={24} /> <strong>Error loading data:</strong> {error}
            </div>
          </div>
        ) : (
          <>
            {/* KPI Section */}
            <div className="fade-in delay-1" style={{ margin: '0 0 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
              <div className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div><small style={{ color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Affiliates</small><div style={{ fontSize: '2.5rem', fontFamily: 'Outfit', fontWeight: '800', color: 'var(--h)', marginTop: '8px', lineHeight: 1 }}>{affiliates.length}</div></div>
                  <div className="step-icon" style={{ width: '48px', height: '48px', margin: 0, background: 'var(--pale)', color: 'var(--navy)' }}><Users size={24} /></div>
                </div>
              </div>
              
              <div className="card" style={{ padding: '24px', borderTop: '4px solid var(--blue)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div><small style={{ color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Seats Booked</small><div style={{ fontSize: '2.5rem', fontFamily: 'Outfit', fontWeight: '800', color: 'var(--blue)', marginTop: '8px', lineHeight: 1 }}>{bookedSeats.length}<span style={{ fontSize: '1rem', color: 'var(--muted)', fontWeight: '600' }}> / {seats.length}</span></div></div>
                  <div className="step-icon" style={{ width: '48px', height: '48px', margin: 0, background: 'rgba(59, 130, 246, 0.1)', color: 'var(--blue)' }}><MapIcon size={24} /></div>
                </div>
              </div>

              <div className="card" style={{ padding: '24px', borderTop: '4px solid #10b981' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div><small style={{ color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Paid Seats</small><div style={{ fontSize: '2.5rem', fontFamily: 'Outfit', fontWeight: '800', color: '#10b981', marginTop: '8px', lineHeight: 1 }}>{paidSeats.length}</div></div>
                  <div className="step-icon" style={{ width: '48px', height: '48px', margin: 0, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><CheckCircle size={24} /></div>
                </div>
              </div>

              <div className="card" style={{ padding: '24px', borderTop: '4px solid #f59e0b' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div><small style={{ color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Revenue</small><div style={{ fontSize: '2.5rem', fontFamily: 'Outfit', fontWeight: '800', color: '#f59e0b', marginTop: '8px', lineHeight: 1, letterSpacing: '-1px' }}>₹{paidSeats.length * PRICE}</div></div>
                  <div className="step-icon" style={{ width: '48px', height: '48px', margin: 0, background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}><TrendingUp size={24} /></div>
                </div>
              </div>
            </div>

            {/* Affiliates Table */}
            <div className="card fade-in delay-2" style={{ marginBottom: '40px', padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.8rem', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Users size={28} style={{ color: 'var(--gold)' }} /> Registered Affiliates
                </h2>
                <span className="tag" style={{ background: 'var(--pale)', color: 'var(--muted)' }}>{affiliates.length} Total</span>
              </div>
              <div className="sc">
                <table>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Name</th>
                      <th>Mobile</th>
                      <th>Territory / Mode</th>
                      <th>Plan / Comm</th>
                      <th>Aadhaar / PAN</th>
                      <th>KYC Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {affiliates.length === 0 ? (
                      <tr><td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: 'var(--muted)' }}>No affiliates found.</td></tr>
                    ) : (
                      affiliates.map(a => {
                        const bindKyc = toggleKyc.bind(null, a.code, !!a.ka);
                        return (
                          <tr key={a.code}>
                            <td style={{ fontWeight: '700', color: 'var(--navy)' }}>{a.code}</td>
                            <td style={{ fontWeight: '500' }}>{a.n}</td>
                            <td>{a.m}</td>
                            <td>
                              <div>{a.ar}</div>
                              <span className="tag" style={{ marginTop: '4px', background: a.md === 'Freehand' ? 'rgba(245,158,11,0.1)' : 'rgba(59,130,246,0.1)', color: a.md === 'Freehand' ? 'var(--gold)' : 'var(--blue)' }}>{a.md}</span>
                            </td>
                            <td>
                              <div style={{ fontWeight: '600', color: 'var(--h)' }}>{a.plan?.n || '-'}</div>
                              <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{a.r || 0}%</div>
                            </td>
                            <td style={{ fontFamily: 'monospace', fontSize: '0.95rem' }}>{a.k || '-'}</td>
                            <td>{a.ka ? <span className="tag ok"><CheckCircle size={12} className="nav-icon" /> Approved</span> : <span className="tag no"><AlertCircle size={12} className="nav-icon" /> Pending</span>}</td>
                            <td>
                              <form action={bindKyc}>
                                <button type="submit" className="btn s o" style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '8px' }}>
                                  {a.ka ? 'Revoke KYC' : 'Approve KYC'}
                                </button>
                              </form>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Seats Table */}
            <div className="card fade-in delay-3" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.8rem', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MapIcon size={28} style={{ color: 'var(--blue)' }} /> Seat Bookings
                </h2>
                <span className="tag" style={{ background: 'var(--pale)', color: 'var(--muted)' }}>{bookedSeats.length} Booked</span>
              </div>
              <div className="sc">
                <table>
                  <thead>
                    <tr>
                      <th>Type / Area</th>
                      <th>Booked By</th>
                      <th>Candidate</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seats.map(s => {
                      const bindPaid = toggleSeatPaid.bind(null, s.id, !!s.paid);
                      const bindRelease = releaseSeat.bind(null, s.id);
                      return (
                        <tr key={s.id}>
                          <td>
                            <div style={{ fontWeight: '700', color: 'var(--h)' }}>{s.t}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{s.a}</div>
                          </td>
                          <td>
                            {s.by ? <span style={{ fontWeight: '600', color: 'var(--blue)' }}>{s.by}</span> : <span style={{ color: 'var(--muted)', fontStyle: 'italic' }}>Available</span>}
                          </td>
                          <td style={{ fontWeight: '500' }}>{s.cand || '-'}</td>
                          <td style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
                            {s.bookedAt ? new Date(s.bookedAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                          </td>
                          <td>
                            {s.by ? (
                              s.paid 
                                ? <span className="tag ok" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14} /> Paid</span> 
                                : <span className="tag no" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><AlertCircle size={14} /> Unpaid</span>
                            ) : <span style={{ color: 'var(--line)' }}>-</span>}
                          </td>
                          <td>
                            {s.by ? (
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <form action={bindPaid}>
                                  <button type="submit" className="btn s" style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '8px', background: s.paid ? 'var(--pale)' : '#10b981', color: s.paid ? 'var(--muted)' : '#fff', border: 'none' }}>
                                    <RefreshCw size={12} className="nav-icon" /> {s.paid ? 'Mark Unpaid' : 'Mark Paid'}
                                  </button>
                                </form>
                                <form action={bindRelease}>
                                  <button type="submit" className="btn s" style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '8px', background: '#ef4444', color: '#fff', border: 'none' }}>
                                    <Unlock size={12} className="nav-icon" /> Release
                                  </button>
                                </form>
                              </div>
                            ) : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </>
        )}
      </div>
    </section>
  );
}
