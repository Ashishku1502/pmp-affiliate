'use server';

import { getAdminDb } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';

export async function toggleSeatPaid(seatId, currentPaidStatus) {
  try {
    const db = getAdminDb();
    await db.collection('seats').doc(String(seatId)).update({
      paid: !currentPaidStatus
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (err) {
    return { error: err.message };
  }
}

export async function toggleKyc(affiliateCode, currentKycStatus) {
  try {
    const db = getAdminDb();
    await db.collection('affiliates').doc(String(affiliateCode)).update({
      ka: !currentKycStatus
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (err) {
    return { error: err.message };
  }
}

export async function releaseSeat(seatId) {
  try {
    const db = getAdminDb();
    await db.collection('seats').doc(String(seatId)).update({
      by: null,
      cand: null,
      paid: false,
      day: null,
      bookedAt: null
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (err) {
    return { error: err.message };
  }
}
