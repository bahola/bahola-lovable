

# Security Hardening: Priority Matrix Implementation

## Overview

This plan addresses the remaining security vulnerabilities identified in the security scan, organized by priority.

---

## Priority 1: Fix swell_wishlist Policies (CRITICAL - 30 min)

### Current Vulnerability
The `swell_wishlist` table has dangerous permissive policies:
- `Anyone can add to wishlist` - INSERT with `CHECK (true)`
- `Anyone can remove from wishlist` - DELETE with `USING (true)` 
- `Anyone can view wishlist items` - SELECT with `USING (true)`

**Risk**: Any user can delete any other user's wishlist items.

### Solution
The wishlist uses **email as user_id** (since Swell auth is separate from Supabase). The client code in `useSwellWishlist.ts` (line 31) sets `user_id = user.email`.

Since customers use Swell auth (not Supabase auth), we need an edge function approach for secure wishlist operations, similar to how we secured orders.

**Database Migration:**
```sql
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

-- No direct access for anon/regular users
-- They will use edge functions with Swell token verification
```

**New Edge Function: `supabase/functions/wishlist-operations/index.ts`**
- Validates Swell session token
- Verifies email matches the Swell account
- Performs wishlist CRUD using service_role

**Client Update: `src/hooks/useSwellWishlist.ts`**
- Replace direct Supabase calls with edge function calls
- Pass Swell session for verification

---

## Priority 2: Fix CMS Content Policies (45 min)

### Current Issue
Both `website_pages` and `help_center_content` have overly permissive policies:

**website_pages:**
- `Authenticated users can manage pages` - ALL with `USING (true)` for authenticated users

**help_center_content:**
- `Admin can manage help content` - ALL with `USING (true)` (not actually checking admin!)

### Solution
Only admins should edit CMS content. Public can read published content.

**Database Migration:**
```sql
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
```

---

## Priority 3: Fix Function search_path (15 min)

### Current Issue
5 functions are missing `SET search_path = public`:
1. `calculate_customer_ltv`
2. `generate_customer_id`
3. `set_customer_id`
4. `update_customer_ltv_on_order_update`
5. `update_doctor_schedule_timestamp`

Note: `update_updated_at_column` already has `search_path=public` set.

### Solution
Recreate functions with `SET search_path = public` for security best practice:

**Database Migration:**
```sql
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

-- 5. calculate_customer_ltv (large function - preserving full body)
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
```

---

## Implementation Order

### Step 1: Database Migration (Single migration file)
1. Drop dangerous wishlist policies
2. Create new wishlist admin policy
3. Drop/recreate CMS content policies
4. Recreate 5 functions with search_path

### Step 2: Create Wishlist Edge Function
- `supabase/functions/wishlist-operations/index.ts`
- Handles add, remove, list operations
- Validates Swell session token

### Step 3: Update Client Code
- Modify `src/hooks/useSwellWishlist.ts` to use edge function

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `supabase/migrations/[timestamp]_security_priority_fixes.sql` | Create | All database changes |
| `supabase/functions/wishlist-operations/index.ts` | Create | Secure wishlist CRUD |
| `src/hooks/useSwellWishlist.ts` | Modify | Use edge function |
| `supabase/config.toml` | Modify | Add wishlist function config |

---

## Security Summary After Changes

| Component | Before | After |
|-----------|--------|-------|
| Wishlist DELETE | Anyone can delete any | Edge function + Swell verification |
| Wishlist INSERT | Anyone can insert any | Edge function + Swell verification |
| website_pages WRITE | Any authenticated user | Admin only via `is_admin()` |
| help_center WRITE | `USING (true)` - anyone! | Admin only via `is_admin()` |
| Functions search_path | 5 missing | All functions secured |

