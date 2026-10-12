'use client';
import { useApp } from '@/components/AppProvider';
import { MapPin, Building, Home, CheckCircle2, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const DEFAULT_SEATS = [
  { id: 0, t: 'MLA', a: 'Budhana', by: null },
  { id: 1, t: 'Pradhan', a: 'Budhana', by: null },
  { id: 2, t: 'Pradhan', a: 'Charthawal', by: null },
  { id: 3, t: 'MLA', a: 'Khatauli', by: null },
  { id: 4, t: 'Pradhan', a: 'Khatauli', by: null },
  { id: 5, t: 'Pradhan', a: 'Purkazi', by: null },
];

export default function SeatsPreview() {
  const { seats } = useApp();
  
  // Show first 6 seats as a preview (SSR compatible)
  const activeSeats = (seats && seats.length > 0) ? seats : DEFAULT_SEATS;
  const previewSeats = activeSeats.slice(0, 6);

  return (
    <div>
      <div 
        className="grid" 
        style={{ 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', 
          gap: '20px' 
        }}
      >
        {previewSeats.map((s) => {
          const isBooked = Boolean(s.by);
          return (
            <div 
              key={s.id} 
              style={{ 
                background: isBooked ? 'var(--pale)' : '#fff', 
                border: isBooked ? '1px solid var(--line)' : '1px solid rgba(245, 158, 11, 0.35)', 
                borderRadius: '20px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isBooked ? 'none' : '0 10px 25px rgba(245, 158, 11, 0.06)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Highlight ribbon for available seats */}
              {!isBooked && (
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    height: '4px', 
                    background: 'linear-gradient(90deg, var(--gold), #f59e0b)' 
                  }} 
                />
              )}

              <div>
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <div 
                      style={{ 
                        width: '38px', 
                        height: '38px', 
                        borderRadius: '10px', 
                        background: s.t === 'MLA' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(245, 158, 11, 0.12)', 
                        color: s.t === 'MLA' ? 'var(--blue)' : 'var(--gold)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                    >
                      {s.t === 'MLA' ? <Building size={18} /> : <Home size={18} />}
                    </div>
                    <div>
                      <span 
                        style={{ 
                          fontSize: '0.78rem', 
                          fontWeight: '700', 
                          color: 'var(--muted)', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.6px' 
                        }}
                      >
                        {s.t === 'MLA' ? 'Assembly Seat' : 'Gram Pradhan Seat'}
                      </span>
                    </div>
                  </div>

                  {isBooked ? (
                    <span 
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '6px', 
                        padding: '4px 10px', 
                        borderRadius: '99px', 
                        background: 'rgba(100, 116, 139, 0.12)', 
                        color: 'var(--muted)', 
                        fontSize: '0.8rem', 
                        fontWeight: '700' 
                      }}
                    >
                      <Lock size={12} /> Reserved
                    </span>
                  ) : (
                    <span 
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '6px', 
                        padding: '4px 12px', 
                        borderRadius: '99px', 
                        background: 'rgba(16, 185, 129, 0.12)', 
                        color: '#059669', 
                        fontSize: '0.8rem', 
                        fontWeight: '700' 
                      }}
                    >
                      <span className="pulse-dot" style={{ width: '6px', height: '6px' }} /> Available
                    </span>
                  )}
                </div>

                {/* Constituency Name */}
                <h4 
                  style={{ 
                    fontSize: '1.35rem', 
                    fontWeight: '800', 
                    color: 'var(--h)', 
                    margin: '0 0 6px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px' 
                  }}
                >
                  <MapPin size={18} style={{ color: 'var(--gold)' }} />
                  {s.a}
                </h4>

                <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: '0 0 16px', lineHeight: '1.5' }}>
                  {s.t === 'MLA' 
                    ? `Assembly-level territory management & analytics rights for ${s.a}.`
                    : `Village-level local body governance & campaign unit for ${s.a}.`}
                </p>

                {/* Partner perk badge */}
                <div 
                  style={{ 
                    padding: '8px 12px', 
                    borderRadius: '10px', 
                    background: 'var(--pale)', 
                    border: '1px solid var(--line)', 
                    fontSize: '0.82rem', 
                    color: 'var(--text)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    marginBottom: '18px' 
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                    <ShieldCheck size={14} style={{ color: 'var(--gold)' }} /> Territory Exclusivity
                  </span>
                  <strong style={{ color: '#059669', fontWeight: '700' }}>40% Commission</strong>
                </div>
              </div>

              {/* Action Button */}
              <Link 
                href="/seats" 
                className={isBooked ? 'btn o' : 'btn'}
                style={{ 
                  width: '100%', 
                  fontSize: '0.92rem', 
                  padding: '12px', 
                  justifyContent: 'center',
                  fontWeight: '700',
                  textDecoration: 'none'
                }}
              >
                {isBooked ? (
                  <>View Seat Status <ArrowRight size={14} /></>
                ) : (
                  <>Lock This Territory <ArrowRight size={14} /></>
                )}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Footer link to all seats */}
      <div style={{ textAlign: 'center', marginTop: '28px' }}>
        <Link 
          href="/seats" 
          className="btn o"
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '12px 24px', 
            fontSize: '0.96rem', 
            fontWeight: '700' 
          }}
        >
          View All Available Seats & Territories <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
