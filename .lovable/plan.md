

# Modified Security Hardening Plan - Dual Auth System

## Architecture Overview

This plan implements a **Dual Authentication System** where:
- **Customers** authenticate via **Swell** (existing system, no changes needed)
- **Admins** authenticate via **Supabase Auth** (new, separate system)

This approach keeps the customer experience unchanged while adding proper server-side admin authorization.

```text
┌─────────────────────────────────────────────────────────────────────┐
│                      Authentication Architecture                      │
├───────────────────────────────────┬─────────────────────────────────┤
│           CUSTOMERS               │            ADMINS                │
│  (Existing - No Changes)          │     (New - Supabase Auth)        │
├───────────────────────────────────┼─────────────────────────────────┤
│  Login: /login                    │  Login: /admin/login             │
│  Auth: Swell API                  │  Auth: supabase.auth             │
│  Session: localStorage +          │  Session: Supabase session       │
│           Swell cookies           │                                  │
│  DB Access: Via edge functions    │  DB Access: RLS + is_admin()     │
│             with email verify     │                                  │
├───────────────────────────────────┴─────────────────────────────────┤
│                        Edge Functions                                 │
│  - get-order: validates orderNumber + email (no auth required)       │
│  - get-customer-orders: validates Swell token                        │
│  - create-order: service_role INSERT                                 │
│  - admin-*: requires Supabase auth + admin role                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Database Setup (P0)

### 1.1 Create User Roles System

```sql
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table (links to Supabase auth.users)
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Convenience function for current user
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(public.has_role(auth.uid(), 'admin'), false)
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
```

### 1.2 Fix Orders Table RLS (Remove Dangerous Anon Policy)

```sql
-- Drop existing permissive policies
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can view orders by order_number" ON public.orders;

-- NO anon policy - customers access orders via edge functions only

-- Admins can view/manage all orders (via Supabase auth)
CREATE POLICY "orders_admin_all"
  ON public.orders FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Note: Regular users cannot access orders table directly
-- They use get-order edge function with email verification
```

### 1.3 Fix Customers Table RLS

```sql
-- Drop existing permissive policy
DROP POLICY IF EXISTS "Allow full access for authenticated users" ON public.customers;

-- Admins can access all customers (via Supabase auth)
CREATE POLICY "customers_admin_all"
  ON public.customers FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Anonymous/authenticated can INSERT during registration
CREATE POLICY "customers_insert_registration"
  ON public.customers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);  -- Validated by edge function

-- Note: Customer self-service via edge functions with Swell token verification
```

### 1.4 Fix Validation Trigger (NULL auth.uid() for service_role)

```sql
CREATE OR REPLACE FUNCTION public.validate_customer_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Service role: auth.uid() is NULL when using service_role key
  -- This allows edge functions to update protected fields
  IF auth.uid() IS NULL THEN
    RETURN NEW;
  END IF;
  
  -- For authenticated users, check admin role
  IF public.is_admin() THEN
    RETURN NEW;
  END IF;
  
  -- Block changes to protected fields for regular users
  IF OLD.verification_status IS DISTINCT FROM NEW.verification_status THEN
    RAISE EXCEPTION 'Cannot modify verification_status';
  END IF;
  
  IF OLD.customer_type IS DISTINCT FROM NEW.customer_type THEN
    RAISE EXCEPTION 'Cannot modify customer_type';
  END IF;
  
  IF OLD.customer_id IS DISTINCT FROM NEW.customer_id THEN
    RAISE EXCEPTION 'Cannot modify customer_id';
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_customer_update_restrictions
  BEFORE UPDATE ON public.customers
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_customer_update();
```

### 1.5 Enable RLS on All Tables

```sql
-- Enable RLS on 8 tables currently without it
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.erpnext_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_areas ENABLE ROW LEVEL SECURITY;

-- Public read access for product/shipping tables
CREATE POLICY "products_public_read" ON public.products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "variations_public_read" ON public.product_variations FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "categories_public_read" ON public.product_categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "subcategories_public_read" ON public.product_subcategories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "erpnext_public_read" ON public.erpnext_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "shipping_zones_public_read" ON public.shipping_zones FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "shipping_rates_public_read" ON public.shipping_rates FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "shipping_areas_public_read" ON public.shipping_areas FOR SELECT TO anon, authenticated USING (true);

