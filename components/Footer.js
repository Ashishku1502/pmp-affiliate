'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck, ArrowRight, X, CheckCircle,
  FileText, Lock, Award, ArrowUp,
  Copy, Check, Printer, ChevronRight, Building
} from 'lucide-react';

const LEGAL_DOCS = {
  privacy: {
    id: 'privacy',
    title: 'Privacy & Voter Data Security Policy',
    tag: 'Data Protection & Cryptography',
    effectiveDate: 'Updated for 2026 Campaign Cycle',
    overview: 'Poll Craft Analytics Private Limited places highest priority on political data privacy, zero third-party disclosure, and role-based cryptographic voter record protection under the Information Technology Act.',
    points: [
      {
        heading: 'Bank-Grade 256-Bit SSL Encryption',
        desc: 'All voter surveys, karyakarta GPS coordinates, booth reports, and campaign metrics are encrypted in transit and at rest using bank-grade 256-bit SSL protocols and strict Firestore server security rules.'
      },
      {
        heading: 'Zero Third-Party Data Monetization',
        desc: 'Poll Craft Analytics operates on a strict zero-sharing pledge: we never monetize, sell, lease, or disclose voter registries, candidate demographics, or ground survey metrics to external entities, advertisers, or political competitors.'
      },
      {
        heading: 'Candidate Database Ownership & Purge Rights',
        desc: 'Authorized representatives and candidates maintain 100% proprietary ownership of their voter database and campaign intelligence. Account administrators may initiate instant CSV/JSON encrypted data export or permanent cryptographic data purge at any time.'
      },
      {
        heading: 'Role-Based Team Permissions',
        desc: 'Ground workers, booth presidents, and war-room analysts are provisioned with granular, role-based access tokens to prevent unauthorized extraction or leakage of confidential constituency data.'
      }
    ],
    highlight: 'Your constituency database is strictly private to your campaign. Neither our staff nor any external party has access to voter voting intentions or private survey feedback.'
  },
  terms: {
    id: 'terms',
    title: 'Terms & Conditions of Service',
    tag: 'Usage Governance & Platform SLA',
    effectiveDate: 'Governed under IT Act, Govt. of India',
    overview: 'Standard service rules governing software access, uptime commitments, fair usage, and platform intellectual property for campaign leadership and affiliate representatives.',
    points: [
      {
        heading: 'Authorized Representative Access',
        desc: 'Poll Craft Analytics modules are exclusively licensed to verified assembly representatives, Gram Pradhans, candidates, recognized campaign managers, and authorized affiliate partners.'
      },
      {
        heading: 'High-Availability 99.9% Uptime SLA',
        desc: 'We maintain a 99.9% cloud infrastructure availability SLA to ensure real-time mobile field reporting, worker check-ins, and live campaign analytics dashboards remain operational during critical election windows.'
      },
      {
        heading: 'Credential & Authentication Governance',
        desc: 'Account holders are strictly accountable for maintaining confidentiality of login credentials, two-factor OTP verifications, and unique affiliate security tokens.'
      },
      {
        heading: 'Proprietary Intellectual Property',
        desc: 'All platform code, analytical models, strategy frameworks, predictive algorithms, and DRM video training resources remain the exclusive intellectual property of Poll Craft Analytics Private Limited.'
      }
    ],
    highlight: 'Platform access may be suspended immediately upon detection of malicious data injection, unauthorized credential resale, or unauthorized scraping.'
  },
  agreement: {
    id: 'agreement',
    title: 'Affiliate Partner Agreement',
    tag: 'Commission & Territory Rules',
    effectiveDate: 'Official 2026 Affiliate Terms',
    overview: 'Comprehensive contractual terms detailing commercial payouts, territory locks, candidate onboarding rights, and transparent business operations for affiliate partners.',
    points: [
      {
        heading: 'Guaranteed 40% Payout Commission',
        desc: 'Verified Affiliate Partners earn a guaranteed 40% commission on every candidate onboarding and territory seat transaction processed through their registered partner account or referral link.'
      },
      {
        heading: 'Exclusive Territory Ward & Constituency Lock',
        desc: 'Under Specific Area mode, dedicated assembly constituencies or wards are locked exclusively to 1 active affiliate, preventing internal territorial competition and guaranteeing lead exclusivity.'
      },
      {
        heading: 'Instant Earnings Credit & Bank Settlement',
        desc: 'Commissions reflect in real-time inside the Partner Dashboard upon candidate seat payment verification and are disbursed directly to registered Indian bank accounts or verified UPI IDs within 3 business days.'
      },
      {
        heading: 'Flexible Freehand Multi-Zone Mode',
        desc: 'Affiliates choosing Freehand mode can onboard campaigns and candidates across unrestricted zones and state assembly regions with zero geographic restrictions.'
      }
    ],
    highlight: 'Earned partner commissions are non-reversible once candidate verification is finalized. Detailed GST invoice breakdowns are issued for each settlement.'
  },
  refund: {
    id: 'refund',
    title: 'Refund & Security Deposit Guarantee',
    tag: '100% Refundable Escrow Guarantee',
    effectiveDate: 'Zero-Risk Deposit Policy',
    overview: 'Affiliate peace of mind: our deposit policy ensures partner security funds are held in escrow and 100% refundable without deductions or hidden lock-ins.',
    points: [
      {
        heading: '100% Refundable Security Deposit (₹50,000)',
        desc: 'The partner plan deposit (₹50,000) is 100% refundable and held in a dedicated security escrow account throughout the duration of your affiliate program tenure.'
      },
      {
        heading: 'Voluntary Program Exit at Any Time',
        desc: 'Affiliates retain full liberty to terminate their partner contract at any point without forfeiture or penalty, provided no active breach of conduct is pending.'
      },
      {
        heading: 'Express Payout SLA (3 to 5 Business Days)',
        desc: 'Refund claims submitted through the Partner Dashboard or support desk are processed directly to the original bank account or UPI handle within 3 to 5 business days.'
      },
      {
        heading: 'Dedicated Escalation Desk',
        desc: 'Any refund questions receive immediate executive handling via priority inquiry or direct assistance through our verified portal.'
      }
    ],
    highlight: 'Your security deposit is never treated as a purchase fee. It remains your refundable collateral at all times.'
  }
};

