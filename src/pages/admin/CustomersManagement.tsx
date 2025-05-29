
import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, Mail, Edit, Trash2, Users, Plus, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

// TypeScript types for customer data
type CustomerType = 'customer' | 'doctor';

interface Customer {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  customer_type: CustomerType;
  source?: string;
  status?: string;
  notes?: string;
  total_orders?: number;
  total_spent?: number;
  last_order_date?: string;
  created_at: string;
  updated_at: string;
}

const categoryColors = {
  'customer': 'bg-blue-100 text-blue-800',
  'doctor': 'bg-green-100 text-green-800'
};

const CustomersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    customer_type: 'customer' as CustomerType,
    source: 'manual',
    notes: ''
  });
  const { toast } = useToast();

  // Fetch customers from Supabase
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setCustomers(data || []);
      setFilteredCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch customers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(customer => 
        customer.name.toLowerCase().includes(term.toLowerCase()) ||
        customer.email.toLowerCase().includes(term.toLowerCase()) ||
        customer.phone.includes(term) ||
        customer.customer_id.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  };
  
  const handleViewCustomer = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    setSelectedCustomer(customer || null);
  };

  const handleAddCustomer = async () => {
    try {
      const insertData = {
        customer_id: '', // This will be overwritten by the database trigger
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone,
        address: newCustomer.address || null,
        city: newCustomer.city || null,
        state: newCustomer.state || null,
        pincode: newCustomer.pincode || null,
        customer_type: newCustomer.customer_type,
        source: newCustomer.source,
        notes: newCustomer.notes || null
      };

      const { data, error } = await supabase
        .from('customers')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Customer Added",
        description: `New ${newCustomer.customer_type} has been added successfully with ID: ${data.customer_id}`,
      });
      
      setIsAddDialogOpen(false);
      setNewCustomer({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        customer_type: 'customer',
        source: 'manual',
        notes: ''
      });
      
      // Refresh the customers list
      fetchCustomers();
    } catch (error) {
      console.error('Error adding customer:', error);
      toast({
        title: "Error",
        description: "Failed to add customer. Please check the details and try again.",
        variant: "destructive",
      });
    }
  };

  const handleImportCustomers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Importing file:', file.name);
      toast({
        title: "Import Started",
        description: "Customer import is being processed.",
      });
      setIsImportDialogOpen(false);
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customerId);

      if (error) {
        throw error;
      }

      toast({
        title: "Customer Deleted",
        description: "Customer has been deleted successfully.",
      });
      
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast({
        title: "Error",
        description: "Failed to delete customer. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading customers...</div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">Manage your customer base and view customer details</p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import Customers
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Customers</DialogTitle>
                <DialogDescription>
                  Upload a CSV or Excel file with customer data
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customerFile">Select File</Label>
                  <Input 
                    id="customerFile"
                    type="file" 
                    accept=".csv,.xlsx,.xls"
                    onChange={handleImportCustomers}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Supported formats: CSV, Excel (.xlsx, .xls)</p>
                  <p>Required columns: Name, Email, Phone, Customer Type</p>
                  <p>Optional columns: Address, City, State, Pincode, Source</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>
                  Create a new customer profile manually. Customer ID will be auto-generated.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Full Name *</Label>
                  <Input 
                    id="customerName"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Email *</Label>
                  <Input 
                    id="customerEmail"
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerPhone">Phone *</Label>
                  <Input 
                    id="customerPhone"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerType">Customer Type *</Label>
                  <Select value={newCustomer.customer_type} onValueChange={(value: CustomerType) => setNewCustomer({...newCustomer, customer_type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="customerAddress">Address</Label>
                  <Input 
                    id="customerAddress"
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                    placeholder="Enter street address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerCity">City</Label>
                  <Input 
                    id="customerCity"
                    value={newCustomer.city}
                    onChange={(e) => setNewCustomer({...newCustomer, city: e.target.value})}
                    placeholder="Enter city"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerState">State</Label>
                  <Input 
                    id="customerState"
                    value={newCustomer.state}
                    onChange={(e) => setNewCustomer({...newCustomer, state: e.target.value})}
                    placeholder="Enter state"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerPincode">Pincode</Label>
                  <Input 
                    id="customerPincode"
                    value={newCustomer.pincode}
                    onChange={(e) => setNewCustomer({...newCustomer, pincode: e.target.value})}
                    placeholder="Enter pincode"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerSource">Source</Label>
                  <Select value={newCustomer.source} onValueChange={(value) => setNewCustomer({...newCustomer, source: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="signup">Signup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="customerNotes">Notes</Label>
                  <Textarea 
                    id="customerNotes"
                    value={newCustomer.notes}
                    onChange={(e) => setNewCustomer({...newCustomer, notes: e.target.value})}
                    placeholder="Any additional notes about the customer"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddCustomer}>Add Customer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
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
              <TableHead>Phone</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.customer_id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  {customer.city && customer.state ? `${customer.city}, ${customer.state}` : 'N/A'}
                </TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    categoryColors[customer.customer_type] || 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.customer_type === 'doctor' ? 'Doctor' : 'Customer'}
                  </span>
                </TableCell>
                <TableCell className="capitalize">{customer.source || 'manual'}</TableCell>
                <TableCell>{customer.total_orders || 0}</TableCell>
                <TableCell>₹{(customer.total_spent || 0).toFixed(2)}</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {customer.status || 'active'}
                  </span>
                </TableCell>
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
                                  categoryColors[selectedCustomer.customer_type] || 'bg-gray-100 text-gray-800'
                                }`}>
                                  {selectedCustomer.customer_type === 'doctor' ? 'Doctor' : 'Customer'} - {selectedCustomer.customer_id}
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
                                  {(selectedCustomer.city || selectedCustomer.state) && (
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Location:</span>
                                      <span>{selectedCustomer.city && selectedCustomer.state ? `${selectedCustomer.city}, ${selectedCustomer.state}` : 'N/A'}</span>
                                    </div>
                                  )}
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Source:</span>
                                    <span className="capitalize">{selectedCustomer.source || 'manual'}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-muted rounded-lg p-4">
                                <h4 className="font-medium mb-2">Order Statistics</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-white rounded-md p-3 text-center">
                                    <p className="text-muted-foreground text-xs">Total Orders</p>
                                    <p className="text-2xl font-bold">{selectedCustomer.total_orders || 0}</p>
                                  </div>
                                  <div className="bg-white rounded-md p-3 text-center">
                                    <p className="text-muted-foreground text-xs">Total Spent</p>
                                    <p className="text-2xl font-bold">₹{(selectedCustomer.total_spent || 0).toFixed(2)}</p>
                                  </div>
                                </div>
                                {selectedCustomer.last_order_date && (
                                  <div className="mt-2">
                                    <p className="text-sm">
                                      <span className="text-muted-foreground">Last Order Date:</span>{' '}
                                      <span>{selectedCustomer.last_order_date}</span>
                                    </p>
                                  </div>
                                )}
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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteCustomer(customer.id)}
                    >
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
