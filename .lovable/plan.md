
## Set Up Add to Cart and Wishlist Functionality with Swell Integration

### Overview

This implementation will:
1. **Fix Add to Cart** - Ensure variant selection is properly passed to Swell's cart API
2. **Create Wishlist functionality** - Store Swell product IDs in Supabase and display on Wishlist page
3. **Add Wishlist button** - Add "Add to Wishlist" and "Share" buttons to the product page
4. **Update "My List" link** - Ensure the TopBar "My List" link navigates to the wishlist

---

### Current State Analysis

| Component | Current Status | Issue |
|-----------|---------------|-------|
| **Cart** | Working via `SwellCartContext` → `CartAdapter` | Minor - needs variant ID support |
| **Wishlist Table** | Supabase `wishlist` with UUID `product_id` | Incompatible - Swell IDs are strings |
| **Wishlist Page** | Fetches from Supabase `products` table | Wrong - needs to fetch from Swell |
| **TopBar "My List"** | Links to `/my-list` → `Wishlist` page | Working - routes exist |
| **Product Page** | No wishlist button | Missing functionality |

---

### Database Change Required

The current `wishlist.product_id` column is UUID type, but Swell product IDs are strings like `"6970e051b00d0400114eca0d"`. We need to:

1. **Create a new `swell_wishlist` table** (cleaner than altering the existing table used by Supabase products)

```sql
CREATE TABLE public.swell_wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,  -- Swell customer ID or email
  product_id TEXT NOT NULL,  -- Swell product ID
  product_name TEXT,  -- Cached for display
  product_image TEXT,  -- Cached for display  
  product_price NUMERIC(10,2),  -- Cached for display
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- RLS Policies
ALTER TABLE public.swell_wishlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own wishlist"
  ON public.swell_wishlist FOR SELECT
  USING (true);  -- We'll filter by user_id in the app since auth is Swell-based

CREATE POLICY "Users can add to their wishlist"
  ON public.swell_wishlist FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can remove from their wishlist"
  ON public.swell_wishlist FOR DELETE
  USING (true);
```

---

### Implementation Plan

#### Step 1: Create Swell Wishlist Hook

**New File:** `src/hooks/useSwellWishlist.ts`

This hook will:
- Add/remove products to/from the `swell_wishlist` table
- Check if a product is in the wishlist
- Fetch all wishlist items for the current user

```typescript
export const useSwellWishlist = () => {
  const { user, isAuthenticated } = useSwellAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const userId = user?.email || user?.id;

  // Query wishlist items
  const { data: wishlistItems, isLoading } = useQuery({
    queryKey: ['swell-wishlist', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data } = await supabase
        .from('swell_wishlist')
        .select('*')
        .eq('user_id', userId)
        .order('added_at', { ascending: false });
      return data || [];
    },
    enabled: !!userId
  });

  // Add to wishlist
  const addToWishlist = async (product: SwellProduct) => {
    if (!isAuthenticated || !userId) {
      toast({ title: "Please login", description: "..." });
      return false;
    }
    // Check if already in wishlist, then insert
    // Invalidate query cache on success
  };

  // Remove from wishlist
  const removeFromWishlist = async (productId: string) => { ... };

  // Check if in wishlist
  const isInWishlist = (productId: string) => {
    return wishlistItems?.some(item => item.product_id === productId) || false;
  };

  return { wishlistItems, isLoading, addToWishlist, removeFromWishlist, isInWishlist };
};
```

#### Step 2: Add Wishlist Button to Product Page

**File:** `src/components/product/GenericProductPage.tsx`

Add secondary action buttons below the CTA buttons:

```tsx
{/* CTA Buttons */}
<div className="flex gap-4">
  <button onClick={handleAddToCart}>Add to Cart</button>
  <button onClick={handleBuyNow}>Buy Now</button>
</div>

{/* Secondary Actions - NEW */}
<div className="flex gap-4 pt-4">
  <button onClick={handleAddToWishlist} className="...">
    <Heart className={isInWishlist ? "fill-current" : ""} />
    {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
  </button>
  <button onClick={handleShare} className="...">
    <Share2 />
    Share
  </button>
</div>
```

#### Step 3: Rewrite Wishlist Page for Swell Products

**File:** `src/pages/Wishlist.tsx`

The page will:
1. Use `useSwellWishlist` hook to get wishlist items
2. Display cached product info from `swell_wishlist` table
3. Optionally refresh product details from Swell API
4. Use `useCart` hook (Swell cart) for Add to Cart

```tsx
const WishlistPage = () => {
  const { wishlistItems, isLoading, removeFromWishlist } = useSwellWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: item.product_id,
      name: item.product_name,
      price: item.product_price,
      image: item.product_image || '/placeholder.svg'
    }, 1);
    toast({ title: "Added to cart" });
  };

  // Render wishlist grid with cached product info
};
```

#### Step 4: Verify TopBar "My List" Link

**File:** `src/components/header/TopBar.tsx`

The existing link is correct:
```tsx
<Link to="/my-list" className="top-menu-item flex items-center space-x-1">
  <Heart size={14} />
  <span>My List</span>
</Link>
```

The route `/my-list` correctly maps to the Wishlist page in `AppRoutes.tsx`.

---

### Files to Create

| File | Purpose |
|------|---------|
| `src/hooks/useSwellWishlist.ts` | Wishlist CRUD operations using Supabase + Swell auth |

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/product/GenericProductPage.tsx` | Add wishlist + share buttons, import hook |
| `src/pages/Wishlist.tsx` | Rewrite to use `useSwellWishlist` and `useCart` |
| `src/contexts/CartAdapter.tsx` | Add variant options support to `addToCart` |

### Database Changes

| Table | Action |
|-------|--------|
| `swell_wishlist` | CREATE new table for Swell product wishlist |

---

### Data Flow

```text
PRODUCT PAGE                           WISHLIST PAGE
┌─────────────────────┐                ┌─────────────────────┐
│  Add to Wishlist    │                │  My List            │
│         │           │                │         │           │
└─────────┼───────────┘                └─────────┼───────────┘
          │                                      │
          ▼                                      ▼
┌─────────────────────┐                ┌─────────────────────┐
│  useSwellWishlist   │◄──────────────►│  useSwellWishlist   │
│  • addToWishlist()  │                │  • wishlistItems    │
│  • isInWishlist()   │                │  • removeFromWishlist│
└─────────┼───────────┘                └─────────┼───────────┘
          │                                      │
          ▼                                      ▼
┌─────────────────────┐                ┌─────────────────────┐
│  Supabase           │                │  useCart (Swell)    │
│  swell_wishlist     │                │  • addToCart()      │
│  table              │                │                     │
└─────────────────────┘                └─────────────────────┘
```

---

### Technical Notes

**Why a new `swell_wishlist` table?**
- The existing `wishlist` table uses UUID for `product_id` (linked to Supabase products)
- Swell product IDs are 24-character strings
- A separate table avoids breaking existing functionality and allows caching product info

**Cart Variant Support:**
The `CartAdapter.addToCart` will pass variant options through to Swell:
```typescript
// Current signature
addToCart(item, quantity)

// Updated to support options
addToCart(item, quantity, options)
// Where options = { variant_id: "selected-variant-id" }
```

**Share Functionality:**
Uses the Web Share API with fallback to clipboard:
```typescript
const handleShare = async () => {
  if (navigator.share) {
    await navigator.share({ title, text, url });
  } else {
    await navigator.clipboard.writeText(url);
    toast({ title: "Link copied!" });
  }
};
```
