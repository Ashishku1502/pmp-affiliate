import { sql } from '@vercel/postgres';

export async function createTables() {
  if (!process.env.POSTGRES_URL) return { error: 'No POSTGRES_URL' };
  
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS affiliates (
        code VARCHAR(50) PRIMARY KEY,
        n VARCHAR(255) NOT NULL,
        m VARCHAR(50) NOT NULL,
        md VARCHAR(50) NOT NULL,
        ar VARCHAR(255) NOT NULL,
        r INTEGER NOT NULL
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS seats (
        id SERIAL PRIMARY KEY,
        t VARCHAR(50) NOT NULL,
        a VARCHAR(255) NOT NULL,
        by_code VARCHAR(50),
        cand VARCHAR(255),
        paid BOOLEAN DEFAULT FALSE,
        day INTEGER
      );
    `;

    // Check if seats table is empty, if so, seed it
    const { rows } = await sql`SELECT COUNT(*) FROM seats`;
    if (rows[0].count === '0') {
      const base = [['MLA','Budhana'],['Pradhan','Budhana'],['Pradhan','Charthawal'],['MLA','Khatauli'],['Pradhan','Khatauli'],['Pradhan','Purkazi'],['MLA','Shahpur'],['Pradhan','Shahpur']];
      for (const [t, a] of base) {
        await sql`INSERT INTO seats (t, a) VALUES (${t}, ${a})`;
      }
    }
    return { success: true };
  } catch (e) {
    return { error: e.message };
  }
}

export async function getAffiliate(code) {
  if (!process.env.POSTGRES_URL) return null;
  const { rows } = await sql`SELECT * FROM affiliates WHERE code = ${code}`;
  if (rows.length === 0) return null;
  const r = rows[0];
  return { n: r.n, m: r.m, md: r.md, ar: r.ar, code: r.code, r: r.r, plan: { n: r.r === 20 ? 'Free' : 'Pro', r: r.r } };
}

export async function saveAffiliate(user) {
  if (!process.env.POSTGRES_URL) return false;
  await sql`
    INSERT INTO affiliates (code, n, m, md, ar, r)
    VALUES (${user.code}, ${user.n}, ${user.m}, ${user.md}, ${user.ar}, ${user.r})
  `;
  return true;
}

export async function getSeats() {
  if (!process.env.POSTGRES_URL) return null;
  const { rows } = await sql`SELECT * FROM seats ORDER BY id ASC`;
  return rows.map(r => ({
    id: r.id,
    t: r.t,
    a: r.a,
    by: r.by_code ? (r.by_code === 'me' ? 'me' : 'other') : null, // The API route will adjust 'me' dynamically based on user
    by_code: r.by_code,
    cand: r.cand,
    paid: r.paid,
    day: r.day
  }));
}

export async function bookSeat(id, code, cand) {
  if (!process.env.POSTGRES_URL) return false;
  const day = new Date().getDay();
  await sql`UPDATE seats SET by_code = ${code}, cand = ${cand}, day = ${day} WHERE id = ${id} AND by_code IS NULL`;
  return true;
}

export async function paySeat(id, code) {
  if (!process.env.POSTGRES_URL) return false;
  await sql`UPDATE seats SET paid = true WHERE id = ${id} AND by_code = ${code}`;
  return true;
}
