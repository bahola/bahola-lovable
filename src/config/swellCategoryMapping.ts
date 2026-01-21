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
  if (subcategorySlug.startsWith('mt-')) {
    return subcategorySlug.replace('mt-', '').toLowerCase();
  }
  return subcategorySlug.toLowerCase();
};

// Maps website subcategory slugs to Swell subcategory slugs
// For categories with alphabetical subcategories in Swell
export const SWELL_SUBCATEGORY_MAP: Record<string, Record<string, string>> = {
  'mother-tinctures': {
    'a': 'mt-a',
    'b': 'mt-b',
    'c': 'mt-c',
    'd': 'mt-d',
    'e': 'mt-e',
    'f': 'mt-f',
    'g': 'mt-g',
    'h': 'mt-h',
    'i': 'mt-i',
    'j': 'mt-j',
    'k': 'mt-k',
    'l': 'mt-l',
    'm': 'mt-m',
    'n': 'mt-n',
    'o': 'mt-o',
    'p': 'mt-p',
    'q': 'mt-q',
    'r': 'mt-r',
    's': 'mt-s',
    't': 'mt-t',
    'u': 'mt-u',
    'v': 'mt-v',
    'w': 'mt-w',
    'x': 'mt-x',
    'y': 'mt-y',
    'z': 'mt-z',
  },
  'dilutions': {
    'a': 'dil-a',
    'b': 'dil-b',
    'c': 'dil-c',
    'd': 'dil-d',
    'e': 'dil-e',
    'f': 'dil-f',
    'g': 'dil-g',
    'h': 'dil-h',
    'i': 'dil-i',
    'j': 'dil-j',
    'k': 'dil-k',
    'l': 'dil-l',
    'm': 'dil-m',
    'n': 'dil-n',
    'o': 'dil-o',
    'p': 'dil-p',
    'q': 'dil-q',
    'r': 'dil-r',
    's': 'dil-s',
    't': 'dil-t',
    'u': 'dil-u',
    'v': 'dil-v',
    'w': 'dil-w',
    'x': 'dil-x',
    'y': 'dil-y',
    'z': 'dil-z',
  },
};

