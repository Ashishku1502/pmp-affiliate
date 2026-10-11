import Link from 'next/link';
import {
  LayoutDashboard, Users, CheckSquare, Database, Video, Compass,
  BarChart3, Building, Home as HomeIcon, Layers, Award, UserPlus,
  ArrowRight, ShieldCheck, MessageSquare, LogIn, Target, ChevronRight,
  TrendingUp, BookOpen, CheckCircle2
} from 'lucide-react';

const KEY_SOLUTIONS = [
  {
    num: '01',
    icon: LayoutDashboard,
    title: 'Dashboard & Ground Reports',
    desc: 'View area-related reports, ongoing activities, and available performance information from one dashboard.',
    tag: 'Central Command',
    color: 'var(--blue)',
    featured: true
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
    badge: 'Campaign Leadership',
    color: '#8b5cf6'
  },
  {
    icon: UserPlus,
    title: 'Affiliate Partners',
    desc: 'Introduce Poll Craft Analytics products to potential customers in your approved territory and explore opportunities to grow your business.',
    badge: 'Territory Partner',
    color: '#ec4899'
  }
];

const GET_STARTED_OPTIONS = [
  {
    icon: LayoutDashboard,
    title: 'Explore Our Products',
    desc: 'Discover digital tools designed to support political and ground-level management.',
    btnText: 'Explore Our Products',
    href: '/products',
    primary: true
  },
  {
    icon: UserPlus,
    title: 'Become an Affiliate',
    desc: 'Learn how to introduce our products and explore partnership opportunities.',
    btnText: 'Become an Affiliate',
    href: '/join',
    primary: false
  },
  {
    icon: LogIn,
    title: 'Login to Your Dashboard',
    desc: 'Access your dashboard and available platform features.',
    btnText: 'Login to Your Dashboard',
    href: '/login',
    primary: false
  },
  {
    icon: MessageSquare,
    title: 'Contact Us',
    desc: 'Have a question or want to know more? Get in touch with our team.',
    btnText: 'Contact Us',
    href: '/contact',
    primary: false
  }
];

