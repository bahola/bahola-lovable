// Maps website category slugs to Swell category slugs
export const SWELL_CATEGORY_MAP: Record<string, string> = {
  'dilutions': 'homeopathic-dilutions',
  'mother-tinctures': 'mother-tinctures',
  'lm-potencies': 'lm-potencies',
  'biochemic-medicines': 'biochemic-medicines',
  'bach-flower-remedies': 'bach-flower-remedies',
  'speciality-products': 'speciality-products',
  'combo-products': 'combo-products',
  'external-applications': 'external-applications',
  'patent-medicines': 'patent-medicines',
};

// Maps website subcategory display format (e.g., 'dil-a' -> 'A')
export const SUBCATEGORY_DISPLAY_MAP: Record<string, string> = {
  'dil-a': 'Dil-A',
  'dil-b': 'Dil-B',
  'dil-c': 'Dil-C',
  'dil-d': 'Dil-D',
  'dil-e': 'Dil-E',
  'dil-f': 'Dil-F',
  'dil-g': 'Dil-G',
  'dil-h': 'Dil-H',
  'dil-i': 'Dil-I',
  'dil-j': 'Dil-J',
  'dil-k': 'Dil-K',
  'dil-l': 'Dil-L',
  'dil-m': 'Dil-M',
  'dil-n': 'Dil-N',
  'dil-o': 'Dil-O',
  'dil-p': 'Dil-P',
  'dil-q': 'Dil-Q',
  'dil-r': 'Dil-R',
  'dil-s': 'Dil-S',
  'dil-t': 'Dil-T',
  'dil-u': 'Dil-U',
  'dil-v': 'Dil-V',
  'dil-w': 'Dil-W',
  'dil-x': 'Dil-X',
  'dil-y': 'Dil-Y',
  'dil-z': 'Dil-Z',
  'a': 'A',
  'b': 'B',
  'c': 'C',
  'd': 'D',
  'e': 'E',
  'f': 'F',
  'g': 'G',
  'h': 'H',
  'i': 'I',
  'j': 'J',
  'k': 'K',
  'l': 'L',
  'm': 'M',
  'n': 'N',
  'o': 'O',
  'p': 'P',
  'q': 'Q',
  'r': 'R',
  's': 'S',
  't': 'T',
  'u': 'U',
  'v': 'V',
  'w': 'W',
  'x': 'X',
  'y': 'Y',
  'z': 'Z',
};

// Extract the letter from subcategory slug for filtering
// e.g., 'dil-a' -> 'a', 'a' -> 'a'
export const getSubcategoryLetter = (subcategorySlug: string): string => {
  if (subcategorySlug.startsWith('dil-')) {
    return subcategorySlug.replace('dil-', '').toLowerCase();
  }
  return subcategorySlug.toLowerCase();
};

// Get Swell category slug from website category slug
export const getSwellCategorySlug = (websiteSlug: string): string => {
  return SWELL_CATEGORY_MAP[websiteSlug] || websiteSlug;
};

// Get display name for subcategory
export const getSubcategoryDisplayName = (subcategorySlug: string): string => {
  return SUBCATEGORY_DISPLAY_MAP[subcategorySlug.toLowerCase()] || subcategorySlug.toUpperCase();
};

// Category-specific filter configuration
export interface CategoryFilterConfig {
  showPotency: boolean;
  showPackSize: boolean;
  showType: boolean;
  potencyOptions: string[];
  packSizeOptions: string[];
}

export const CATEGORY_FILTER_CONFIG: Record<string, CategoryFilterConfig> = {
  'dilutions': {
    showPotency: true,
    showPackSize: true,
    showType: false,
    potencyOptions: ['6C', '12C', '30C', '200C', '1M', '10M', 'CM'],
    packSizeOptions: ['10ml', '30ml', '100ml', '450ml']
  },
  'mother-tinctures': {
    showPotency: false,
    showPackSize: true,
    showType: false,
    potencyOptions: [],
    packSizeOptions: ['10ml', '30ml', '60ml', '100ml', '450ml']
  },
  'lm-potencies': {
    showPotency: true,
    showPackSize: true,
    showType: false,
    potencyOptions: ['LM1', 'LM2', 'LM3', 'LM6', 'LM12', 'LM18', 'LM24', 'LM30'],
    packSizeOptions: ['10ml', '30ml']
  },
  'biochemic-medicines': {
    showPotency: true,
    showPackSize: true,
    showType: false,
    potencyOptions: ['3X', '6X', '12X', '30X', '200X'],
    packSizeOptions: ['20g', '25g', '100g', '450g']
  },
  'bach-flower-remedies': {
    showPotency: false,
    showPackSize: true,
    showType: false,
    potencyOptions: [],
    packSizeOptions: ['10ml', '20ml', '30ml']
  }
};

// Get filter config for a category
export const getCategoryFilterConfig = (categorySlug: string): CategoryFilterConfig => {
  return CATEGORY_FILTER_CONFIG[categorySlug] || {
    showPotency: true,
    showPackSize: true,
    showType: true,
    potencyOptions: ['6C', '12C', '30C', '200C', '1M', '10M'],
    packSizeOptions: ['10ml', '30ml', '100ml']
  };
};
