import { NextResponse } from 'next/server';
import { createTables } from '@/lib/sql';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await createTables();
  if (result.error) return NextResponse.json({ error: result.error }, { status: 500 });
  return NextResponse.json({ success: true, message: 'Database tables created and seeded successfully.' });
}