export default function Home() {
  const [featuredSolution, ...otherSolutions] = KEY_SOLUTIONS;

  return (
    <>
      {/* ── 1. HERO SECTION ── */}
      <header className="hero fade-in">
        <div className="hero-bg-circle" />
        <div className="hero-bg-circle2" />
        <div className="w">
          <div className="hero-content" style={{ margin: '0 auto', textAlign: 'center', alignItems: 'center' }}>
            
            {/* Brand Pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', borderRadius: '99px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.35)', color: 'var(--gold)', marginBottom: '22px', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', backdropFilter: 'blur(10px)' }}>
              <ShieldCheck size={17} /> Poll Craft Analytics
            </div>

            {/* Main Headline */}
            <h1 className="hero-h1" style={{ maxWidth: '980px', margin: '0 auto 24px', fontSize: 'clamp(2.3rem, 5.5vw, 4rem)', lineHeight: '1.15', fontWeight: '900', letterSpacing: '-1px' }}>
              Manage Your Area, Team, and{' '}
              <span style={{ background: 'linear-gradient(135deg, #fff 10%, var(--gold) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline' }}>
                Ground Activities
              </span>{' '}
              in One Place
            </h1>

            {/* Sub-headline */}
            <p className="hero-sub fade-in delay-1" style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.28rem)', color: 'rgba(255, 255, 255, 0.92)', lineHeight: '1.75', maxWidth: '820px', margin: '0 auto 16px', fontWeight: '400' }}>
              Poll Craft Analytics helps political representatives, candidates, and their teams manage their areas, coordinate team members, track activities, and organize ground-level reports through one digital platform.
            </p>

            {/* Goal Sentence */}
            <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '1.08rem', margin: '0 auto 40px', maxWidth: '720px', fontWeight: '500', lineHeight: '1.6' }}>
              Our goal is to make political and ground-level management simpler, more organized, and easier to track.
            </p>

            {/* CTAs: Primary, Secondary, Login */}
            <div className="hero-btns fade-in delay-2" style={{ gap: '14px', justifyContent: 'center' }}>
              <Link className="btn" href="/products" style={{ padding: '16px 32px', fontSize: '1.05rem', fontWeight: '700', boxShadow: '0 8px 24px rgba(245, 158, 11, 0.35)' }}>
                <LayoutDashboard size={20} className="nav-icon" /> Explore Our Products
              </Link>
              <Link className="btn g" href="/join" style={{ padding: '16px 30px', fontSize: '1.05rem', background: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.25)', fontWeight: '600', backdropFilter: 'blur(8px)' }}>
                <UserPlus size={20} className="nav-icon" /> Become an Affiliate
              </Link>
              <Link className="btn o" href="/login" style={{ padding: '16px 28px', fontSize: '1.05rem', color: '#fff', borderColor: 'rgba(255, 255, 255, 0.35)', fontWeight: '600', backdropFilter: 'blur(8px)' }}>
                <LogIn size={20} className="nav-icon" /> Login to Your Dashboard
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="hero-trust fade-in delay-3" style={{ marginTop: '48px', padding: '12px 24px', borderRadius: '99px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: '600' }}>
                <CheckSquare size={16} style={{ color: 'var(--gold)' }} /> Area Management
              </span>
              <span style={{ opacity: 0.25, margin: '0 4px' }}>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: '600' }}>
                <Users size={16} style={{ color: 'var(--blue)' }} /> Team Coordination
              </span>
              <span style={{ opacity: 0.25, margin: '0 4px' }}>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: '600' }}>
                <BarChart3 size={16} style={{ color: '#10b981' }} /> Ground-Level Reporting
              </span>
            </div>

          </div>
        </div>
      </header>


      {/* ── 2. POLITICAL MANAGEMENT MADE SIMPLE AND ORGANIZED ── */}
      <section className="sec alt" id="solutions">
        <div className="w">
          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '32px', padding: 'clamp(36px, 5vw, 64px)', boxShadow: '0 24px 48px rgba(0,0,0,0.03)' }}>
            
            {/* Section Overview Header */}
            <div style={{ maxWidth: '860px', margin: '0 auto 48px', textAlign: 'center' }}>
              <span className="tag" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--blue)', marginBottom: '16px' }}>
                Simplified Ground Operations
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', lineHeight: '1.25', margin: '0 0 20px', letterSpacing: '-0.5px' }}>
                Political Management Made Simple and Organized
              </h2>
              <p style={{ color: 'var(--text)', fontSize: '1.18rem', lineHeight: '1.8', margin: '0 0 16px', fontWeight: '600' }}>
                Managing people, teams, field activities, and information across different areas can be challenging.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '1.08rem', lineHeight: '1.8', margin: 0 }}>
                Poll Craft Analytics brings these tasks together in one place, helping you organize daily work, coordinate your team, monitor activities, and access important reports more easily.
              </p>
            </div>

            {/* Sub-heading for Solutions */}
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <h3 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--h)', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
                Our Key Solutions
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '1.02rem', margin: 0 }}>
                Digital modules built for seamless coordination and empirical field insights
              </p>
            </div>

            {/* Bento Grid: 1 Featured Banner + 6 Balanced Solution Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              
              {/* Featured 01: Dashboard & Ground Reports */}
              <div
                style={{
                  padding: 'clamp(28px, 4vw, 36px)',
                  background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
                  borderRadius: '24px',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  color: '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '24px',
                  boxShadow: '0 16px 36px rgba(0,0,0,0.2)'
                }}
              >
                <div style={{ maxWidth: '640px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(59, 130, 246, 0.2)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
                      <LayoutDashboard size={24} />
                    </div>
                    <span className="tag" style={{ background: 'rgba(59, 130, 246, 0.25)', color: '#60a5fa', fontSize: '0.8rem', fontWeight: '800' }}>
                      01 • {featuredSolution.tag}
                    </span>
                  </div>

                  <h4 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.85rem)', fontWeight: '900', color: '#fff', margin: '0 0 10px', lineHeight: '1.3' }}>
                    {featuredSolution.title}
                  </h4>

                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>
                    {featuredSolution.desc}
                  </p>
                </div>

                <div>
                  <Link
                    href="/products"
                    className="btn"
                    style={{
                      padding: '14px 26px',
                      fontSize: '0.98rem',
                      fontWeight: '700',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Explore Dashboard <ArrowRight size={16} className="nav-icon" />
                  </Link>
                </div>
              </div>

              {/* 6 Grid Solutions (02 to 07) */}
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '22px' }}>
                {otherSolutions.map(({ num, icon: Icon, title, desc, tag, color }) => (
                  <div
                    key={title}
                    style={{
                      padding: '28px',
                      background: 'var(--pale)',
                      borderRadius: '22px',
                      border: '1px solid var(--line)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                        <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: `${color}15`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${color}30` }}>
                          <Icon size={22} />
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--muted)', opacity: 0.7, letterSpacing: '1px' }}>
                          {num}
                        </span>
                      </div>

                      <span className="tag" style={{ background: `${color}15`, color: color, fontSize: '0.75rem', fontWeight: '700', marginBottom: '10px' }}>
                        {tag}
                      </span>

                      <h4 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--h)', margin: '8px 0 12px', lineHeight: '1.35' }}>
                        {title}
                      </h4>

                      <p style={{ color: 'var(--muted)', fontSize: '0.98rem', lineHeight: '1.65', margin: 0 }}>
                        {desc}
                      </p>
                    </div>

                    <div style={{ marginTop: '22px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                      <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: '700', color: color, textDecoration: 'none' }}>
                        Learn Details <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

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
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '900', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
              Who Can Benefit from Poll Craft Analytics?
            </h2>
            <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.08rem' }}>
              Tailored digital tools designed specifically for representatives, local bodies, candidates, and territory business partners.
            </p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
            {BENEFIT_GROUPS.map(({ icon: Icon, title, desc, badge, color }, i) => (
              <div
                className="card fade-in"
                key={title}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  borderTop: `4px solid ${color}`,
                  padding: 'clamp(26px, 4vw, 36px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '24px'
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

                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '12px', lineHeight: '1.35', color: 'var(--h)' }}>
                    {title}
                  </h3>

                  <p style={{ color: 'var(--muted)', fontSize: '1.02rem', lineHeight: '1.65', margin: 0 }}>
                    {desc}
                  </p>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                  <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.92rem', fontWeight: '700', color: color, textDecoration: 'none' }}>
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
            {/* Ambient Background Glow */}
            <div style={{ position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)', width: '450px', height: '320px', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '840px', margin: '0 auto' }}>
              <span className="tag" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--gold)', border: '1px solid rgba(245, 158, 11, 0.3)', marginBottom: '20px', padding: '6px 18px', fontSize: '0.85rem' }}>
                Platform Philosophy
              </span>

              <h2 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4rem)', fontWeight: '900', color: '#fff', letterSpacing: '-1.5px', margin: '0 0 20px', fontFamily: "'Outfit', sans-serif" }}>
                Learn. Organize. Manage.
              </h2>

              <p style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', color: 'rgba(255, 255, 255, 0.95)', fontWeight: '600', lineHeight: '1.6', margin: '0 0 16px' }}>
                We believe that better organization leads to better coordination.
              </p>

              <p style={{ fontSize: '1.08rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: '1.8', margin: '0 auto 36px', maxWidth: '720px' }}>
                Poll Craft Analytics aims to bring teams, activities, reports, and learning resources together so users can manage their work more efficiently and make informed decisions based on available information.
              </p>

              {/* 3 Pillars Visual Showcase */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', margin: '0 auto 36px', maxWidth: '780px', textAlign: 'left' }}>
                <div style={{ padding: '16px 20px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)', fontWeight: '800', marginBottom: '4px' }}>
                    <BookOpen size={18} /> Learn
                  </div>
                  <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>Practical ideas, frameworks & learning videos</span>
                </div>

                <div style={{ padding: '16px 20px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--blue)', fontWeight: '800', marginBottom: '4px' }}>
                    <Users size={18} /> Organize
                  </div>
                  <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>Structured area teams, roles & voter records</span>
                </div>

                <div style={{ padding: '16px 20px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: '800', marginBottom: '4px' }}>
                    <TrendingUp size={18} /> Manage
                  </div>
                  <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>Daily activities, progress & ground analytics</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <Link className="btn" href="/products" style={{ padding: '16px 32px' }}>
                  <LayoutDashboard size={18} className="nav-icon" /> Explore Our Products
                </Link>
                <Link className="btn o" href="/join" style={{ padding: '16px 30px', color: '#fff', borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                  <UserPlus size={18} className="nav-icon" /> Become an Affiliate
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
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '900', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
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
                  padding: 'clamp(26px, 4vw, 34px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '24px',
                  border: primary ? '2px solid var(--gold)' : '1px solid var(--line)',
                  background: primary ? 'linear-gradient(180deg, #fff 0%, #fffbeb 100%)' : '#fff',
                  boxShadow: primary ? '0 12px 30px rgba(245, 158, 11, 0.1)' : '0 4px 16px rgba(0,0,0,0.02)'
                }}
              >
                <div>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: primary ? 'var(--gold)' : 'var(--pale)', color: primary ? '#fff' : 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: primary ? 'none' : '1px solid var(--line)' }}>
                    <Icon size={24} />
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--h)', margin: '0 0 12px', lineHeight: '1.35' }}>
                    {title}
                  </h3>

                  <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: '1.65', margin: '0 0 24px' }}>
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
                    fontWeight: '700',
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
              marginTop: '56px',
              padding: '24px 32px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(59, 130, 246, 0.06) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap'
            }}
          >
            <Target size={22} style={{ color: 'var(--gold)', flexShrink: 0 }} />
            <strong style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: 'var(--navy)', letterSpacing: '-0.3px', fontWeight: '800' }}>
              Poll Craft Analytics — Bringing Teams, Activities, and Ground-Level Information Together.
            </strong>
          </div>

        </div>
      </section>
    </>
  );
}
