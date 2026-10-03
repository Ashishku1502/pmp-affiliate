import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const err = (m, c = 400) => NextResponse.json({ error: m }, { status: c });

// POST /api/seats/:id  { action:'book'|'pay', code, candidate, mobile, otp, paid }
export async function POST(req, { params }) {
  const { id } = await params;
  const seat = db.seats.find((s) => s.id === Number(id));
  const b = await req.json().catch(() => ({}));
  if (!seat) return err('Seat nahi mili.', 404);
  const aff = db.affiliates[b.code];
  if (!aff) return err('Affiliate code galat hai.', 401);

  if (b.action === 'book') {
    if (seat.by) return err('Ye seat pehle se booked hai.', 409);
    if (aff.md === 'Single' && seat.a !== aff.ar) return err('Ye seat aapke territory ke bahar hai.', 403);
    if (!b.candidate?.trim() || String(b.mobile || '').length < 10 || String(b.otp || '').length < 4)
      return err('Naam, mobile aur 4 ank ka OTP bhariye.');
    Object.assign(seat, { by: aff.code, cand: b.candidate.trim(), paid: !!b.paid, day: new Date().getDay() });
    return NextResponse.json({ ok: true });
  }
  if (b.action === 'pay') {
    if (seat.by !== aff.code) return err('Ye aapki seat nahi hai.', 403);
    seat.paid = true;
    return NextResponse.json({ ok: true });
  }
  return err('Unknown action');
}
