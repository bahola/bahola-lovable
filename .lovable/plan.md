
# Coupon System & COD Checkout Implementation Plan

## Overview
This plan implements coupon code functionality from Swell, adds Cash on Delivery (COD) payment option for testing, enhances the order confirmation page, and ensures proper cart syncing with Swell after order completion.

---

## Phase 1: Swell Coupon Integration

### 1.1 Extend Swell Client with Coupon Methods
**File: `src/integrations/swell/client.ts`**

Add a new `cart.applyCoupon()` method to the Swell client that updates the cart with a coupon code:

```typescript
cart = {
  // ... existing methods ...
  
  applyCoupon: async (code: string) => {
    return this.request('/cart', {
      method: 'PUT',
      body: JSON.stringify({ coupon_code: code }),
    });
  },
  
  removeCoupon: async () => {
    return this.request('/cart', {
      method: 'PUT',
      body: JSON.stringify({ coupon_code: null }),
    });
  },
  
  update: async (data: any) => {
    return this.request('/cart', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};
```

### 1.2 Update SwellCartContext
**File: `src/contexts/SwellCartContext.tsx`**

Add coupon-related state and methods:
- `appliedCoupon`: stores coupon details (code, discount amount)
- `discountTotal`: tracks the discount applied
- `applyCoupon(code)`: applies a coupon code via Swell API
- `removeCoupon()`: removes applied coupon
- Update `parseCartData` to extract coupon and discount info from Swell cart response

The Swell cart response includes:
- `coupon_code`: applied coupon code
- `discount_total`: total discount amount
- `discounts`: array of discount details

### 1.3 Update CartAdapter
**File: `src/contexts/CartAdapter.tsx`**

Expose coupon functionality to consuming components:
- Pass through `applyCoupon`, `removeCoupon`, `appliedCoupon`, and `discountTotal`
- Update `CartContextType` interface

### 1.4 Create Coupon Input Hook
**New File: `src/hooks/useCouponCode.ts`**

Create a dedicated hook for coupon validation and application:
- Manages coupon code input state
- Handles loading state during API calls
- Displays success/error feedback via toast
- Returns applied discount information

---

## Phase 2: Checkout Page Updates

### 2.1 Integrate Coupon Functionality
**File: `src/pages/Checkout.tsx`**

Updates needed:
- Import and use `useCouponCode` hook
- Wire "Apply" button to `applyCoupon` function
- Display applied coupon with discount amount
- Add "Remove" option for applied coupons
- Update order summary to show discount line

### 2.2 Add Form State Management
**File: `src/pages/Checkout.tsx`**

Implement controlled form inputs for:
- Customer details (firstName, lastName, email, phone)
- Shipping address (address1, address2, city, state, pincode)
- GSTIN (optional)
- Payment method selection (Razorpay/COD)

### 2.3 Implement COD Order Submission
**File: `src/pages/Checkout.tsx`**

When COD is selected:
1. Validate all required form fields
2. Update Swell cart with customer info via `swell.cart.update()`
3. Submit order via `swell.cart.submitOrder()`
4. Store order details in localStorage for confirmation page
5. Redirect to `/thank-you` with order reference

### 2.4 Update Order Summary Display
**File: `src/pages/Checkout.tsx`**

Add discount row to order summary:
```text
Subtotal:     ₹1,500
Discount:     -₹150 (SUMMER25)
Shipping:     ₹70
-----------------------
Total:        ₹1,420
```

---

## Phase 3: Order Confirmation Page

### 3.1 Create Orders Table in Supabase
**Database Migration**

New `orders` table to store completed orders:
- `id` (UUID, primary key)
- `order_number` (text, unique) - from Swell order
- `swell_order_id` (text) - Swell's order ID
- `customer_name`, `customer_email`, `customer_phone`
- `shipping_address` (JSONB)
- `items` (JSONB) - snapshot of ordered items
- `subtotal`, `discount_amount`, `shipping_cost`, `total` (numeric)
- `coupon_code` (text, nullable)
- `gstin` (text, nullable)
- `payment_method` (text) - 'cod' or 'razorpay'
- `payment_status` (text) - 'pending', 'completed', 'failed'
- `order_status` (text) - 'processing', 'shipped', 'delivered'
- `created_at`, `updated_at` (timestamptz)

