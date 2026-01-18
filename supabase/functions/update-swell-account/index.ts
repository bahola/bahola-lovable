import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UpdateSwellRequest {
  email: string;
  group?: string;
  verification_status: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SWELL_STORE_ID = 'baholalabs';
    const SWELL_SECRET_KEY = Deno.env.get('SWELL_SECRET_KEY');

    if (!SWELL_SECRET_KEY) {
      console.error('SWELL_SECRET_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Swell secret key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { email, group, verification_status }: UpdateSwellRequest = await req.json();

    if (!email || !verification_status) {
      return new Response(
        JSON.stringify({ error: 'Email and verification_status are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Updating Swell account for email: ${email}, group: ${group}, status: ${verification_status}`);

    // Create Basic Auth header for Swell Backend API
    const authString = `${SWELL_STORE_ID}:${SWELL_SECRET_KEY}`;
    const authHeader = `Basic ${btoa(authString)}`;

    // Step 1: Find the account by email
    const searchUrl = `https://api.swell.store/accounts?where[email]=${encodeURIComponent(email)}`;
    console.log('Searching for account:', searchUrl);

    const searchResponse = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
    });

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error('Failed to search Swell accounts:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to search Swell accounts', details: errorText }),
        { status: searchResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const searchResult = await searchResponse.json();
    console.log('Search result:', JSON.stringify(searchResult));

    if (!searchResult.results || searchResult.results.length === 0) {
      console.error('No Swell account found for email:', email);
      return new Response(
        JSON.stringify({ error: 'No Swell account found for this email' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const accountId = searchResult.results[0].id;
    console.log('Found account ID:', accountId);

    // Step 2: Update the account with new group and metadata
    const updateUrl = `https://api.swell.store/accounts/${accountId}`;
    const updatePayload: Record<string, unknown> = {
      metadata: {
        verification_status: verification_status,
      },
    };

    // Only set group if provided (for approved doctors)
    if (group) {
      updatePayload.group = group;
    }

    console.log('Updating account with payload:', JSON.stringify(updatePayload));

    const updateResponse = await fetch(updateUrl, {
      method: 'PUT',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatePayload),
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error('Failed to update Swell account:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to update Swell account', details: errorText }),
        { status: updateResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const updatedAccount = await updateResponse.json();
    console.log('Account updated successfully:', JSON.stringify(updatedAccount));

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Swell account updated successfully',
        account: {
          id: updatedAccount.id,
          email: updatedAccount.email,
          group: updatedAccount.group,
          verification_status: updatedAccount.metadata?.verification_status,
        }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in update-swell-account function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
