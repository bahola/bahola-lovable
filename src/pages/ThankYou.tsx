import React, { useEffect, useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ShoppingBag, Home, Phone, Package, Loader2 } from 'lucide-react';
import { getLocalOrder, getOrderByNumberSecure, OrderData, clearLocalOrder } from '@/utils/orderService';

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadOrder = async () => {
      const orderNumber = searchParams.get('order');
      const email = searchParams.get('email');
      
      // First try to get from localStorage (fastest)
      const localOrder = getLocalOrder();
      if (localOrder) {
        setOrderData(localOrder);
        setLoading(false);
        // Clear after displaying
        clearLocalOrder();
        return;
      }
      
      // If we have order number AND email, fetch via secure edge function
      if (orderNumber && email) {
        const dbOrder = await getOrderByNumberSecure(orderNumber, email);
        if (dbOrder) {
          setOrderData(dbOrder);
        }
      }
      
      setLoading(false);
    };
    
    loadOrder();
  }, [searchParams]);
  
  // Calculate estimated delivery date (3-5 business days)
  const getEstimatedDelivery = () => {
    const now = new Date();
    const minDays = 3;
    const maxDays = 5;
    const minDate = new Date(now.getTime() + minDays * 24 * 60 * 60 * 1000);
    const maxDate = new Date(now.getTime() + maxDays * 24 * 60 * 60 * 1000);
    return `${minDate.toLocaleDateString()} - ${maxDate.toLocaleDateString()}`;
  };
  
  if (loading) {
    return (
      <PageLayout title="Thank You!" description="Loading your order details">
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-bahola-blue-500 mb-4" />
          <p className="text-bahola-neutral-600">Loading order details...</p>
        </div>
      </PageLayout>
    );
  }
  
  // Fallback if no order data
  if (!orderData) {
    return (
      <PageLayout title="Thank You!" description="Your order has been placed successfully">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-xl text-bahola-neutral-600 mb-8">
            Your order has been placed successfully.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="default">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" /> Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  const formatAddress = (address: OrderData['shippingAddress']) => {
    const parts = [
      address.addressLine1,
      address.addressLine2,
      address.city,
      address.state,
      address.pincode,
    ].filter(Boolean);
    return parts.join(', ');
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-bahola-neutral-500 text-sm mb-1">Order Number</h3>
                <p className="font-medium text-lg">{orderData.orderNumber}</p>
              </div>
              
              <div>
                <h3 className="text-bahola-neutral-500 text-sm mb-1">Date Placed</h3>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              
              <div>
                <h3 className="text-bahola-neutral-500 text-sm mb-1">Payment Method</h3>
                <p className="font-medium">
                  {orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Razorpay'}
                </p>
              </div>
              
              <div>
                <h3 className="text-bahola-neutral-500 text-sm mb-1">Estimated Delivery</h3>
                <p className="font-medium">{getEstimatedDelivery()}</p>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-bahola-neutral-500 text-sm mb-1">Shipping Address</h3>
                <p className="font-medium">{formatAddress(orderData.shippingAddress)}</p>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="border-t pt-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Items Ordered
              </h3>
              <ul className="space-y-3">
                {orderData.items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center py-2 border-b border-dashed last:border-0">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-bahola-neutral-500 ml-2">x{item.quantity}</span>
                    </div>
                    <span>₹{Math.round(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{Math.round(orderData.subtotal)}</span>
              </div>
              
              {orderData.discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount {orderData.couponCode && `(${orderData.couponCode})`}</span>
                  <span>-₹{Math.round(orderData.discountAmount)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{Math.round(orderData.shippingCost)}</span>
              </div>
              
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>₹{Math.round(orderData.total)}</span>
              </div>
              
              {orderData.paymentMethod === 'cod' && (
                <p className="text-bahola-neutral-500 text-sm text-center mt-2">
                  Amount payable on delivery
                </p>
              )}
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
                  <span>You'll receive an email at {orderData.customerEmail} when your order ships with tracking information.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-200 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  <span>Your package will be delivered within the estimated delivery time.</span>
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
