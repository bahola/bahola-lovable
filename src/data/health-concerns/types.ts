
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
  | 'Cancer'
  | 'Heart Health'
  | 'Child Care'
  | 'Ear Nose Throat'
  | 'Eye Care'
  | 'Gut Health'
  | 'Womens Care'
  | 'Hair Care'
  | 'Immune boosters'
  | 'Infection'
  | 'Lifestyle'
  | 'Muscle & Joint Care'
  | 'Mental health'
  | 'Nutritive'
  | 'Pain Care'
  | 'Reproductive care'
  | 'Respiratory Care'
  | 'Skin Care'
  | 'Tooth Care'
  | 'Urinary care';
