
import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Mail, Edit, Trash2, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Sample customers data
const sampleCustomers = [
  {
    id: 'CUST001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 9876543210',
    location: 'Mumbai, Maharashtra',
    totalOrders: 12,
    totalSpent: 15420.50,
    lastOrder: '2025-04-09',
    category: 'Gold'
  },
  {
    id: 'CUST002',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 9876543211',
    location: 'Delhi, Delhi',
    totalOrders: 8,
    totalSpent: 9546.75,
    lastOrder: '2025-04-05',
    category: 'Silver'
  },
  {
    id: 'CUST003',
    name: 'Amit Singh',
    email: 'amit.singh@example.com',
    phone: '+91 9876543212',
    location: 'Bengaluru, Karnataka',
    totalOrders: 5,
    totalSpent: 4289.00,
    lastOrder: '2025-04-02',
    category: 'Bronze'
  },
  {
    id: 'CUST004',
    name: 'Deepika Patel',
    email: 'deepika.patel@example.com',
    phone: '+91 9876543213',
    location: 'Ahmedabad, Gujarat',
    totalOrders: 15,
    totalSpent: 18765.25,
    lastOrder: '2025-04-10',
    category: 'Gold'
  },
  {
    id: 'CUST005',
    name: 'Vikram Bhatia',
    email: 'vikram.bhatia@example.com',
    phone: '+91 9876543214',
    location: 'Pune, Maharashtra',
    totalOrders: 3,
    totalSpent: 2499.99,
    lastOrder: '2025-03-25',
    category: 'Bronze'
  }
];

// Customer category badges styling
const categoryColors = {
  'Gold': 'bg-yellow-100 text-yellow-800',
  'Silver': 'bg-gray-100 text-gray-800',
  'Bronze': 'bg-amber-100 text-amber-800',
  'New': 'bg-blue-100 text-blue-800'
};

const CustomersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(sampleCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredCustomers(sampleCustomers);
    } else {
      const filtered = sampleCustomers.filter(customer => 
        customer.name.toLowerCase().includes(term.toLowerCase()) ||
        customer.email.toLowerCase().includes(term.toLowerCase()) ||
        customer.phone.includes(term) ||
        customer.id.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  };
  
  const handleViewCustomer = (customerId) => {
    // In a real app, you would fetch the customer details here
    const customer = sampleCustomers.find(c => c.id === customerId);
    setSelectedCustomer(customer);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <p className="text-muted-foreground">Manage your customer base and view customer details</p>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search customers..." 
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
      
      {/* Customers Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.location}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    categoryColors[customer.category] || 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.category}
                  </span>
                </TableCell>
                <TableCell>{customer.totalOrders}</TableCell>
                <TableCell>₹{customer.totalSpent.toFixed(2)}</TableCell>
                <TableCell>{customer.lastOrder}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => handleViewCustomer(customer.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right">
                        <SheetHeader>
                          <SheetTitle>Customer Profile</SheetTitle>
                        </SheetHeader>
                        {selectedCustomer && (
                          <div className="py-4">
                            <div className="flex justify-center mb-6">
                              <div className="h-24 w-24 rounded-full bg-bahola-blue-100 flex items-center justify-center text-bahola-blue-700 text-xl font-bold">
                                {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            </div>
                            
                            <div className="text-center mb-6">
                              <h3 className="text-xl font-bold">{selectedCustomer.name}</h3>
                              <p className="text-muted-foreground">{selectedCustomer.email}</p>
                              <div className="mt-2">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                  categoryColors[selectedCustomer.category] || 'bg-gray-100 text-gray-800'
                                }`}>
                                  {selectedCustomer.category} Customer
                                </span>
                              </div>
                            </div>
                            
                            <div className="space-y-6">
                              <div className="bg-muted rounded-lg p-4">
                                <h4 className="font-medium mb-2">Contact Information</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Email:</span>
                                    <span>{selectedCustomer.email}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Phone:</span>
                                    <span>{selectedCustomer.phone}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Location:</span>
                                    <span>{selectedCustomer.location}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-muted rounded-lg p-4">
                                <h4 className="font-medium mb-2">Order Statistics</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-white rounded-md p-3 text-center">
                                    <p className="text-muted-foreground text-xs">Total Orders</p>
                                    <p className="text-2xl font-bold">{selectedCustomer.totalOrders}</p>
                                  </div>
                                  <div className="bg-white rounded-md p-3 text-center">
                                    <p className="text-muted-foreground text-xs">Total Spent</p>
                                    <p className="text-2xl font-bold">₹{selectedCustomer.totalSpent.toFixed(2)}</p>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <p className="text-sm">
                                    <span className="text-muted-foreground">Last Order Date:</span>{' '}
                                    <span>{selectedCustomer.lastOrder}</span>
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <Button className="flex-1">
                                  <Mail className="h-4 w-4 mr-2" />
                                  Contact
                                </Button>
                                <Button variant="outline" className="flex-1">
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </SheetContent>
                    </Sheet>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-red-500" />
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

export default CustomersManagement;
