
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

interface ERPNextProxyRequest {
  baseUrl: string;
  endpoint: string;
  method?: string;
  data?: any;
  username?: string;
  password?: string;
}

// Store session cookies in memory (will persist during function lifetime)
const sessionStore = new Map<string, string>();

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { baseUrl, endpoint, method = 'GET', data, username, password }: ERPNextProxyRequest = await req.json();
    
    if (!baseUrl || !endpoint) {
      return new Response(
        JSON.stringify({ error: 'baseUrl and endpoint are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const sessionKey = baseUrl;
    let sessionCookie = sessionStore.get(sessionKey);

    console.log(`ERPNext Proxy: ${method} ${baseUrl}${endpoint}`);

    // Special handling for login endpoint
    if (endpoint === '/api/method/login' && username && password) {
      console.log('Performing ERPNext login...');
      
      const loginResponse = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          usr: username,
          pwd: password,
        }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json().catch(() => null);
        throw new Error(
          `ERPNext login failed: ${loginResponse.status} ${loginResponse.statusText} - ${
            errorData?.message || 'Invalid credentials'
          }`
        );
      }

      // Extract and store session cookies
      const setCookieHeaders = loginResponse.headers.getSetCookie();
      if (setCookieHeaders.length > 0) {
        sessionCookie = setCookieHeaders.join('; ');
        sessionStore.set(sessionKey, sessionCookie);
        console.log('Session cookies stored successfully');
      }

      const result = await loginResponse.json();
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Special handling for logout endpoint
    if (endpoint === '/api/method/logout') {
      console.log('Performing ERPNext logout...');
      
      const logoutResponse = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(sessionCookie && { 'Cookie': sessionCookie }),
        },
      });

      // Clear stored session
      sessionStore.delete(sessionKey);
      
      return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Regular API calls - include session cookies if available
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };

    if (sessionCookie) {
      headers['Cookie'] = sessionCookie;
    }

    // For GET requests, don't set Content-Type
    if (method !== 'GET' && data) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method,
      headers,
      body: data && method !== 'GET' ? JSON.stringify(data) : undefined,
    });

    console.log(`ERPNext API response status: ${response.status}`);

    if (!response.ok) {
      // If we get a 403/401, session might have expired
      if (response.status === 403 || response.status === 401) {
        sessionStore.delete(sessionKey);
        console.warn('ERPNext session expired, clearing stored session');
        
        const errorData = await response.json().catch(() => null);
        return new Response(
          JSON.stringify({ 
            error: 'Authentication required. Please reconnect to ERPNext.',
            code: 'SESSION_EXPIRED',
            details: errorData 
          }),
          { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }
      
      const errorData = await response.json().catch(() => null);
      return new Response(
        JSON.stringify({ 
          error: `ERPNext API error: ${response.status} ${response.statusText}`,
          details: errorData 
        }),
        { status: response.status, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const result = await response.json();
    console.log('ERPNext API request successful');
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('ERPNext Proxy Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

serve(handler);
