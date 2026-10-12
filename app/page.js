import Link from 'next/link';
import {
  LayoutDashboard, Users, CheckSquare, Database, Video, Compass,
  BarChart3, Building, Home as HomeIcon, Layers, Award, UserPlus,
  ArrowRight, ShieldCheck, MessageSquare, LogIn, ChevronRight,
  TrendingUp, BookOpen, CheckCircle2, MapPin, Sparkles, Activity,
  Lock, Check, FileText, Zap, HelpCircle, PhoneCall
} from 'lucide-react';
import SeatsPreview from '@/components/SeatsPreview';

const METRICS_BAR = [
  { val: '7+', label: 'Specialized Digital Modules', sub: 'Comprehensive ground ecosystem' },
  { val: '100%', label: 'Encrypted & Private Data', sub: 'Zero third-party monetization' },
  { val: 'Real-Time', label: 'Field Mobile Reports', sub: 'Instant booth & activity updates' },
  { val: '40%', label: 'Territory Revenue Share', sub: 'Exclusive seat partner rights' }
];

const KEY_SOLUTIONS = [
  {
    num: '01',
    icon: LayoutDashboard,
    title: 'Dashboard & Ground Reports',
    desc: 'Get an immediate panoramic view of ongoing field activities, volunteer check-ins, and constituency health metrics from a centralized mobile-friendly command center.',
    tag: 'War-Room Command',
    color: 'var(--blue)',
    features: [
      'Live mobile dashboard with activity feeds',
      'Constituency-wide health & progress scores',
      'Instant area notification & alert dispatch'
    ]
  },
  {
    num: '02',
    icon: Users,
    title: 'Team & Karyakarta Management',
    desc: 'Structure your organizational hierarchy from assembly incharge to booth-level volunteers with granular roles, contact records, and active task assignments.',
    tag: 'Hierarchy & Roles',
    color: 'var(--gold)',
    features: [
      'Booth-wise volunteer allocation & roster',
      'Role-based permissions & reporting lines',
      'Instant task dispatch & check-in logging'
    ]
  },
  {
    num: '03',
    icon: CheckSquare,
    title: 'Field Activity & Campaign Tracker',
    desc: 'Plan, execute, and monitor rallies, door-to-door public outreach, and ward meetings with verified ground progress reports and time-stamped attendance logs.',
    tag: 'Field Operations',
    color: '#10b981',
    features: [
      'Door-to-door visit logging & feedback',
      'Rally & public meeting attendance records',
      'Daily milestone completion metrics'
    ]
  },
  {
    num: '04',
    icon: Database,
    title: 'Encrypted Voter Management',
    desc: 'Organize authorized voter directories, household surveys, and booth-level records safely under bank-grade cryptographic security and strict privacy controls.',
    tag: 'Data Cryptography',
    color: '#8b5cf6',
    features: [
      'Bank-grade 256-bit cryptographic protection',
      'Zero third-party data access pledge',
      'Full candidate database ownership & export'
    ]
  },
  {
    num: '05',
    icon: Video,
    title: 'Learning Videos & Training Academy',
    desc: 'Equip leadership teams and field karyakartas with practical, high-impact video courses covering election mechanics, digital management tools, and booth organizing.',
    tag: 'Leadership Academy',
    color: '#ec4899',
    features: [
      'Curated election strategy video courses',
      'Step-by-step tool walkthroughs for karyakartas',
      'DRM protected training library'
    ]
  },
  {
    num: '06',
    icon: Compass,
    title: 'Strategies & Execution Frameworks',
    desc: 'Deploy field-tested playbooks, voter sentiment frameworks, and systematic turnout models designed specifically for Indian constituency realities.',
    tag: 'Strategic Playbooks',
    color: '#06b6d4',
    features: [
      'Booth-level management action blueprints',
      'Voter sentiment survey frameworks',
      'Election-day mobilization guidelines'
    ]
  },
  {
    num: '07',
    icon: BarChart3,
    title: 'Performance Scorecard & Analytics',
    desc: 'Transform scattered field feedback into actionable empirical intelligence with interactive performance graphs, booth comparisons, and velocity indicators.',
    tag: 'Empirical Intelligence',
    color: '#f97316',
    features: [
      'Comparative booth-by-booth scorecards',
      'Weekly worker outreach velocity tracking',
      'Predictive momentum & health indicators'
    ]
  }
];