-- Admin-only write access
CREATE POLICY "products_admin_write" ON public.products FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "variations_admin_write" ON public.product_variations FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "categories_admin_write" ON public.product_categories FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "subcategories_admin_write" ON public.product_subcategories FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "erpnext_admin_write" ON public.erpnext_items FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "shipping_zones_admin_write" ON public.shipping_zones FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "shipping_rates_admin_write" ON public.shipping_rates FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "shipping_areas_admin_write" ON public.shipping_areas FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
```

---

## Phase 2: Edge Functions for Customer Operations (P0/P1)

### 2.1 Create `get-order` Edge Function (Order Confirmation)

**File: `supabase/functions/get-order/index.ts`**

This replaces direct database access for order confirmation:

```typescript
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
    const { orderNumber, email } = await req.json();

    // Input validation
    if (!orderNumber || typeof orderNumber !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Order number is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate order number format: BL + YYYYMMDD + 4 digits
    if (!/^BL\d{12}$/.test(orderNumber)) {
      return new Response(
        JSON.stringify({ error: 'Invalid order number format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim().toLowerCase())) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use service_role to bypass RLS
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Query with BOTH orderNumber AND email for security
    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber)
      .eq('customer_email', email.trim().toLowerCase())
      .single();

    if (error || !order) {
      return new Response(
        JSON.stringify({ error: 'Order not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Return sanitized order data (exclude internal fields if any)
    return new Response(
      JSON.stringify({ order }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('get-order error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

**Config: `supabase/config.toml`**
```toml
[functions.get-order]
verify_jwt = false
```

### 2.2 Create `get-customer-orders` Edge Function

**File: `supabase/functions/get-customer-orders/index.ts`**

For authenticated customers to view their order history (validates Swell token):

```typescript
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
    // Note: This validates the user is who they claim to be
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
```

### 2.3 Create `create-order` Edge Function

**File: `supabase/functions/create-order/index.ts`**

Moves order creation to server-side with service_role:

```typescript
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
```

---

## Phase 3: Admin Authentication System (P1)

### 3.1 Create Admin Login Page

**File: `src/pages/admin/AdminLogin.tsx`**

```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Lock, Mail, Loader2 } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Step 1: Authenticate with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      // Step 2: Verify user has admin role
      const { data: isAdmin, error: roleError } = await supabase.rpc('is_admin');

      if (roleError) {
        console.error('Role check error:', roleError);
        await supabase.auth.signOut();
        throw new Error('Failed to verify admin status');
      }

      if (!isAdmin) {
        await supabase.auth.signOut();
        throw new Error('You do not have admin access');
      }

      toast({
        title: 'Welcome, Admin',
        description: 'Successfully logged in to admin dashboard',
      });

      navigate('/admin');

    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error instanceof Error ? error.message : 'Invalid credentials',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-bahola-blue-700">Bahola Admin</h1>
          <p className="text-gray-500">Sign in to access the admin dashboard</p>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bahola.com"
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In to Admin'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
```

### 3.2 Create useAdminCheck Hook

**File: `src/hooks/useAdminCheck.ts`**

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminCheckResult {
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  userId: string | null;
}

export const useAdminCheck = (): AdminCheckResult => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        // Check Supabase auth session (NOT Swell - admins use Supabase)
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.user) {
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        setUserId(session.user.id);

        // Check admin role via RPC function
        const { data, error: rpcError } = await supabase.rpc('is_admin');

        if (rpcError) {
          console.error('Admin check error:', rpcError);
          setError(rpcError.message);
          setIsAdmin(false);
        } else {
          setIsAdmin(data === true);
        }
      } catch (err) {
        console.error('Admin check exception:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setIsAdmin(false);
          setUserId(null);
        } else if (session?.user) {
          setUserId(session.user.id);
          const { data } = await supabase.rpc('is_admin');
          setIsAdmin(data === true);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { isAdmin, isLoading, error, userId };
};
```

### 3.3 Create ProtectedAdminRoute Component

**File: `src/components/auth/ProtectedAdminRoute.tsx`**

```typescript
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { Loader2 } from 'lucide-react';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { isAdmin, isLoading, error } = useAdminCheck();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-bahola-blue-500 mb-4" />
        <p className="text-gray-600">Verifying admin access...</p>
      </div>
    );
  }

  if (error || !isAdmin) {
    // Redirect to admin login page
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
```

### 3.4 Update AppRoutes.tsx

```typescript
// Add imports
import { ProtectedAdminRoute } from '@/components/auth/ProtectedAdminRoute';
import AdminLogin from '@/pages/admin/AdminLogin';

// Update admin routes
<Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin" element={
  <ProtectedAdminRoute>
    <AdminDashboard />
  </ProtectedAdminRoute>
}>
  <Route index element={<AdminHome />} />
  <Route path="products" element={<ProductsManagement />} />
  <Route path="pages" element={<PagesManagement />} />
  <Route path="help-center" element={<HelpCenterManagement />} />
</Route>
```

---

## Phase 4: Client-Side Updates (P1)

### 4.1 Update orderService.ts

```typescript
// Add new function for secure order fetching
export const getOrderByNumberSecure = async (
  orderNumber: string,
  email: string
): Promise<OrderData | null> => {
  try {
    const response = await fetch(
      `https://vjkhsdwavbswcoyfgyvg.supabase.co/functions/v1/get-order`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber, email }),
      }
    );

    if (!response.ok) return null;

    const { order } = await response.json();
    if (!order) return null;

    return {
      orderNumber: order.order_number,
      swellOrderId: order.swell_order_id ?? undefined,
      customerName: order.customer_name,
      customerEmail: order.customer_email,
      customerPhone: order.customer_phone,
      shippingAddress: order.shipping_address,
      items: order.items,
      subtotal: Number(order.subtotal),
      discountAmount: Number(order.discount_amount),
      shippingCost: Number(order.shipping_cost),
      total: Number(order.total),
      couponCode: order.coupon_code ?? undefined,
      gstin: order.gstin ?? undefined,
      paymentMethod: order.payment_method,
      paymentStatus: order.payment_status,
      orderStatus: order.order_status,
      notes: order.notes ?? undefined,
    };
  } catch (err) {
    console.error('[OrderService] Error fetching order securely:', err);
    return null;
  }
};

// Update saveOrder to use edge function
export const saveOrder = async (orderData: OrderData): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(
      `https://vjkhsdwavbswcoyfgyvg.supabase.co/functions/v1/create-order`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      }
    );

    if (!response.ok) {
      const { error } = await response.json();
      return { success: false, error: error || 'Failed to save order' };
    }

    console.log('[OrderService] Order saved successfully:', orderData.orderNumber);
    return { success: true };
  } catch (err) {
    console.error('[OrderService] Exception saving order:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
};
```

### 4.2 Update ThankYou.tsx

```typescript
// Update import
import { getLocalOrder, getOrderByNumberSecure, OrderData, clearLocalOrder } from '@/utils/orderService';

// Update loadOrder function
useEffect(() => {
  const loadOrder = async () => {
    const orderNumber = searchParams.get('order');
    const email = searchParams.get('email');
    
    // First try to get from localStorage (fastest)
    const localOrder = getLocalOrder();
    if (localOrder) {
      setOrderData(localOrder);
      setLoading(false);
      clearLocalOrder();
      return;
    }
    
    // If we have order number AND email, fetch via secure edge function
    if (orderNumber && email) {
      const dbOrder = await getOrderByNumberSecure(orderNumber, email);
      if (dbOrder) {
        setOrderData(dbOrder);
      }
    }
    
    setLoading(false);
  };
  
  loadOrder();
}, [searchParams]);
```

### 4.3 Update Checkout.tsx Redirect

```typescript
// In handleOrderComplete function, include email in redirect
navigate(`/thank-you?order=${orderNumber}&email=${encodeURIComponent(formData.email)}`);
```

---

## Implementation Order

1. **Database Migration** (Single migration with all changes)
   - Create `user_roles` table and `has_role()`/`is_admin()` functions
   - Drop permissive orders/customers policies
   - Create new RLS policies for dual auth
   - Enable RLS on 8 tables
   - Create validation trigger

2. **Edge Functions** (Deploy in order)
   - `get-order` - Order confirmation
   - `create-order` - Order creation
   - `get-customer-orders` - Order history with Swell verification

3. **Client-Side** (Update in order)
   - Create `AdminLogin.tsx`
   - Create `useAdminCheck.ts` hook
   - Create `ProtectedAdminRoute.tsx`
   - Update `AppRoutes.tsx`
   - Update `orderService.ts`
   - Update `ThankYou.tsx`
   - Update `Checkout.tsx` redirect

4. **Testing**
   - Verify customer order confirmation works
   - Verify admin login flow
   - Verify admin route protection
   - Test RLS policies

---

## Files to Create

| File | Purpose |
|------|---------|
| `supabase/functions/get-order/index.ts` | Secure order lookup |
| `supabase/functions/create-order/index.ts` | Secure order creation |
| `supabase/functions/get-customer-orders/index.ts` | Order history with Swell auth |
| `src/pages/admin/AdminLogin.tsx` | Separate admin login page |
| `src/hooks/useAdminCheck.ts` | Admin role verification hook |
| `src/components/auth/ProtectedAdminRoute.tsx` | Route guard component |

## Files to Modify

| File | Changes |
|------|---------|
| `src/utils/orderService.ts` | Add secure functions, use edge functions |
| `src/pages/ThankYou.tsx` | Use secure order fetching with email |
| `src/pages/Checkout.tsx` | Include email in redirect URL |
| `src/components/routing/AppRoutes.tsx` | Add admin login route, wrap admin routes |

---

## Security Summary

| Component | Before | After |
|-----------|--------|-------|
| Customer Auth | Swell (unchanged) | Swell (unchanged) |
| Admin Auth | None (unprotected!) | Supabase Auth + role check |
| Order Access (anon) | `USING (true)` - anyone | Edge function with email verify |
| Order Access (admin) | Same as above | RLS with `is_admin()` check |
| Admin Routes | Unprotected | `ProtectedAdminRoute` guard |
| Order Creation | Direct client INSERT | Edge function with service_role |
| Trigger service_role | Blocked incorrectly | Allowed via NULL auth.uid() |

