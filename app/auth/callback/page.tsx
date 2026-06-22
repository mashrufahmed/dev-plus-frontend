import { POST } from '@/lib/api-client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
export default async function CallbackPage({ searchParams }: PageProps) {
  const { code } = await searchParams;
  if (!code || Array.isArray(code)) {
    redirect('/auth/login');
  }
  const res = await POST<{ token: string }>('/auth/exchange-token', {
    token: code,
  });
  if (res.error) {
    redirect('/auth/login');
  }
  const cookieStore = await cookies();

  cookieStore.set('d_token', res.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect('/dashboard');
}
