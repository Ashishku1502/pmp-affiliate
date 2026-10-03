import Link from 'next/link';
import { COMM, PRICE, PLAN, R } from '@/lib/constants';
import {
  UserCheck, MapPin, FileText, Wallet,
  TrendingUp, Map as MapIcon, BookOpen,
  UserPlus, ArrowRight, Lock, Zap, Award,
  IndianRupee, ShieldCheck, HelpCircle, Star, ChevronDown,
} from 'lucide-react';

const STEPS = [
  { icon: UserCheck, title: 'Affiliate banein', desc: 'Details, OTP, area aur plan chuniye. Payment ke baad aapka Affiliate Code ban jata hai.' },
  { icon: MapPin,    title: 'Seat book kijiye', desc: 'MLA ya Pradhan ki seat chuniye, candidate ki details bhariye aur OTP se verify kijiye.' },
  { icon: FileText,  title: 'Candidate plan le', desc: 'Candidate PMP plan leta hai. Payment booking ke time ya baad mein ho sakti hai.' },
  { icon: Wallet,    title: 'Payout paayein', desc: 'Seat Paid hote hi aapka commission dashboard mein aa jata hai.' },
];

const BENEFITS = [
  [IndianRupee, `${COMM}% commission har successful sale par`],
  [MapPin,      'Exclusive territory lock — sirf aap kaam karenge'],
  [BookOpen,    'Free DRM Training Course included'],
  [TrendingUp,  'Real-time earnings dashboard'],
  [MapIcon,     'MLA aur Pradhan dono seats book kar sakte hain'],
  [Award,       'Verified Affiliate Code milta hai'],
];

const FAQ = [
  ['Affiliate banne ke liye kya chahiye?',
   'Aapka naam, 10 ank ka mobile number aur KYC (Aadhaar/PAN) chahiye. Ek refundable security deposit bhi lagta hai jo baad mein wapas milta hai.'],
  ['Commission kab milta hai?',
   'Jab aapki booked seat ka payment complete ho jata hai, turant aapke dashboard mein commission dikh jata hai. Koi delay nahi.'],
  ['Security deposit wapas milta hai?',
   'Haan, ye deposit 100% refundable hai. Ye aapka paisa hai — program se bahar nikalne par ya kisi bhi wajah se wapas mil sakta hai.'],
  ['Ek se zyada seats book kar sakte hain?',
   'Bilkul. Aap apne territory mein jitni available seats hain, sab book kar sakte hain. Har paid seat par alag commission milta hai.'],
  ['Kya main kisi bhi area mein kaam kar sakta hoon?',
   'Haan. Freehand mode mein aap kisi bhi available seat ko book kar sakte hain. Specific Area mode mein sirf apna locked territory milta hai.'],
];

