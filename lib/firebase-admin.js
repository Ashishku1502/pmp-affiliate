import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Returns the Firestore Admin instance.
 * LAZY — only initializes on first call (at request time, never at build time).
 */
export function getAdminDb() {
  // Reuse existing singleton across hot-reloads in dev
  if (globalThis.__pmpAdminDb) return globalThis.__pmpAdminDb;

  const app = getApps().length
    ? getApps()[0]
    : (() => {
        const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
        if (!key) throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY env var is not set.');
        return initializeApp({ credential: cert(JSON.parse(key)) });
      })();

  globalThis.__pmpAdminDb = getFirestore(app);
  return globalThis.__pmpAdminDb;
}
