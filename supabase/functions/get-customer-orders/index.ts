import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, swellSessionId } = await req.json();

    if (!email || !swellSessionId) {
      return new Response(
        JSON.stringify({ error: 'Email and Swell session required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify Swell session by calling Swell API
    const swellResponse = await fetch('https://baholalabs.swell.store/api/account', {
      headers: {
        'X-Session': swellSessionId,
        'Content-Type': 'application/json',
      },
    });

    if (!swellResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Invalid session' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const swellUser = await swellResponse.json();
    
    // Verify email matches Swell account
    if (swellUser.email?.toLowerCase() !== email.toLowerCase()) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use service_role to fetch orders
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_email', email.toLowerCase())
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch orders' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ orders: orders || [] }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('get-customer-orders error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
