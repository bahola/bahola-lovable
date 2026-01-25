

## Parse Product Description into Accordion Sections

### Overview

Your Swell Description field contains combined content that needs to be split into separate UI sections. We'll parse the `#Key Benefits` section from the description while **keeping the Dosage & Directions unchanged** (using the current default text).

---

### Current Data Flow

```text
SWELL DESCRIPTION FIELD
┌─────────────────────────────────────────────────────────────────┐
│  "Abelmoschus esculentus Mother Tincture delivers..."          │
│  "...Dosage: 5-10 drops in water, 2-3 times daily..."          │
│                                                                 │
│  #Key Benefits                                                  │
│  • Classical support for digestive support                      │
│  • Natural properties support mucilage properties relief        │
│  • Supports digestive system health and balance                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  PARSE LOGIC    │
                    └─────────────────┘
                              │
          ┌───────────────────┴───────────────────┐
          ▼                                       ▼
┌─────────────────────────┐          ┌─────────────────────────┐
│  DESCRIPTION SECTION    │          │  KEY BENEFITS ACCORDION │
│                         │          │                         │
│  Text before "#Key      │          │  • Bullet 1             │
│  Benefits" marker       │          │  • Bullet 2             │
│                         │          │  • Bullet 3             │
└─────────────────────────┘          └─────────────────────────┘
                                      
        ┌─────────────────────────┐
        │  DOSAGE ACCORDION       │
        │  (NO CHANGE)            │
        │                         │
        │  Current default text:  │
        │  "Adults: 10-15 drops   │
        │   in water..."          │
        └─────────────────────────┘
```

---

### What Will Be Parsed

| Content | Source | Action |
|---------|--------|--------|
| **Description** | Text before `#Key Benefits` | Extract and display |
| **Key Benefits** | Bullet points after `#Key Benefits` | Extract into array |
| **Dosage & Directions** | Current default | **Keep as-is (no change)** |
| **Safety Information** | Current default | Keep as-is |

---

### Implementation Steps

#### Step 1: Create Content Parser Utility

Create `src/utils/parseProductContent.ts` with a function that:
- Splits the description by the `#Key Benefits` marker
- Extracts the main description (text before the marker)
- Parses bullet points (lines starting with `•` or `-`) into an array
- Returns structured data with `description` and `benefits`

#### Step 2: Update GenericProductPage Component

Modify `src/components/product/GenericProductPage.tsx` to:
- Import and call the parser on `swellProduct.description`
- Use parsed description for the Product Description section
- Use parsed benefits array for the Key Benefits accordion
- **Keep current fallback for Dosage & Directions** (lines 140-141)

---

### Technical Details

**Files to create:**
- `src/utils/parseProductContent.ts`

**Files to modify:**
- `src/components/product/GenericProductPage.tsx`

**Parser Logic:**
```javascript
// Split on #Key Benefits marker
const [descriptionPart, benefitsPart] = description.split('#Key Benefits');

// Extract bullets from benefits section
const benefits = benefitsPart
  .split('\n')
  .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-'))
  .map(line => line.replace(/^[•-]\s*/, '').trim());
```

---

### Expected Result

After implementation:
- **Description section**: Shows the paragraph text about the product (before `#Key Benefits`)
- **Key Benefits accordion**: Shows parsed bullet points from your Swell data
- **Dosage accordion**: Continues showing the current default text:
  > "Adults: 10-15 drops in water, 3 times daily..."
- **Safety Information**: Continues showing the current default list

This allows you to customize the description and benefits per product while maintaining consistent dosage instructions across all Mother Tinctures.

