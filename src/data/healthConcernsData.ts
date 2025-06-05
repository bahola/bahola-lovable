
// Re-export from the new modular structure
export { healthConcernsData } from './health-concerns/index';
export type { HealthConcern } from './health-concerns/types';

// Create categoryInfo object based on the categories in our data
export const categoryInfo = {
  'Allergies': {
    name: 'Allergies',
    description: 'Natural relief for allergic reactions and hypersensitivities'
  },
  'Anxiety & Mental Health': {
    name: 'Anxiety & Mental Health', 
    description: 'Holistic support for emotional wellness and mental health'
  },
  'Digestive Health': {
    name: 'Digestive Health',
    description: 'Natural solutions for digestive disorders and gut health'
  },
  'Respiratory Health': {
    name: 'Respiratory Health',
    description: 'Comprehensive care for breathing and respiratory wellness'
  },
  "Women's Care": {
    name: "Women's Care",
    description: 'Specialized homeopathic support for women\'s health concerns'
  },
  'Hair Care': {
    name: 'Hair Care',
    description: 'Natural treatments for hair and scalp health'
  },
  'Immune Boosters': {
    name: 'Immune Boosters',
    description: 'Strengthening natural immunity and vitality'
  },
  'Heart & Circulation': {
    name: 'Heart & Circulation',
    description: 'Cardiovascular health and circulation support'
  },
  'Cancer Support': {
    name: 'Cancer Support',
    description: 'Supportive care during cancer treatment and recovery'
  },
  "Children's Health": {
    name: "Children's Health",
    description: 'Safe and gentle remedies for pediatric care'
  },
  'Weight & Metabolism': {
    name: 'Weight & Metabolism',
    description: 'Natural support for healthy weight and metabolic function'
  },
  'Pain Management': {
    name: 'Pain Management',
    description: 'Natural pain relief and management solutions'
  },
  'Sensory Health': {
    name: 'Sensory Health',
    description: 'Care for vision, hearing, and sensory wellness'
  },
  'Skin Health': {
    name: 'Skin Health',
    description: 'Natural treatments for skin conditions and dermatological health'
  },
  'Infection': {
    name: 'Infection',
    description: 'Comprehensive treatment for bacterial, viral, and fungal infections'
  }
};
