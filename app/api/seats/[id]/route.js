import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

const err = (m, c = 400) => NextResponse.json({ error: m }, { status: c });

// POST /api/seats/:id  { action:'book'|'pay', code, candidate, mobile, paid }
export async function POST(req, { params }) {
  const { id } = await params;
  const b      = await req.json().catch(() => ({}));

  try {
    const seatRef = getAdminDb().collection('seats').doc(String(id));
    const affRef  = getAdminDb().collection('affiliates').doc(String(b.code || '').toUpperCase());

    const [seatSnap, affSnap] = await Promise.all([seatRef.get(), affRef.get()]);

    if (!seatSnap.exists) return err('Seat nahi mili.',         404);
    if (!affSnap.exists)  return err('Affiliate code galat hai.', 401);

    const seat = seatSnap.data();
    const aff  = affSnap.data();

    // ── BOOK ───────────────────────────────────────────────
    if (b.action === 'book') {
      if (seat.by) return err('Ye seat pehle se booked hai.', 409);
      if (!b.candidate?.trim() || String(b.mobile || '').length < 10)
        return err('Naam aur 10 ank ka mobile bhariye.');

      await seatRef.update({
        by:   aff.code,
        cand: b.candidate.trim(),
        paid: !!b.paid,
        day:  new Date().getDay(),
        bookedAt: Date.now(),
      });
      return NextResponse.json({ ok: true });
    }

    // ── PAY ────────────────────────────────────────────────
    if (b.action === 'pay') {
      if (seat.by !== aff.code) return err('Ye aapki seat nahi hai.', 403);
      await seatRef.update({ paid: true });
      return NextResponse.json({ ok: true });
    }

    return err('Unknown action.');
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