RLS Policies:
- Public INSERT for order creation (guest checkout support)
- SELECT by order_number for confirmation page access

### 3.2 Update ThankYou Page
**File: `src/pages/ThankYou.tsx`**

Replace static data with dynamic order details:
- Read order reference from URL params or localStorage
- Fetch order details from Supabase or Swell
- Display actual order information:
  - Order number and date
  - Items purchased with quantities and prices
  - Applied discount (if any)
  - Shipping cost
  - Total amount
  - Payment method
  - Shipping address
  - Estimated delivery

### 3.3 Add Order Saving Logic
**New File: `src/utils/orderService.ts`**

Create order service functions:
- `saveOrder(orderData)`: saves order to Supabase
- `getOrderByNumber(orderNumber)`: retrieves order for confirmation page
- `generateOrderNumber()`: creates unique order number (e.g., BL20250201001)

---

## Phase 4: Cart Sync & Clearing

### 4.1 Post-Order Cart Clearing
**File: `src/contexts/SwellCartContext.tsx`**

Ensure `clearCart()` properly:
- Calls `swell.cart.setItems([])` to clear Swell cart
- Removes `swell_checkout_id` from localStorage
- Resets all local state (items, totals, coupon)

### 4.2 Update Checkout Flow
**File: `src/pages/Checkout.tsx`**

After successful order submission:
1. Call `clearCart()` from context
2. Verify cart is emptied
3. Handle any clearing errors gracefully

### 4.3 Cart Recovery Cleanup
**File: `src/contexts/SwellCartContext.tsx`**

Add logic to handle cart state after order:
- If cart recovery returns an already-submitted cart, treat as empty
- Clear stale checkout_id if cart is no longer valid

---

## File Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/integrations/swell/client.ts` | Modify | Add `cart.applyCoupon()`, `cart.removeCoupon()`, `cart.update()` methods |
| `src/contexts/SwellCartContext.tsx` | Modify | Add coupon state, discount tracking, apply/remove coupon methods |
| `src/contexts/CartAdapter.tsx` | Modify | Expose coupon functionality to components |
| `src/hooks/useCouponCode.ts` | Create | Coupon input management hook |
| `src/pages/Checkout.tsx` | Modify | Form state, coupon UI, COD submission, order summary updates |
| `src/pages/ThankYou.tsx` | Modify | Dynamic order display from URL/storage |
| `src/utils/orderService.ts` | Create | Order saving and retrieval functions |
| Database migration | Create | Add `orders` table with RLS policies |

---

## Technical Details

### Swell Cart Update for Coupon
Based on Swell documentation, coupons are applied via cart update:
```typescript
await swell.cart.update({ coupon_code: 'SUMMER25' });
```

The response includes:
- `coupon_code`: the applied code
- `discount_total`: calculated discount
- `discounts`: array of applied discount details

### Swell Order Submission
For COD orders:
```typescript
// First update cart with customer/shipping info
await swell.cart.update({
  account: { email, ... },
  shipping: { name, address1, ... },
  billing: { ... }
});

// Then submit the order
const order = await swell.cart.submitOrder();
```

### Order Number Format
Generate readable order numbers: `BL` + `YYYYMMDD` + `sequence`
Example: `BL20250201001`

---

## User Flow

```text
1. User adds items to cart
          ↓
2. User navigates to /checkout
          ↓
3. User fills contact & shipping info
          ↓
4. User enters coupon code (optional)
   └→ Click "Apply" → Swell validates & applies discount
   └→ Order summary updates with discount
          ↓
5. User selects payment method (COD for now)
          ↓
6. User clicks "Place Order"
          ↓
7. System updates Swell cart with all info
          ↓
8. System submits order to Swell
          ↓
9. System saves order to Supabase
          ↓
10. System clears cart (local + Swell)
          ↓
11. User redirected to /thank-you with order details
```

---

## Testing Considerations
- Test coupon application with valid/invalid codes
- Verify discount calculations display correctly
- Test COD order submission flow end-to-end
- Confirm cart clears properly after order
- Verify order confirmation page shows correct data
- Test with both logged-in and guest users
