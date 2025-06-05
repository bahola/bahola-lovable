
import { HealthConcern } from './types';

export const digestiveData: HealthConcern[] = [
  {
    id: 'digestive-issues',
    name: 'Digestive Issues',
    description: 'Comprehensive homeopathic treatment for various digestive disorders, IBS, bloating, and gut health problems.',
    category: 'Gut Health',
    icon: '🫃',
    image: '/lovable-uploads/0108ad38-606a-475c-a72b-c841b9ba5dae.png',
    searchVolume: 48000,
    commonRemedies: ['Nux Vomica', 'Lycopodium', 'Carbo Vegetabilis', 'Arsenicum Album'],
    keywords: ['digestive issues', 'IBS', 'bloating', 'indigestion', 'gas', 'stomach problems'],
    lastUpdated: '2024-01-15',
    trending: true
  },
  {
    id: 'nausea-vomiting',
    name: 'Nausea & Vomiting',
    description: 'Natural relief from nausea, vomiting, morning sickness, and motion sickness with homeopathic remedies.',
    category: 'Gut Health',
    icon: '🤢',
    image: '/lovable-uploads/730d1598-271f-4c89-b882-c14cbc238a19.png',
    searchVolume: 35000,
    commonRemedies: ['Ipecacuanha', 'Cocculus', 'Tabacum', 'Petroleum'],
    keywords: ['nausea', 'vomiting', 'morning sickness', 'motion sickness', 'travel sickness'],
    lastUpdated: '2024-01-12'
  },
  {
    id: 'constipation',
    name: 'Constipation',
    description: 'Gentle homeopathic solutions for chronic constipation and irregular bowel movements.',
    category: 'Gut Health',
    icon: '🚽',
    image: '/lovable-uploads/a824791e-2dc7-4e18-b909-67012e2997d7.png',
    searchVolume: 42000,
    commonRemedies: ['Bryonia', 'Alumina', 'Silicea', 'Opium'],
    keywords: ['constipation', 'bowel problems', 'irregular bowel movements', 'chronic constipation'],
    lastUpdated: '2024-01-10'
  }
];
