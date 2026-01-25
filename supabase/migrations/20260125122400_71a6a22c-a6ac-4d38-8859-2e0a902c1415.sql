-- Create swell_wishlist table for Swell product wishlist
CREATE TABLE public.swell_wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_name TEXT,
  product_image TEXT,
  product_price NUMERIC(10,2),
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE public.swell_wishlist ENABLE ROW LEVEL SECURITY;

-- RLS Policies (permissive since auth is Swell-based, filtering by user_id in app)
CREATE POLICY "Anyone can view wishlist items"
  ON public.swell_wishlist FOR SELECT
  USING (true);

CREATE POLICY "Anyone can add to wishlist"
  ON public.swell_wishlist FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can remove from wishlist"
  ON public.swell_wishlist FOR DELETE
  USING (true);

-- Index for faster lookups
CREATE INDEX idx_swell_wishlist_user_id ON public.swell_wishlist(user_id);