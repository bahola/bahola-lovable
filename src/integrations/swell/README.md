# Swell.is Integration

This directory contains the Swell.is e-commerce integration for the application.

## Setup Instructions

1. **Get your Swell credentials:**
   - Sign up at [Swell.is](https://www.swell.is/)
   - Navigate to Settings → API in your Swell dashboard
   - Copy your Store ID and Public Key

2. **Update credentials:**
   - Open `src/integrations/swell/client.ts`
   - Replace `'your-store-id'` with your actual Store ID
   - Replace `'your-public-key'` with your actual Public Key

3. **Configure your store:**
   - Add products through the Swell dashboard
   - Set up categories
   - Configure payment methods
   - Set up shipping options

## Usage

### Products
```typescript
import { useSwellProducts, useSwellProduct } from '@/hooks/useSwellProducts';

// List products
const { products, loading, error } = useSwellProducts({
  category: 'category-id',
  limit: 20
});

// Get single product
const { product, loading, error } = useSwellProduct('product-id');
```

### Cart
```typescript
import { useSwellCart } from '@/contexts/SwellCartContext';

const { items, totalItems, totalPrice, addItem, removeItem, updateQuantity } = useSwellCart();

// Add to cart
await addItem('product-id', 1);

// Update quantity
await updateQuantity('item-id', 2);

// Remove from cart
await removeItem('item-id');
```

## Features

- ✅ Product catalog management
- ✅ Shopping cart functionality
- ✅ Category browsing
- ✅ Checkout integration
- ✅ Order management
- ✅ Customer accounts

## Notes

- Supabase is no longer used for product data
- All product, cart, and order data is managed through Swell.is
- Reviews can still be stored in Supabase if needed
