import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSeats } from '@/lib/sql';
export const dynamic = 'force-dynamic';

// GET /api/seats?code=PMP-1234  -> seats; own seats marked by:'me'
export async function GET(req) {
  const code = new URL(req.url).searchParams.get('code');
  let rawSeats = [];
  
  if (process.env.POSTGRES_URL) {
    rawSeats = (await getSeats()) || [];
  } else {
    rawSeats = db.seats;
  }
  
  const seats = rawSeats.map((s) => {
    // In memory DB uses 's.by', Postgres uses 's.by_code' 
    const owner = process.env.POSTGRES_URL ? s.by_code : s.by;
    const mine = code && owner === code;
    return { id: s.id, t: s.t, a: s.a, by: owner ? (mine ? 'me' : 'other') : null,
      cand: mine ? s.cand : null, paid: mine ? s.paid : false, day: mine ? s.day : null };
  });
  return NextResponse.json({ seats });
}