export default function Home() {
  const perSeat  = PRICE * COMM / 100;
  const example  = 5 * perSeat;

  return (<>

    {/* ── HERO ── */}
    <header className="hero">
      <div className="hero-bg-circle" />
      <div className="hero-bg-circle2" />
      <div className="w" style={{ position: 'relative', zIndex: 1 }}>

        <h1 className="hero-h1">
          Apne area ke Pradhan aur MLA ko PMP dilaiye.<br />
          <span style={{ color: 'var(--gold)' }}>Har sale par {COMM}% commission kamaiye.</span>
        </h1>
        <p className="hero-sub">
          PMP ek political operations platform hai — team, survey, training aur dashboard ek jagah.
          Aap bas customer laate hain, baaki hum sambhalte hain.
        </p>

        <div className="kpis">
          <div className="kpi">
            <TrendingUp size={22} style={{ color: 'var(--gold)', display: 'block', marginBottom: 6 }} />
            <b>{COMM}%</b><span>commission har sale par</span>
          </div>
          <div className="kpi">
            <IndianRupee size={22} style={{ color: 'var(--gold)', display: 'block', marginBottom: 6 }} />
            <b>{R(perSeat)}</b><span>per seat kamayi</span>
          </div>
          <div className="kpi">
            <MapIcon size={22} style={{ color: 'var(--gold)', display: 'block', marginBottom: 6 }} />
            <b>MLA + Pradhan</b><span>dono seats available</span>
          </div>
        </div>

        <div className="hero-btns">
          <Link className="btn hero-cta" href="/join">
            <UserPlus size={17} className="nav-icon" /> Affiliate Banein — Free
          </Link>
          <Link className="btn g" href="/seats">
            <MapIcon size={16} className="nav-icon" /> Seats dekhiye
          </Link>
        </div>
        <p className="hero-trust">
          <ShieldCheck size={13} className="nav-icon" /> KYC verified &nbsp;•&nbsp;
          Refundable deposit &nbsp;•&nbsp; 100% demo safe
        </p>
      </div>
    </header>

    {/* ── EARNINGS CALCULATOR ── */}
    <section className="sec earn-sec">
      <div className="w">
        <div className="earn-banner">
          <div className="earn-left">
            <h2 style={{ margin: 0 }}>Aap kitna kama sakte hain?</h2>
            <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>
              Example: 5 seats book ki, sab paid ho gayi
            </p>
          </div>
          <div className="earn-calc">
            <div className="earn-row">
              <span>5 seats × {R(PRICE)}</span>
              <span>{R(5 * PRICE)}</span>
            </div>
            <div className="earn-row">
              <span>{COMM}% commission aapka</span>
              <span className="earn-val">{R(example)}</span>
            </div>
          </div>
          <Link className="btn" href="/join">
            <UserPlus size={15} className="nav-icon" /> Abhi shuru karein
          </Link>
        </div>
      </div>
    </section>

    {/* ── HOW IT WORKS ── */}
    <section className="sec"><div className="w">
      <div className="sec-header">
        <h2>Aap kaise kamaayenge?</h2>
        <p>Sirf 4 simple steps. Poora process guided aur easy hai.</p>
      </div>
      <div className="how-grid">
        {STEPS.map(({ icon: Icon, title, desc }, i) => (
          <div className="how-card" key={title}>
            <div className="how-num">0{i + 1}</div>
            <div className="step-icon"><Icon size={24} /></div>
            <h3>{title}</h3>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '.95rem' }}>{desc}</p>
          </div>
        ))}
      </div>
    </div></section>

    {/* ── BENEFITS + PRICING ── */}
    <section className="sec alt"><div className="w">
      <div className="benefits-layout">

        <div>
          <h2>Affiliate banne mein aapko kya milega?</h2>
          <p style={{ color: 'var(--muted)' }}>
            Ek complete toolkit jo aapko apne area mein successful banati hai.
          </p>
          <ul className="benefits-list">
            {BENEFITS.map(([Icon, text]) => (
              <li key={text}>
                <span className="benefit-icon"><Icon size={16} /></span>
                {text}
              </li>
            ))}
          </ul>
          <Link className="btn" href="/join">
            <UserPlus size={15} className="nav-icon" /> Affiliate banein
          </Link>
        </div>

        <div className="card p pricing-card">
          <div className="tag ok" style={{ marginBottom: 12 }}>
            <Star size={11} className="nav-icon" /> Most Popular
          </div>
          <h3 style={{ marginBottom: 4 }}>Affiliate Partner</h3>
          <p style={{ color: 'var(--muted)', fontSize: '.9rem', margin: '0 0 10px' }}>
            Commission per paid seat
          </p>
          <div className="price">{R(perSeat)}</div>
          <p style={{ fontSize: '.85rem', color: 'var(--muted)', marginBottom: 16 }}>per seat · {COMM}% of {R(PRICE)}</p>
          <ul className="t">
            <li>{COMM}% commission har successful sale par</li>
            <li>Apna unique Affiliate Code</li>
            <li>Dashboard, Learnings, Bookings, Help</li>
            <li>MLA aur Pradhan seats book karne ki suvidha</li>
            <li>Territory lock (Specific ya Freehand)</li>
          </ul>
          <Link className="btn" href="/join"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <UserPlus size={15} /> Abhi join karein
          </Link>
          <p style={{ textAlign: 'center', marginTop: 10, fontSize: '.82rem', color: 'var(--muted)' }}>
            <ShieldCheck size={12} className="nav-icon" /> Deposit: {R(PLAN.fee)} · 100% refundable
          </p>
        </div>

      </div>
    </div></section>

    {/* ── TERRITORY TYPES ── */}
    <section className="sec"><div className="w">
      <div className="sec-header">
        <h2>Do tarah ka territory</h2>
        <p>Apni working style ke hisaab se choose karein.</p>
      </div>
      <div className="grid">
        <div className="card" style={{ borderTop: '4px solid var(--navy)' }}>
          <div className="step-icon" style={{ background: 'var(--pale)', color: 'var(--navy)' }}>
            <Lock size={24} />
          </div>
          <span className="tag" style={{ background: 'var(--pale)', color: 'var(--navy)', marginBottom: 12, display: 'inline-block' }}>
            Exclusive
          </span>
          <h3>Specific Area</h3>
          <p style={{ color: 'var(--muted)' }}>
            Ek ward ya territory aapke naam lock ho jati hai.
            Us area mein sirf aap kaam karenge — koi competition nahi.
          </p>
          <Link className="btn o" href="/join">
            <ArrowRight size={14} className="nav-icon" /> Ye mode chuniye
          </Link>
        </div>
        <div className="card" style={{ borderTop: '4px solid var(--gold)' }}>
          <div className="step-icon" style={{ background: '#fef3e0', color: '#a06010' }}>
            <Zap size={24} />
          </div>
          <span className="tag" style={{ background: '#fef3e0', color: '#a06010', marginBottom: 12, display: 'inline-block' }}>
            Flexible
          </span>
          <h3>Freehand</h3>
          <p style={{ color: 'var(--muted)' }}>
            Kisi bhi city ya zone mein kaam kijiye.
            Jahan seat available ho wahan book kijiye — maximum reach aur flexibility.
          </p>
          <Link className="btn" href="/join">
            <ArrowRight size={14} className="nav-icon" /> Ye mode chuniye
          </Link>
        </div>
      </div>
    </div></section>

    {/* ── FAQ ── */}
    <section className="sec alt"><div className="w">
      <div className="sec-header">
        <h2>Aksar pooche jaane wale sawaal</h2>
        <p>Koi sawaal ho toh dashboard ke Help tab mein ticket bhej sakte hain.</p>
      </div>
      <div className="faq-list">
        {FAQ.map(([q, a]) => (
          <details className="faq-item" key={q}>
            <summary>
              <HelpCircle size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              {q}
              <span className="faq-chevron"><ChevronDown size={16} /></span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </div></section>

    {/* ── FINAL CTA ── */}
    <section className="cta-section">
      <div className="w" style={{ textAlign: 'center' }}>
        <span className="tag" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', marginBottom: 20, display: 'inline-block' }}>
          <Star size={11} className="nav-icon" /> Limited seats available
        </span>
        <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem,5vw,2.8rem)', maxWidth: '14em', margin: '0 auto 16px' }}>
          Aaj hi shuru karein aur apne area mein pehle affiliate banein
        </h2>
        <p style={{ color: 'rgba(255,255,255,.65)', maxWidth: '34em', margin: '0 auto 32px', fontSize: '1.05rem' }}>
          Apne area ke MLA aur Pradhan candidates ko PMP dilaiye aur har paid seat par {R(perSeat)} kamaiye.
        </p>
        <Link className="btn" href="/join"
          style={{ fontSize: '1.05rem', padding: '15px 36px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <UserPlus size={18} /> Affiliate Banein — Free to Join
        </Link>
        <p style={{ marginTop: 18, color: 'rgba(255,255,255,.4)', fontSize: '.85rem' }}>
          <ShieldCheck size={13} className="nav-icon" />
          Secure &nbsp;•&nbsp; Refundable deposit &nbsp;•&nbsp; Cancel anytime
        </p>
      </div>
    </section>

  </>);
}
