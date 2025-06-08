
// Re-export from the new modular structure
export { healthConcernsData } from './health-concerns/index';
export type { HealthConcern } from './health-concerns/types';

// Create categoryInfo object based on the original categories
export const categoryInfo = {
  'Allergies': {
    name: 'Allergy Care',
    description: 'Natural relief for allergic reactions and hypersensitivities',
    icon: '🤧'
  },
  'Cancer': {
    name: 'Cancer',
    description: 'Supportive care during cancer treatment and recovery',
    icon: '🎗️'
  },
  'Heart Health': {
    name: 'Heart Health',
    description: 'Cardiovascular health and circulation support',
    icon: '❤️'
  },
  'Child Care': {
    name: 'Child Care',
    description: 'Safe and gentle remedies for pediatric care',
    icon: '👶'
  },
  'Ear Nose Throat': {
    name: 'ENT Care',
    description: 'Natural treatments for ENT conditions',
    icon: '👂'
  },
  'Eye Care': {
    name: 'Eye Care',
    description: 'Care for vision and eye health concerns',
    icon: '👁️'
  },
  'Gut Health': {
    name: 'Gut Health',
    description: 'Natural solutions for digestive disorders and gut health',
    icon: '🌱'
  },
  'Womens Care': {
    name: 'Womens Care',
    description: 'Specialized homeopathic support for women\'s health concerns',
    icon: '🌸'
  },
  'Hair Care': {
    name: 'Hair Care',
    description: 'Natural treatments for hair and scalp health',
    icon: '💇'
  },
  'Immune boosters': {
    name: 'Immune boosters',
    description: 'Strengthening natural immunity and vitality',
    icon: '🛡️'
  },
  'Infection': {
    name: 'Infection',
    description: 'Comprehensive treatment for bacterial, viral, and fungal infections',
    icon: '🦠'
  },
  'Lifestyle': {
    name: 'Lifestyle',
    description: 'Holistic support for lifestyle-related health concerns',
    icon: '🌿'
  },
  'Muscle & Joint Care': {
    name: 'Muscle & Joint Care',
    description: 'Natural pain relief and mobility support',
    icon: '💪'
  },
  'Mental health': {
    name: 'Mental health',
    description: 'Holistic support for emotional wellness and mental health',
    icon: '🧠'
  },
  'Nutritive': {
    name: 'Nutritive',
    description: 'Nutritional support and supplementation',
    icon: '🥗'
  },
  'Pain Care': {
    name: 'Pain Care',
    description: 'Natural pain relief and management solutions',
    icon: '🩹'
  },
  'Reproductive care': {
    name: 'Reproductive care',
    description: 'Natural support for reproductive health',
    icon: '🌺'
  },
  'Respiratory Care': {
    name: 'Respiratory Care',
    description: 'Comprehensive care for breathing and respiratory wellness',
    icon: '🫁'
  },
  'Skin Care': {
    name: 'Skin Care',
    description: 'Natural treatments for skin conditions and dermatological health',
    icon: '✨'
  },
  'Tooth Care': {
    name: 'Tooth Care',
    description: 'Natural dental and oral health care',
    icon: '🦷'
  },
  'Urinary care': {
    name: 'Urinary care',
    description: 'Natural support for urinary tract health',
    icon: '💧'
  }
};
