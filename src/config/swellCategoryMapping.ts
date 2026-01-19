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

// Subcategory definition for navigation
export interface SubcategoryLink {
  id: string;
  name: string;
  path: string;
}

// Category-specific filter configuration
export interface CategoryFilterConfig {
  showPotency: boolean;
  showPackSize: boolean;
  showType: boolean;
  potencyOptions: string[];
  packSizeOptions: string[];
  showSubcategories?: boolean;
  subcategories?: SubcategoryLink[];
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
  },
  // Specialty categories with subcategory navigation
  'allergies': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'seasonal-allergies', name: 'Seasonal Allergies', path: '/diseases-conditions/allergies/seasonal-allergies-hay-fever' },
      { id: 'dust-allergy', name: 'Dust Allergy', path: '/diseases-conditions/allergies/dust-allergy' },
      { id: 'food-allergies', name: 'Food Allergies', path: '/diseases-conditions/allergies/food-allergies' },
      { id: 'skin-allergies', name: 'Skin Allergies', path: '/diseases-conditions/allergies/skin-allergies' },
      { id: 'allergic-rhinitis', name: 'Allergic Rhinitis', path: '/diseases-conditions/allergies/allergic-rhinitis' },
      { id: 'pet-dander-allergy', name: 'Pet Dander Allergy', path: '/diseases-conditions/allergies/pet-dander-allergy' },
      { id: 'mold-allergy', name: 'Mold Allergy', path: '/diseases-conditions/allergies/mold-allergy' },
      { id: 'drug-allergies', name: 'Drug Allergies', path: '/diseases-conditions/allergies/drug-allergies' },
      { id: 'latex-allergy', name: 'Latex Allergy', path: '/diseases-conditions/allergies/latex-allergy' },
      { id: 'sinus-allergy', name: 'Sinus Allergy', path: '/diseases-conditions/allergies/sinus-allergy' }
    ]
  },
  'respiratory-care': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'cold-flu', name: 'Cold & Flu', path: '/diseases-conditions/respiratory-care/cold-flu' },
      { id: 'cough', name: 'Cough', path: '/diseases-conditions/respiratory-care/cough' },
      { id: 'asthma', name: 'Asthma', path: '/diseases-conditions/respiratory-care/asthma' },
      { id: 'bronchitis', name: 'Bronchitis', path: '/diseases-conditions/respiratory-care/bronchitis' },
      { id: 'sinusitis', name: 'Sinusitis', path: '/diseases-conditions/respiratory-care/sinusitis' },
      { id: 'sore-throat', name: 'Sore Throat', path: '/diseases-conditions/respiratory-care/sore-throat' }
    ]
  },
  'digestive-health': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'indigestion', name: 'Indigestion', path: '/diseases-conditions/digestive-health/indigestion' },
      { id: 'gastritis', name: 'Gastritis', path: '/diseases-conditions/digestive-health/gastritis' },
      { id: 'bloating', name: 'Bloating', path: '/diseases-conditions/digestive-health/bloating' },
      { id: 'constipation', name: 'Constipation', path: '/diseases-conditions/digestive-health/constipation' },
      { id: 'diarrhea', name: 'Diarrhea', path: '/diseases-conditions/digestive-health/diarrhea' },
      { id: 'acidity', name: 'Acidity', path: '/diseases-conditions/digestive-health/acidity' }
    ]
  },
  'skin-care': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'acne', name: 'Acne', path: '/diseases-conditions/skin-care/acne' },
      { id: 'eczema', name: 'Eczema', path: '/diseases-conditions/skin-care/eczema' },
      { id: 'psoriasis', name: 'Psoriasis', path: '/diseases-conditions/skin-care/psoriasis' },
      { id: 'urticaria', name: 'Urticaria', path: '/diseases-conditions/skin-care/urticaria' },
      { id: 'fungal-infections', name: 'Fungal Infections', path: '/diseases-conditions/skin-care/fungal-infections' }
    ]
  },
  'mental-health': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'anxiety', name: 'Anxiety', path: '/diseases-conditions/mental-health/anxiety' },
      { id: 'depression', name: 'Depression', path: '/diseases-conditions/mental-health/depression' },
      { id: 'insomnia', name: 'Insomnia', path: '/diseases-conditions/mental-health/insomnia' },
      { id: 'stress', name: 'Stress', path: '/diseases-conditions/mental-health/stress' }
    ]
  },
  'womens-health': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'menstruation', name: 'Menstruation Issues', path: '/diseases-conditions/womens-health/menstruation' },
      { id: 'menopause', name: 'Menopause', path: '/diseases-conditions/womens-health/menopause' },
      { id: 'pcos', name: 'PCOS', path: '/diseases-conditions/womens-health/pcos' },
      { id: 'leucorrhoea', name: 'Leucorrhoea', path: '/diseases-conditions/womens-health/leucorrhoea' }
    ]
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
