
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
  'Allergies': '/health-concerns/allergy-care',
  'Gut Health': '/health-concerns/gut-health',
  'Heart Health': '/health-concerns/heart-health',
  'Child Care': '/health-concerns/child-care',
  'Cancer': '/health-concerns/cancer-support',
  'Anxiety & Mental Health': '/health-concerns/anxiety-mental-health',
  'Ear Nose Throat': '/health-concerns/ent-care',
  'Eye Care': '/health-concerns/eye-care',
  'Hair Care': '/health-concerns/hair-care',
  'Immune boosters': '/health-concerns/immune-boosters',
  'Infection': '/health-concerns/infection-care',
  'Lifestyle': '/health-concerns/lifestyle-care',
  'Mental health': '/health-concerns/mental-health',
  'Muscle & Joint Care': '/health-concerns/muscle-care',
  'Nutritive': '/health-concerns/nutritive-care',
  'Pain Care': '/health-concerns/pain-care',
  'Reproductive care': '/health-concerns/reproductive-care',
  'Respiratory Care': '/health-concerns/respiratory-care',
  'Skin Care': '/health-concerns/skin-care',
  'Specialty Care': '/health-concerns/specialty-care',
  'Tooth Care': '/health-concerns/tooth-care',
  'Urinary care': '/health-concerns/urology-care',
  'Womens Care': '/health-concerns/womens-health'
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
