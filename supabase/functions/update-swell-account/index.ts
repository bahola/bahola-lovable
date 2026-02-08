import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UpdateSwellRequest {
  email: string;
  group?: string;
  verification_status: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

serve(async (req) => {
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

    const { email, group, verification_status, first_name, last_name, phone }: UpdateSwellRequest = await req.json();

    if (!email || !verification_status) {
      return new Response(
        JSON.stringify({ error: 'Email and verification_status are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Updating Swell account for email: ${email}, group: ${group}, status: ${verification_status}`);

    const authString = `${SWELL_STORE_ID}:${SWELL_SECRET_KEY}`;
    const authHeader = `Basic ${btoa(authString)}`;

    // Step 1: Find the account by email
    const searchUrl = `https://api.swell.store/accounts?where[email]=${encodeURIComponent(email)}`;
    console.log('Searching for account:', searchUrl);

    const searchResponse = await fetch(searchUrl, {
      method: 'GET',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
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
    console.log('Search result count:', searchResult.results?.length || 0);

    let accountId: string;

    if (!searchResult.results || searchResult.results.length === 0) {
      // Account not found - create if approving, skip if rejecting
      if (verification_status !== 'approved') {
        console.log('No Swell account found and status is not approved - skipping');
        return new Response(
          JSON.stringify({ success: true, message: 'No Swell account to update for rejection', skipped: true }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('No Swell account found - creating new account...');
      const createPayload: Record<string, unknown> = {
        email,
        first_name: first_name || '',
        last_name: last_name || '',
        phone: phone || '',
        email_optin: true,
        metadata: {
          verification_status: 'approved',
        },
      };

      if (group) {
        createPayload.group = group;
      }

      console.log('Creating account with payload:', JSON.stringify(createPayload));

      const createResponse = await fetch('https://api.swell.store/accounts', {
        method: 'POST',
        headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify(createPayload),
      });

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        console.error('Failed to create Swell account:', errorText);
        return new Response(
          JSON.stringify({ error: 'Failed to create Swell account', details: errorText }),
          { status: createResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const createdAccount = await createResponse.json();
      console.log('Account created successfully:', createdAccount.id);
      accountId = createdAccount.id;

      // If group was set during creation, we may still need to look up and assign the group ID
      if (group) {
        await assignGroup(accountId, group, authHeader);
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Swell account created and configured',
          created: true,
          account: {
            id: createdAccount.id,
            email: createdAccount.email,
            group: createdAccount.group,
            verification_status: createdAccount.metadata?.verification_status,
          }
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Account exists - update it
    accountId = searchResult.results[0].id;
    console.log('Found account ID:', accountId);

    // Look up group ID if needed
    let groupId: string | undefined;
    if (group) {
      groupId = await lookupGroupId(group, authHeader);
    }

    // Update the account
    const updateUrl = `https://api.swell.store/accounts/${accountId}`;
    const updatePayload: Record<string, unknown> = {
      metadata: { verification_status },
    };

    if (groupId) {
      updatePayload.group = groupId;
    }

    console.log('Updating account with payload:', JSON.stringify(updatePayload));

    const updateResponse = await fetch(updateUrl, {
      method: 'PUT',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
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
    console.log('Account updated successfully:', updatedAccount.id);

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

async function lookupGroupId(group: string, authHeader: string): Promise<string | undefined> {
  try {
    // Try by slug first
    const slugUrl = `https://api.swell.store/account_groups?where[slug]=${encodeURIComponent(group)}`;
    const slugRes = await fetch(slugUrl, {
      method: 'GET',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
    });

    if (slugRes.ok) {
      const slugResult = await slugRes.json();
      if (slugResult.results?.length > 0) {
        console.log('Found group ID by slug:', slugResult.results[0].id);
        return slugResult.results[0].id;
      }
    }

    // Try by name
    const nameUrl = `https://api.swell.store/account_groups?where[name]=${encodeURIComponent(group)}`;
    const nameRes = await fetch(nameUrl, {
      method: 'GET',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
    });

    if (nameRes.ok) {
      const nameResult = await nameRes.json();
      if (nameResult.results?.length > 0) {
        console.log('Found group ID by name:', nameResult.results[0].id);
        return nameResult.results[0].id;
      }
    }

    console.warn('Group not found, using slug directly:', group);
    return group;
  } catch (error) {
    console.warn('Error looking up group:', error);
    return group;
  }
}

async function assignGroup(accountId: string, group: string, authHeader: string): Promise<void> {
  const groupId = await lookupGroupId(group, authHeader);
  if (groupId) {
    const updateUrl = `https://api.swell.store/accounts/${accountId}`;
    const res = await fetch(updateUrl, {
      method: 'PUT',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({ group: groupId }),
    });
    if (res.ok) {
      console.log('Group assigned successfully');
    } else {
      console.warn('Failed to assign group:', await res.text());
    }
  }
}
