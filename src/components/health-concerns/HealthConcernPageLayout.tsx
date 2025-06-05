import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, TrendingUp, ArrowLeft, Package } from 'lucide-react';
import { HealthConcern } from '@/data/health-concerns/types';

interface HealthConcernPageLayoutProps {
  concern: HealthConcern;
  children?: React.ReactNode;
}

export const HealthConcernPageLayout: React.FC<HealthConcernPageLayoutProps> = ({ 
  concern, 
  children 
}) => {
  // Add defensive check to prevent undefined errors
  if (!concern) {
    console.error('HealthConcernPageLayout: concern prop is undefined');
    return (
      <PageLayout title="Health Concern" description="Loading health concern information...">
        <div className="text-center py-8">
          <p className="text-gray-500">Loading health concern information...</p>
        </div>
      </PageLayout>
    );
  }

  // Mock combination products data - this will be replaced with actual data later
  const combinationProducts = [
    {
      id: 1,
      name: `${concern.name} Relief Combo`,
      description: `Complete homeopathic solution for ${concern.name.toLowerCase()}`,
      price: 299,
      image: concern.image
    },
    {
      id: 2,
      name: `Advanced ${concern.name} Support`,
      description: `Enhanced formula for comprehensive ${concern.name.toLowerCase()} management`,
      price: 399,
      image: concern.image
    },
    {
      id: 3,
      name: `Natural ${concern.name} Kit`,
      description: `All-in-one kit for natural ${concern.name.toLowerCase()} treatment`,
      price: 499,
      image: concern.image
    }
  ];

  return (
    <PageLayout title={concern.name} description={concern.description}>
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="text-sm text-bahola-neutral-600">
          <Link to="/" className="hover:text-bahola-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/health-concerns" className="hover:text-bahola-blue-600">Health Concerns</Link>
          <span className="mx-2">/</span>
          <span className="text-bahola-navy-950">{concern.name}</span>
        </nav>
      </div>

      {/* Back Button */}
      <div className="mb-6">
        <Link to="/health-concerns">
          <Button variant="ghost" size="sm">
            <ArrowLeft size={16} className="mr-2" />
            Back to Health Concerns
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{concern.icon}</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{concern.category}</Badge>
                {concern.trending && (
                  <Badge className="bg-bahola-orange-100 text-bahola-orange-700">
                    <TrendingUp size={12} className="mr-1" />
                    Trending
                  </Badge>
                )}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-bahola-navy-950 mb-4 font-helvetica">
              {concern.name}
            </h1>
            <p className="text-lg text-bahola-neutral-700 mb-6 font-serif">
              {concern.description}
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm text-bahola-neutral-600 mb-6">
              <div className="flex items-center gap-1">
                <Users size={16} />
                {concern.searchVolume.toLocaleString()} monthly searches
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                Updated {new Date(concern.lastUpdated).toLocaleDateString()}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Link to="/consultation">
                <Button className="bg-bahola-blue-600 hover:bg-bahola-blue-700">
                  Book Consultation
                </Button>
              </Link>
              <Link to={`/products?search=${concern.name}`}>
                <Button variant="outline">
                  View Products
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={concern.image}
                alt={concern.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Combination Products Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Package className="text-bahola-blue-600" size={24} />
          <h2 className="text-2xl font-semibold text-bahola-navy-950 font-helvetica">
            Combination Products for {concern.name}
          </h2>
        </div>
        <p className="text-bahola-neutral-700 mb-6">
          Our specially formulated combination products offer comprehensive support for {concern.name.toLowerCase()}. 
          These expert-curated blends combine multiple remedies for enhanced effectiveness.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {combinationProducts.map((product) => (
            <div key={product.id} className="border border-bahola-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="aspect-square rounded-lg overflow-hidden mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-bahola-navy-950 mb-2">{product.name}</h3>
              <p className="text-sm text-bahola-neutral-600 mb-3">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-bahola-blue-600">₹{product.price}</span>
                <Button size="sm" className="bg-bahola-blue-600 hover:bg-bahola-blue-700">
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Remedies Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
          Common Homeopathic Remedies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {concern.commonRemedies.map((remedy, index) => (
            <div key={index} className="bg-bahola-blue-50 text-bahola-blue-700 px-4 py-3 rounded-lg text-center font-medium">
              {remedy}
            </div>
          ))}
        </div>
        <p className="text-sm text-bahola-neutral-600 mt-4">
          * Please consult with a qualified homeopathic practitioner before using any remedies.
        </p>
      </div>

      {/* Custom Content */}
      {children}

      {/* Call to Action */}
      <div className="bg-bahola-blue-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
          Need Personalized Treatment?
        </h3>
        <p className="text-bahola-neutral-700 mb-6 max-w-2xl mx-auto">
          Every individual is unique, and so are their health needs. Our experienced homeopathic practitioners 
          can provide personalized treatment plans tailored to your specific condition and constitution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/consultation">
            <Button size="lg" className="bg-bahola-blue-600 hover:bg-bahola-blue-700">
              Book Online Consultation
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};
