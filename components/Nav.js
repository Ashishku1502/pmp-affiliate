'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from './AppProvider';
import { Home, Map as MapIcon, LayoutDashboard, UserPlus, User, LogOut } from 'lucide-react';

export default function Nav() {
  const path = usePathname();
  const router = useRouter();
  const { user, logout } = useApp();
  const links = [
    ['/', 'Home', Home],
    ['/seats', 'Seats', MapIcon],
    ['/dashboard', 'Dashboard', LayoutDashboard],
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav><div className="w">
      <Link className="logo" href="/">PMP<i>.</i></Link>
      {links.map(([h, t, Icon]) => (
        <Link key={h} href={h} className={'l' + (path === h ? ' on' : '')}>
          <Icon size={15} className="nav-icon" />{t}
        </Link>
      ))}
      {user ? (
        <>
          <Link className="btn s" href="/dashboard">
            <User size={13} className="nav-icon" />{user.code}
          </Link>
          <button className="btn s o logout-btn" onClick={handleLogout} title="Logout karein">
            <LogOut size={15} />
          </button>
        </>
      ) : (
        <Link className="btn s" href="/join">
          <UserPlus size={13} className="nav-icon" />Join
        </Link>
      )}
    </div></nav>
  );
}
