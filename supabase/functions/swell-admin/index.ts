/// <reference lib="deno.ns" />

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const json = (body: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });

const getSubpath = (pathname: string, functionName: string) => {
  const parts = pathname.split('/').filter(Boolean);
  const idx = parts.indexOf(functionName);
  if (idx === -1) return '';
  return parts.slice(idx + 1).join('/');
};

const requireUser = async (req: Request) => {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return { error: 'Unauthorized' as const };

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } },
  );

  const token = authHeader.replace('Bearer ', '');
  const { data, error } = await supabase.auth.getClaims(token);
  if (error || !data?.claims) return { error: 'Unauthorized' as const };

  return { userId: data.claims.sub, email: data.claims.email };
};

const swellBackendFetch = async (path: string, query: Record<string, string | undefined>) => {
  const SWELL_STORE_ID = 'baholalabs';
  const SWELL_SECRET_KEY = Deno.env.get('SWELL_SECRET_KEY');
  if (!SWELL_SECRET_KEY) {
    return json(
      { error: 'Missing SWELL_SECRET_KEY secret' },
      { status: 500 },
    );
  }

  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined) continue;
    params.set(k, v);
  }

  const url = `https://api.swell.store${path}${params.size ? `?${params.toString()}` : ''}`;
  const auth = btoa(`${SWELL_STORE_ID}:${SWELL_SECRET_KEY}`);

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    },
  });

  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const subpath = getSubpath(new URL(req.url).pathname, 'swell-admin');

  // Require Supabase auth (admin-only by default)
  const auth = await requireUser(req);
  if ('error' in auth) return json({ error: 'Unauthorized' }, { status: 401 });

  // Support:
  // - GET /functions/v1/swell-admin (or /coupons) -> list coupons
  // - POST /functions/v1/swell-admin { action: 'list_coupons', ... }
  if (req.method === 'GET') {
    const url = new URL(req.url);
    const route = subpath || 'coupons';

    if (route !== 'coupons') return json({ error: 'Not found' }, { status: 404 });

    const active = url.searchParams.get('active');
    const limit = url.searchParams.get('limit') ?? '100';
    const page = url.searchParams.get('page') ?? '1';

    return swellBackendFetch('/coupons', {
      ...(active !== null ? { 'where[active]': active } : {}),
      limit,
      page,
    });
  }

  if (req.method === 'POST') {
    const body = await req.json().catch(() => ({}));
    const action = typeof body?.action === 'string' ? body.action : '';

    if (action !== 'list_coupons') {
      return json(
        { error: 'Invalid action', allowed: ['list_coupons'] },
        { status: 400 },
      );
    }

    const active = typeof body.active === 'boolean' ? String(body.active) : undefined;
    const limit = typeof body.limit === 'number' ? String(body.limit) : '100';
    const page = typeof body.page === 'number' ? String(body.page) : '1';

    return swellBackendFetch('/coupons', {
      ...(active !== undefined ? { 'where[active]': active } : {}),
      limit,
      page,
    });
  }

  return json({ error: 'Method not allowed' }, { status: 405 });
});
