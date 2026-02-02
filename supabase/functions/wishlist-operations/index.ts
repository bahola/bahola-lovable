import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product_name: string | null;
  product_image: string | null;
  product_price: number | null;
  added_at: string | null;
}

interface SwellProduct {
  id: string;
  name: string;
  price?: number;
  image?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, userEmail, product, productId } = await req.json();

    // Validate required fields
    if (!action) {
      return new Response(
        JSON.stringify({ error: 'Action is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!userEmail || typeof userEmail !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail.trim())) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const normalizedEmail = userEmail.trim().toLowerCase();

    // Create Supabase client with service role (bypasses RLS)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    switch (action) {
      case 'list': {
        // Get user's wishlist items
        const { data, error } = await supabase
          .from('swell_wishlist')
          .select('*')
          .eq('user_id', normalizedEmail)
          .order('added_at', { ascending: false });

        if (error) {
          console.error('Error fetching wishlist:', error);
          return new Response(
            JSON.stringify({ error: 'Failed to fetch wishlist' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ items: data || [] }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'add': {
        if (!product || !product.id || !product.name) {
          return new Response(
            JSON.stringify({ error: 'Product details required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Check if already in wishlist
        const { data: existing } = await supabase
          .from('swell_wishlist')
          .select('id')
          .eq('user_id', normalizedEmail)
          .eq('product_id', product.id)
          .single();

        if (existing) {
          return new Response(
            JSON.stringify({ error: 'Product already in wishlist', alreadyExists: true }),
            { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Add to wishlist
        const { data, error } = await supabase
          .from('swell_wishlist')
          .insert({
            user_id: normalizedEmail,
            product_id: product.id,
            product_name: product.name,
            product_image: product.image || null,
            product_price: product.price || null,
          })
          .select()
          .single();

        if (error) {
          console.error('Error adding to wishlist:', error);
          return new Response(
            JSON.stringify({ error: 'Failed to add to wishlist' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ success: true, item: data }),
          { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'remove': {
        if (!productId) {
          return new Response(
            JSON.stringify({ error: 'Product ID required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Only delete items belonging to the authenticated user
        const { error } = await supabase
          .from('swell_wishlist')
          .delete()
          .eq('user_id', normalizedEmail)
          .eq('product_id', productId);

        if (error) {
          console.error('Error removing from wishlist:', error);
          return new Response(
            JSON.stringify({ error: 'Failed to remove from wishlist' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ success: true }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'check': {
        if (!productId) {
          return new Response(
            JSON.stringify({ error: 'Product ID required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { data } = await supabase
          .from('swell_wishlist')
          .select('id')
          .eq('user_id', normalizedEmail)
          .eq('product_id', productId)
          .single();

        return new Response(
          JSON.stringify({ inWishlist: !!data }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: `Unknown action: ${action}` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (err) {
    console.error('Wishlist operations error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
