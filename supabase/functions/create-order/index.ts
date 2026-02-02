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
    const orderData = await req.json();

    // Validate required fields
    const required = ['orderNumber', 'customerName', 'customerEmail', 'customerPhone', 
                      'shippingAddress', 'items', 'subtotal', 'total', 'paymentMethod'];
    
    for (const field of required) {
      if (!orderData[field]) {
        return new Response(
          JSON.stringify({ error: `Missing required field: ${field}` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(orderData.customerEmail)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use service_role to INSERT (bypasses RLS)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const insertData = {
      order_number: orderData.orderNumber,
      swell_order_id: orderData.swellOrderId || null,
      customer_name: orderData.customerName,
      customer_email: orderData.customerEmail.toLowerCase(),
      customer_phone: orderData.customerPhone,
      shipping_address: orderData.shippingAddress,
      items: orderData.items,
      subtotal: orderData.subtotal,
      discount_amount: orderData.discountAmount || 0,
      shipping_cost: orderData.shippingCost || 0,
      total: orderData.total,
      coupon_code: orderData.couponCode || null,
      gstin: orderData.gstin || null,
      payment_method: orderData.paymentMethod,
      payment_status: orderData.paymentStatus || 'pending',
      order_status: 'processing',
      notes: orderData.notes || null,
    };

    const { data, error } = await supabase
      .from('orders')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to create order' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, order: data }),
      { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('create-order error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
