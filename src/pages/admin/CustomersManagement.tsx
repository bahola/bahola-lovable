
import React, { useState } from 'react';
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
    category: 'Gold',
    source: 'Website',
    status: 'Active'
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
    category: 'Silver',
    source: 'Referral',
    status: 'Active'
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
    category: 'Bronze',
    source: 'Signup',
    status: 'Active'
  }
];

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
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    category: 'New',
    notes: ''
  });
  const { toast } = useToast();
  
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
    const customer = sampleCustomers.find(c => c.id === customerId);
    setSelectedCustomer(customer);
  };

  const handleAddCustomer = () => {
    // In a real app, you would add this to Supabase
    console.log('Adding customer:', newCustomer);
    toast({
      title: "Customer Added",
      description: "New customer has been added successfully.",
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
      category: 'New',
      notes: ''
    });
  };

  const handleImportCustomers = (event) => {
    const file = event.target.files[0];
    if (file) {
      // In a real app, you would process the CSV/Excel file
      console.log('Importing file:', file.name);
      toast({
        title: "Import Started",
        description: "Customer import is being processed.",
      });
      setIsImportDialogOpen(false);
    }
  };
  
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
                  <p>Required columns: Name, Email, Phone</p>
                  <p>Optional columns: Address, City, State, Pincode, Category</p>
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
                  Create a new customer profile manually
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
                  <Label htmlFor="customerCategory">Category</Label>
                  <Select value={newCustomer.category} onValueChange={(value) => setNewCustomer({...newCustomer, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Bronze">Bronze</SelectItem>
                      <SelectItem value="Silver">Silver</SelectItem>
                      <SelectItem value="Gold">Gold</SelectItem>
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
              <TableHead>Location</TableHead>
              <TableHead>Category</TableHead>
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
                <TableCell>{customer.source}</TableCell>
                <TableCell>{customer.totalOrders}</TableCell>
                <TableCell>₹{customer.totalSpent.toFixed(2)}</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {customer.status}
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
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Source:</span>
                                    <span>{selectedCustomer.source}</span>
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
