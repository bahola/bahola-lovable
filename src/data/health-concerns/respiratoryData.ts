
import { HealthConcern } from './types';

export const respiratoryData: HealthConcern[] = [
  {
    id: 'cold-flu',
    name: 'Cold & Flu',
    description: 'Natural immune support and symptom relief for common cold, flu, and upper respiratory infections.',
    category: 'Respiratory Care',
    icon: '🤧',
    image: '/lovable-uploads/0108ad38-606a-475c-a72b-c841b9ba5dae.png',
    searchVolume: 65000,
    commonRemedies: ['Oscillococcinum', 'Belladonna', 'Gelsemium', 'Bryonia'],
    keywords: ['cold', 'flu', 'cough', 'fever', 'respiratory infection', 'immune support'],
    lastUpdated: '2024-01-15',
    trending: true
  },
  {
    id: 'asthma',
    name: 'Asthma',
    description: 'Comprehensive homeopathic support for asthma, breathing difficulties, and respiratory allergies.',
    category: 'Respiratory Care',
    icon: '🫁',
    image: '/lovable-uploads/730d1598-271f-4c89-b882-c14cbc238a19.png',
    searchVolume: 43000,
    commonRemedies: ['Arsenicum Album', 'Ipecacuanha', 'Natrum Sulphuricum', 'Blatta Orientalis'],
    keywords: ['asthma', 'breathing problems', 'wheezing', 'respiratory allergies', 'shortness of breath'],
    lastUpdated: '2024-01-12'
  },
  {
    id: 'chronic-cough',
    name: 'Chronic Cough',
    description: 'Natural treatment for persistent cough, bronchitis, and chronic respiratory conditions.',
    category: 'Respiratory Care',
    icon: '😷',
    image: '/lovable-uploads/a824791e-2dc7-4e18-b909-67012e2997d7.png',
    searchVolume: 38000,
    commonRemedies: ['Drosera', 'Rumex Crispus', 'Spongia', 'Antimonium Tartaricum'],
    keywords: ['chronic cough', 'persistent cough', 'bronchitis', 'respiratory conditions'],
    lastUpdated: '2024-01-10'
  }
];
