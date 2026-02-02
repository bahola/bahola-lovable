
# Plan: Integrate Swell Promotions, Shipping, and Fix COD Button

## Summary

This plan addresses three issues by integrating with Swell's built-in promotion and shipping systems:
1. Display coupon discounts on the Cart page (reading from Swell)
2. Use Swell's shipping services including free shipping thresholds
3. Fix the COD payment method button

---

## Issue 1: Coupon Not Displayed on Cart Page

### Current State
The Cart page doesn't show applied coupons or discount totals. The `discountTotal` and `appliedCoupon` values are available in the cart context but not used on the Cart page.

### Solution
- Import `discountTotal` and `appliedCoupon` from `useCart()`
- Add a coupon input section (similar to checkout page)
- Display discount row in the order summary when a coupon is applied
- Update total calculation to subtract the discount

### Files to Modify
- `src/pages/Cart.tsx`

---

## Issue 2: Swell-Based Shipping with Free Shipping Threshold

### Current State
Shipping is calculated using a local Supabase-based service that doesn't know about Swell's shipping rules (including free shipping over Rs.500).

### Solution
Replace the local shipping calculator with Swell's native shipping system:

1. **Add `getShippingRates` to Swell client** - Call `swell.cart.getShippingRates()` to get available shipping services
2. **Create new hook** `useSwellShipping` - Fetch shipping rates from Swell after shipping address is set
3. **Update ShippingCalculator component** - Use Swell shipping rates instead of local calculation
4. **Update Cart context** - Include `shipment_rating` and `shipping_total` from Swell cart response
5. **Auto-apply shipping** - When a valid pincode/address is entered, set the shipping service on the cart

The free shipping threshold (Rs.500+) configured in Swell will automatically apply through Swell's shipping rules.

### Files to Modify
- `src/integrations/swell/client.ts` - Add getShippingRates method
- `src/contexts/SwellCartContext.tsx` - Track shipping data from cart
- `src/hooks/useSwellShipping.ts` (new) - Hook to manage Swell shipping
- `src/components/shipping/ShippingCalculator.tsx` - Use Swell shipping rates
- `src/contexts/CartAdapter.tsx` - Expose shipping data

---

## Issue 3: COD Button Not Working

### Current State
The COD and Razorpay payment options use `div` elements with `onClick` handlers. This can cause issues with click event registration.

### Solution
Convert payment method selection from `div` to proper `button` elements with `type="button"` to prevent form submission interference and improve click handling reliability.

### Files to Modify
- `src/pages/Checkout.tsx`

---

## Technical Implementation Details

### Swell Client Updates
```text
Add new cart method:
  getShippingRates: async () => {
    return this.request(withCheckoutId('/cart/shipment-rating'));
  }
```

### SwellCartContext Updates
```text
Add to parsed cart data:
- shippingTotal: cart.shipping_total
- selectedShippingService: cart.shipping?.service

Add new context values:
- shippingTotal: number
- shippingServices: ShippingService[]
- getShippingRates: () => Promise<ShippingService[]>
- setShippingService: (serviceId: string) => Promise<void>
```

### useSwellShipping Hook
```text
New hook that:
- Fetches shipping rates after address is set
- Returns available services with prices
- Shows "FREE" when free shipping applies
- Allows selecting a shipping service
- Syncs with Swell cart
```

### Cart Page Updates
```text
Add to useCart destructuring:
- discountTotal
- appliedCoupon
- applyCoupon (from useCouponCode hook)
- removeCoupon

Add coupon input UI section
Add discount row to order summary
Update total calculation: subtotal - discount + shipping
```

### Checkout Payment Buttons
```text
Replace:
  <div onClick={() => setPaymentMethod('cod')} ...>

With:
  <button type="button" onClick={() => setPaymentMethod('cod')} ...>
```

---

## Implementation Order

1. Add `getShippingRates` to Swell client
2. Update SwellCartContext to track shipping data
3. Create useSwellShipping hook
4. Update ShippingCalculator to use Swell rates
5. Update CartAdapter to expose shipping
6. Add coupon display to Cart page
7. Fix COD button in Checkout page

---

## Expected Outcome

After implementation:
- Applied coupons will be visible on both Cart and Checkout pages with their discount amounts
- Shipping costs will come from Swell, respecting the free shipping rule for orders over Rs.500
- "FREE" shipping will automatically show when the threshold is met
- COD payment method selection will work reliably
- All promotions and discounts remain in sync with Swell's configuration
