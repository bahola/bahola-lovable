
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

export const HealthConcernCard: React.FC<HealthConcernCardProps> = ({ concern, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
            <img
              src={concern.image}
              alt={concern.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{concern.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {concern.category}
                  </Badge>
                  {concern.trending && (
                    <Badge className="bg-orange-100 text-orange-700 text-xs">
                      <TrendingUp size={12} className="mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  {concern.searchVolume.toLocaleString()} searches
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{concern.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {concern.commonRemedies.slice(0, 3).map((remedy, index) => (
                  <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                    {remedy}
                  </span>
                ))}
                {concern.commonRemedies.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{concern.commonRemedies.length - 3} more
                  </span>
                )}
              </div>
              
              <Link to={`/concern/${concern.id}`}>
                <Button variant="outline" size="sm">
                  View Remedies
                  <ArrowRight size={14} className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow overflow-hidden">
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        <img
          src={concern.image}
          alt={concern.name}
          className="w-full h-full object-cover"
        />
        {concern.trending && (
          <Badge className="absolute top-3 right-3 bg-orange-500">
            <TrendingUp size={12} className="mr-1" />
            Trending
          </Badge>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className="text-xs mb-2">
            {concern.category}
          </Badge>
          <div className="text-right text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users size={14} />
              {(concern.searchVolume / 1000).toFixed(0)}k
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{concern.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{concern.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {concern.commonRemedies.slice(0, 2).map((remedy, index) => (
            <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
              {remedy}
            </span>
          ))}
          {concern.commonRemedies.length > 2 && (
            <span className="text-xs text-gray-500">
              +{concern.commonRemedies.length - 2}
            </span>
          )}
        </div>
        
        <Link to={`/concern/${concern.id}`} className="block">
          <Button className="w-full" variant="outline">
            View Remedies
            <ArrowRight size={14} className="ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
