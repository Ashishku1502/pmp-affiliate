import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { AREAS, PLAN } from '@/lib/constants';

// POST /api/affiliates  { n, m, k, md:'Single'|'Freehand', ar }
export async function POST(req) {
  const b = await req.json().catch(() => ({}));
  if (!b.n?.trim() || String(b.m || '').length < 10 || !b.k?.trim())
    return NextResponse.json({ error: 'Naam, 10 ank ka mobile aur KYC bhariye.' }, { status: 400 });
  if (!['Single', 'Freehand'].includes(b.md) || !AREAS.includes(b.ar))
    return NextResponse.json({ error: 'Territory galat hai.' }, { status: 400 });
  let code;
  do { code = 'PMP-' + (1000 + Math.floor(Math.random() * 9000)); } while (db.affiliates[code]);
  const user = { n: b.n.trim(), m: b.m, md: b.md, ar: b.ar, plan: PLAN, r: PLAN.r, code };
  db.affiliates[code] = user;
  return NextResponse.json({ user });
}
