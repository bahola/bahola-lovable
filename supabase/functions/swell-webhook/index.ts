import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-swell-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface SwellWebhookPayload {
  id: string;
  model: string;
  type: string;
  data: {
    id: string;
    name?: string;
    slug?: string;
    price?: number;
    description?: string;
    images?: Array<{ file: { url: string } }>;
    date_created?: string;
    date_updated?: string;
    [key: string]: any;
  };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const payload: SwellWebhookPayload = await req.json();
    
    console.log('Received Swell webhook:', {
      model: payload.model,
      type: payload.type,
      id: payload.data?.id,
      name: payload.data?.name,
    });

    // Handle different webhook events
    switch (payload.model) {
      case 'products':
        await handleProductWebhook(payload);
        break;
      case 'categories':
        await handleCategoryWebhook(payload);
        break;
      default:
        console.log(`Unhandled webhook model: ${payload.model}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Webhook processed: ${payload.model}.${payload.type}`,
        productId: payload.data?.id,
        productName: payload.data?.name,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function handleProductWebhook(payload: SwellWebhookPayload) {
  const { type, data } = payload;
  
  console.log(`Processing product ${type}:`, {
    id: data.id,
    name: data.name,
    slug: data.slug,
    price: data.price,
    updated: data.date_updated,
  });

  switch (type) {
    case 'product.created':
      console.log(`✅ New product created: ${data.name} (${data.id})`);
      // The website fetches directly from Swell API, so new products will appear automatically
      // You could add cache invalidation here if using a caching layer
      break;
      
    case 'product.updated':
      console.log(`🔄 Product updated: ${data.name} (${data.id})`);
      // Log the updated fields for debugging
      if (data.date_updated) {
        console.log(`   Last updated: ${data.date_updated}`);
      }
      break;
      
    case 'product.deleted':
      console.log(`🗑️ Product deleted: ${data.id}`);
      break;
      
    default:
      console.log(`Unhandled product event type: ${type}`);
  }
}

async function handleCategoryWebhook(payload: SwellWebhookPayload) {
  const { type, data } = payload;
  
  console.log(`Processing category ${type}:`, {
    id: data.id,
    name: data.name,
    slug: data.slug,
  });

  switch (type) {
    case 'category.created':
      console.log(`✅ New category created: ${data.name}`);
      break;
    case 'category.updated':
      console.log(`🔄 Category updated: ${data.name}`);
      break;
    case 'category.deleted':
      console.log(`🗑️ Category deleted: ${data.id}`);
      break;
    default:
      console.log(`Unhandled category event type: ${type}`);
  }
}
