import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

const BASE_SEATS = [
  { id: 0, t: 'MLA',    a: 'Budhana',    by: null, cand: null, paid: false, day: null },
  { id: 1, t: 'Pradhan',a: 'Budhana',    by: null, cand: null, paid: false, day: null },
  { id: 2, t: 'Pradhan',a: 'Charthawal', by: null, cand: null, paid: false, day: null },
  { id: 3, t: 'MLA',    a: 'Khatauli',   by: null, cand: null, paid: false, day: null },
  { id: 4, t: 'Pradhan',a: 'Khatauli',   by: null, cand: null, paid: false, day: null },
  { id: 5, t: 'Pradhan',a: 'Purkazi',    by: null, cand: null, paid: false, day: null },
  { id: 6, t: 'MLA',    a: 'Shahpur',    by: null, cand: null, paid: false, day: null },
  { id: 7, t: 'Pradhan',a: 'Shahpur',    by: null, cand: null, paid: false, day: null },
];

// GET /api/setup  →  seeds Firestore seats collection if empty
export async function GET() {
  try {
    const snap = await getAdminDb().collection('seats').limit(1).get();

    if (!snap.empty) {
      return NextResponse.json({ success: true, message: 'Firestore already seeded — no action taken.' });
    }

    // Batch write all seats
    const batch = getAdminDb().batch();
    for (const seat of BASE_SEATS) {
      batch.set(getAdminDb().collection('seats').doc(String(seat.id)), seat);
    }
    await batch.commit();

    return NextResponse.json({ success: true, message: `Firestore seeded with ${BASE_SEATS.length} seats.` });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