// Get Swell subcategory slug from website category and subcategory
export const getSwellSubcategorySlug = (categorySlug: string, subcategorySlug: string): string | null => {
  const categoryMap = SWELL_SUBCATEGORY_MAP[categorySlug];
  if (categoryMap && categoryMap[subcategorySlug.toLowerCase()]) {
    return categoryMap[subcategorySlug.toLowerCase()];
  }
  return null;
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

// Main specialty category for cross-navigation
export interface MainCategoryLink {
  id: string;
  name: string;
  path: string;
  icon: string;
}

// All main specialty categories for cross-navigation
export const MAIN_SPECIALTY_CATEGORIES: MainCategoryLink[] = [
  { id: 'allergies', name: 'Allergies', path: '/diseases-conditions/allergies', icon: '🤧' },
  { id: 'cancer-support', name: 'Cancer Support', path: '/diseases-conditions/cancer-support', icon: '🎗️' },
  { id: 'child-care', name: 'Child Care', path: '/diseases-conditions/child-care', icon: '👶' },
  { id: 'ent-care', name: 'Ear Nose Throat', path: '/diseases-conditions/ent-care', icon: '👂' },
  { id: 'eye-care', name: 'Eye Care', path: '/diseases-conditions/eye-care', icon: '👁️' },
  { id: 'gut-health', name: 'Gut Health', path: '/diseases-conditions/gut-health', icon: '🌱' },
  { id: 'hair-care', name: 'Hair Care', path: '/diseases-conditions/hair-care', icon: '💇' },
  { id: 'heart-health', name: 'Heart Health', path: '/diseases-conditions/heart-health', icon: '❤️' },
  { id: 'immune-boosters', name: 'Immune Boosters', path: '/diseases-conditions/immune-boosters', icon: '🛡️' },
  { id: 'infection-care', name: 'Infection Care', path: '/diseases-conditions/infection-care', icon: '🦠' },
  { id: 'lifestyle-care', name: 'Lifestyle Care', path: '/diseases-conditions/lifestyle-care', icon: '🌿' },
  { id: 'mental-health', name: 'Mental Health', path: '/diseases-conditions/mental-health', icon: '🧠' },
  { id: 'muscle-care', name: 'Muscle & Joint Care', path: '/diseases-conditions/muscle-care', icon: '💪' },
  { id: 'nutritive-care', name: 'Nutritive Care', path: '/diseases-conditions/nutritive-care', icon: '🥗' },
  { id: 'pain-care', name: 'Pain Care', path: '/diseases-conditions/pain-care', icon: '🩹' },
  { id: 'reproductive-care', name: 'Reproductive Care', path: '/diseases-conditions/reproductive-care', icon: '🌺' },
  { id: 'respiratory-care', name: 'Respiratory Care', path: '/diseases-conditions/respiratory-care', icon: '🫁' },
  { id: 'skin-care', name: 'Skin Care', path: '/diseases-conditions/skin-care', icon: '✨' },
  { id: 'specialty-care', name: 'Specialty Care', path: '/diseases-conditions/specialty-care', icon: '⭐' },
  { id: 'tooth-care', name: 'Tooth Care', path: '/diseases-conditions/tooth-care', icon: '🦷' },
  { id: 'urology-care', name: 'Urinary Care', path: '/diseases-conditions/urology-care', icon: '💧' },
  { id: 'womens-health', name: "Women's Health", path: '/diseases-conditions/womens-health', icon: '🌸' }
];

// Category-specific filter configuration
export interface CategoryFilterConfig {
  showPotency: boolean;
  showPackSize: boolean;
  showType: boolean;
  potencyOptions: string[];
  packSizeOptions: string[];
  showSubcategories?: boolean;
  subcategories?: SubcategoryLink[];
  showMainCategories?: boolean;
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
  },
  'cancer-support': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'chemotherapy-side-effects', name: 'Chemotherapy Side Effects', path: '/diseases-conditions/cancer-support/chemotherapy-side-effects' },
      { id: 'radiation-skin-reactions', name: 'Radiation Skin Reactions', path: '/diseases-conditions/cancer-support/radiation-skin-reactions' },
      { id: 'cancer-related-fatigue', name: 'Cancer-Related Fatigue', path: '/diseases-conditions/cancer-support/cancer-related-fatigue' },
      { id: 'immune-weakness-cancer-patients', name: 'Immune Weakness', path: '/diseases-conditions/cancer-support/immune-weakness-cancer-patients' },
      { id: 'loss-of-appetite-cancer', name: 'Loss of Appetite', path: '/diseases-conditions/cancer-support/loss-of-appetite-cancer' },
      { id: 'mouth-ulcers-cancer-treatment', name: 'Mouth Ulcers', path: '/diseases-conditions/cancer-support/mouth-ulcers-cancer-treatment' },
      { id: 'lymphedema-support', name: 'Lymphedema Support', path: '/diseases-conditions/cancer-support/lymphedema-support' },
      { id: 'anxiety-sleep-disorders-cancer', name: 'Anxiety & Sleep Disorders', path: '/diseases-conditions/cancer-support/anxiety-sleep-disorders-cancer' }
    ]
  },
  'heart-health': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'high-blood-pressure', name: 'High Blood Pressure', path: '/diseases-conditions/heart-health/high-blood-pressure' },
      { id: 'high-cholesterol', name: 'High Cholesterol', path: '/diseases-conditions/heart-health/high-cholesterol' },
      { id: 'palpitations', name: 'Palpitations', path: '/diseases-conditions/heart-health/palpitations' },
      { id: 'angina-pectoris', name: 'Angina Pectoris', path: '/diseases-conditions/heart-health/angina-pectoris' },
      { id: 'poor-circulation', name: 'Poor Circulation', path: '/diseases-conditions/heart-health/poor-circulation' },
      { id: 'varicose-veins', name: 'Varicose Veins', path: '/diseases-conditions/heart-health/varicose-veins' },
      { id: 'arrhythmias', name: 'Arrhythmias', path: '/diseases-conditions/heart-health/arrhythmias' },
      { id: 'post-heart-attack-recovery', name: 'Post-Heart Attack Recovery', path: '/diseases-conditions/heart-health/post-heart-attack-recovery' }
    ]
  },
  'child-care': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'teething-troubles', name: 'Teething Troubles', path: '/diseases-conditions/child-care/teething-troubles' },
      { id: 'colic', name: 'Colic', path: '/diseases-conditions/child-care/colic' },
      { id: 'diaper-rash', name: 'Diaper Rash', path: '/diseases-conditions/child-care/diaper-rash' },
      { id: 'childhood-constipation', name: 'Childhood Constipation', path: '/diseases-conditions/child-care/childhood-constipation' },
      { id: 'growth-appetite-issues', name: 'Growth & Appetite Issues', path: '/diseases-conditions/child-care/growth-appetite-issues' },
      { id: 'bedwetting-enuresis', name: 'Bedwetting', path: '/diseases-conditions/child-care/bedwetting-enuresis' },
      { id: 'childhood-allergies', name: 'Childhood Allergies', path: '/diseases-conditions/child-care/childhood-allergies' },
      { id: 'recurrent-colds-cough-children', name: 'Recurrent Colds & Cough', path: '/diseases-conditions/child-care/recurrent-colds-cough-children' },
      { id: 'worm-infestation', name: 'Worm Infestation', path: '/diseases-conditions/child-care/worm-infestation' },
      { id: 'temper-tantrums-hyperactivity', name: 'Temper Tantrums / Hyperactivity', path: '/diseases-conditions/child-care/temper-tantrums-hyperactivity' }
    ]
  },
  'ent-care': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'chronic-rhinitis', name: 'Chronic Rhinitis', path: '/diseases-conditions/ent-care/chronic-rhinitis' },
      { id: 'earache-otitis-media', name: 'Earache / Otitis Media', path: '/diseases-conditions/ent-care/earache-otitis-media' },
      { id: 'sinusitis', name: 'Sinusitis', path: '/diseases-conditions/ent-care/sinusitis' },
      { id: 'tonsillitis', name: 'Tonsillitis', path: '/diseases-conditions/ent-care/tonsillitis' },
      { id: 'sore-throat', name: 'Sore Throat', path: '/diseases-conditions/ent-care/sore-throat' },
      { id: 'nasal-polyps', name: 'Nasal Polyps', path: '/diseases-conditions/ent-care/nasal-polyps' },
      { id: 'nose-bleeds-epistaxis', name: 'Nose Bleeds', path: '/diseases-conditions/ent-care/nose-bleeds-epistaxis' },
      { id: 'tinnitus', name: 'Tinnitus', path: '/diseases-conditions/ent-care/tinnitus' },
      { id: 'loss-of-voice-laryngitis', name: 'Loss of Voice / Laryngitis', path: '/diseases-conditions/ent-care/loss-of-voice-laryngitis' }
    ]
  },
  'eye-care': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'eye-strain-digital-fatigue', name: 'Eye Strain / Digital Fatigue', path: '/diseases-conditions/eye-care/eye-strain-digital-fatigue' },
      { id: 'dry-eyes', name: 'Dry Eyes', path: '/diseases-conditions/eye-care/dry-eyes' },
      { id: 'conjunctivitis', name: 'Conjunctivitis', path: '/diseases-conditions/eye-care/conjunctivitis' },
      { id: 'eye-redness-itching', name: 'Redness & Itching', path: '/diseases-conditions/eye-care/eye-redness-itching' },
      { id: 'stye-chalazion', name: 'Stye / Chalazion', path: '/diseases-conditions/eye-care/stye-chalazion' },
      { id: 'vision-weakness', name: 'Vision Weakness', path: '/diseases-conditions/eye-care/vision-weakness' },
      { id: 'watering-eyes', name: 'Watering Eyes', path: '/diseases-conditions/eye-care/watering-eyes' },
      { id: 'light-sensitivity', name: 'Light Sensitivity', path: '/diseases-conditions/eye-care/light-sensitivity' }
    ]
  },
  'gut-health': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'acidity-gerd', name: 'Acidity / GERD', path: '/diseases-conditions/gut-health/acidity-gerd' },
      { id: 'constipation', name: 'Constipation', path: '/diseases-conditions/gut-health/constipation' },
      { id: 'ibs', name: 'IBS', path: '/diseases-conditions/gut-health/ibs' },
      { id: 'diarrhoea', name: 'Diarrhoea', path: '/diseases-conditions/gut-health/diarrhoea' },
      { id: 'bloating-flatulence', name: 'Bloating / Flatulence', path: '/diseases-conditions/gut-health/bloating-flatulence' },
      { id: 'indigestion', name: 'Indigestion', path: '/diseases-conditions/gut-health/indigestion' },
      { id: 'gastritis', name: 'Gastritis', path: '/diseases-conditions/gut-health/gastritis' },
      { id: 'nausea-vomiting', name: 'Nausea / Vomiting', path: '/diseases-conditions/gut-health/nausea-vomiting' },
      { id: 'loss-of-appetite-gut', name: 'Loss of Appetite', path: '/diseases-conditions/gut-health/loss-of-appetite-gut' },
      { id: 'worms-gut', name: 'Worms', path: '/diseases-conditions/gut-health/worms-gut' }
    ]
  },
  'hair-care': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'hair-fall-loss', name: 'Hair Fall / Hair Loss', path: '/diseases-conditions/hair-care/hair-fall-loss' },
      { id: 'dandruff', name: 'Dandruff', path: '/diseases-conditions/hair-care/dandruff' },
      { id: 'premature-greying', name: 'Premature Greying', path: '/diseases-conditions/hair-care/premature-greying' },
      { id: 'scalp-itching-infections', name: 'Scalp Itching / Infections', path: '/diseases-conditions/hair-care/scalp-itching-infections' },
      { id: 'alopecia-areata', name: 'Alopecia Areata', path: '/diseases-conditions/hair-care/alopecia-areata' },
      { id: 'thinning-hair', name: 'Thinning Hair', path: '/diseases-conditions/hair-care/thinning-hair' },
      { id: 'postpartum-hair-fall', name: 'Postpartum Hair Fall', path: '/diseases-conditions/hair-care/postpartum-hair-fall' }
    ]
  },
  'immune-boosters': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'recurrent-colds-cough', name: 'Recurrent Colds & Cough', path: '/diseases-conditions/immune-boosters/recurrent-colds-cough' },
      { id: 'frequent-infections', name: 'Frequent Infections', path: '/diseases-conditions/immune-boosters/frequent-infections' },
      { id: 'low-energy-levels', name: 'Low Energy Levels', path: '/diseases-conditions/immune-boosters/low-energy-levels' },
      { id: 'post-illness-recovery', name: 'Post-Illness Recovery', path: '/diseases-conditions/immune-boosters/post-illness-recovery' },
      { id: 'general-weakness', name: 'General Weakness', path: '/diseases-conditions/immune-boosters/general-weakness' },
      { id: 'convalescence-remedies', name: 'Convalescence Remedies', path: '/diseases-conditions/immune-boosters/convalescence-remedies' },
      { id: 'childrens-immunity-drops', name: "Children's Immunity", path: '/diseases-conditions/immune-boosters/childrens-immunity-drops' },
      { id: 'elderly-immune-support', name: 'Elderly Immune Support', path: '/diseases-conditions/immune-boosters/elderly-immune-support' }
    ]
  },
  'infection-care': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'bacterial-infections', name: 'Bacterial Infections', path: '/diseases-conditions/infection-care/bacterial-infections' },
      { id: 'viral-infections', name: 'Viral Infections', path: '/diseases-conditions/infection-care/viral-infections' },
      { id: 'fungal-infections', name: 'Fungal Infections', path: '/diseases-conditions/infection-care/fungal-infections' },
      { id: 'skin-infections', name: 'Skin Infections', path: '/diseases-conditions/infection-care/skin-infections' },
      { id: 'ear-sinus-infections', name: 'Ear & Sinus Infections', path: '/diseases-conditions/infection-care/ear-sinus-infections' },
      { id: 'recurrent-fevers', name: 'Recurrent Fevers', path: '/diseases-conditions/infection-care/recurrent-fevers' },
      { id: 'fever-with-chills', name: 'Fever with Chills', path: '/diseases-conditions/infection-care/fever-with-chills' }
    ]
  },
  'lifestyle-care': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'general-weakness', name: 'General Weakness', path: '/diseases-conditions/lifestyle-care/general-weakness' },
      { id: 'convalescence-remedies', name: 'Convalescence Remedies', path: '/diseases-conditions/lifestyle-care/convalescence-remedies' }
    ]
  },
  'muscle-care': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'joint-pain-arthritis', name: 'Joint Pain & Arthritis', path: '/diseases-conditions/muscle-care/joint-pain-arthritis' }
    ]
  },
  'nutritive-care': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'weight-management', name: 'Weight Management', path: '/diseases-conditions/nutritive-care/weight-management' }
    ]
  },
  'pain-care': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'headaches-migraines', name: 'Headaches & Migraines', path: '/diseases-conditions/pain-care/headaches-migraines' }
    ]
  },
  'reproductive-care': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'breast-tenderness', name: 'Breast Tenderness', path: '/diseases-conditions/reproductive-care/breast-tenderness' },
      { id: 'fibroids-supportive', name: 'Fibroids Support', path: '/diseases-conditions/reproductive-care/fibroids-supportive' }
    ]
  },
  'tooth-care': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'dental-problems', name: 'Dental Problems', path: '/diseases-conditions/tooth-care/dental-problems' }
    ]
  },
  'urology-care': {
    showPotency: false,
    showPackSize: false,
    showType: false,
    potencyOptions: [],
    packSizeOptions: [],
    showSubcategories: true,
    subcategories: [
      { id: 'urinary-tract-infections', name: 'Urinary Tract Infections', path: '/diseases-conditions/urology-care/urinary-tract-infections' }
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
