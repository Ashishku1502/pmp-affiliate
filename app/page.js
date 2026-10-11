import Link from 'next/link';
import {
  LayoutDashboard, Users, CheckSquare, Database, Video, Compass,
  BarChart3, Building, Home as HomeIcon, Layers, Award, UserPlus,
  ArrowRight, ShieldCheck, MessageSquare, LogIn, Target, ChevronRight
} from 'lucide-react';

const KEY_SOLUTIONS = [
  {
    num: '01',
    icon: LayoutDashboard,
    title: 'Dashboard & Ground Reports',
    desc: 'View area-related reports, ongoing activities, and available performance information from one dashboard.',
    tag: 'Live Dashboard',
    color: 'var(--blue)'
  },
  {
    num: '02',
    icon: Users,
    title: 'Team Management',
    desc: 'Organize your team members, assign responsibilities, and make it easier for everyone to stay coordinated.',
    tag: 'Team Coordination',
    color: 'var(--gold)'
  },
  {
    num: '03',
    icon: CheckSquare,
    title: 'Activity Management',
    desc: 'Create activities, assign tasks to team members, and track progress in one place.',
    tag: 'Task Progress',
    color: '#10b981'
  },
  {
    num: '04',
    icon: Database,
    title: 'Voter Management',
    desc: 'Organize authorized voter records and field-collected information in a structured format, with appropriate access controls.',
    tag: 'Data Organization',
    color: '#8b5cf6'
  },
  {
    num: '05',
    icon: Video,
    title: 'Learning Videos & Courses',
    desc: 'Access useful videos and learning resources to improve your understanding of political management and ground operations.',
    tag: 'Training Library',
    color: '#ec4899'
  },
  {
    num: '06',
    icon: Compass,
    title: 'Strategies & Frameworks',
    desc: 'Explore practical ideas, planning methods, and frameworks to help organize area management and field activities.',
    tag: 'Strategic Frameworks',
    color: '#06b6d4'
  },
  {
    num: '07',
    icon: BarChart3,
    title: 'Performance Score & Analytics',
    desc: 'Understand activity progress and available performance indicators through organized reports and analytics.',
    tag: 'Metrics & Analytics',
    color: '#f97316'
  }
];

const BENEFIT_GROUPS = [
  {
    icon: Building,
    title: 'MLA & Assembly-Level Representatives',
    desc: 'Manage assembly-level teams, coordinate activities, and keep track of ground-level reports.',
    badge: 'Assembly Level',
    color: 'var(--blue)'
  },
  {
    icon: HomeIcon,
    title: 'Gram Pradhans',
    desc: 'Organize village-level teams, manage assigned activities, and review area-related information.',
    badge: 'Village Level',
    color: 'var(--gold)'
  },
  {
    icon: Layers,
    title: 'Zila Panchayat Representatives',
    desc: 'Coordinate district-level responsibilities, organize teams, and monitor activities across assigned areas.',
    badge: 'District Level',
    color: '#10b981'
  },
  {
    icon: Award,
    title: 'Political Candidates',
    desc: 'Plan and organize your team, area-related activities, and ground operations more systematically.',
    badge: 'Candidates',
    color: '#8b5cf6'
  },
  {
    icon: UserPlus,
    title: 'Affiliate Partners',
    desc: 'Introduce Poll Craft Analytics products to potential customers in your approved territory and explore opportunities to grow your business.',
    badge: 'Business Partners',
    color: '#ec4899'
  }
];

const GET_STARTED_OPTIONS = [
  {
    icon: LayoutDashboard,
    title: 'Explore Our Products',
    desc: 'Discover digital tools designed to support political and ground-level management.',
    btnText: 'View Digital Products',
    href: '/products',
    primary: true
  },
  {
    icon: UserPlus,
    title: 'Become an Affiliate',
    desc: 'Learn how to introduce our products and explore partnership opportunities.',
    btnText: 'Join Partner Program',
    href: '/join',
    primary: false
  },
  {
    icon: LogIn,
    title: 'Login to Your Dashboard',
    desc: 'Access your dashboard and available platform features.',
    btnText: 'Dashboard Login',
    href: '/login',
    primary: false
  },
  {
    icon: MessageSquare,
    title: 'Contact Us',
    desc: 'Have a question or want to know more? Get in touch with our team.',
    btnText: 'Get in Touch',
    href: '/contact',
    primary: false
  }
];

