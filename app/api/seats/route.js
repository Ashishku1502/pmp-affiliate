import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

// GET /api/seats?code=PMP-1234  → all seats; caller's own seats have by:'me'
export async function GET(req) {
  const code = new URL(req.url).searchParams.get('code') || null;

  try {
    const snap  = await getAdminDb().collection('seats').orderBy('id').get();
    const seats = snap.docs.map((d) => {
      const s    = d.data();
      const mine = code && s.by === code;
      return {
        id:   s.id,
        t:    s.t,
        a:    s.a,
        by:   s.by ? (mine ? 'me' : 'other') : null,
        cand: mine ? s.cand : null,
        paid: mine ? s.paid : false,
        day:  mine ? s.day  : null,
      };
    });
    return NextResponse.json({ seats });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
