

## Fix "You May Also Need" and "Recently Viewed" Sections on Product Page

### Problem Identified

The "You May Also Need" section is stuck showing loading skeletons because the Swell category slugs used in the component don't match the actual category slugs in the Swell store.

**Current slugs in `YouMayAlsoNeed.tsx`:**
- `dilutions` → Should be `homeopathic-dilutions`
- `bio-combination` → Should be `biochemic-medicines`  
- `specialty` → Should be `speciality-products`

**The "Recently Viewed" section is working correctly** - it doesn't appear on the first product viewed because there's no history yet. It will show products once you've browsed multiple items.

---

### Solution

#### Step 1: Update Category Slugs in YouMayAlsoNeed Component

Update `src/components/product/YouMayAlsoNeed.tsx` to use the correct Swell category slugs from the mapping file:

```javascript
const CATEGORY_CONFIG = [
  { key: 'mother-tinctures', label: 'Mother Tincture', swellCategory: 'mother-tinctures' },
  { key: 'dilutions', label: 'Dilutions', swellCategory: 'homeopathic-dilutions' },
  { key: 'bio-chemics', label: 'Bio Chemics', swellCategory: 'biochemic-medicines' },
  { key: 'specialty', label: 'Specialty', swellCategory: 'speciality-products' },
  { key: 'bach-flower', label: 'Bach Flower', swellCategory: 'bach-flower-remedies' },
];
```

#### Step 2: Add Error Handling and Loading Timeout

Improve the component to handle cases where some categories might be empty or the API takes too long:

- Add a timeout to prevent infinite loading states
- Show partial results even if some categories fail to load
- Add console logging for debugging API responses

---

### Technical Details

**Files to modify:**
- `src/components/product/YouMayAlsoNeed.tsx` - Fix category slugs and improve error handling

**How it works:**
1. The Swell API expects specific category slugs like `homeopathic-dilutions` not `dilutions`
2. When the wrong slug is used, Swell returns empty results
3. Currently, if all 5 category fetches return empty, the component shows loading skeletons indefinitely
4. After the fix, products will load correctly from each category

**Expected behavior after fix:**
- "You May Also Need" shows 1 product from each of the 5 categories
- "Recently Viewed" appears after viewing 2+ products (excluding current product)
- Both sections appear above the footer on all generic category product pages

