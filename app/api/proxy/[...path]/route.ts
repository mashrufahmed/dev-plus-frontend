import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

async function proxyRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;

  if (!API_BASE_URL) {
    return NextResponse.json(
      { message: 'NEXT_PUBLIC_API_URL is not configured.' },
      { status: 500 },
    );
  }

  const token = request.cookies.get('d_token')?.value;
  const search = request.nextUrl.search;
  const targetUrl = `${API_BASE_URL}/api/${path.join('/')}${search}`;
  const body =
    request.method === 'GET' || request.method === 'HEAD'
      ? undefined
      : await request.text();

  const upstreamResponse = await fetch(targetUrl, {
    method: request.method,
    headers: {
      'Content-Type': request.headers.get('content-type') || 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body,
    cache: 'no-store',
  });

  const payload = await upstreamResponse.text();

  const response = new NextResponse(payload, {
    status: upstreamResponse.status,
    headers: {
      'Content-Type':
        upstreamResponse.headers.get('content-type') || 'application/json',
    },
  });

  if (path[0] === 'auth' && path[1] === 'logout') {
    response.cookies.delete('d_token');
  }

  return response;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context);
}