const BENEFIT_GROUPS = [
  {
    icon: Building,
    title: 'MLA & Assembly Representatives',
    desc: 'Manage your entire constituency operations from one screen, keep real-time track of booth coordinators, and address localized citizen priorities systematically.',
    badge: 'Assembly Constituency',
    color: 'var(--blue)',
    bullets: ['Constituency-wide war-room overview', 'Booth-by-booth karyakarta coordination', 'Real-time ground reports on mobile']
  },
  {
    icon: HomeIcon,
    title: 'Gram Pradhans & Village Leaders',
    desc: 'Structure village-level teams, assign ward-wise responsibilities, monitor daily development tasks, and maintain clear records of resident requests.',
    badge: 'Gram Panchayat',
    color: 'var(--gold)',
    bullets: ['Ward-level volunteer mobilization', 'Community issue tracking & resolution', 'Direct communication with village teams']
  },
  {
    icon: Layers,
    title: 'Zila Panchayat Representatives',
    desc: 'Coordinate multi-zone responsibilities across assigned blocks, monitor area-wise development work, and keep teams aligned with district objectives.',
    badge: 'District Level',
    color: '#10b981',
    bullets: ['Multi-zone supervisory dashboards', 'Block-level progress aggregation', 'Synchronized ground field operations']
  },
  {
    icon: Award,
    title: 'Political Candidates & War-Rooms',
    desc: 'Run a data-driven election campaign with structured voter surveys, real-time rally tracking, booth management blue-prints, and strictly confidential records.',
    badge: 'Campaign Leadership',
    color: '#8b5cf6',
    bullets: ['Systematic election campaign planning', 'Encrypted proprietary voter intelligence', 'Turnout mobilization playbooks']
  },
  {
    icon: UserPlus,
    title: 'Territory Business Affiliates',
    desc: 'Lock exclusive rights to approved assembly or village seats, introduce Poll Craft Analytics to local representatives, and earn an upfront 40% revenue share.',
    badge: 'Territory Franchise',
    color: '#ec4899',
    bullets: ['Guaranteed territory exclusivity', 'Lucrative 40% recurring commission', 'Dedicated partner dashboard & tools']
  }
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Select Territory & Setup Portal',
    desc: 'Choose your assembly constituency or local body, set up administrative profiles, and configure authorized organizational hierarchy.'
  },
  {
    step: '02',
    title: 'Mobilize Teams & Log Field Data',
    desc: 'Assign booth karyakartas, dispatch daily door-to-door activities, and gather verified voter sentiments directly from mobile devices.'
  },
  {
    step: '03',
    title: 'Command, Analyze & Win',
    desc: 'Monitor real-time progress, evaluate booth performance scorecards, and make informed strategic choices backed by empirical ground data.'
  }
];

