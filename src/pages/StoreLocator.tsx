
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { MapPin, Phone, Clock } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

const StoreLocator: React.FC = () => {
  const { pageData, loading } = usePageContent('store-locator');

  return (
    <PageLayout title={pageData?.title || "Store Locations"} description={pageData?.meta_description || "Find Bahola Labs authorized retailers and distributors near you"}>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-bahola-navy-950">Store Locations</h1>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-bahola-navy-950">Main Office & Distribution Center</h2>
              
              <div className="bg-bahola-blue-50 p-6 rounded-lg mb-6">
                <div className="flex items-start mb-4">
                  <MapPin className="text-bahola-blue-600 mr-3 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold mb-1">Bahola Labs</h3>
                    <p className="text-bahola-neutral-700">
                      2, Tiger Varachari Road, Kalakshetra Colony<br />
                      Besant Nagar, Chennai – 600090
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <Phone className="text-bahola-blue-600 mr-3" size={20} />
                  <span className="text-bahola-neutral-700">+91 9791035385</span>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-bahola-blue-600 mr-3 mt-1" size={20} />
                  <div>
                    <p className="text-bahola-neutral-700">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-bahola-navy-950">Authorized Retailers</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Coming Soon</h3>
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap text-bahola-neutral-700">
                    {pageData?.content || "We're expanding our network of authorized retailers and distributors. Check back soon for a complete list of locations where you can find Bahola Labs products."}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default StoreLocator;
