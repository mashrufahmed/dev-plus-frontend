'use server';

import { cookies } from 'next/headers';
import { ApiError, request, tryCatch } from './api-client';

export async function WithAuthClient<T>(
  endpoint: string,
  options?: RequestInit,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.COOKIE_NAME!);
  return tryCatch<T, ApiError>(
    request<T>(endpoint, {
      ...options,
      headers: {
        ...(options?.headers as Record<string, string>),
        Authorization: `Bearer ${token?.value}`,
      },
    }),
  );
}