export default function Footer() {
  const [activeLegalTab, setActiveLegalTab] = useState(null);
  const [copiedItem, setCopiedItem] = useState(null);

  // Modal keyboard listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveLegalTab(null);
    };

    if (activeLegalTab) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLegalTab]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (text, identifier) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else if (typeof document !== 'undefined') {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedItem(identifier);
      setTimeout(() => setCopiedItem(null), 2500);
    } catch {
      setCopiedItem(identifier);
      setTimeout(() => setCopiedItem(null), 2500);
    }
  };

  const activeDoc = activeLegalTab ? LEGAL_DOCS[activeLegalTab] : null;

  return (
    <>
      <footer className="site-footer">


        {/* ── MAIN 4-COLUMN FOOTER CONTENT ── */}
        <div className="w">
          <div className="footer-main-grid">
            
            {/* COLUMN 1: BRAND & ENTERPRISE PROFILE (Spans more space) */}
            <div>
              {/* Brand Logo */}
              <Link href="/" className="logo" style={{ fontSize: '1.55rem', marginBottom: '14px', display: 'inline-flex' }}>
                Poll Craft Analytics<i style={{ color: 'var(--gold)' }}>.</i>
              </Link>
              
              <div style={{ color: '#fff', fontSize: '0.88rem', fontWeight: '700', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building size={15} style={{ color: 'var(--gold)' }} />
                <span>Poll Craft Analytics Private Limited</span>
              </div>

              <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '20px', maxWidth: '380px' }}>
                India's premier election operations & voter intelligence platform. Empowering candidates, representatives, and karyakarta teams with field coordination, real-time analytics, and guaranteed territory affiliate partnerships.
              </p>

              {/* Trust & Compliance Pills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                  <ShieldCheck size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>256-Bit SSL Encrypted & Role-Based Access</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                  <Lock size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <span>Zero Third-Party Data Sharing Guarantee</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                  <span className="pulse-dot" />
                  <span>99.9% High-Availability Cloud Infrastructure</span>
                </div>
              </div>

              {/* Contact Helpdesk Link */}
              <div style={{ marginTop: '16px' }}>
                <Link
                  href="/contact"
                  className="btn s o"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    color: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                    fontSize: '0.86rem'
                  }}
                >
                  <ArrowRight size={14} /> Contact & Support Desk
                </Link>
              </div>

            </div>


            {/* COLUMN 2: DIGITAL PRODUCTS & SOFTWARE MODULES */}
            <div>
              <h4 className="footer-col-title">
                Platform Modules
              </h4>
              <ul className="footer-link-list">
                <li>
                  <Link href="/products" className="footer-nav-link">
                    <ChevronRight size={14} /> Ground Reports & KPI Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="footer-nav-link">
                    <ChevronRight size={14} /> Team & Karyakarta Coordination
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="footer-nav-link">
                    <ChevronRight size={14} /> Field Activity & Rally Tracker
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="footer-nav-link">
                    <ChevronRight size={14} /> Encrypted Voter Data Security
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="footer-nav-link">
                    <ChevronRight size={14} /> Video Training & Strategy Library
                  </Link>
                </li>
                <li>
                  <Link href="/seats" className="footer-nav-link">
                    <ChevronRight size={14} /> Constituency Territory Allocator
                  </Link>
                </li>
              </ul>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <h5 style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                  Quick Navigation
                </h5>
                <ul className="footer-link-list">
                  <li><Link href="/" className="footer-nav-link"><ChevronRight size={14} /> Home Page</Link></li>
                  <li><Link href="/about" className="footer-nav-link"><ChevronRight size={14} /> About Company</Link></li>
                  <li><Link href="/contact" className="footer-nav-link"><ChevronRight size={14} /> Contact & Support</Link></li>
                </ul>
              </div>
            </div>


            {/* COLUMN 3: PARTNER PROGRAM & LEGAL POLICIES */}
            <div>
              <h4 className="footer-col-title">
                <Award size={16} style={{ color: 'var(--blue)' }} />
                Partner Program
              </h4>
              <ul className="footer-link-list">
                <li>
                  <Link href="/join" className="footer-nav-link">
                    <ChevronRight size={14} /> Affiliate Registration
                  </Link>
                </li>
                <li>
                  <Link href="/seats" className="footer-nav-link">
                    <ChevronRight size={14} /> Territory Seat Lock (40% Cut)
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="footer-nav-link">
                    <ChevronRight size={14} /> Affiliate Partner Login
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="footer-nav-link">
                    <ChevronRight size={14} /> Partner Earnings Dashboard
                  </Link>
                </li>
              </ul>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <h5 style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                  Legal & Governance
                </h5>
                <ul className="footer-link-list">
                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveLegalTab('privacy')}
                      className="footer-nav-link"
                      aria-label="Open Privacy Policy"
                    >
                      <ChevronRight size={14} /> Privacy & Data Policy
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveLegalTab('terms')}
                      className="footer-nav-link"
                      aria-label="Open Terms and Conditions"
                    >
                      <ChevronRight size={14} /> Terms & Conditions
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveLegalTab('agreement')}
                      className="footer-nav-link"
                      aria-label="Open Affiliate Partner Agreement"
                    >
                      <ChevronRight size={14} /> Partner Agreement (40%)
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveLegalTab('refund')}
                      className="footer-nav-link"
                      aria-label="Open Refund Policy"
                    >
                      <ChevronRight size={14} /> Refund & Deposit Policy
                    </button>
                  </li>
                </ul>
              </div>
            </div>




          </div>


          {/* ── BOTTOM BAR WITH COPYRIGHT, COMPLIANCE & BACK TO TOP ── */}
          <div className="footer-bottom-bar">
            
            {/* Copyright & Legal Entity */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ color: 'rgba(255, 255, 255, 0.85)', fontWeight: '600', fontSize: '0.9rem' }}>
                © {new Date().getFullYear()} Poll Craft Analytics Private Limited. All rights reserved.
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.45)' }}>
                CIN / Reg. Enterprise • Compliant with Indian Information Technology & Election Laws
              </div>
            </div>

            {/* Quick Legal Policy Links */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '14px', fontSize: '0.86rem' }}>
              <button
                type="button"
                onClick={() => setActiveLegalTab('privacy')}
                style={{ background: 'none', border: 0, padding: 0, color: 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >
                Privacy Policy
              </button>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
              <button
                type="button"
                onClick={() => setActiveLegalTab('terms')}
                style={{ background: 'none', border: 0, padding: 0, color: 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >
                Terms of Service
              </button>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
              <button
                type="button"
                onClick={() => setActiveLegalTab('agreement')}
                style={{ background: 'none', border: 0, padding: 0, color: 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >
                Affiliate Agreement
              </button>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
              <button
                type="button"
                onClick={() => setActiveLegalTab('refund')}
                style={{ background: 'none', border: 0, padding: 0, color: 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >
                Refund Guarantee
              </button>
            </div>

            {/* Back To Top & Made In India badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Made in India 🇮🇳
              </span>
              <button
                type="button"
                onClick={scrollToTop}
                className="back-to-top-btn"
                aria-label="Scroll back to top of page"
                title="Back to Top"
              >
                <ArrowUp size={16} /> Top
              </button>
            </div>

          </div>

        </div>
      </footer>


      {/* ── FULLY FUNCTIONAL LEGAL DOCUMENT MODAL ── */}
      {activeLegalTab && activeDoc && (
        <div
          onClick={() => setActiveLegalTab(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(2, 6, 23, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(12px, 3vw, 24px)',
            animation: 'fadeIn 0.25s ease'
          }}
          aria-modal="true"
          role="dialog"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#0f172a',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              borderRadius: '24px',
              maxWidth: '740px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 'clamp(20px, 4vw, 36px)',
              color: '#fff',
              position: 'relative',
              boxShadow: '0 32px 64px -12px rgba(0,0,0,0.7)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Modal Header & Close */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', gap: '16px' }}>
              <div>
                <span className="footer-badge" style={{ background: 'rgba(245,158,11,0.15)', borderColor: 'rgba(245,158,11,0.3)', color: 'var(--gold)', marginBottom: '8px' }}>
                  {activeDoc.tag}
                </span>
                <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.85rem)', color: '#fff', margin: '4px 0', fontWeight: '800', fontFamily: "'Outfit', sans-serif" }}>
                  {activeDoc.title}
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' }}>
                  {activeDoc.effectiveDate} • Poll Craft Analytics Private Limited
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveLegalTab(null)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#fff',
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.2s'
                }}
                aria-label="Close document modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Switch Tabs inside modal */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <button
                type="button"
                onClick={() => setActiveLegalTab('privacy')}
                style={{
                  padding: '7px 14px',
                  borderRadius: '10px',
                  border: '1px solid',
                  fontSize: '0.84rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  background: activeLegalTab === 'privacy' ? 'var(--gold)' : 'rgba(255,255,255,0.05)',
                  borderColor: activeLegalTab === 'privacy' ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                  color: activeLegalTab === 'privacy' ? '#0f172a' : 'rgba(255,255,255,0.8)'
                }}
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setActiveLegalTab('terms')}
                style={{
                  padding: '7px 14px',
                  borderRadius: '10px',
                  border: '1px solid',
                  fontSize: '0.84rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  background: activeLegalTab === 'terms' ? 'var(--gold)' : 'rgba(255,255,255,0.05)',
                  borderColor: activeLegalTab === 'terms' ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                  color: activeLegalTab === 'terms' ? '#0f172a' : 'rgba(255,255,255,0.8)'
                }}
              >
                Terms of Service
              </button>
              <button
                type="button"
                onClick={() => setActiveLegalTab('agreement')}
                style={{
                  padding: '7px 14px',
                  borderRadius: '10px',
                  border: '1px solid',
                  fontSize: '0.84rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  background: activeLegalTab === 'agreement' ? 'var(--gold)' : 'rgba(255,255,255,0.05)',
                  borderColor: activeLegalTab === 'agreement' ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                  color: activeLegalTab === 'agreement' ? '#0f172a' : 'rgba(255,255,255,0.8)'
                }}
              >
                Affiliate Agreement
              </button>
              <button
                type="button"
                onClick={() => setActiveLegalTab('refund')}
                style={{
                  padding: '7px 14px',
                  borderRadius: '10px',
                  border: '1px solid',
                  fontSize: '0.84rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  background: activeLegalTab === 'refund' ? 'var(--gold)' : 'rgba(255,255,255,0.05)',
                  borderColor: activeLegalTab === 'refund' ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                  color: activeLegalTab === 'refund' ? '#0f172a' : 'rgba(255,255,255,0.8)'
                }}
              >
                Refund Policy
              </button>
            </div>

            {/* Document Overview Description */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px 18px', marginBottom: '22px' }}>
              <p style={{ margin: 0, fontSize: '0.94rem', color: 'rgba(255,255,255,0.9)', lineHeight: '1.65' }}>
                {activeDoc.overview}
              </p>
            </div>

            {/* Document Clauses & Detail points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {activeDoc.points.map((pt, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'flex-start',
                    background: 'rgba(2, 6, 23, 0.45)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '14px',
                    padding: '14px 16px'
                  }}
                >
                  <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <strong style={{ fontSize: '0.98rem', color: '#fff', display: 'block', marginBottom: '4px' }}>
                      {idx + 1}. {pt.heading}
                    </strong>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.6' }}>
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Guarantee Highlight Box */}
            {activeDoc.highlight && (
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '14px', padding: '14px 18px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ShieldCheck size={20} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.9)', lineHeight: '1.5' }}>
                  <strong>Key Guarantee: </strong>{activeDoc.highlight}
                </span>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => copyToClipboard(window?.location?.href || 'https://pollcraftanalytics.com', 'link')}
                  className="btn o"
                  style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)', padding: '9px 16px', fontSize: '0.86rem' }}
                >
                  {copiedItem === 'link' ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedItem === 'link' ? 'Link Copied' : 'Share Link'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => typeof window !== 'undefined' && window.print()}
                  className="btn o"
                  style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)', padding: '9px 16px', fontSize: '0.86rem' }}
                >
                  <Printer size={14} /> Print Policy
                </button>
              </div>

              <button
                type="button"
                className="btn"
                onClick={() => setActiveLegalTab(null)}
                style={{ padding: '10px 24px', fontSize: '0.92rem' }}
              >
                Close Document
              </button>
            </div>

          </div>
        </div>
      )}

    </>
  );
}
