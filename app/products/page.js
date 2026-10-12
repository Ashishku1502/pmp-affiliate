'use client';
import Link from 'next/link';
import { 
  LayoutDashboard, Users, Target, Database, 
  Video, Compass, TrendingUp, Building, Home as HomeIcon, 
  Award, ShieldCheck, ArrowRight, UserPlus, MapPin, 
  Layers, CheckCircle, Zap
} from 'lucide-react';

const PRODUCTS = [
  {
    icon: LayoutDashboard,
    num: '01',
    title: 'Dashboard & Ground Reports',
    desc: 'Apne assigned area se related reports, karyakarta activities aur performance information ko mobile par live dekhein.',
    tag: '📊 Live Ground Reports',
    color: 'var(--blue)',
    features: ['Live Mobile Dashboard', 'Constituency Analytics', 'Real-Time Activity Feeds']
  },
  {
    icon: Users,
    num: '02',
    title: 'Team & Karyakarta Management',
    desc: 'Booth-level team members, responsibilities aur field coordination ko organized digital format mein manage karein.',
    tag: '👥 Team Coordination',
    color: 'var(--gold)',
    features: ['Booth Level Assignment', 'Volunteer Role Hierarchy', 'Task Progress Tracking']
  },
  {
    icon: Target,
    num: '03',
    title: 'Ground Activity Tracking',
    desc: 'Rallies, door-to-door visits aur field activities create karein, workers ko assign karein aur unki progress track karein.',
    tag: '🎯 Activity Progress',
    color: '#10b981',
    features: ['Campaign Rally Tracking', 'Door-to-Door Visits', 'Worker Attendance Log']
  },
  {
    icon: Database,
    num: '04',
    title: 'Encrypted Voter Management',
    desc: 'Authorized voter records aur booth survey reports ko bank-grade encrypted security ke under safely store karein.',
    tag: '🗃️ Voter Data Security',
    color: '#8b5cf6',
    features: ['End-to-End Encryption', 'Role-Based Access Control', 'Zero Third-Party Data Sharing']
  },
  {
    icon: Video,
    num: '05',
    title: 'Learning Videos & Training',
    desc: 'Election campaign management, field strategies aur digital tools run karne se related step-by-step video courses.',
    tag: '🎥 Strategy Courses',
    color: '#ec4899',
    features: ['DRM Video Library', 'Election Campaign Guides', 'Step-by-Step Training']
  },
  {
    icon: Compass,
    num: '06',
    title: 'Strategies & Practical Frameworks',
    desc: 'Area management aur booth management ki practical guides jinse karyakarta efficiency 3x ho jati hai.',
    tag: '🧭 Execution Guides',
    color: '#f97316',
    features: ['Booth Management Blueprints', 'Voter Survey Frameworks', 'Leadership Playbooks']
  },
  {
    icon: TrendingUp,
    num: '07',
    title: 'Performance Scorecard & Analytics',
    desc: 'Real-time activity logs aur survey data ke basis par constituency performance score understand karein.',
    tag: '📈 Score & Analytics',
    color: '#06b6d4',
    features: ['Constituency Health Score', 'Weekly Progress Graph', 'Custom Metric Reports']
  }
];

const AUDIENCE = [
  { icon: Building, title: 'MLA & Assembly Representatives', badge: '🏛️ Assembly Level', desc: 'Constituency level teams, booth karyakarta tracking aur field-level reports ko 1 screen par organize karne ke liye.' },
  { icon: HomeIcon, title: 'Gram Pradhan & Local Leaders', badge: '🌾 Village Level', desc: 'Village level team management, ward-wise activity tracking aur area complaints manage karne ke liye.' },
  { icon: Layers, title: 'Zila Panchayat Representatives', badge: '🛡️ District Level', desc: 'District level responsibilities aur multi-zone assigned teams ko clear reporting system mein run karne ke liye.' },
  { icon: Award, title: 'Political Candidates & Contestants', badge: '🎖️ Candidates', desc: 'Upcoming elections ke liye systematically campaign plan karne aur ground data safely manage karne ke liye.' }
];

