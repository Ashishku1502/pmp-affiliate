'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from './AppProvider';
import { Home, Map as MapIcon, LayoutDashboard, UserPlus, User, LogOut, LogIn, MessageSquare, Info, Menu, X } from 'lucide-react';

export default function Nav() {
  const path = usePathname();
  const router = useRouter();
  const { user, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    ['/', 'Home', Home],
    ['/about', 'About Us', Info],
    ['/products', 'Products', LayoutDashboard],
    ['/seats', 'Seats', MapIcon],
    ['/contact', 'Contact', MessageSquare],
    ['/dashboard', 'Dashboard', User],
  ];

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    router.push('/');
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="main-nav">
      <div className="w nav-inner">
        {/* Brand Logo */}
        <Link className="logo" href="/" onClick={closeMobile}>
          Poll Craft Analytics<i style={{ color: 'var(--gold)' }}>.</i>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="desktop-links">
          {links.map(([h, t, Icon]) => (
            <Link key={h} href={h} className={'l' + (path === h ? ' on' : '')}>
              <Icon size={15} className="nav-icon" />{t}
            </Link>
          ))}
        </div>

        {/* Desktop Actions & Account Status */}
        <div className="desktop-actions">
          {user ? (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Link className="btn s" href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} className="nav-icon" />
                <span>{user.code || 'Dashboard'}</span>
              </Link>
              <button className="btn s o logout-btn" onClick={handleLogout} title="Logout account" aria-label="Logout">
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Link className="btn s o" href="/login" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', padding: '9px 18px' }}>
                <LogIn size={14} className="nav-icon" /> Login
              </Link>
              <Link className="btn s" href="/join" style={{ padding: '9px 20px' }}>
                <UserPlus size={14} className="nav-icon" /> Join Now
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="mobile-toggle-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Backdrop & Overlay */}
      {mobileOpen && (
        <>
          <div className="mobile-drawer-backdrop" onClick={closeMobile} aria-hidden="true" />
          <div className="mobile-drawer fade-in">
            <div className="mobile-drawer-links">
              {links.map(([h, t, Icon]) => (
                <Link 
                  key={h} 
                  href={h} 
                  className={'mobile-link' + (path === h ? ' on' : '')}
                  onClick={closeMobile}
                >
                  <Icon size={18} /> {t}
                </Link>
              ))}
            </div>

            <div className="mobile-drawer-actions">
              {user ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link className="btn" href="/dashboard" onClick={closeMobile} style={{ width: '100%' }}>
                    <User size={16} /> Dashboard ({user.code})
                  </Link>
                  <button className="btn o" onClick={handleLogout} style={{ width: '100%', color: '#ef4444', borderColor: '#ef4444' }}>
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <Link className="btn o" href="/login" onClick={closeMobile} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', width: '100%', justifyContent: 'center' }}>
                    <LogIn size={15} /> Login
                  </Link>
                  <Link className="btn" href="/join" onClick={closeMobile} style={{ width: '100%', justifyContent: 'center' }}>
                    <UserPlus size={15} /> Join Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
