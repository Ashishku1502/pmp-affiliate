'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/components/AppProvider';
import { User, LogIn, ArrowRight, ShieldCheck, Zap, AlertCircle } from 'lucide-react';

export default function Login() {
  const { user, login, ready } = useApp();
  const [query, setQuery] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    if (ready && user) {
      router.push('/dashboard');
    }
  }, [ready, user, router]);

  if (!ready) return null;
  if (user) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr('');
    if (!query.trim()) {
      setErr('Kripya apna Affiliate Code ya 10-digit Mobile Number daalein.');
      return;
    }
    try {
      setBusy(true);
      await login(query);
      router.push('/dashboard');
    } catch (e) {
      setErr(e.message || 'Login fail ho gaya. Kripya check karein.');
    } finally {
      setBusy(false);
    }
  };

  const inputStyle = { padding: '16px', borderRadius: '12px', border: '1px solid var(--line)', background: '#f8fafc', fontSize: '1rem', width: '100%', outline: 'none', transition: 'all 0.2s ease', color: 'var(--navy)' };

  return (
    <section className="sec" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', background: 'radial-gradient(circle at top, rgba(59, 130, 246, 0.05), transparent 50%)' }}>
      <div className="w" style={{ maxWidth: 480, width: '100%' }}>
        
        <div className="fade-in" style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', color: 'var(--blue)', marginBottom: '20px' }}>
            <Zap size={24} />
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: '900', margin: '0 0 8px', color: 'var(--h)', letterSpacing: '-1px' }}>Welcome Back</h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', margin: 0 }}>Apne affiliate dashboard mein login karein.</p>
        </div>

        <div className="card fade-in delay-1" style={{ padding: 'clamp(20px, 4vw, 40px)', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.06)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '24px', background: '#fff' }}>
          
          {err && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: '500' }}>
              <AlertCircle size={18} style={{ color: '#ef4444', flexShrink: 0 }} />
              <span>{err}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', marginBottom: '10px', color: 'var(--navy)' }}>
                <User size={16} className="nav-icon" style={{ color: 'var(--blue)' }} /> Affiliate Code ya Mobile
              </label>
              <input
                placeholder="Jaise: PC-1234 ya +91 9876543210"
                value={query}
                onChange={(e) => { setErr(''); setQuery(e.target.value); }}
                style={inputStyle}
                autoFocus
              />
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: '8px 0 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} style={{ color: '#10b981' }} /> 10-digit mobile number ya PC-XXXX code.
              </p>
            </div>

            <button className="btn" type="submit" disabled={busy} style={{ width: '100%', padding: '18px', fontSize: '1.1rem', borderRadius: '12px', boxShadow: '0 8px 16px rgba(59, 130, 246, 0.25)', background: 'linear-gradient(135deg, var(--blue), #2563eb)' }}>
              {busy ? 'Verifying...' : <><LogIn size={18} className="nav-icon" style={{ marginRight: '6px' }} /> Login Karein <ArrowRight size={18} className="nav-icon" style={{ marginLeft: 6 }} /></>}
            </button>
          </form>

          <div style={{ margin: '32px 0', position: 'relative', textAlign: 'center' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--line)', zIndex: 0 }} />
            <span style={{ position: 'relative', zIndex: 1, background: '#fff', padding: '0 16px', fontSize: '0.85rem', color: 'var(--muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>New to Poll Craft?</span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link className="btn o" href="/join" style={{ width: '100%', padding: '16px', fontSize: '1.05rem', borderRadius: '12px', border: '2px solid var(--line)', color: 'var(--navy)' }}>
              Naya Affiliate Account Banein
            </Link>
          </div>
        </div>

        <p className="fade-in delay-2" style={{ textAlign: 'center', marginTop: '32px', color: 'var(--muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <ShieldCheck size={16} /> 100% Safe & Secure Login
        </p>
      </div>
    </section>
  );
}
