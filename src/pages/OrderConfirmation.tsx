
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Truck, Map, Calendar, Clock, Copy } from 'lucide-react';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  
  // Mock order data - in a real app, you would fetch this from your API
  const orderData = {
    id: orderId || 'ORD123456789',
    date: '12 April 2025',
    amount: '₹1,850.00',
    paymentMethod: 'Credit Card (ending in 4242)',
    items: [
      {
        name: 'Arnica Montana 30C',
        quantity: 2,
        price: '₹550.00'
      },
      {
        name: 'Belladonna 200C',
        quantity: 1,
        price: '₹450.00'
      },
      {
        name: 'Bach Flower Rescue Remedy',
        quantity: 1,
        price: '₹850.00'
      }
    ],
    shippingAddress: '2, Example Street, Besant Nagar, Chennai - 600090, Tamil Nadu',
    estimatedDelivery: '14-16 April 2025'
  };

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderData.id.toString());
    // In a real app, you would show a toast notification here
    alert('Order ID copied to clipboard');
  };

  return (
    <PageLayout title="Order Confirmation" description="Thank you for your purchase">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-14 w-14 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-bahola-neutral-900">Your Order is Confirmed!</h2>
          <p className="text-bahola-neutral-600 mt-2">
            We've received your order and are processing it right away.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order Details</span>
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleCopyOrderId}>
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-bahola-neutral-500">Order Number</p>
                <p className="font-medium">{orderData.id}</p>
              </div>
              <div>
                <p className="text-sm text-bahola-neutral-500">Date Placed</p>
                <p className="font-medium">{orderData.date}</p>
              </div>
              <div>
                <p className="text-sm text-bahola-neutral-500">Total Amount</p>
                <p className="font-medium">{orderData.amount}</p>
              </div>
              <div>
                <p className="text-sm text-bahola-neutral-500">Payment Method</p>
                <p className="font-medium">{orderData.paymentMethod}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Order Items</h4>
              <div className="space-y-3">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>
                      {item.name} <span className="text-bahola-neutral-500">× {item.quantity}</span>
                    </span>
                    <span className="font-medium">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-bahola-blue-500" />
                <span>Shipping Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-bahola-neutral-500">Delivery Address</p>
                  <p className="font-medium">{orderData.shippingAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-bahola-neutral-500">Estimated Delivery</p>
                  <p className="font-medium">{orderData.estimatedDelivery}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5 text-bahola-blue-500" />
                <span>Track Your Order</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-bahola-neutral-600 mb-4">
                You will receive an email with tracking information once your order ships.
              </p>
              <div className="flex flex-col gap-2">
                <Button variant="outline" asChild>
                  <Link to="/track-order" className="w-full">Track Order Status</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/orders" className="w-full">View All Orders</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-bahola-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
          <p className="text-bahola-neutral-600 mb-4">
            If you have any questions about your order, our customer support team is here to help.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default OrderConfirmation;
