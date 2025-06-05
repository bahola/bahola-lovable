
import { HealthConcern } from './types';

export const lifestyleData: HealthConcern[] = [
  {
    id: 'general-weakness',
    name: 'General Weakness',
    description: 'Natural support for general weakness, debility, and low energy levels.',
    category: 'Lifestyle',
    icon: '😴',
    image: '/lovable-uploads/0108ad38-606a-475c-a72b-c841b9ba5dae.png',
    searchVolume: 33000,
    commonRemedies: ['China', 'Carbo Vegetabilis', 'Arsenicum Album', 'Phosphoric Acid'],
    keywords: ['general weakness', 'debility', 'low energy', 'fatigue', 'exhaustion'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'convalescence-remedies',
    name: 'Convalescence Remedies',
    description: 'Natural support during recovery period after illness, surgery, or trauma.',
    category: 'Lifestyle',
    icon: '🏥',
    image: '/lovable-uploads/730d1598-271f-4c89-b882-c14cbc238a19.png',
    searchVolume: 21000,
    commonRemedies: ['China', 'Arnica Montana', 'Calcarea Phosphorica', 'Silicea'],
    keywords: ['convalescence', 'recovery', 'post surgery', 'rehabilitation', 'healing support'],
    lastUpdated: '2024-01-12'
  }
];
