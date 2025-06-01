
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Truck, Package, Clock, MapPin } from 'lucide-react';

const ShippingInfo: React.FC = () => {
  return (
    <PageLayout title="Shipping Information" description="Learn about our shipping policies, delivery times, and coverage areas">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-bahola-navy-950">Shipping Information</h1>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-bahola-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Truck className="text-bahola-blue-600 mr-3" size={24} />
                <h3 className="font-semibold text-bahola-blue-800">Delivery Options</h3>
              </div>
              <p className="text-bahola-blue-700">Information about delivery options will be available soon.</p>
            </div>
            
            <div className="bg-bahola-green-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Clock className="text-bahola-green-600 mr-3" size={24} />
                <h3 className="font-semibold text-bahola-green-800">Delivery Times</h3>
              </div>
              <p className="text-bahola-green-700">Estimated delivery timeframes will be listed here.</p>
            </div>
            
            <div className="bg-bahola-purple-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Package className="text-bahola-purple-600 mr-3" size={24} />
                <h3 className="font-semibold text-bahola-purple-800">Packaging</h3>
              </div>
              <p className="text-bahola-purple-700">Details about our secure packaging methods coming soon.</p>
            </div>
            
            <div className="bg-bahola-amber-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <MapPin className="text-bahola-amber-600 mr-3" size={24} />
                <h3 className="font-semibold text-bahola-amber-800">Coverage Areas</h3>
              </div>
              <p className="text-bahola-amber-700">Shipping coverage information will be provided here.</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Page Under Construction</h2>
            <p className="text-bahola-neutral-700">
              We're working on providing comprehensive shipping information. Please contact us directly for current shipping policies and rates.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ShippingInfo;
