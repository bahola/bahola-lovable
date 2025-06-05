
import React from 'react';
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

export const HealthConcernsCategoryView: React.FC<HealthConcernsCategoryViewProps> = ({
  concernsByCategory,
  viewMode,
}) => {
  return (
    <div className="space-y-12">
      {Object.entries(concernsByCategory).map(([categoryKey, concerns]) => (
        <div key={categoryKey} className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-bahola-navy-950 mb-2">
              {categoryInfo[categoryKey as keyof typeof categoryInfo].name}
            </h2>
            <p className="text-bahola-neutral-600">
              {categoryInfo[categoryKey as keyof typeof categoryInfo].description}
            </p>
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