const FAQ_ITEMS = [
  {
    q: 'What makes Poll Craft Analytics different from conventional campaign management tools?',
    a: 'Poll Craft Analytics is designed specifically for ground realities in India. It unites booth-level karyakarta coordination, door-to-door survey tracking, encrypted voter databases, video training, and strategy frameworks into one unified mobile-first ecosystem — with zero technical complexity.'
  },
  {
    q: 'How is confidential campaign and voter data protected?',
    a: 'We uphold a strict zero-disclosure pledge. All voter surveys and campaign metrics are encrypted using bank-grade 256-bit SSL cryptography. The candidate and campaign administration maintain 100% proprietary ownership with full export rights, and data is never sold or shared with any external entity.'
  },
  {
    q: 'Can field karyakartas with basic smartphones use the platform easily?',
    a: 'Yes. The interface is purposefully built with clean, large touch targets, minimal bandwidth consumption, and intuitive Hindi-English friendly phrasing. Field workers can submit activity updates and check-ins within seconds.'
  },
  {
    q: 'How does the Territory Affiliate program and the 40% commission work?',
    a: 'Authorized affiliates can reserve exclusive commercial rights for their designated assembly seat or village territory. Once registered, affiliates introduce Poll Craft Analytics products to prospective representatives and earn an immediate 40% payout on all confirmed bookings.'
  },
  {
    q: 'How quickly can our campaign war-room get onboarded?',
    a: 'Onboarding is instantaneous. Once an account is activated, your leadership team can begin configuring booths, creating volunteer roles, and distributing activities on the very same day.'
  }
];

