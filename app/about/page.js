'use client';
import Link from 'next/link';
import { 
  Building, Target, Eye, ShieldCheck, CheckCircle, 
  ArrowRight, UserPlus, LayoutDashboard, Compass, 
  Users, Video, TrendingUp, Award, Layers
} from 'lucide-react';

export default function AboutPage() {
  return (
    <section className="sec" style={{ minHeight: '90vh', background: 'var(--bg)', paddingTop: '40px' }}>
      <div className="w" style={{ maxWidth: '960px' }}>
        
        {/* Top Header Banner */}
        <div className="fade-in" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="tag" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--blue)', marginBottom: '16px', padding: '6px 16px', fontSize: '0.9rem' }}>
            <Building size={15} className="nav-icon" /> Company Profile & Mission
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: '900', color: 'var(--h)', margin: '0 0 16px', letterSpacing: '-1.5px' }}>
            About Poll Craft Analytics
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.2rem', maxWidth: '720px', margin: '0 auto', lineHeight: '1.7', fontWeight: '500' }}>
            Poll Craft Analytics Private Limited ek technology-first company hai jo political representatives, candidates aur ground-level management ke liye digital solutions develop kar rahi hai.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="card fade-in delay-1" style={{ padding: 'clamp(28px, 5vw, 56px)', borderRadius: '28px', background: '#fff', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.05)', border: '1px solid rgba(0,0,0,0.06)', marginBottom: '48px' }}>
          
          <h2 style={{ fontSize: '1.8rem', color: 'var(--navy)', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            Hamara Parichay & Objective
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1.08rem', lineHeight: '1.8', marginBottom: '36px' }}>
            Poll Craft Analytics Private Limited dedicatedly political leadership, assembly representatives, Gram Pradhans, aur contestants ko aise structured software modules deliver karta hai jinse unki field operations, karyakarta management, voter data security, aur day-to-day analytics mobile phone par easily track ho sakein.
          </p>

          {/* Mission & Vision Grid */}
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px', marginBottom: '44px' }}>
            
            <div style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', padding: 'clamp(20px, 4vw, 32px)', borderRadius: '20px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <div style={{ display: 'inline-flex', padding: '12px', background: 'var(--gold)', color: '#fff', borderRadius: '14px', marginBottom: '16px' }}>
                <Target size={24} />
              </div>
              <h3 style={{ color: 'var(--navy)', fontSize: '1.4rem', margin: '0 0 10px' }}>Our Mission</h3>
              <p style={{ color: 'var(--navy)', opacity: 0.85, fontSize: '1.02rem', margin: 0, lineHeight: '1.65' }}>
                Technology ki help se election aur ground management processes ko poori tarah organized, measurable, security-driven aur accessible banana.
              </p>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', padding: 'clamp(20px, 4vw, 32px)', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <div style={{ display: 'inline-flex', padding: '12px', background: 'var(--blue)', color: '#fff', borderRadius: '14px', marginBottom: '16px' }}>
                <Eye size={24} />
              </div>
              <h3 style={{ color: 'var(--navy)', fontSize: '1.4rem', margin: '0 0 10px' }}>Our Vision</h3>
              <p style={{ color: 'var(--navy)', opacity: 0.85, fontSize: '1.02rem', margin: 0, lineHeight: '1.65' }}>
                Ek aisa digital ecosystem establish karna jahan political representatives aur ground teams real-time empirical data ke sath campaign run kar sakein.
              </p>
            </div>

          </div>

          {/* 5 Core Capabilities */}
          <h2 style={{ fontSize: '1.8rem', color: 'var(--navy)', marginBottom: '24px', letterSpacing: '-0.5px' }}>
            Core System Capabilities (5 Pillars)
          </h2>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '20px', marginBottom: '44px' }}>
            
            <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid var(--line)' }}>
              <strong style={{ color: 'var(--gold)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Building size={18} /> 1. Area Management
              </strong>
              <span style={{ fontSize: '0.98rem', color: 'var(--muted)', lineHeight: '1.6', display: 'block' }}>
                State, city, constituency, aur booth level data ko organized digital format mein manage karna.
              </span>
            </div>

            <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid var(--line)' }}>
              <strong style={{ color: 'var(--blue)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Users size={18} /> 2. Team Coordination
              </strong>
              <span style={{ fontSize: '0.98rem', color: 'var(--muted)', lineHeight: '1.6', display: 'block' }}>
                Karyakartas, booth responsibilities aur daily activity tracking system.
              </span>
            </div>

            <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid var(--line)' }}>
              <strong style={{ color: '#10b981', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <CheckCircle size={18} /> 3. Ground Reporting
              </strong>
              <span style={{ fontSize: '0.98rem', color: 'var(--muted)', lineHeight: '1.6', display: 'block' }}>
                Door-to-door survey reports, voter feedback aur live ground activity logs collect karna.
              </span>
            </div>

            <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid var(--line)' }}>
              <strong style={{ color: '#8b5cf6', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <ShieldCheck size={18} /> 4. Encrypted Data Security
              </strong>
              <span style={{ fontSize: '0.98rem', color: 'var(--muted)', lineHeight: '1.6', display: 'block' }}>
                Bank-grade encryption aur role-based access permission so data completely confidential rahe.
              </span>
            </div>

            <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid var(--line)' }}>
              <strong style={{ color: '#ec4899', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Video size={18} /> 5. Strategy & Courses
              </strong>
              <span style={{ fontSize: '0.98rem', color: 'var(--muted)', lineHeight: '1.6', display: 'block' }}>
                Political strategy video modules aur field leadership practical guides.
              </span>
            </div>

          </div>

          {/* Trust Banner */}
          <div style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--deep) 100%)', color: '#fff', padding: '32px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 12px 24px rgba(15, 23, 42, 0.15)' }}>
            <h3 style={{ color: '#fff', fontSize: '1.5rem', margin: '0 0 8px' }}>
              Poll Craft Analytics Private Limited
            </h3>
            <p style={{ color: '#c3cbe8', fontSize: '1.05rem', margin: '0 0 24px', fontWeight: '500' }}>
              Bringing Structure to Election & Ground Management.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link className="btn" href="/join" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                <UserPlus size={18} className="nav-icon" /> Affiliate Banein
              </Link>
              <Link className="btn o" href="/" style={{ padding: '14px 28px', fontSize: '1rem', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                Home Page Par Jaayein <ArrowRight size={16} className="nav-icon" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