export default function ProductsPage() {
  return (
    <section className="sec" style={{ minHeight: '90vh', background: 'var(--bg)', paddingTop: '40px' }}>
      <div className="w">
        
        {/* Top Header Banner */}
        <div className="fade-in" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="tag" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--gold)', marginBottom: '16px', padding: '6px 16px', fontSize: '0.9rem' }}>
            <LayoutDashboard size={15} className="nav-icon" /> Product Portfolio & Solutions
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: '900', color: 'var(--h)', margin: '0 0 16px', letterSpacing: '-1.5px' }}>
            Our Digital Products & Solutions
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.2rem', maxWidth: '760px', margin: '0 auto', lineHeight: '1.7', fontWeight: '500' }}>
            Political representatives, candidates aur unki active ground teams ke liye 7 specialized digital modules.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid fade-in delay-1" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px', marginBottom: '64px' }}>
          {PRODUCTS.map(({ icon: Icon, num, title, desc, tag, color, features }) => (
            <div 
              className="card" 
              key={title} 
              style={{ padding: 'clamp(22px, 4vw, 36px)', borderTop: `4px solid ${color}`, background: '#fff', borderRadius: '24px', boxShadow: '0 12px 28px rgba(15, 23, 42, 0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div className="step-icon" style={{ margin: 0, width: '52px', height: '52px', background: `${color}15`, color: color, border: `1px solid ${color}30` }}>
                    <Icon size={26} />
                  </div>
                  <span style={{ fontSize: '1.8rem', fontFamily: 'Outfit', fontWeight: '800', color: 'var(--muted)', opacity: 0.4 }}>{num}</span>
                </div>
                
                <span className="tag" style={{ background: `${color}15`, color: color, marginBottom: '14px', fontSize: '0.78rem', fontWeight: '700' }}>{tag}</span>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: 'var(--navy)' }}>{title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '1.02rem', lineHeight: '1.65', marginBottom: '24px' }}>{desc}</p>
                
                <div style={{ borderTop: '1px dashed var(--line)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--navy)', fontWeight: '600' }}>
                      <CheckCircle size={14} style={{ color: color }} /> {f}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '28px' }}>
                <Link href="/join" className="btn s" style={{ width: '100%', justifyContent: 'center', background: 'var(--navy)', color: '#fff', padding: '12px' }}>
                  Get Access for Candidate <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Target Audience Showcase */}
        <div className="card fade-in delay-2" style={{ padding: 'clamp(28px, 5vw, 56px)', borderRadius: '28px', background: 'linear-gradient(135deg, var(--card) 0%, #f8fafc 100%)', border: '1px solid var(--line)', marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="tag" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--blue)', marginBottom: '12px' }}>
              Who Uses Our Products?
            </span>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--navy)', margin: 0 }}>Designed For Political Leaders & Teams</h2>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {AUDIENCE.map(({ icon: Icon, title, badge, desc }) => (
              <div key={title} style={{ padding: '24px', background: '#fff', borderRadius: '18px', border: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <Icon size={24} style={{ color: 'var(--blue)' }} />
                  <span className="tag ok" style={{ fontSize: '0.75rem' }}>{badge}</span>
                </div>
                <h4 style={{ margin: '0 0 8px', fontSize: '1.15rem', color: 'var(--navy)' }}>{title}</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: 0, lineHeight: '1.6' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call To Action Banner */}
        <div style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #020617 100%)', color: '#fff', borderRadius: '28px', padding: '48px 32px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
          <h2 style={{ color: '#fff', fontSize: '2.2rem', margin: '0 0 12px' }}>Ready to Experience Poll Craft Products?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.15rem', margin: '0 auto 32px', maxWidth: '640px' }}>
            Affiliate partner banein, approved territory select karein aur products distribution start karein.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/join" className="btn" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
              <UserPlus size={18} className="nav-icon" /> Affiliate Form Bhariye
            </Link>
            <Link href="/seats" className="btn o" style={{ padding: '16px 32px', fontSize: '1.05rem', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
              <MapPin size={18} className="nav-icon" /> Seats Dekhein
            </Link>
            <Link href="/" className="btn o" style={{ padding: '16px 32px', fontSize: '1.05rem', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
              Home Page
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
