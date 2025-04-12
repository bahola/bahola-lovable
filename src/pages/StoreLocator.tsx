
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { Button } from "@/components/ui/button";

const StoreLocator = () => {
  const locations = [
    {
      id: 'chennai',
      name: 'Chennai Store',
      address: '2, Tiger Varadachari Road, Kalakshetra Colony, Besant Nagar, Chennai - 600090',
      phone: '+91 9791035385',
      hours: 'Monday - Friday: 9:00 AM - 6:00 PM, Saturday: 9:00 AM - 1:00 PM, Sunday: Closed',
      mapUrl: 'https://maps.google.com/?q=2,%20Tiger%20Varadachari%20Road,%20Kalakshetra%20Colony,%20Besant%20Nagar,%20Chennai',
      directions: 'Located near Kalakshetra, about 10 minutes from Adyar signal. Parking available in front of the store.'
    },
    {
      id: 'kumbakonam',
      name: 'Kumbakonam Store',
      address: '"Homeo House", 30, Bakthapuri Street, Kumbakonam - 612001',
      phone: '+91 9791035385',
      hours: 'Monday - Friday: 9:00 AM - 6:00 PM, Saturday: 9:00 AM - 1:00 PM, Sunday: Closed',
      mapUrl: 'https://maps.google.com/?q=30,%20Bakthapuri%20Street,%20Kumbakonam',
      directions: 'Located in the heart of Kumbakonam, near the main temple. 5 minutes walk from the bus stand.'
    }
  ];

  return (
    <PageLayout title="Store Locator" description="Find Bahola Labs stores near you">
      <div className="space-y-12">
        {locations.map((location) => (
          <div key={location.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Map Embed (in a real implementation, this would be a proper Google Maps embed) */}
              <div className="h-64 md:h-auto bg-gray-200 flex items-center justify-center">
                <iframe 
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(location.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map showing ${location.name}`}
                ></iframe>
              </div>
              
              {/* Store Information */}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{location.name}</h2>
                
                <div className="space-y-4">
                  <div className="flex">
                    <MapPin className="h-5 w-5 text-bahola-blue-500 mr-3 flex-shrink-0 mt-1" />
                    <p>{location.address}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-1">Store Hours</h3>
                    <p className="text-bahola-neutral-600">{location.hours}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-1">How to Get There</h3>
                    <p className="text-bahola-neutral-600">{location.directions}</p>
                  </div>
                  
                  <div className="flex space-x-3 pt-2">
                    <Button asChild variant="outline" size="sm">
                      <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on Google Maps
                      </a>
                    </Button>
                    
                    <Button asChild size="sm">
                      <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer">
                        <Navigation className="h-4 w-4 mr-2" />
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-bahola-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Looking for a Bahola Labs Store?</h2>
        <p>
          We're constantly expanding! If you don't see a store near you, you can always 
          shop online or contact our customer care team for assistance with finding the 
          nearest retailer or doctor who carries our products.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Button asChild variant="default">
            <a href="/categories">Shop Online</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/contact">Contact Us</a>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default StoreLocator;
