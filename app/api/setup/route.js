import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

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

// GET /api/setup  →  seeds Firestore seats collection and adds any missing seats
export async function GET() {
  try {
    const snap = await getAdminDb().collection('seats').get();
    const existing = new Set(snap.docs.map(d => String(d.id)));

    const batch = getAdminDb().batch();
    let added = 0;
    for (const seat of BASE_SEATS) {
      if (!existing.has(String(seat.id))) {
        batch.set(getAdminDb().collection('seats').doc(String(seat.id)), seat);
        added++;
      }
    }
    if (added > 0) {
      await batch.commit();
      return NextResponse.json({ success: true, message: `Firestore updated with ${added} new seats. Total seats: ${BASE_SEATS.length}.` });
    }

    return NextResponse.json({ success: true, message: `All ${BASE_SEATS.length} seats already configured in Firestore.` });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
