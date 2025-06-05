
import React from 'react';
import { HealthConcernCard } from './HealthConcernCard';

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

interface HealthConcernsGridProps {
  concerns: HealthConcern[];
  viewMode: 'grid' | 'list';
}

export const HealthConcernsGrid: React.FC<HealthConcernsGridProps> = ({
  concerns,
  viewMode,
}) => {
  return (
    <div className={`grid gap-6 ${
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
  );
};
