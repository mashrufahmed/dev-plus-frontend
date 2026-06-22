import { WithAuthClient } from '@/lib/server-client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  await WithAuthClient('/api/auth/logout', { method: 'POST' });

  const cookieStore = await cookies();
  cookieStore.delete('d_token');

  return NextResponse.json({ success: true });
}