const GET_STARTED_OPTIONS = [
  {
    icon: LayoutDashboard,
    title: 'Explore Product Suite',
    desc: 'Discover our 7 purpose-built digital modules designed for ground coordination, voter analytics, and war-room intelligence.',
    btnText: 'View All Products',
    href: '/products',
    primary: true
  },
  {
    icon: MapPin,
    title: 'Lock Territory Seat',
    desc: 'Check live availability for your assembly constituency or village territory and lock exclusive commercial access.',
    btnText: 'Check Territory Seats',
    href: '/seats',
    primary: false
  },
  {
    icon: UserPlus,
    title: 'Become an Affiliate',
    desc: 'Partner with Poll Craft Analytics in your region and tap into attractive territory opportunities with 40% revenue share.',
    btnText: 'Join Affiliate Program',
    href: '/join',
    primary: false
  },
  {
    icon: MessageSquare,
    title: 'Contact Campaign Advisory',
    desc: 'Have specific constituency requirements or seeking platform demonstration? Connect directly with our solutions team.',
    btnText: 'Get in Touch',
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
            
            {/* Trust Badge Pill */}
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '8px 20px', 
                borderRadius: '99px', 
                background: 'rgba(245, 158, 11, 0.12)', 
                border: '1px solid rgba(245, 158, 11, 0.35)', 
                color: 'var(--gold)', 
                marginBottom: '20px', 
                fontSize: '0.88rem', 
                fontWeight: '700', 
                letterSpacing: '0.8px', 
                textTransform: 'uppercase', 
                backdropFilter: 'blur(10px)' 
              }}
            >
              <ShieldCheck size={17} /> Political Management & Ground Operations Platform
            </div>

            {/* Main Headline with impactful Word Design */}
            <h1 className="hero-h1" style={{ maxWidth: '980px', margin: '0 auto 20px', fontSize: 'clamp(2.4rem, 5.5vw, 4.1rem)', lineHeight: '1.16', fontWeight: '900', letterSpacing: '-1px' }}>
              Manage Your Area, Team & Ground Operations{' '}
              <span className="hero-gradient-text">
                in One Place
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="hero-sub fade-in delay-1" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: 'rgba(255, 255, 255, 0.88)', lineHeight: '1.7', maxWidth: '820px', margin: '0 auto 28px', fontWeight: '400' }}>
              Poll Craft Analytics equips political representatives, candidates, and campaign teams with a unified digital command center to coordinate booth workers, verify field activities, and organize ground intelligence systematically.
            </p>

            {/* Hero CTAs */}
            <div className="hero-btns fade-in delay-2" style={{ gap: '14px', justifyContent: 'center' }}>
              <Link 
                className="btn" 
                href="/products" 
                style={{ padding: '16px 32px', fontSize: '1.05rem', fontWeight: '700', boxShadow: '0 8px 24px rgba(245, 158, 11, 0.35)' }}
              >
                <LayoutDashboard size={20} className="nav-icon" /> Explore Our Products
              </Link>
              <Link 
                className="btn g" 
                href="/seats" 
                style={{ padding: '16px 28px', fontSize: '1.05rem', background: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.25)', fontWeight: '600', backdropFilter: 'blur(8px)' }}
              >
                <MapPin size={20} className="nav-icon" style={{ color: 'var(--gold)' }} /> Check Territory Seats
              </Link>
              <Link 
                className="btn o" 
                href="/join" 
                style={{ padding: '16px 28px', fontSize: '1.05rem', color: '#fff', borderColor: 'rgba(255, 255, 255, 0.35)', fontWeight: '600', backdropFilter: 'blur(8px)' }}
              >
                <UserPlus size={20} className="nav-icon" /> Become an Affiliate
              </Link>
            </div>

            {/* Interactive Visual Command Center Preview Card */}
            <div className="hero-mockup-card fade-in delay-3">
              {/* Header bar of Mockup */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.6)', marginLeft: '8px', fontWeight: '600' }}>
                    Poll Craft Analytics Command Terminal • v2.6 Live
                  </span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.78rem', color: '#34d399', fontWeight: '700' }}>
                  <span className="pulse-dot" /> Live Ground Feed Active
                </div>
              </div>

              {/* 3 Metric Summary Tiles */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Booth Incharges</span>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff', margin: '4px 0', fontFamily: "'Outfit', sans-serif" }}>1,480+ Active</div>
                  <span style={{ fontSize: '0.8rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <TrendingUp size={13} /> 96.4% Check-in Rate Today
                  </span>
                </div>

                <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Verified Ground Activities</span>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--gold)', margin: '4px 0', fontFamily: "'Outfit', sans-serif" }}>384 Logged</div>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={13} style={{ color: 'var(--gold)' }} /> Door-to-Door & Rallies
                  </span>
                </div>

                <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Voter Registry Security</span>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#60a5fa', margin: '4px 0', fontFamily: "'Outfit', sans-serif" }}>256-Bit SSL</div>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Lock size={13} style={{ color: '#60a5fa' }} /> Zero External Data Sharing
                  </span>
                </div>
              </div>

              {/* Ticker of Recent Activity */}
              <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', fontSize: '0.84rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={15} style={{ color: 'var(--gold)' }} />
                  <strong>Recent Dispatch:</strong> Ward 18 door-to-door survey completed with 142 household records verified.
                </span>
                <Link href="/products" style={{ color: 'var(--gold)', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  View System Details <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Trust Highlights Pill Strip */}
            <div className="hero-trust fade-in delay-3" style={{ marginTop: '28px', padding: '10px 24px', borderRadius: '99px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#fff', fontWeight: '600' }}>
                <CheckSquare size={16} style={{ color: 'var(--gold)' }} /> Area Management
              </span>
              <span style={{ opacity: 0.35 }}>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#fff', fontWeight: '600' }}>
                <Users size={16} style={{ color: 'var(--blue)' }} /> Team Coordination
              </span>
              <span style={{ opacity: 0.35 }}>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#fff', fontWeight: '600' }}>
                <BarChart3 size={16} style={{ color: '#10b981' }} /> Ground-Level Reporting
              </span>
              <span style={{ opacity: 0.35 }}>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#fff', fontWeight: '600' }}>
                <Lock size={16} style={{ color: '#a78bfa' }} /> Bank-Grade Privacy
              </span>
            </div>

          </div>
        </div>
      </header>


      {/* ── 2. METRICS & IMPACT BAR ── */}
      <section style={{ background: '#020617', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '36px 0' }}>
        <div className="w">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {METRICS_BAR.map(({ val, label, sub }) => (
              <div key={label} style={{ textAlign: 'center', padding: '12px' }}>
                <div style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', fontWeight: '900', color: 'var(--gold)', fontFamily: "'Outfit', sans-serif", lineHeight: 1.1, marginBottom: '6px' }}>
                  {val}
                </div>
                <div style={{ color: '#fff', fontWeight: '700', fontSize: '1.02rem', marginBottom: '2px' }}>
                  {label}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.86rem' }}>
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 3. KEY SOLUTIONS & MODULES ── */}
      <section className="sec alt" id="solutions">
        <div className="w">
          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '32px', padding: 'clamp(32px, 5vw, 64px)', boxShadow: '0 24px 48px rgba(0,0,0,0.03)' }}>
            
            {/* Section Overview Header */}
            <div style={{ maxWidth: '860px', margin: '0 auto 48px', textAlign: 'center' }}>
              <span className="tag" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--blue)', marginBottom: '16px' }}>
                Unified Digital Suite
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', lineHeight: '1.25', margin: '0 0 16px', letterSpacing: '-0.5px' }}>
                Political Management Made Simple and Organized
              </h2>
              <p style={{ color: 'var(--text)', fontSize: '1.15rem', lineHeight: '1.75', margin: '0 0 12px', fontWeight: '600' }}>
                Managing people, volunteer teams, field activities, and voter information across different areas can be complex and chaotic.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.75', margin: 0 }}>
                Poll Craft Analytics consolidates essential ground operations into one synchronized digital platform — helping leaders coordinate daily work, monitor activities, and review verified reports with clarity.
              </p>
            </div>

            {/* Sub-heading for Solutions */}
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <h3 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--h)', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
                7 Specialized Core Modules
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '1.02rem', margin: 0 }}>
                Tailored digital tools built for seamless coordination and empirical field insights
              </p>
            </div>

            {/* Bento Grid: 1 Featured Banner + 6 Balanced Solution Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Featured 01: Dashboard & Ground Reports */}
              <div
                style={{
                  padding: 'clamp(28px, 4vw, 40px)',
                  background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
                  borderRadius: '24px',
                  border: '1px solid rgba(59, 130, 246, 0.35)',
                  color: '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '24px',
                  boxShadow: '0 16px 36px rgba(0,0,0,0.25)'
                }}
              >
                <div style={{ maxWidth: '680px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(59, 130, 246, 0.2)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
                      <LayoutDashboard size={24} />
                    </div>
                    <span className="tag" style={{ background: 'rgba(59, 130, 246, 0.25)', color: '#60a5fa', fontSize: '0.8rem', fontWeight: '800' }}>
                      01 • {featuredSolution.tag}
                    </span>
                  </div>

                  <h4 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '900', color: '#fff', margin: '0 0 12px', lineHeight: '1.3' }}>
                    {featuredSolution.title}
                  </h4>

                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.05rem', lineHeight: '1.7', margin: '0 0 20px' }}>
                    {featuredSolution.desc}
                  </p>

                  {/* Bullet Highlights */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    {featuredSolution.features.map((f) => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Link
                    href="/products"
                    className="btn"
                    style={{
                      padding: '16px 28px',
                      fontSize: '1rem',
                      fontWeight: '700',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Explore Dashboard Suite <ArrowRight size={16} className="nav-icon" />
                  </Link>
                </div>
              </div>

              {/* 6 Grid Solutions (02 to 07) */}
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '22px' }}>
                {otherSolutions.map(({ num, icon: Icon, title, desc, tag, color, features }) => (
                  <div
                    key={title}
                    style={{
                      padding: '28px',
                      background: 'var(--pale)',
                      borderRadius: '22px',
                      border: '1px solid var(--line)',
                      borderTop: `4px solid ${color}`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div>
                      {/* Card Top Row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
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

                      <p style={{ color: 'var(--muted)', fontSize: '0.96rem', lineHeight: '1.65', margin: '0 0 18px' }}>
                        {desc}
                      </p>

                      {/* Feature Bullet Points */}
                      <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {features.map((feat) => (
                          <div key={feat} className="feature-bullet-item">
                            <CheckCircle2 size={15} style={{ color: color }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                      <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.92rem', fontWeight: '700', color: color, textDecoration: 'none' }}>
                        View Detailed Module <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ── 4. LIVE TERRITORY & SEATS ALLOCATION (CONNECTED DIRECTLY) ── */}
      <section className="sec" id="seats" style={{ background: '#f8fafc' }}>
        <div className="w">
          <div className="sec-header" style={{ marginBottom: '40px' }}>
            <span className="tag" style={{ background: 'rgba(245, 158, 11, 0.12)', color: 'var(--gold)', marginBottom: '16px' }}>
              <MapPin size={14} className="nav-icon" /> Territory Exclusivity System
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '900', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
              Live Territory & Assembly Seats Allocation
            </h2>
            <p style={{ maxWidth: '720px', margin: '0 auto', fontSize: '1.08rem' }}>
              Each approved assembly constituency and village territory has dedicated operational rights. Check real-time seat availability below or reserve your territory.
            </p>
          </div>

          {/* Connected Live Component */}
          <SeatsPreview />
        </div>
      </section>


      {/* ── 5. WHO CAN BENEFIT FROM POLL CRAFT ANALYTICS? ── */}
      <section className="sec alt" id="audience">
        <div className="w">
          <div className="sec-header">
            <span className="tag" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--blue)', marginBottom: '16px' }}>
              Stakeholder Benefits
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '900', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
              Who Can Benefit from Poll Craft Analytics?
            </h2>
            <p style={{ maxWidth: '720px', margin: '0 auto', fontSize: '1.08rem' }}>
              Engineered specifically for elected representatives, panchayat leaders, campaign teams, and authorized territory partners.
            </p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
            {BENEFIT_GROUPS.map(({ icon: Icon, title, desc, badge, color, bullets }, i) => (
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
                    <span className="tag" style={{ background: `${color}15`, color: color, fontSize: '0.78rem', fontWeight: '700' }}>
                      {badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '12px', lineHeight: '1.35', color: 'var(--h)' }}>
                    {title}
                  </h3>

                  <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: '1.65', margin: '0 0 18px' }}>
                    {desc}
                  </p>

                  {/* Bullet Benefits */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                    {bullets.map((b) => (
                      <div key={b} className="feature-bullet-item">
                        <CheckCircle2 size={14} style={{ color: color }} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                  <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.92rem', fontWeight: '700', color: color, textDecoration: 'none' }}>
                    Explore Solutions <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 6. HOW IT WORKS (3-STEP SIMPLE WORKFLOW) ── */}
      <section className="sec" style={{ paddingTop: '20px', paddingBottom: '70px' }}>
        <div className="w">
          <div className="sec-header" style={{ marginBottom: '48px' }}>
            <span className="tag" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', marginBottom: '16px' }}>
              Execution Roadmap
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '900', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
              How Poll Craft Analytics Works
            </h2>
            <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.08rem' }}>
              A straightforward 3-step pathway to transform unorganized ground efforts into a synchronized digital operation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px' }}>
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div 
                key={step} 
                style={{ 
                  background: 'var(--card)', 
                  border: '1px solid var(--line)', 
                  borderRadius: '24px', 
                  padding: '32px 28px', 
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ fontSize: '3.2rem', fontWeight: '900', color: 'rgba(245, 158, 11, 0.2)', fontFamily: "'Outfit', sans-serif", lineHeight: 1, marginBottom: '14px' }}>
                  {step}
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--h)', margin: '0 0 10px' }}>
                  {title}
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.98rem', lineHeight: '1.65', margin: 0 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 7. LEARN. ORGANIZE. MANAGE. (PHILOSOPHY & SECURITY BANNER) ── */}
      <section className="sec alt" style={{ paddingTop: '30px', paddingBottom: '50px' }}>
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

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', margin: '0 auto' }}>
              <span className="tag" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--gold)', border: '1px solid rgba(245, 158, 11, 0.3)', marginBottom: '20px', padding: '6px 18px', fontSize: '0.85rem' }}>
                Guiding Principle
              </span>

              <h2 style={{ fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)', fontWeight: '900', color: '#fff', letterSpacing: '-1.5px', margin: '0 0 16px', fontFamily: "'Outfit', sans-serif" }}>
                Learn. Organize. Manage.
              </h2>

              <p style={{ fontSize: 'clamp(1.18rem, 2.2vw, 1.35rem)', color: 'rgba(255, 255, 255, 0.95)', fontWeight: '600', lineHeight: '1.6', margin: '0 0 14px' }}>
                Better organization leads to superior ground coordination and electoral confidence.
              </p>

              <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: '1.75', margin: '0 auto 36px', maxWidth: '720px' }}>
                Poll Craft Analytics bridges the gap between field volunteers and strategic war-rooms, giving you reliable access to activity logs, verified voter feedback, and actionable analytics.
              </p>

              {/* 3 Pillars Visual Showcase */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', margin: '0 auto 36px', maxWidth: '800px', textAlign: 'left' }}>
                <div style={{ padding: '18px 20px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)', fontWeight: '800', marginBottom: '4px' }}>
                    <BookOpen size={18} /> Learn
                  </div>
                  <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>Proven campaign ideas, training videos & execution blueprints</span>
                </div>

                <div style={{ padding: '18px 20px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--blue)', fontWeight: '800', marginBottom: '4px' }}>
                    <Users size={18} /> Organize
                  </div>
                  <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>Booth rosters, volunteer hierarchy & encrypted voter databases</span>
                </div>

                <div style={{ padding: '18px 20px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: '800', marginBottom: '4px' }}>
                    <TrendingUp size={18} /> Manage
                  </div>
                  <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>Door-to-door activities, milestone progress & analytics reports</span>
                </div>
              </div>

              {/* Security & Data Pledge Callout */}
              <div style={{ margin: '0 auto 36px', maxWidth: '640px', padding: '14px 20px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                <Lock size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <span style={{ color: 'rgba(255,255,255,0.9)' }}>
                  <strong>Zero Third-Party Sharing:</strong> Candidate database is 100% confidential and proprietary.
                </span>
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


      {/* ── 8. FREQUENTLY ASKED QUESTIONS (FAQS) ── */}
      <section className="sec" id="faqs" style={{ paddingTop: '40px', paddingBottom: '70px' }}>
        <div className="w">
          <div className="sec-header" style={{ marginBottom: '48px' }}>
            <span className="tag" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--blue)', marginBottom: '16px' }}>
              Common Inquiries
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '900', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.08rem' }}>
              Get quick, transparent answers regarding platform features, data security, and partnership options.
            </p>
          </div>

          <div className="faq-list">
            {FAQ_ITEMS.map(({ q, a }, idx) => (
              <details className="faq-item" key={q} open={idx === 0}>
                <summary>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <HelpCircle size={20} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                    <span>{q}</span>
                  </span>
                  <ChevronRight size={18} className="faq-chevron" />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>


      {/* ── 9. GET STARTED / ACTION HUB ── */}
      <section className="sec alt" id="get-started" style={{ paddingTop: '30px', paddingBottom: '80px' }}>
        <div className="w">
          <div className="sec-header" style={{ marginBottom: '48px' }}>
            <span className="tag" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', marginBottom: '16px' }}>
              Take Action
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '900', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
              Get Started with Poll Craft Analytics
            </h2>
            <p style={{ maxWidth: '760px', margin: '0 auto', fontSize: '1.08rem' }}>
              Whether you are an elected representative, campaign candidate, war-room analyst, or interested in becoming an affiliate, we have tailored paths to get started immediately.
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
                    fontWeight: '700',
                    textDecoration: 'none'
                  }}
                >
                  {btnText} <ArrowRight size={16} className="nav-icon" style={{ marginLeft: '6px' }} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
