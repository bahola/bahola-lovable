

## Fix Key Benefits Parsing and Column Width

### Overview

Two issues need to be fixed:
1. **Key Benefits not parsing correctly** - Swell returns HTML content, not plain text. The current parser looks for `#Key Benefits` but Swell has `Key Benefits` inside a table cell with HTML entities.
2. **Column width too narrow** - Swell's HTML contains inline `width="64"` on table elements causing narrow text rendering.

---

### Root Cause Analysis

**Swell returns HTML like this:**
```html
<table width="64">
  <td>Abelmoschus esculentus Mother Tincture delivers...</td>
</table>
<br>
<table width="64">
  <td>Key Benefits<br>
    &bull; Classical support for digestive support...
    <br>&bull; Natural properties support...
  </td>
</table>
```

**Current parser expects:**
```
Description text here...

#Key Benefits
• Benefit 1
• Benefit 2
```

---

### Solution

#### Step 1: Update the Parser Utility

Modify `src/utils/parseProductContent.ts` to:
- Strip HTML tags before parsing
- Look for "Key Benefits" marker (without the `#` prefix)
- Handle HTML entities like `&bull;` as bullet points
- Handle `<br>` tags as line separators

#### Step 2: Fix Column Width

Modify `src/components/product/GenericProductPage.tsx` to:
- Add CSS to override inline table widths from Swell HTML
- Add `[&_table]:!w-full [&_table_td]:!w-full` to the description container

---

### Technical Implementation

**File 1: `src/utils/parseProductContent.ts`**

Update the parser to handle HTML content:
```typescript
export function parseProductContent(rawDescription: string | undefined | null): ParsedProductContent {
  if (!rawDescription || typeof rawDescription !== 'string') {
    return { description: '', benefits: [] };
  }

  // Convert HTML to plain text for parsing
  // Replace <br> tags with newlines
  let plainText = rawDescription
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/&bull;/g, '•')
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/<[^>]*>/g, '')  // Strip all HTML tags
    .trim();

  // Split on "Key Benefits" marker (case-insensitive, with or without #)
  const keyBenefitsMarker = /#?\s*Key\s*Benefits/i;
  const parts = plainText.split(keyBenefitsMarker);
  
  // Main description is everything before Key Benefits
  const descriptionPart = parts[0]?.trim() || '';
  
  // Benefits are everything after Key Benefits
  const benefitsPart = parts[1] || '';
  
  // Extract bullet points
  const benefits = benefitsPart
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('•') || line.startsWith('-') || line.startsWith('*'))
    .map(line => line.replace(/^[•\-*]\s*/, '').trim())
    .filter(line => line.length > 0);

  return { description: descriptionPart, benefits };
}
```

**File 2: `src/components/product/GenericProductPage.tsx`**

Fix the description container to override inline widths:
```tsx
<div 
  className="text-[hsl(var(--generic-charcoal))] leading-relaxed prose prose-sm max-w-none [&_table]:!w-full [&_table]:!table-auto [&_td]:!w-auto"
  dangerouslySetInnerHTML={{ __html: safeDescription }}
/>
```

Also update `safeDescription` to use the original HTML (for formatting) but strip the Key Benefits section:
```typescript
const safeDescription = useMemo(() => {
  if (!product?.description) return '';
  // Remove Key Benefits section from the HTML
  const html = product.description;
  const keyBenefitsPattern = /<table[^>]*>.*?Key\s*Benefits.*?<\/table>/is;
  const cleanedHtml = html.replace(keyBenefitsPattern, '').trim();
  return DOMPurify.sanitize(cleanedHtml);
}, [product?.description]);
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/utils/parseProductContent.ts` | Handle HTML content, convert entities, strip tags |
| `src/components/product/GenericProductPage.tsx` | Override table widths, clean HTML for description display |

---

### Expected Result

After implementation:
- **Product Description**: Shows only the main description paragraph (no Key Benefits section)
- **Key Benefits Accordion**: Shows parsed bullet points from Swell data
- **Layout**: Full-width text, no narrow columns from Swell's inline styles

