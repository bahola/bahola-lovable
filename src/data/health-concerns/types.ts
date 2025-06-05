
export interface HealthConcern {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  image: string;
  searchVolume: number;
  commonRemedies: string[];
  keywords: string[];
  lastUpdated: string;
  trending?: boolean;
}

export type HealthConcernCategory = 
  | 'Allergies'
  | 'Anxiety & Mental Health'
  | 'Digestive Health'
  | 'Respiratory Health'
  | "Women's Care"
  | 'Hair Care'
  | 'Immune Boosters'
  | 'Heart & Circulation'
  | 'Cancer Support'
  | "Children's Health"
  | 'Weight & Metabolism'
  | 'Pain Management'
  | 'Sensory Health'
  | 'Skin Health'
  | 'Infection';
