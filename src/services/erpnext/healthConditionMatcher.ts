
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
 * Analyze product name and description to suggest health condition subcategories
 */
export const analyzeHealthConditions = (itemName: string, description?: string): Array<{id?: string, name: string, confidence: number}> => {
  const text = `${itemName} ${description || ''}`.toLowerCase();
  const suggestions: Array<{name: string, confidence: number}> = [];

  for (const pattern of HEALTH_CONDITION_PATTERNS) {
    let matchCount = 0;
    let totalKeywords = pattern.keywords.length;

    for (const keyword of pattern.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        matchCount++;
      }
    }

    if (matchCount > 0) {
      const confidence = (matchCount / totalKeywords) * pattern.confidence;
      suggestions.push({
        name: pattern.subcategoryName,
        confidence: Math.min(confidence, 1.0)
      });
    }
  }

  // Sort by confidence and return top suggestions
  return suggestions
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3); // Return top 3 suggestions
};

/**
 * Create automatic mapping rules for ERPNext item groups
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
