import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { AREAS, PLAN } from '@/lib/constants';

export const dynamic = 'force-dynamic';

// GET /api/affiliates?query=PMP-1234  or  ?query=9876543210
export async function GET(req) {
  const q = new URL(req.url).searchParams.get('query')?.trim();
  if (!q) return NextResponse.json({ error: 'Query required.' }, { status: 400 });

  try {
    // 1. Try by affiliate code (doc ID)
    const byCode = await getAdminDb().collection('affiliates').doc(q.toUpperCase()).get();
    if (byCode.exists) return NextResponse.json({ user: byCode.data() });

    // 2. Try by mobile number
    const byMobile = await getAdminDb().collection('affiliates').where('m', '==', q).limit(1).get();
    if (!byMobile.empty) return NextResponse.json({ user: byMobile.docs[0].data() });

    return NextResponse.json({ error: 'Affiliate Code ya Mobile nahi mila.' }, { status: 404 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST /api/affiliates  { n, m, k, md:'Single'|'Freehand', ar }
export async function POST(req) {
  const b = await req.json().catch(() => ({}));

  if (!b.n?.trim() || String(b.m || '').length < 10 || !b.k?.trim())
    return NextResponse.json({ error: 'Naam, 10 ank ka mobile aur KYC bhariye.' }, { status: 400 });
  if (!['Single', 'Freehand'].includes(b.md) || !b.ar?.trim())
    return NextResponse.json({ error: 'Territory galat hai.' }, { status: 400 });

  try {
    // Generate unique affiliate code
    let code, exists = true;
    do {
      code  = 'PC-' + (1000 + Math.floor(Math.random() * 9000));
      const snap = await getAdminDb().collection('affiliates').doc(code).get();
      exists = snap.exists;
    } while (exists);

    const user = { 
      n: b.n.trim(), 
      m: b.m, 
      k: b.k.trim(), 
      email: b.email ? String(b.email).trim() : null,
      kycType: b.kycType ? String(b.kycType).trim() : 'Aadhaar',
      profession: b.profession ? String(b.profession).trim() : null,
      md: b.md, 
      ar: b.ar.trim(),
      state: b.state ? String(b.state).trim() : null,
      city: b.city ? String(b.city).trim() : null,
      block: b.block ? String(b.block).trim() : null,
      area: b.area ? String(b.area).trim() : null,
      plan: PLAN, 
      r: PLAN.r, 
      code,
      createdAt: Date.now()
    };
    await getAdminDb().collection('affiliates').doc(code).set(user);
    return NextResponse.json({ user });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
