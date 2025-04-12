import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const OrderHistory = () => {
  // Mock order data
  const orders = [
    {
      id: 'ORD123456789',
      date: '10 April 2025',
      total: '₹1,850.00',
      status: 'Delivered',
      items: 3
    },
    {
      id: 'ORD123456788',
      date: '25 March 2025',
      total: '₹2,450.00',
      status: 'Shipped',
      items: 5
    },
    {
      id: 'ORD123456787',
      date: '15 February 2025',
      total: '₹950.00',
      status: 'Delivered',
      items: 2
    },
    {
      id: 'ORD123456786',
      date: '10 January 2025',
      total: '₹3,200.00',
      status: 'Delivered',
      items: 4
    }
  ];

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let bgColor = 'bg-gray-100 text-gray-800';
    
    if (status === 'Delivered') {
      bgColor = 'bg-green-100 text-green-800';
    } else if (status === 'Shipped') {
      bgColor = 'bg-blue-100 text-blue-800';
    } else if (status === 'Processing') {
      bgColor = 'bg-yellow-100 text-yellow-800';
    } else if (status === 'Cancelled') {
      bgColor = 'bg-red-100 text-red-800';
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
        {status}
      </span>
    );
  };

  return (
    <PageLayout title="Order History" description="View and track your orders">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              type="text" 
              placeholder="Search by order number or product name" 
              className="pl-10"
            />
          </div>
          <Button>
            <Link to="/track-order">Track an Order</Link>
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Orders</CardTitle>
                <CardDescription>
                  View and manage all your orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-bahola-neutral-600 mb-4">You haven't placed any orders yet.</p>
                    <Button asChild>
                      <Link to="/">Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y">
                    {orders.map((order) => (
                      <div key={order.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-medium">Order #{order.id}</h4>
                              <StatusBadge status={order.status} />
                            </div>
                            <p className="text-sm text-bahola-neutral-500">{order.date} • {order.items} items • {order.total}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" asChild>
                              <Link to={`/orders/${order.id}`}>View Details</Link>
                            </Button>
                            {order.status === 'Delivered' && (
                              <Button variant="outline" asChild>
                                <Link to={`/review-order/${order.id}`}>Write Review</Link>
                              </Button>
                            )}
                            {order.status === 'Shipped' && (
                              <Button variant="outline" asChild>
                                <Link to={`/track-order/${order.id}`}>Track Package</Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Other tab contents would be similar but filtered by status */}
          <TabsContent value="processing" className="mt-6">
            {/* Filtered Processing Orders */}
          </TabsContent>
          <TabsContent value="shipped" className="mt-6">
            {/* Filtered Shipped Orders */}
          </TabsContent>
          <TabsContent value="delivered" className="mt-6">
            {/* Filtered Delivered Orders */}
          </TabsContent>
          <TabsContent value="cancelled" className="mt-6">
            {/* Filtered Cancelled Orders */}
          </TabsContent>
        </Tabs>
        
        <div className="bg-bahola-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2">Need Help With Your Order?</h3>
          <p className="text-bahola-neutral-600 mb-4">
            Our customer support team is here to assist you with any questions or concerns about your orders.
          </p>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/return-policy">Return Policy</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default OrderHistory;
