import { HealthConditionPattern } from './types';

// Health condition keyword patterns for automatic subcategory assignment
export const HEALTH_CONDITION_PATTERNS: HealthConditionPattern[] = [
  // Digestive Health
  {
    keywords: ['digestive', 'digestion', 'stomach', 'gastric', 'intestinal', 'bowel', 'constipation', 'diarrhea', 'bloating', 'acid', 'indigestion'],
    subcategoryName: 'Digestive Health',
    confidence: 0.9
  },
  // Respiratory
  {
    keywords: ['respiratory', 'breathing', 'lung', 'bronchial', 'asthma', 'cough', 'cold', 'flu', 'sinus', 'throat'],
    subcategoryName: 'Respiratory Health',
    confidence: 0.9
  },
  // Cardiovascular
  {
    keywords: ['heart', 'cardiac', 'cardiovascular', 'blood pressure', 'circulation', 'arrhythmia', 'angina'],
    subcategoryName: 'Heart Health',
    confidence: 0.9
  },
  // Mental Health & Anxiety
  {
    keywords: ['anxiety', 'stress', 'depression', 'mental', 'mood', 'nervous', 'calm', 'sleep', 'insomnia'],
    subcategoryName: 'Mental Health & Anxiety',
    confidence: 0.9
  },
  // Skin Care
  {
    keywords: ['skin', 'dermal', 'eczema', 'acne', 'rash', 'allergic', 'itching', 'wound', 'healing'],
    subcategoryName: 'Skin Care',
    confidence: 0.9
  },
  // Women's Health
  {
    keywords: ['women', 'menstrual', 'pregnancy', 'lactation', 'hormonal', 'menopause', 'pms'],
    subcategoryName: 'Women\'s Health',
    confidence: 0.9
  },
  // Pain Management
  {
    keywords: ['pain', 'ache', 'arthritis', 'rheumatic', 'joint', 'muscle', 'headache', 'migraine'],
    subcategoryName: 'Pain Care',
    confidence: 0.9
  },
  // Immune Support
  {
    keywords: ['immune', 'immunity', 'infection', 'fever', 'weakness', 'fatigue', 'energy'],
    subcategoryName: 'Immune Support',
    confidence: 0.8
  },
  // Eye Care
  {
    keywords: ['eye', 'vision', 'optic', 'conjunctivitis', 'cataract', 'glaucoma'],
    subcategoryName: 'Eye Care',
    confidence: 0.9
  },
  // Hair Care
  {
    keywords: ['hair', 'scalp', 'alopecia', 'baldness', 'dandruff'],
    subcategoryName: 'Hair Care',
    confidence: 0.9
  }
];

/**
 * Get all available health condition subcategories for manual selection
 */
export const getHealthConditionSubcategories = (): Array<{name: string, keywords: string[]}> => {
  return HEALTH_CONDITION_PATTERNS.map(pattern => ({
    name: pattern.subcategoryName,
    keywords: pattern.keywords
  }));
};

/**
 * Create automatic mapping rules for ERPNext item groups to Specialty Products
 */
export const createERPNextGroupMappingRules = (specialtyProductsCategoryId: string) => {
  return [
    {
      id: 'erpnext-drops-rule',
      name: 'ERPNext Drops → Specialty Products',
      type: 'erpnext-group' as const,
      erpnextItemGroup: 'Drops',
      targetCategoryId: specialtyProductsCategoryId,
      priority: 10,
      isActive: true
    },
    {
      id: 'erpnext-specialties-rule', 
      name: 'ERPNext Specialties → Specialty Products',
      type: 'erpnext-group' as const,
      erpnextItemGroup: 'Specialties',
      targetCategoryId: specialtyProductsCategoryId,
      priority: 10,
      isActive: true
    }
  ];
};

/**
 * Simplified analysis - no longer used for automatic suggestions
 * @deprecated Use manual selection instead
 */
export const analyzeHealthConditions = (itemName: string, description?: string): Array<{id?: string, name: string, confidence: number}> => {
  // Return empty array - we're moving to manual selection
  return [];
};