export default function Home() {
  return (
    <>
      {/* ── 1. HERO SECTION ── */}
      <header className="hero fade-in">
        <div className="hero-bg-circle" />
        <div className="hero-bg-circle2" />
        <div className="w">
          <div className="hero-content">
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '99px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.28)', color: 'var(--gold)', marginBottom: '18px', fontSize: '0.88rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <ShieldCheck size={16} /> Poll Craft Analytics
            </div>

            <h1 className="hero-h1">
              Manage Your Area, Team, and Ground Activities in One Place
            </h1>

            <p className="hero-sub fade-in delay-1" style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)', color: 'rgba(255, 255, 255, 0.92)', lineHeight: '1.7', maxWidth: '820px', margin: '0 auto 20px' }}>
              Poll Craft Analytics helps political representatives, candidates, and their teams manage their areas, coordinate team members, track activities, and organize ground-level reports through one digital platform.
            </p>

            <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '1.05rem', margin: '0 auto 36px', maxWidth: '720px', fontWeight: '500' }}>
              Our goal is to make political and ground-level management simpler, more organized, and easier to track.
            </p>

            {/* CTAs */}
            <div className="hero-btns fade-in delay-2" style={{ gap: '14px', justifyContent: 'center' }}>
              <Link className="btn" href="/products" style={{ padding: '18px 34px', fontSize: '1.05rem' }}>
                <LayoutDashboard size={20} className="nav-icon" /> Explore Our Products
              </Link>
              <Link className="btn g" href="/join" style={{ padding: '18px 34px', fontSize: '1.05rem', background: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <UserPlus size={20} className="nav-icon" /> Become an Affiliate
              </Link>
              <Link className="btn o" href="/login" style={{ padding: '18px 30px', fontSize: '1.05rem', color: '#fff', borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                <LogIn size={20} className="nav-icon" /> Login to Your Dashboard
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="hero-trust fade-in delay-3" style={{ marginTop: '40px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckSquare size={16} style={{ color: 'var(--gold)' }} /> Area Management
              </span>
              <span style={{ opacity: 0.3 }}>|</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} style={{ color: 'var(--blue)' }} /> Team Coordination
              </span>
              <span style={{ opacity: 0.3 }}>|</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart3 size={16} style={{ color: '#10b981' }} /> Ground-Level Reporting
              </span>
            </div>

          </div>
        </div>
      </header>


      {/* ── 2. POLITICAL MANAGEMENT MADE SIMPLE AND ORGANIZED ── */}
      <section className="sec alt">
        <div className="w">
          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '32px', padding: 'clamp(32px, 5vw, 60px)', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
            
            <div style={{ maxWidth: '880px', margin: '0 auto 48px', textAlign: 'center' }}>
              <span className="tag" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--blue)', marginBottom: '16px' }}>
                Simplified Ground Operations
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', lineHeight: '1.25', margin: '0 0 20px' }}>
                Political Management Made Simple and Organized
              </h2>
              <p style={{ color: 'var(--text)', fontSize: '1.15rem', lineHeight: '1.8', margin: '0 0 16px', fontWeight: '500' }}>
                Managing people, teams, field activities, and information across different areas can be challenging.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.8', margin: 0 }}>
                Poll Craft Analytics brings these tasks together in one place, helping you organize daily work, coordinate your team, monitor activities, and access important reports more easily.
              </p>
            </div>

            {/* Sub-heading for Solutions */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--h)', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
                Our Key Solutions
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', margin: 0 }}>
                Digital modules built for seamless coordination and empirical field insights
              </p>
            </div>

            {/* 7 Solutions Grid */}
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '22px' }}>
              {KEY_SOLUTIONS.map(({ num, icon: Icon, title, desc, tag, color }) => (
                <div
                  key={title}
                  style={{
                    padding: '28px',
                    background: 'var(--pale)',
                    borderRadius: '20px',
                    border: '1px solid var(--line)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                      <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: `${color}15`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${color}30` }}>
                        <Icon size={22} />
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--muted)', opacity: 0.7, letterSpacing: '1px' }}>
                        {num}
                      </span>
                    </div>

                    <span className="tag" style={{ background: `${color}15`, color: color, fontSize: '0.75rem', fontWeight: '700', marginBottom: '10px' }}>
                      {tag}
                    </span>

                    <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--h)', margin: '6px 0 12px', lineHeight: '1.35' }}>
                      {title}
                    </h4>

                    <p style={{ color: 'var(--muted)', fontSize: '0.96rem', lineHeight: '1.65', margin: 0 }}>
                      {desc}
                    </p>
                  </div>

                  <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--line)' }}>
                    <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: '700', color: color, textDecoration: 'none' }}>
                      Learn Details <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ── 3. WHO CAN BENEFIT FROM POLL CRAFT ANALYTICS? ── */}
      <section className="sec" id="audience">
        <div className="w">
          <div className="sec-header">
            <span className="tag" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--blue)', marginBottom: '16px' }}>
              Target Stakeholders
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', margin: '0 0 12px' }}>
              Who Can Benefit from Poll Craft Analytics?
            </h2>
            <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.08rem' }}>
              Tailored digital tools designed specifically for representatives, local bodies, candidates, and territory business partners.
            </p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px' }}>
            {BENEFIT_GROUPS.map(({ icon: Icon, title, desc, badge, color }, i) => (
              <div
                className="card fade-in"
                key={title}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  borderTop: `4px solid ${color}`,
                  padding: 'clamp(24px, 4vw, 34px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div className="step-icon" style={{ margin: 0, width: '48px', height: '48px', background: `${color}15`, color: color, border: `1px solid ${color}30` }}>
                      <Icon size={24} />
                    </div>
                    <span className="tag" style={{ background: `${color}15`, color: color, fontSize: '0.8rem', fontWeight: '700' }}>
                      {badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '12px', lineHeight: '1.35', color: 'var(--h)' }}>
                    {title}
                  </h3>

                  <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: '1.65', margin: 0 }}>
                    {desc}
                  </p>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                  <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: '700', color: color, textDecoration: 'none' }}>
                    Explore Solutions <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 4. LEARN. ORGANIZE. MANAGE. (PHILOSOPHY & VALUE BANNER) ── */}
      <section className="sec alt" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="w">
          <div
            style={{
              background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
              color: '#fff',
              borderRadius: '32px',
              padding: 'clamp(36px, 6vw, 68px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 24px 48px rgba(0,0,0,0.3)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Subtle background glow */}
            <div style={{ position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '300px', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px', margin: '0 auto' }}>
              <span className="tag" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--gold)', border: '1px solid rgba(245, 158, 11, 0.3)', marginBottom: '18px', padding: '6px 16px', fontSize: '0.85rem' }}>
                Platform Philosophy
              </span>

              <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: '900', color: '#fff', letterSpacing: '-1px', margin: '0 0 20px', fontFamily: "'Outfit', sans-serif" }}>
                Learn. Organize. Manage.
              </h2>

              <p style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)', color: 'rgba(255, 255, 255, 0.95)', fontWeight: '600', lineHeight: '1.6', margin: '0 0 16px' }}>
                We believe that better organization leads to better coordination.
              </p>

              <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: '1.8', margin: '0 auto 36px', maxWidth: '720px' }}>
                Poll Craft Analytics aims to bring teams, activities, reports, and learning resources together so users can manage their work more efficiently and make informed decisions based on available information.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <Link className="btn" href="/products" style={{ padding: '16px 32px' }}>
                  <LayoutDashboard size={18} className="nav-icon" /> View All Products
                </Link>
                <Link className="btn o" href="/join" style={{ padding: '16px 30px', color: '#fff', borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                  <UserPlus size={18} className="nav-icon" /> Partner With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── 5. GET STARTED WITH POLL CRAFT ANALYTICS ── */}
      <section className="sec" id="get-started">
        <div className="w">
          <div className="sec-header">
            <span className="tag" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', marginBottom: '16px' }}>
              Action Hub
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', margin: '0 0 12px' }}>
              Get Started with Poll Craft Analytics
            </h2>
            <p style={{ maxWidth: '760px', margin: '0 auto', fontSize: '1.08rem' }}>
              Whether you are a political representative, a candidate, a team member, or someone interested in becoming an affiliate, we have options to help you get started.
            </p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '24px' }}>
            {GET_STARTED_OPTIONS.map(({ icon: Icon, title, desc, btnText, href, primary }) => (
              <div
                key={title}
                className="card fade-in"
                style={{
                  padding: 'clamp(24px, 4vw, 32px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '24px',
                  border: primary ? '2px solid var(--gold)' : '1px solid var(--line)',
                  background: primary ? 'linear-gradient(180deg, #fff 0%, #fffbeb 100%)' : '#fff'
                }}
              >
                <div>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: primary ? 'var(--gold)' : 'var(--pale)', color: primary ? '#fff' : 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <Icon size={24} />
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--h)', margin: '0 0 10px' }}>
                    {title}
                  </h3>

                  <p style={{ color: 'var(--muted)', fontSize: '0.98rem', lineHeight: '1.65', margin: '0 0 24px' }}>
                    {desc}
                  </p>
                </div>

                <Link
                  href={href}
                  className={primary ? 'btn' : 'btn o'}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '14px 20px',
                    fontSize: '0.96rem',
                    textDecoration: 'none'
                  }}
                >
                  {btnText} <ArrowRight size={16} className="nav-icon" style={{ marginLeft: '6px' }} />
                </Link>
              </div>
            ))}
          </div>

          {/* Closing Brand Statement Banner */}
          <div
            style={{
              marginTop: '48px',
              padding: '24px 28px',
              borderRadius: '20px',
              background: 'var(--pale)',
              border: '1px solid var(--line)',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap'
            }}
          >
            <Target size={20} style={{ color: 'var(--gold)' }} />
            <strong style={{ fontSize: '1.05rem', color: 'var(--navy)', letterSpacing: '-0.2px' }}>
              Poll Craft Analytics — Bringing Teams, Activities, and Ground-Level Information Together.
            </strong>
          </div>

        </div>
      </section>
    </>
  );
}
