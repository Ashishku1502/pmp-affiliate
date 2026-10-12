import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

const err = (m, c = 400) => NextResponse.json({ error: m }, { status: c });

const BASE_SEATS = [
  { id: 0,  t: 'MLA',            a: 'Budhana',       by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 1,  t: 'Pradhan',        a: 'Budhana',       by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 2,  t: 'Pradhan',        a: 'Charthawal',    by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 3,  t: 'MLA',            a: 'Khatauli',      by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 4,  t: 'Pradhan',        a: 'Khatauli',      by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 5,  t: 'Pradhan',        a: 'Purkazi',       by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 6,  t: 'MLA',            a: 'Shahpur',       by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 7,  t: 'Pradhan',        a: 'Shahpur',       by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 8,  t: 'Zila Panchayat', a: 'Budhana',       by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 9,  t: 'Zila Panchayat', a: 'Khatauli',      by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 10, t: 'Zila Panchayat', a: 'Purkazi',       by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 11, t: 'Zila Panchayat', a: 'Shahpur',       by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 12, t: 'Zila Panchayat', a: 'Charthawal',    by: null, cand: null, paid: false, day: null, bookedAt: null },
  { id: 13, t: 'Zila Panchayat', a: 'Muzaffarnagar', by: null, cand: null, paid: false, day: null, bookedAt: null },
];

// POST /api/seats/:id  { action:'book'|'pay', code, candidate, mobile, paid }
export async function POST(req, { params }) {
  const { id } = await params;
  const b      = await req.json().catch(() => ({}));

  try {
    const seatRef = getAdminDb().collection('seats').doc(String(id));
    const affRef  = getAdminDb().collection('affiliates').doc(String(b.code || '').toUpperCase());

    const [seatSnap, affSnap] = await Promise.all([seatRef.get(), affRef.get()]);

    if (!affSnap.exists)  return err('Affiliate code galat hai.', 401);

    let seat;
    if (!seatSnap.exists) {
      const baseSeat = BASE_SEATS.find(s => String(s.id) === String(id));
      if (!baseSeat) return err('Seat nahi mili.', 404);
      await seatRef.set(baseSeat);
      seat = baseSeat;
    } else {
      seat = seatSnap.data();
    }
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
