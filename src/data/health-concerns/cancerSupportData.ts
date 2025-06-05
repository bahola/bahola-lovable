
import { HealthConcern } from './types';

export const cancerSupportData: HealthConcern[] = [
  {
    id: 'cancer-support',
    name: 'Cancer Support',
    description: 'Supportive homeopathic care during cancer treatment to help manage side effects and boost overall well-being.',
    category: 'Cancer',
    icon: '🎗️',
    image: '/lovable-uploads/0108ad38-606a-475c-a72b-c841b9ba5dae.png',
    searchVolume: 35000,
    commonRemedies: ['Carcinosinum', 'Thuya', 'Cadmium Sulphuricum', 'Arsenicum Album'],
    keywords: ['cancer support', 'chemotherapy side effects', 'radiation support', 'oncology support'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'chemotherapy-support',
    name: 'Chemotherapy Support',
    description: 'Natural support to manage chemotherapy side effects including nausea, fatigue, and immune weakness.',
    category: 'Cancer',
    icon: '💉',
    image: '/lovable-uploads/730d1598-271f-4c89-b882-c14cbc238a19.png',
    searchVolume: 28000,
    commonRemedies: ['Ipecacuanha', 'Phosphorus', 'Arsenicum Album', 'Cadmium Sulphuricum'],
    keywords: ['chemotherapy support', 'chemo side effects', 'nausea', 'cancer treatment support'],
    lastUpdated: '2024-01-12'
  },
  {
    id: 'radiation-support',
    name: 'Radiation Support',
    description: 'Homeopathic remedies to help manage radiation therapy side effects and skin reactions.',
    category: 'Cancer',
    icon: '☢️',
    image: '/lovable-uploads/a824791e-2dc7-4e18-b909-67012e2997d7.png',
    searchVolume: 22000,
    commonRemedies: ['X-ray', 'Radium Bromatum', 'Phosphorus', 'Calendula'],
    keywords: ['radiation support', 'radiation therapy', 'skin reactions', 'radiation side effects'],
    lastUpdated: '2024-01-10'
  }
];
