
import React, { useState } from 'react';
import { Search, Filter, Eye, Printer, Download, ArrowDownUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Sample orders data
const sampleOrders = [
  {
    id: 'ORD-1001',
    date: '2025-04-10',
    customer: 'Rajesh Kumar',
    total: 1249.00,
    items: 3,
    status: 'Completed',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-1002',
    date: '2025-04-09',
    customer: 'Priya Sharma',
    total: 2546.00,
    items: 5,
    status: 'Processing',
    paymentMethod: 'UPI'
  },
  {
    id: 'ORD-1003',
    date: '2025-04-09',
    customer: 'Amit Singh',
    total: 899.00,
    items: 2,
    status: 'Pending',
    paymentMethod: 'Cash on Delivery'
  },
  {
    id: 'ORD-1004',
    date: '2025-04-08',
    customer: 'Deepika Patel',
    total: 1799.00,
    items: 4,
    status: 'Shipped',
    paymentMethod: 'Net Banking'
  },
  {
    id: 'ORD-1005',
    date: '2025-04-07',
    customer: 'Vikram Bhatia',
    total: 3299.00,
    items: 7,
    status: 'Cancelled',
    paymentMethod: 'Wallet'
  }
];

// Sample order details - would be fetched based on the order ID
const sampleOrderDetails = {
  id: 'ORD-1001',
  date: '2025-04-10 14:23:45',
  customer: {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 9876543210'
  },
  shipping: {
    address: '123 Main Street, Apartment 4B',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001'
  },
  items: [
    {
      id: 'PRD001',
      name: 'Arnica Montana 30C',
      price: 185.00,
      quantity: 2,
      total: 370.00
    },
    {
      id: 'PRD003',
      name: 'Belladonna 200C',
      price: 195.00,
      quantity: 1,
      total: 195.00
    },
    {
      id: 'PRD005',
      name: 'Pulsatilla 30C',
      price: 170.00,
      quantity: 4,
      total: 680.00
    }
  ],
  subtotal: 1245.00,
  shippingCost: 0.00,
  discount: 0.00,
  tax: 4.00,
  total: 1249.00,
  paymentMethod: 'Credit Card',
  status: 'Completed',
  notes: 'Please leave package at the door'
};

const statusColors = {
  'Completed': 'bg-green-100 text-green-800',
  'Processing': 'bg-blue-100 text-blue-800',
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Shipped': 'bg-indigo-100 text-indigo-800',
  'Cancelled': 'bg-red-100 text-red-800'
};

const OrdersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredOrders(sampleOrders);
    } else {
      const filtered = sampleOrders.filter(order => 
        order.id.toLowerCase().includes(term.toLowerCase()) ||
        order.customer.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  };
  
  const handleViewOrder = (orderId) => {
    // In a real app, you would fetch the order details here
    setSelectedOrder(sampleOrderDetails);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <p className="text-muted-foreground">Manage customer orders and track order status</p>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search orders..." 
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
      
      {/* Orders Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center">
                  Order ID
                  <ArrowDownUp className="ml-1 h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  Date
                  <ArrowDownUp className="ml-1 h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>₹{order.total.toFixed(2)}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[order.status] || 'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Order Details: {sampleOrderDetails.id}</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-6 py-4">
                          <div>
                            <h3 className="font-semibold text-lg mb-2">Customer Information</h3>
                            <div className="space-y-1 text-sm">
                              <p><span className="font-medium">Name:</span> {sampleOrderDetails.customer.name}</p>
                              <p><span className="font-medium">Email:</span> {sampleOrderDetails.customer.email}</p>
                              <p><span className="font-medium">Phone:</span> {sampleOrderDetails.customer.phone}</p>
                            </div>
                            
                            <h3 className="font-semibold text-lg mt-4 mb-2">Shipping Address</h3>
                            <div className="space-y-1 text-sm">
                              <p>{sampleOrderDetails.shipping.address}</p>
                              <p>{sampleOrderDetails.shipping.city}, {sampleOrderDetails.shipping.state}</p>
                              <p>PIN: {sampleOrderDetails.shipping.pincode}</p>
                            </div>
                            
                            <h3 className="font-semibold text-lg mt-4 mb-2">Payment Information</h3>
                            <div className="space-y-1 text-sm">
                              <p><span className="font-medium">Method:</span> {sampleOrderDetails.paymentMethod}</p>
                              <p><span className="font-medium">Status:</span> Paid</p>
                              <p><span className="font-medium">Date:</span> {sampleOrderDetails.date}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-lg mb-2">Order Items</h3>
                            <div className="border rounded-md">
                              <table className="w-full text-sm">
                                <thead className="bg-muted/50">
                                  <tr>
                                    <th className="p-2 text-left">Product</th>
                                    <th className="p-2 text-right">Price</th>
                                    <th className="p-2 text-right">Qty</th>
                                    <th className="p-2 text-right">Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {sampleOrderDetails.items.map((item, idx) => (
                                    <tr key={idx} className="border-t">
                                      <td className="p-2">{item.name}</td>
                                      <td className="p-2 text-right">₹{item.price.toFixed(2)}</td>
                                      <td className="p-2 text-right">{item.quantity}</td>
                                      <td className="p-2 text-right">₹{item.total.toFixed(2)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            
                            <div className="mt-4 space-y-2">
                              <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>₹{sampleOrderDetails.subtotal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Shipping:</span>
                                <span>₹{sampleOrderDetails.shippingCost.toFixed(2)}</span>
                              </div>
                              {sampleOrderDetails.discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                  <span>Discount:</span>
                                  <span>-₹{sampleOrderDetails.discount.toFixed(2)}</span>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <span>Tax:</span>
                                <span>₹{sampleOrderDetails.tax.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between font-bold pt-2 border-t">
                                <span>Total:</span>
                                <span>₹{sampleOrderDetails.total.toFixed(2)}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <Button className="w-full">
                                <Printer className="h-4 w-4 mr-2" />
                                Print Invoice
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm">
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default OrdersManagement;
