'use server';

import { cookies } from 'next/headers';
import { ApiError, request, tryCatch } from './api-client';

export async function WithAuthClient<T>(
  endpoint: string,
  options?: RequestInit,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('d_token');
  return tryCatch<T, ApiError>(
    request<T>(endpoint, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      ...options,
    }),
  );
}
