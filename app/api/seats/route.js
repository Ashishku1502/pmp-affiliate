import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
export const dynamic = 'force-dynamic';

// GET /api/seats?code=PMP-1234  -> seats; own seats marked by:'me'
export async function GET(req) {
  const code = new URL(req.url).searchParams.get('code');
  const seats = db.seats.map((s) => {
    const mine = code && s.by === code;
    return { id: s.id, t: s.t, a: s.a, by: s.by ? (mine ? 'me' : 'other') : null,
      cand: mine ? s.cand : null, paid: mine ? s.paid : false, day: mine ? s.day : null };
  });
  return NextResponse.json({ seats });
}
