-- Phase 1: Security Hardening Migration
-- 1.1 Create User Roles System

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

-- 1.2 Fix Orders Table RLS (Remove Dangerous Anon Policy)
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can view orders by order_number" ON public.orders;

-- Admins can view/manage all orders (via Supabase auth)
CREATE POLICY "orders_admin_all"
  ON public.orders FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 1.3 Fix Customers Table RLS
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
  WITH CHECK (true);

-- 1.4 Fix Validation Trigger (NULL auth.uid() for service_role)
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

DROP TRIGGER IF EXISTS enforce_customer_update_restrictions ON public.customers;
CREATE TRIGGER enforce_customer_update_restrictions
  BEFORE UPDATE ON public.customers
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_customer_update();

-- 1.5 Enable RLS on All Tables
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