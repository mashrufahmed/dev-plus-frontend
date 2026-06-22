import { WithAuthClient } from '@/lib/server-client';
import { NextResponse } from 'next/server';

interface AuthMeResponse {
  user: object;
  settings: object;
}

export async function GET() {
  const res = await WithAuthClient<AuthMeResponse>('/api/user/me', {
    method: 'GET',
  });

  if (res.error || !res.data) {
    return NextResponse.json(null, { status: 401 });
  }

  return NextResponse.json(res.data);
}
