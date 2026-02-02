-- ============================================
-- SECURITY HARDENING: Priority Matrix Fixes
-- ============================================

-- ============================================
-- PRIORITY 1: Fix swell_wishlist Policies
-- ============================================

-- Drop dangerous permissive policies
DROP POLICY IF EXISTS "Anyone can add to wishlist" ON swell_wishlist;
DROP POLICY IF EXISTS "Anyone can remove from wishlist" ON swell_wishlist;
DROP POLICY IF EXISTS "Anyone can view wishlist items" ON swell_wishlist;

-- Admins can manage all wishlists (via Supabase auth)
CREATE POLICY "wishlist_admin_all"
  ON swell_wishlist FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================
-- PRIORITY 2: Fix CMS Content Policies
-- ============================================

-- Fix website_pages
DROP POLICY IF EXISTS "Authenticated users can manage pages" ON website_pages;
DROP POLICY IF EXISTS "Public can view published pages" ON website_pages;

CREATE POLICY "website_pages_public_read"
  ON website_pages FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "website_pages_admin_write"
  ON website_pages FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Fix help_center_content
DROP POLICY IF EXISTS "Admin can manage help content" ON help_center_content;
DROP POLICY IF EXISTS "Anyone can view published help content" ON help_center_content;

CREATE POLICY "help_center_public_read"
  ON help_center_content FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "help_center_admin_write"
  ON help_center_content FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================
-- PRIORITY 3: Fix Function search_path
-- ============================================

-- 1. update_doctor_schedule_timestamp
CREATE OR REPLACE FUNCTION public.update_doctor_schedule_timestamp()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 2. set_customer_id
CREATE OR REPLACE FUNCTION public.set_customer_id()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.customer_id IS NULL OR NEW.customer_id = '' THEN
    NEW.customer_id := generate_customer_id(NEW.customer_type);
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

-- 3. generate_customer_id
CREATE OR REPLACE FUNCTION public.generate_customer_id(customer_type customer_type)
RETURNS text
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  prefix TEXT;
  next_num INTEGER;
  customer_id TEXT;
BEGIN
  IF customer_type = 'doctor' THEN
    prefix := 'DOC';
  ELSE
    prefix := 'CUST';
  END IF;
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(customer_id FROM LENGTH(prefix) + 1) AS INTEGER)), 0) + 1
  INTO next_num
  FROM customers 
  WHERE customer_id LIKE prefix || '%';
  
  customer_id := prefix || LPAD(next_num::TEXT, 3, '0');
  
  RETURN customer_id;
END;
$$;

-- 4. update_customer_ltv_on_order_update
CREATE OR REPLACE FUNCTION public.update_customer_ltv_on_order_update()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF (OLD.total_orders IS DISTINCT FROM NEW.total_orders) OR 
     (OLD.total_spent IS DISTINCT FROM NEW.total_spent) OR 
     (OLD.last_order_date IS DISTINCT FROM NEW.last_order_date) THEN
    PERFORM calculate_customer_ltv(NEW.id);
  END IF;
  RETURN NEW;
END;
$$;

-- 5. calculate_customer_ltv
CREATE OR REPLACE FUNCTION public.calculate_customer_ltv(customer_uuid uuid)
RETURNS void
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
    first_order DATE;
    last_order DATE;
    total_orders_count INTEGER;
    total_spent_amount NUMERIC;
    avg_order_value NUMERIC;
    customer_lifespan_days INTEGER;
    purchase_freq NUMERIC;
    days_between NUMERIC;
    predicted_next DATE;
    calculated_ltv NUMERIC;
    ltv_category TEXT;
    marketing_score INTEGER;
BEGIN
    SELECT 
        COALESCE(c.total_orders, 0),
        COALESCE(c.total_spent, 0),
        c.last_order_date,
        c.first_order_date
    INTO 
        total_orders_count,
        total_spent_amount,
        last_order,
        first_order
    FROM customers c 
    WHERE c.id = customer_uuid;
    
    IF total_orders_count > 0 THEN
        avg_order_value := total_spent_amount / total_orders_count;
        
        IF first_order IS NOT NULL AND last_order IS NOT NULL THEN
            customer_lifespan_days := last_order - first_order + 1;
            
            IF customer_lifespan_days > 0 AND total_orders_count > 1 THEN
                purchase_freq := total_orders_count::NUMERIC / (customer_lifespan_days::NUMERIC / 30.0);
                days_between := customer_lifespan_days::NUMERIC / (total_orders_count - 1);
                predicted_next := last_order + INTERVAL '1 day' * days_between;
            ELSE
                purchase_freq := 0;
                days_between := 0;
                predicted_next := NULL;
            END IF;
        ELSE
            customer_lifespan_days := 0;
            purchase_freq := 0;
            days_between := 0;
            predicted_next := NULL;
        END IF;
        
        calculated_ltv := avg_order_value * purchase_freq * 12;
        
        IF calculated_ltv >= 10000 THEN
            ltv_category := 'high';
            marketing_score := 1;
        ELSIF calculated_ltv >= 5000 THEN
            ltv_category := 'medium';
            marketing_score := 2;
        ELSIF calculated_ltv > 0 THEN
            ltv_category := 'low';
            marketing_score := 3;
        ELSE
            ltv_category := 'new';
            marketing_score := 3;
        END IF;
    ELSE
        avg_order_value := 0;
        purchase_freq := 0;
        days_between := 0;
        predicted_next := NULL;
        calculated_ltv := 0;
        ltv_category := 'new';
        marketing_score := 3;
    END IF;
    
    UPDATE customers 
    SET 
        average_order_value = avg_order_value,
        purchase_frequency = purchase_freq,
        days_between_orders = days_between,
        predicted_next_purchase_date = predicted_next,
        customer_lifetime_value = calculated_ltv,
        ltv_segment = ltv_category,
        marketing_priority = marketing_score,
        updated_at = NOW()
    WHERE id = customer_uuid;
END;
$$;