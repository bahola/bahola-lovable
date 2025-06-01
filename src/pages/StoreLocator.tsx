
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { MapPin, Phone, Clock } from 'lucide-react';

const StoreLocator: React.FC = () => {
  return (
    <PageLayout title="Store Locations" description="Find Bahola Labs authorized retailers and distributors near you">
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
                <p className="text-bahola-neutral-700 mb-4">
                  We're expanding our network of authorized retailers and distributors. Check back soon for a complete list of locations where you can find Bahola Labs products.
                </p>
                <p className="text-bahola-neutral-600 text-sm">
                  For immediate assistance in finding products near you, please contact our customer service team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default StoreLocator;
