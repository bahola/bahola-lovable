import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Tag, Calendar, Percent, Users, Package } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample discounts data
const sampleDiscounts = [
  {
    id: 'DISC001',
    name: 'Summer Sale',
    type: 'Cart Value',
    value: 15,
    minAmount: 2000,
    customerCategory: 'All',
    products: 'All',
    startDate: '2025-04-01',
    endDate: '2025-05-31',
    status: 'Active'
  },
  {
    id: 'DISC002',
    name: 'Gold Customer Discount',
    type: 'Customer Category',
    value: 10,
    minAmount: 0,
    customerCategory: 'Gold',
    products: 'All',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'Active'
  },
  {
    id: 'DISC003',
    name: 'Homeopathy Products',
    type: 'Product Category',
    value: 8,
    minAmount: 0,
    customerCategory: 'All',
    products: 'Homeopathy',
    startDate: '2025-03-15',
    endDate: '2025-06-15',
    status: 'Active'
  },
  {
    id: 'DISC004',
    name: 'New Customer Offer',
    type: 'Customer Category',
    value: 20,
    minAmount: 1000,
    customerCategory: 'New',
    products: 'All',
    startDate: '2025-04-01',
    endDate: '2025-04-30',
    status: 'Active'
  },
  {
    id: 'DISC005',
    name: 'Winter Special',
    type: 'Cart Value',
    value: 12,
    minAmount: 1500,
    customerCategory: 'All',
    products: 'All',
    startDate: '2024-12-01',
    endDate: '2025-02-28',
    status: 'Inactive'
  }
];

// Customer categories
const customerCategories = [
  { id: 'all', name: 'All Customers' },
  { id: 'gold', name: 'Gold' },
  { id: 'silver', name: 'Silver' },
  { id: 'bronze', name: 'Bronze' },
  { id: 'new', name: 'New Customers' }
];

// Product categories
const productCategories = [
  { id: 'all', name: 'All Products' },
  { id: 'homeopathy', name: 'Homeopathy' },
  { id: 'ayurveda', name: 'Ayurveda' },
  { id: 'supplements', name: 'Supplements' },
  { id: 'devices', name: 'Devices' }
];

const statusColors = {
  'Active': 'bg-green-100 text-green-800',
  'Inactive': 'bg-gray-100 text-gray-800',
  'Scheduled': 'bg-blue-100 text-blue-800',
  'Expired': 'bg-red-100 text-red-800'
};

const DiscountsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDiscounts, setFilteredDiscounts] = useState(sampleDiscounts);
  const [activeTab, setActiveTab] = useState('all');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredDiscounts(sampleDiscounts);
    } else {
      const filtered = sampleDiscounts.filter(discount => 
        discount.name.toLowerCase().includes(term.toLowerCase()) ||
        discount.id.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredDiscounts(filtered);
    }
  };
  
  const handleTabChange = (value) => {
    setActiveTab(value);
    
    if (value === 'all') {
      setFilteredDiscounts(sampleDiscounts);
    } else {
      const filtered = sampleDiscounts.filter(discount => 
        discount.type.toLowerCase().replace(' ', '-') === value ||
        discount.status.toLowerCase() === value
      );
      setFilteredDiscounts(filtered);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Discounts</h2>
          <p className="text-muted-foreground">Manage discounts and promotional offers</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Discount
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Discount</DialogTitle>
              <DialogDescription>
                Set up a new discount or promotional offer for your customers.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="conditions">Conditions</TabsTrigger>
                  <TabsTrigger value="limits">Limits</TabsTrigger>
                </TabsList>
                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Discount Name</label>
                    <Input placeholder="e.g. Summer Sale" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Discount Type</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      <option value="cart-value">Cart Value Discount</option>
                      <option value="customer-category">Customer Category Discount</option>
                      <option value="product-category">Product Category Discount</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Discount Value (%)</label>
                    <Input type="number" placeholder="e.g. 10" min="0" max="100" />
                  </div>
                </TabsContent>
                <TabsContent value="conditions" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Applicable to Customer Categories</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      {customerCategories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Applicable to Product Categories</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      {productCategories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Minimum Cart Value</label>
                    <Input type="number" placeholder="e.g. 1000" min="0" />
                  </div>
                </TabsContent>
                <TabsContent value="limits" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Date</label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">End Date</label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Usage Limit Per Customer</label>
                    <Input type="number" placeholder="Leave blank for unlimited" min="0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Create Discount</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Filter Tabs and Search */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="cart-value">Cart Value</TabsTrigger>
            <TabsTrigger value="customer-category">Customer</TabsTrigger>
            <TabsTrigger value="product-category">Product</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search discounts..." 
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      {/* Discount Summary Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cart Value Discounts</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on order total amount
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customer Discounts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on customer category
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Product Discounts</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on product category
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Discounts Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Eligibility</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDiscounts.map((discount) => (
              <TableRow key={discount.id}>
                <TableCell className="font-medium">{discount.id}</TableCell>
                <TableCell>{discount.name}</TableCell>
                <TableCell>{discount.type}</TableCell>
                <TableCell>{discount.value}%</TableCell>
                <TableCell>
                  {discount.customerCategory === 'All' ? 'All Customers' : discount.customerCategory}
                  {discount.minAmount > 0 && <span className="block text-xs text-muted-foreground">Min ₹{discount.minAmount}</span>}
                </TableCell>
                <TableCell>
                  <span className="text-xs">
                    {discount.startDate} to {discount.endDate}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[discount.status] || 'bg-gray-100 text-gray-800'
                  }`}>
                    {discount.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
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

export default DiscountsManagement;
