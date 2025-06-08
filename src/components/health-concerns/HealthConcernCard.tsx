
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, TrendingUp } from 'lucide-react';

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

interface HealthConcernCardProps {
  concern: HealthConcern;
  viewMode: 'grid' | 'list';
}

export const HealthConcernCard: React.FC<HealthConcernCardProps> = ({
  concern,
  viewMode,
}) => {
  // Updated to use /diseases-conditions/ instead of /concern/
  const concernPath = `/diseases-conditions/${concern.id}`;

  if (viewMode === 'list') {
    return (
      <Link
        to={concernPath}
        className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
            {concern.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{concern.name}</h3>
              <div className="flex items-center space-x-2">
                {concern.trending && (
                  <span className="flex items-center text-sm text-orange-600">
                    <TrendingUp size={14} className="mr-1" />
                    Trending
                  </span>
                )}
                <span className="text-sm text-gray-500">
                  {concern.searchVolume.toLocaleString()} searches
                </span>
              </div>
            </div>
            <p className="text-gray-600 mt-1">{concern.description}</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex flex-wrap gap-1">
                {concern.commonRemedies.slice(0, 3).map((remedy, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                  >
                    {remedy}
                  </span>
                ))}
                {concern.commonRemedies.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{concern.commonRemedies.length - 3} more
                  </span>
                )}
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Clock size={12} className="mr-1" />
                Updated {new Date(concern.lastUpdated).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={concernPath}
      className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <span className="text-4xl">{concern.icon}</span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{concern.name}</h3>
          {concern.trending && (
            <span className="flex items-center text-sm text-orange-600">
              <TrendingUp size={14} className="mr-1" />
              Trending
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-3">{concern.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {concern.commonRemedies.slice(0, 2).map((remedy, index) => (
            <span
              key={index}
              className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
            >
              {remedy}
            </span>
          ))}
          {concern.commonRemedies.length > 2 && (
            <span className="text-xs text-gray-500">
              +{concern.commonRemedies.length - 2} more
            </span>
          )}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{concern.searchVolume.toLocaleString()} searches</span>
          <div className="flex items-center">
            <Clock size={12} className="mr-1" />
            {new Date(concern.lastUpdated).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Link>
  );
};
