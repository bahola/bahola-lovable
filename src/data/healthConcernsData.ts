
// Re-export from the new modular structure
export { healthConcernsData } from './health-concerns/index';
export type { HealthConcern } from './health-concerns/types';

// Create categoryInfo object based on the original categories
export const categoryInfo = {
  'Allergies': {
    name: 'Allergies',
    description: 'Natural relief for allergic reactions and hypersensitivities'
  },
  'Cancer': {
    name: 'Cancer',
    description: 'Supportive care during cancer treatment and recovery'
  },
  'Heart Health': {
    name: 'Heart Health',
    description: 'Cardiovascular health and circulation support'
  },
  'Child Care': {
    name: 'Child Care',
    description: 'Safe and gentle remedies for pediatric care'
  },
  'Ear Nose Throat': {
    name: 'Ear Nose Throat',
    description: 'Natural treatments for ENT conditions'
  },
  'Eye Care': {
    name: 'Eye Care',
    description: 'Care for vision and eye health concerns'
  },
  'Gut Health': {
    name: 'Gut Health',
    description: 'Natural solutions for digestive disorders and gut health'
  },
  'Womens Care': {
    name: 'Womens Care',
    description: 'Specialized homeopathic support for women\'s health concerns'
  },
  'Hair Care': {
    name: 'Hair Care',
    description: 'Natural treatments for hair and scalp health'
  },
  'Immune boosters': {
    name: 'Immune boosters',
    description: 'Strengthening natural immunity and vitality'
  },
  'Infection': {
    name: 'Infection',
    description: 'Comprehensive treatment for bacterial, viral, and fungal infections'
  },
  'Lifestyle': {
    name: 'Lifestyle',
    description: 'Holistic support for lifestyle-related health concerns'
  },
  'Muscle & Joint Care': {
    name: 'Muscle & Joint Care',
    description: 'Natural pain relief and mobility support'
  },
  'Mental health': {
    name: 'Mental health',
    description: 'Holistic support for emotional wellness and mental health'
  },
  'Nutritive': {
    name: 'Nutritive',
    description: 'Nutritional support and supplementation'
  },
  'Pain Care': {
    name: 'Pain Care',
    description: 'Natural pain relief and management solutions'
  },
  'Reproductive care': {
    name: 'Reproductive care',
    description: 'Natural support for reproductive health'
  },
  'Respiratory Care': {
    name: 'Respiratory Care',
    description: 'Comprehensive care for breathing and respiratory wellness'
  },
  'Skin Care': {
    name: 'Skin Care',
    description: 'Natural treatments for skin conditions and dermatological health'
  },
  'Tooth Care': {
    name: 'Tooth Care',
    description: 'Natural dental and oral health care'
  },
  'Urinary care': {
    name: 'Urinary care',
    description: 'Natural support for urinary tract health'
  }
};
