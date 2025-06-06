import React from 'react';
import { Link } from 'react-router-dom';
import { HealthConcernCard } from './HealthConcernCard';
import { categoryInfo } from '@/data/healthConcernsData';

interface HealthConcern {
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

interface HealthConcernsCategoryViewProps {
  concernsByCategory: Record<string, HealthConcern[]>;
  viewMode: 'grid' | 'list';
}

const categoryRoutes: Record<string, string> = {
  'Allergies': '/diseases-conditions/allergy-care',
  'Gut Health': '/diseases-conditions/gut-health',
  'Heart Health': '/diseases-conditions/heart-health',
  'Child Care': '/diseases-conditions/child-care',
  'Cancer': '/diseases-conditions/cancer-support',
  'Anxiety & Mental Health': '/diseases-conditions/anxiety-mental-health',
  'Ear Nose Throat': '/diseases-conditions/ent-care',
  'Eye Care': '/diseases-conditions/eye-care',
  'Hair Care': '/diseases-conditions/hair-care',
  'Immune boosters': '/diseases-conditions/immune-boosters',
  'Infection': '/diseases-conditions/infection-care',
  'Lifestyle': '/diseases-conditions/lifestyle-care',
  'Mental health': '/diseases-conditions/mental-health',
  'Muscle & Joint Care': '/diseases-conditions/muscle-care',
  'Nutritive': '/diseases-conditions/nutritive-care',
  'Pain Care': '/diseases-conditions/pain-care',
  'Reproductive care': '/diseases-conditions/reproductive-care',
  'Respiratory Care': '/diseases-conditions/respiratory-care',
  'Skin Care': '/diseases-conditions/skin-care',
  'Specialty Care': '/diseases-conditions/specialty-care',
  'Tooth Care': '/diseases-conditions/tooth-care',
  'Urinary care': '/diseases-conditions/urology-care',
  'Womens Care': '/diseases-conditions/womens-health'
};

export const HealthConcernsCategoryView: React.FC<HealthConcernsCategoryViewProps> = ({
  concernsByCategory,
  viewMode,
}) => {
  return (
    <div className="space-y-12">
      {Object.entries(concernsByCategory).map(([categoryKey, concerns]) => (
        <div key={categoryKey} className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-bahola-navy-950 mb-2">
                {categoryInfo[categoryKey as keyof typeof categoryInfo].name}
              </h2>
              <p className="text-bahola-neutral-600">
                {categoryInfo[categoryKey as keyof typeof categoryInfo].description}
              </p>
            </div>
            {categoryRoutes[categoryKey] && (
              <Link
                to={categoryRoutes[categoryKey]}
                className="text-bahola-blue-600 hover:text-bahola-blue-700 font-medium text-sm"
              >
                View All →
              </Link>
            )}
          </div>
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {concerns.map((concern) => (
              <HealthConcernCard
                key={concern.id}
                concern={concern}
                viewMode={viewMode}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
