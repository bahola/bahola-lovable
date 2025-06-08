
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, TrendingUp } from 'lucide-react';
import { HealthConcernsBreadcrumb } from './HealthConcernsBreadcrumb';

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

interface HealthConcernPageLayoutProps {
  concern: HealthConcern;
  children: React.ReactNode;
}

export const HealthConcernPageLayout: React.FC<HealthConcernPageLayoutProps> = ({
  concern,
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-bahola-blue-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Link
                to="/diseases-conditions"
                className="inline-flex items-center text-bahola-blue-600 hover:text-bahola-blue-700 font-medium"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Health Concerns
              </Link>
            </div>

            <div className="max-w-4xl mx-auto text-center">
              <div className="text-6xl mb-6">{concern.icon}</div>
              <h1 className="text-4xl md:text-5xl font-bold text-bahola-navy-950 mb-4 font-helvetica">
                {concern.name}
              </h1>
              <p className="text-xl text-bahola-neutral-600 mb-6">
                {concern.description}
              </p>

              <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
                <div className="flex items-center text-bahola-neutral-600">
                  <Clock size={16} className="mr-2" />
                  Updated {new Date(concern.lastUpdated).toLocaleDateString()}
                </div>
                <div className="text-bahola-neutral-600">
                  {concern.searchVolume.toLocaleString()} monthly searches
                </div>
                {concern.trending && (
                  <div className="flex items-center text-orange-600">
                    <TrendingUp size={16} className="mr-2" />
                    Trending
                  </div>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {concern.commonRemedies.map((remedy, index) => (
                  <span
                    key={index}
                    className="bg-bahola-blue-100 text-bahola-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {remedy}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-gray-50 px-4 py-12">
          <div className="container mx-auto max-w-4xl">
            <HealthConcernsBreadcrumb
              categoryName={concern.category}
              subcategoryName={concern.name}
            />
            
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
