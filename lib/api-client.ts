type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

export type Result<T, E = Error> = Success<T> | Failure<E>;

// ==================
// tryCatch Wrapper
// ==================
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}

// ==================
// Custom API Error
// ==================
export class ApiError extends Error {
  statusCode?: number;
  success?: boolean;
  timestamp?: string;

  constructor(message: string, options?: Partial<ApiError>) {
    super(message);
    Object.assign(this, options);
  }
}

// ==================
// Base Config
// ==================
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const defaultHeaders: HeadersInit = {
  'Content-Type': 'application/json',
};

// ==================
// Core Fetch Function
// ==================
export async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  });

  const json = await res.json().catch(() => null);

  // ❌ Handle Error Response
  if (!res.ok) {
    throw new ApiError(json?.message || 'Something went wrong', {
      statusCode: json?.statusCode,
      success: json?.success,
      timestamp: json?.timestamp,
    });
  }

  // ✅ Auto unwrap "data"
  return (json?.data ?? json) as T;
}

// ==================
// API Methods (5)
// ==================

// 1. GET
export async function GET<T>(endpoint: string) {
  return tryCatch<T, ApiError>(
    request<T>(endpoint, {
      method: 'GET',
    }),
  );
}

// 2. POST
export async function POST<T, B = unknown>(
  endpoint: string,
  body: B,
  options?: RequestInit,
) {
  return tryCatch<T, ApiError>(
    request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    }),
  );
}

// 3. PUT
export async function PUT<T, B = unknown>(endpoint: string, body: B) {
  return tryCatch<T, ApiError>(
    request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  );
}

// 4. PATCH
export async function PATCH<T, B = unknown>(endpoint: string, body: B) {
  return tryCatch<T, ApiError>(
    request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  );
}

// 5. DELETE
export async function DELETE<T>(endpoint: string) {
  return tryCatch<T, ApiError>(
    request<T>(endpoint, {
      method: 'DELETE',
    }),
  );
}
