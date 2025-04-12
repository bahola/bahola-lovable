
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ShoppingBag, Home, Phone } from 'lucide-react';

const ThankYou = () => {
  // In a real app, this would come from the order confirmation API
  const orderDetails = {
    orderNumber: 'BL0012345',
    date: new Date().toLocaleDateString(),
    items: 4,
    total: 844,
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 3 days from now
    shippingAddress: '123 Main St, Apartment 4B, Chennai, Tamil Nadu, 600001',
    paymentMethod: 'Razorpay (Credit Card)'
  };
  
  return (
    <PageLayout title="Thank You!" description="Your order has been placed successfully">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-xl text-bahola-neutral-600">
            Your order has been placed successfully and will be processed soon.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Order Details</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-bahola-neutral-500 text-sm mb-1">Order Number</h3>
                <p className="font-medium">{orderDetails.orderNumber}</p>
              </div>
              
              <div>
                <h3 className="text-bahola-neutral-500 text-sm mb-1">Date Placed</h3>
                <p className="font-medium">{orderDetails.date}</p>
              </div>
              
              <div>
                <h3 className="text-bahola-neutral-500 text-sm mb-1">Total Amount</h3>
                <p className="font-medium">₹{orderDetails.total}</p>
              </div>
              
              <div>
                <h3 className="text-bahola-neutral-500 text-sm mb-1">Payment Method</h3>
                <p className="font-medium">{orderDetails.paymentMethod}</p>
              </div>
              
              <div>
                <h3 className="text-bahola-neutral-500 text-sm mb-1">Estimated Delivery</h3>
                <p className="font-medium">{orderDetails.estimatedDelivery}</p>
              </div>
              
              <div>
                <h3 className="text-bahola-neutral-500 text-sm mb-1">Shipping Address</h3>
                <p className="font-medium">{orderDetails.shippingAddress}</p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">What happens next?</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <span className="bg-blue-200 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <span>We're preparing your order for shipment.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-200 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <span>You'll receive an email when your order ships with tracking information.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-200 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  <span>Your package will be delivered to your address within the estimated delivery time.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="default">
            <Link to="/orders">
              <ShoppingBag className="mr-2 h-4 w-4" /> Track My Order
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" /> Continue Shopping
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link to="/contact">
              <Phone className="mr-2 h-4 w-4" /> Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default ThankYou;
