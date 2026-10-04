import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { bookSeat, paySeat, getSeats, getAffiliate } from '@/lib/sql';

const err = (m, c = 400) => NextResponse.json({ error: m }, { status: c });

// POST /api/seats/:id  { action:'book'|'pay', code, candidate, mobile, otp, paid }
export async function POST(req, { params }) {
  const { id } = await params;
  const b = await req.json().catch(() => ({}));
  let seat;
  let aff;
  
  if (process.env.POSTGRES_URL) {
    const seats = await getSeats();
    seat = seats?.find((s) => s.id === Number(id));
    if (seat) seat.by = seat.by_code; // Normalize
    aff = await getAffiliate(b.code);
  } else {
    seat = db.seats.find((s) => s.id === Number(id));
    aff = db.affiliates[b.code];
  }
  
  if (!seat) return err('Seat nahi mili.', 404);
  if (!aff) return err('Affiliate code galat hai.', 401);

  if (b.action === 'book') {
    if (seat.by) return err('Ye seat pehle se booked hai.', 409);
    if (aff.md === 'Single' && seat.a !== aff.ar) return err('Ye seat aapke territory ke bahar hai.', 403);
    if (!b.candidate?.trim() || String(b.mobile || '').length < 10)
      return err('Naam aur 10 ank ka mobile bhariye.');
      
    if (process.env.POSTGRES_URL) {
      await bookSeat(Number(id), aff.code, b.candidate.trim());
      if (b.paid) await paySeat(Number(id), aff.code);
    } else {
      Object.assign(seat, { by: aff.code, cand: b.candidate.trim(), paid: !!b.paid, day: new Date().getDay() });
    }
    return NextResponse.json({ ok: true });
  }
  if (b.action === 'pay') {
    if (seat.by !== aff.code) return err('Ye aapki seat nahi hai.', 403);
    
    if (process.env.POSTGRES_URL) {
      await paySeat(Number(id), aff.code);
    } else {
      seat.paid = true;
    }
    return NextResponse.json({ ok: true });
  }
  return err('Unknown action');
}
