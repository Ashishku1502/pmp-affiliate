'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Mail, Phone, MapPin, Send, CheckCircle, RotateCcw,
  User, Building, Clock, ShieldCheck, MessageSquare, ArrowRight
} from 'lucide-react';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', category: 'Representative', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: '#fff', paddingTop: 'clamp(72px, 10vw, 110px)', paddingBottom: 'clamp(40px, 8vw, 80px)' }}>
      
      {/* ── HEADER ── */}
      <section className="sec" style={{ paddingTop: '20px', paddingBottom: '36px' }}>
        <div className="w" style={{ textAlign: 'center' }}>
          <span className="tag" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', border: '1px solid rgba(236, 72, 153, 0.3)', marginBottom: '16px' }}>
            <MessageSquare size={16} className="nav-icon" /> Get in Touch
          </span>
          
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: '900', color: '#fff', letterSpacing: '-1px', marginBottom: '16px' }}>
            Contact Us & Technical Support
          </h1>
          
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', maxWidth: '720px', margin: '0 auto', lineHeight: '1.7' }}>
            Poll Craft Analytics team se sampark karein. Apni requirement bhariye ya hamare contact details ke zariye direct support paayein.
          </p>
        </div>
      </section>

      <div className="w">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '32px', alignItems: 'start' }}>
          
          {/* ── LEFT: CONTACT DETAILS & INFO CARDS ── */}
          <div>
            <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '24px', padding: 'clamp(20px, 4vw, 36px)', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Contact Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Phone */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(59, 130, 246, 0.15)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
                      Phone / Whatsapp Support
                    </span>
                    <strong style={{ fontSize: '1.1rem', color: '#fff' }}>+91 98765 43210</strong>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: '4px 0 0' }}>Mon - Sat: 9:00 AM - 7:00 PM IST</p>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
                      Official Email Inquiry
                    </span>
                    <strong style={{ fontSize: '1.1rem', color: '#fff' }}>support@pollcraftanalytics.com</strong>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: '4px 0 0' }}>Support & Affiliate Desk</p>
                  </div>
                </div>

                {/* Office Location */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
                      Corporate Headquarters
                    </span>
                    <strong style={{ fontSize: '1.05rem', color: '#fff', lineHeight: '1.5', display: 'block' }}>
                      Poll Craft Analytics Private Limited
                    </strong>
                    <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.92rem', margin: '4px 0 0', lineHeight: '1.6' }}>
                      Cyber Technology Hub, Sector 62, Noida, Uttar Pradesh 201309, India
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Response Time & Security Promise Card */}
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <ShieldCheck size={24} style={{ color: '#10b981' }} />
                <h4 style={{ margin: 0, color: '#fff', fontSize: '1.1rem' }}>Data Privacy & Fast SLA</h4>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                Aapki details confidential aur 100% encrypted hain. Dedicated team 2-4 hours ke andar aapke query ka response degi.
              </p>
            </div>
          </div>

          {/* ── RIGHT: INQUIRY FORM ── */}
          <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '28px', padding: 'clamp(28px, 4vw, 40px)', backdropFilter: 'blur(20px)', boxShadow: '0 24px 48px rgba(0,0,0,0.4)' }}>
            <h3 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: '800', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={24} style={{ color: 'var(--gold)' }} /> Send Us an Inquiry
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.98rem', marginBottom: '28px' }}>
              Apni requirement ke matching details bhariye. Hamari team aapse turant sampark karegi.
            </p>

            {formSubmitted ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', padding: '36px', borderRadius: '20px', color: '#fff', textAlign: 'center' }}>
                <CheckCircle size={52} style={{ color: '#10b981', margin: '0 auto 16px', display: 'block' }} />
                <h4 style={{ color: '#fff', margin: '0 0 10px', fontSize: '1.5rem', fontWeight: '800' }}>Aapka message mil gaya hai!</h4>
                <p style={{ color: 'rgba(255,255,255,0.85)', margin: '0 0 24px', fontSize: '1rem', lineHeight: '1.6' }}>
                  Poll Craft Analytics support team aap se jald hi contact karegi. Dhanyawad!
                </p>
                <button
                  type="button"
                  onClick={() => { setFormSubmitted(false); setFormData({ name: '', phone: '', category: 'Representative', message: '' }); }}
                  className="btn o"
                  style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', padding: '12px 24px', fontSize: '0.95rem' }}
                >
                  <RotateCcw size={16} className="nav-icon" /> Naya Message Bhejein
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                    <User size={15} style={{ color: 'var(--gold)' }} /> Aapka Full Naam
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Rajesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '14px 16px', borderRadius: '12px', width: '100%', fontSize: '1rem' }}
                  />
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                    <Phone size={15} style={{ color: 'var(--blue)' }} /> Mobile Number (10 Digits)
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit Mobile Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '14px 16px', borderRadius: '12px', width: '100%', fontSize: '1rem' }}
                  />
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                    <Building size={15} style={{ color: '#10b981' }} /> Aapka Category Select Karein
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ background: 'rgba(15, 23, 42, 0.95)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '14px 16px', borderRadius: '12px', width: '100%', fontSize: '1rem' }}
                  >
                    <option value="Representative">Political Representative (MLA / Pradhan / Zila Panchayat)</option>
                    <option value="Candidate">Political Candidate</option>
                    <option value="Affiliate">Technology Affiliate Business Partner</option>
                    <option value="General">General Inquiry</option>
                  </select>
                </div>

                <div style={{ marginBottom: '26px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                    <Send size={15} style={{ color: '#ec4899' }} /> Message / Requirement Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Apne area aur requirement ke baare mein likhein..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '14px 16px', borderRadius: '12px', width: '100%', fontSize: '1rem', resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn" style={{ width: '100%', padding: '16px', fontSize: '1.1rem', borderRadius: '14px' }}>
                  <Send size={18} className="nav-icon" /> Inquiry Bhejein
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
