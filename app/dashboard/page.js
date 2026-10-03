'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/components/AppProvider';
import { PRICE, R } from '@/lib/constants';
import {
  LayoutDashboard, Map as MapIcon, BookOpen, ClipboardList, HelpCircle,
  Settings as SettingsIcon, TrendingUp, MapPin, AlertCircle,
  Lock, Check, CheckCircle, LogOut,
} from 'lucide-react';

const TABS = ['Dashboard', 'Territory', 'Learnings', 'Bookings', 'Help', 'Settings'];
const TAB_ICONS = {
  Dashboard: LayoutDashboard,
  Territory: MapIcon,
  Learnings: BookOpen,
  Bookings: ClipboardList,
  Help: HelpCircle,
  Settings: SettingsIcon,
};
const COURSE = ['PMP ka parichay', 'Pradhan se kaise milein', 'Demo kaise dikhayein', 'OTP aur booking process', 'Commission aur payout'];

export default function Dashboard() {
  const { user, seats, mine, earned, learn, setLearn, tix, setTix, pay, logout, ready } = useApp();
  const [tab, setTab] = useState('Dashboard');
  const [msg, setMsg] = useState('');
  const router = useRouter ? useRouter() : null;
  if (!ready) return null;
  if (!user) return (
    <section className="sec"><div className="w"><div className="card"><h2>Dashboard abhi locked hai</h2>
      <p>Affiliate ID active hone par dashboard khulta hai.</p><Link className="btn" href="/join">Affiliate banein</Link></div></div></section>);

  const unp = mine.some((s) => !s.paid);
  const done = COURSE.filter((_, i) => learn[i]).length;
  const wk = [0, 0, 0, 0, 0, 0, 0]; mine.forEach((s) => { if (s.day != null) wk[s.day]++; });
  const mx = Math.max(...wk, 1);

  return (
    <section className="sec"><div className="w">
      <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h3 style={{ margin: 0 }}>{user.n}</h3><small>{user.code} · {user.plan.n} ({user.r}%) · {user.md === 'Single' ? user.ar : 'Freehand'}</small></div>
        <span className="tag ok"><Check size={12} className="nav-icon" /> KYC verified · Active</span>
      </div>
      <div className="tabs">{TABS.map((x) => { const I = TAB_ICONS[x]; return <button key={x} className={'btn s ' + (tab === x ? '' : 'o')} onClick={() => setTab(x)}><I size={13} className="nav-icon" />{x}</button>; })}</div>

      {tab === 'Dashboard' && <>
        <div className="grid">
          <div className="card"><div className="stat-icon"><TrendingUp size={20} /></div><small>Revenue (Paid)</small><div className="price">{R(earned)}</div></div>
          <div className="card"><div className="stat-icon"><MapPin size={20} /></div><small>Booked seats</small><div className="price">{mine.length}</div></div>
          <div className="card"><div className="stat-icon"><AlertCircle size={20} /></div><small>Unpaid seats</small><div className="price">{mine.filter((s) => !s.paid).length}</div></div>
        </div>
        <div className="card" style={{ marginTop: 16 }}><h3>Hafte ke bookings</h3>
          <div className="chart">{wk.map((v, i) => <div key={i} style={{ height: `${v / mx * 100}%` }}>{v || ''}</div>)}</div>
          <div className="chart" style={{ height: 'auto', marginTop: 4, color: 'var(--muted)', fontSize: '.8rem' }}>
            {'SMTWTFS'.split('').map((d, i) => <span key={i} style={{ flex: 1, textAlign: 'center' }}>{d}</span>)}</div>
        </div></>}

      {tab === 'Territory' && <div className="card"><h3>Mode: {user.md}</h3>
        <p>{user.md === 'Single' ? user.ar + ' territory aapke liye lock hai.' : 'Freehand: aap kisi bhi zone mein kaam kar sakte hain.'}</p>
        <h3>Seat pins</h3>
        {seats.filter((s) => user.md !== 'Single' || s.a === user.ar).map((s) =>
          <p key={s.id} style={{ margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <MapPin size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} /> {s.t} · {s.a} {s.by ? (s.by === 'me' ? <span className="tag ok">Aapki</span> : <span className="tag gr">Booked</span>) : <span className="tag ok">Available</span>}
          </p>)}
      </div>}

      {tab === 'Learnings' && <div className="card"><h3>DRM Course · {done}/{COURSE.length} poora</h3>
        <div className="bar"><i style={{ width: `${done / COURSE.length * 100}%` }} /></div>
        {COURSE.map((c, i) => <p key={c} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '14px 0 0' }}>
          <span>{i + 1}. {c}</span>
          <button className={'btn s ' + (learn[i] ? 'o' : '')} onClick={() => setLearn({ ...learn, [i]: !learn[i] })}>
            {learn[i] ? <><Check size={13} className="nav-icon" /> Poora</> : 'Poora kiya'}
          </button></p>)}
      </div>}

      {tab === 'Bookings' && <>
        {unp && <div className="note">Koi seat Unpaid hai. Ledger dikh raha hai, par payout rows locked hain. Sab seats Paid hone par payout khulega.</div>}
        <div className="sc"><table><thead><tr><th>Seat</th><th>Candidate</th><th>Status</th><th>Payout</th></tr></thead><tbody>
          {mine.length ? mine.map((s) => <tr key={s.id}><td>{s.t} · {s.a}</td><td>{s.cand}</td>
            <td>{s.paid ? <span className="tag ok"><Check size={12} className="nav-icon" /> Paid</span> : <><span className="tag no">Unpaid</span> <button className="btn s o" onClick={() => pay(s.id)}>Pay</button></>}</td>
            <td className={unp ? 'lock' : ''}>{unp ? <><Lock size={13} className="nav-icon" /> Locked</> : R(PRICE * user.r / 100)}</td></tr>)
            : <tr><td colSpan={4}>Abhi koi booking nahi. <Link href="/seats">Seat book kijiye</Link>.</td></tr>}
        </tbody></table></div></>}

      {tab === 'Help' && <div className="card"><label>Aapki problem</label>
        <textarea rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} /><br /><br />
        <button className="btn" onClick={() => { if (msg.trim()) { setTix([...tix, msg.trim()]); setMsg(''); } }}>Ticket bhejiye</button>
        {tix.map((x, i) => <p key={i} style={{ margin: '14px 0 0' }}><span className="tag no">Open</span> #{101 + i} · {x}</p>)}
      </div>}

      {tab === 'Settings' && <div className="card"><h3>Payout</h3>
        <p>{unp || !mine.length
          ? <><Lock size={14} className="nav-icon" /> Payout abhi locked hai. Sab seats Paid hone par khulega.</>
          : <><CheckCircle size={14} className="nav-icon" style={{ color: 'var(--gold)' }} /> Payout unlocked. Total {R(earned)}</>}
        </p>
        <h3>Territory lock</h3><p>{user.md === 'Single' ? user.ar + ' territory lock hai.' : 'Freehand mode, koi lock nahi.'}</p>
        <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '20px 0' }} />
        <h3>Account</h3>
        <p style={{ color: 'var(--muted)', fontSize: '.95rem' }}>Aapka account logout hoga aur aap home page par aa jaayenge.</p>
        <button className="btn o" style={{ color: 'var(--text)' }} onClick={() => { logout(); router.push('/'); }}>
          <LogOut size={15} className="nav-icon" /> Logout karein
        </button>
      </div>}
    </div></section>
  );
}
