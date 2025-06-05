
import { HealthConcern } from './types';

export const pediatricData: HealthConcern[] = [
  {
    id: 'childrens-health',
    name: 'Children\'s Health',
    description: 'Safe and gentle homeopathic remedies for common childhood ailments, growth support, and immune building.',
    category: 'Child Care',
    icon: '👶',
    image: '/lovable-uploads/0108ad38-606a-475c-a72b-c841b9ba5dae.png',
    searchVolume: 38000,
    commonRemedies: ['Chamomilla', 'Calcarea Carbonica', 'Pulsatilla', 'Belladonna'],
    keywords: ['childrens health', 'pediatric care', 'childhood ailments', 'safe remedies', 'growth support'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'teething-troubles',
    name: 'Teething Troubles',
    description: 'Gentle relief for teething pain, irritability, and sleep disturbances in infants and toddlers.',
    category: 'Child Care',
    icon: '🦷',
    image: '/lovable-uploads/730d1598-271f-4c89-b882-c14cbc238a19.png',
    searchVolume: 31000,
    commonRemedies: ['Chamomilla', 'Calcarea Carbonica', 'Belladonna', 'Mercurius'],
    keywords: ['teething', 'teething pain', 'infant care', 'tooth development', 'baby health'],
    lastUpdated: '2024-01-12'
  },
  {
    id: 'childhood-fears',
    name: 'Childhood Fears',
    description: 'Homeopathic support for childhood anxieties, fears, and emotional development.',
    category: 'Child Care',
    icon: '🧸',
    image: '/lovable-uploads/a824791e-2dc7-4e18-b909-67012e2997d7.png',
    searchVolume: 25000,
    commonRemedies: ['Stramonium', 'Phosphorus', 'Lycopodium', 'Gelsemium'],
    keywords: ['childhood fears', 'anxiety in children', 'emotional development', 'behavioral issues'],
    lastUpdated: '2024-01-10'
  }
];
