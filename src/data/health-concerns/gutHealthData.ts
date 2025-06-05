
import { HealthConcern } from './types';

export const gutHealthData: HealthConcern[] = [
  {
    id: 'diarrhoea',
    name: 'Diarrhoea',
    description: 'Natural treatment for diarrhea, loose stools, and digestive upset.',
    category: 'Gut Health',
    icon: '🚽',
    image: '/lovable-uploads/0108ad38-606a-475c-a72b-c841b9ba5dae.png',
    searchVolume: 36000,
    commonRemedies: ['Arsenicum Album', 'Podophyllum', 'Veratrum Album', 'China'],
    keywords: ['diarrhea', 'loose stools', 'watery stools', 'digestive upset', 'bowel problems'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'gastritis',
    name: 'Gastritis',
    description: 'Natural healing for stomach inflammation, gastritis, and related digestive issues.',
    category: 'Gut Health',
    icon: '🫃',
    image: '/lovable-uploads/730d1598-271f-4c89-b882-c14cbc238a19.png',
    searchVolume: 32000,
    commonRemedies: ['Arsenicum Album', 'Nux Vomica', 'Phosphorus', 'Antimonium Crudum'],
    keywords: ['gastritis', 'stomach inflammation', 'stomach pain', 'acid reflux', 'stomach ulcers'],
    lastUpdated: '2024-01-12'
  }
];
