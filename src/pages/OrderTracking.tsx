import React, { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, Search, Truck, CheckCircle2, MapPin, Phone } from 'lucide-react';

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrackOrder = () => {
    if (!orderNumber.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTrackingData({
        orderNumber: orderNumber,
        status: 'In Transit',
        estimatedDelivery: '2025-01-05',
        currentLocation: 'Chennai Distribution Center',
        timeline: [
          { status: 'Order Placed', date: '2025-01-01', completed: true },
          { status: 'Payment Confirmed', date: '2025-01-01', completed: true },
          { status: 'Order Processed', date: '2025-01-02', completed: true },
          { status: 'Shipped', date: '2025-01-03', completed: true },
          { status: 'In Transit', date: '2025-01-04', completed: true },
          { status: 'Out for Delivery', date: '2025-01-05', completed: false },
          { status: 'Delivered', date: '2025-01-05', completed: false }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <PageLayout title="Track Your Order" description="Enter your order number to track your shipment">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="orderNumber">Order Number</Label>
              <Input
                id="orderNumber"
                placeholder="Enter your order number (e.g., BL0012345)"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleTrackOrder} disabled={loading}>
                <Search className="h-4 w-4 mr-2" />
                {loading ? 'Tracking...' : 'Track Order'}
              </Button>
            </div>
          </div>
        </div>

        {trackingData && (
          <div className="space-y-6">
            {/* Order Status Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Package className="h-6 w-6 text-bahola-blue-500 mr-2" />
                <h2 className="text-xl font-bold">Order #{trackingData.orderNumber}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-bahola-neutral-500 text-sm">Status</p>
                  <p className="font-medium text-lg">{trackingData.status}</p>
                </div>
                <div>
                  <p className="text-bahola-neutral-500 text-sm">Estimated Delivery</p>
                  <p className="font-medium text-lg">{trackingData.estimatedDelivery}</p>
                </div>
                <div>
                  <p className="text-bahola-neutral-500 text-sm">Current Location</p>
                  <p className="font-medium text-lg flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {trackingData.currentLocation}
                  </p>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-6">Tracking Timeline</h3>
              
              <div className="space-y-4">
                {trackingData.timeline.map((event, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                      event.completed 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {event.completed ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <p className={`font-medium ${
                        event.completed ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {event.status}
                      </p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-medium text-blue-900 mb-2">Need Help?</h3>
              <p className="text-blue-800 mb-4">
                If you have any questions about your order, please contact our customer service team.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Support
                </Button>
                <Button variant="outline" size="sm">
                  Email Support
                </Button>
              </div>
            </div>
          </div>
        )}

        {!trackingData && !loading && (
          <div className="text-center py-12">
            <Truck className="h-16 w-16 mx-auto text-bahola-neutral-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">Ready to Track Your Order?</h3>
            <p className="text-bahola-neutral-600">
              Enter your order number above to get real-time tracking information.
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default OrderTracking;
