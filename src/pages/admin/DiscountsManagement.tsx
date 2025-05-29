
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Tag, Calendar, Percent, Users, Package, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Sample discounts data with more comprehensive fields
const sampleDiscounts = [
  {
    id: 'DISC001',
    code: 'SUMMER25',
    name: 'Summer Special',
    type: 'percentage',
    value: 25,
    minAmount: 1500,
    maxDiscount: 500,
    customerCategory: 'All',
    products: 'Homeopathy',
    startDate: '2025-04-01',
    endDate: '2025-06-30',
    status: 'Active',
    usageLimit: 100,
    usedCount: 23,
    description: 'Get 25% off on all Homeopathy products'
  },
  {
    id: 'DISC002',
    code: 'NEWCUST20',
    name: 'New Customer Offer',
    type: 'fixed',
    value: 200,
    minAmount: 1000,
    maxDiscount: 200,
    customerCategory: 'New',
    products: 'All',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'Active',
    usageLimit: 500,
    usedCount: 156,
    description: 'Flat ₹200 off on your first order'
  },
  {
    id: 'DISC003',
    code: 'WELLNESS10',
    name: 'Wellness Week',
    type: 'percentage',
    value: 10,
    minAmount: 800,
    maxDiscount: 300,
    customerCategory: 'All',
    products: 'Wellness',
    startDate: '2025-03-15',
    endDate: '2025-05-15',
    status: 'Active',
    usageLimit: 200,
    usedCount: 45,
    description: '10% off on all wellness products'
  },
  {
    id: 'DISC004',
    code: 'BULK15',
    name: 'Bulk Order Discount',
    type: 'percentage',
    value: 15,
    minAmount: 3000,
    maxDiscount: 750,
    customerCategory: 'All',
    products: 'All',
    startDate: '2025-04-01',
    endDate: '2025-07-31',
    status: 'Active',
    usageLimit: 50,
    usedCount: 12,
    description: '15% off on orders above ₹3000'
  }
];

// Customer categories
const customerCategories = [
  { id: 'all', name: 'All Customers' },
  { id: 'new', name: 'New Customers' },
  { id: 'gold', name: 'Gold Members' },
  { id: 'silver', name: 'Silver Members' },
  { id: 'bronze', name: 'Bronze Members' }
];

// Product categories
const productCategories = [
  { id: 'all', name: 'All Products' },
  { id: 'homeopathy', name: 'Homeopathy' },
  { id: 'ayurveda', name: 'Ayurveda' },
  { id: 'wellness', name: 'Wellness' },
  { id: 'supplements', name: 'Supplements' },
  { id: 'devices', name: 'Medical Devices' }
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    type: 'percentage',
    value: '',
    minAmount: '',
    maxDiscount: '',
    customerCategory: 'all',
    productCategory: 'all',
    startDate: '',
    endDate: '',
    usageLimit: '',
    status: 'active'
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredDiscounts(sampleDiscounts);
    } else {
      const filtered = sampleDiscounts.filter(discount => 
        discount.name.toLowerCase().includes(term.toLowerCase()) ||
        discount.code.toLowerCase().includes(term.toLowerCase()) ||
        discount.description.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredDiscounts(filtered);
    }
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value === 'all') {
      setFilteredDiscounts(sampleDiscounts);
    } else {
      const filtered = sampleDiscounts.filter(discount => 
        discount.type.toLowerCase() === value ||
        discount.status.toLowerCase() === value
      );
      setFilteredDiscounts(filtered);
    }
  };

  const toggleDiscountStatus = (discountId: string) => {
    const updatedDiscounts = filteredDiscounts.map(discount => 
      discount.id === discountId 
        ? { ...discount, status: discount.status === 'Active' ? 'Inactive' : 'Active' }
        : discount
    );
    setFilteredDiscounts(updatedDiscounts);
  };

  const handleFormSubmit = () => {
    // Here you would typically submit to your backend
    console.log('Creating discount:', formData);
    setIsDialogOpen(false);
    // Reset form
    setFormData({
      code: '',
      name: '',
      description: '',
      type: 'percentage',
      value: '',
      minAmount: '',
      maxDiscount: '',
      customerCategory: 'all',
      productCategory: 'all',
      startDate: '',
      endDate: '',
      usageLimit: '',
      status: 'active'
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Promotional Discounts</h2>
          <p className="text-muted-foreground">Manage discounts and promotional offers</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Discount
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Promotional Discount</DialogTitle>
              <DialogDescription>
                Set up a new discount or promotional offer for your customers.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="conditions">Conditions</TabsTrigger>
                  <TabsTrigger value="limits">Limits & Usage</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="code">Promo Code *</Label>
                      <Input 
                        id="code"
                        placeholder="e.g. SUMMER25" 
                        value={formData.code}
                        onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Display Name *</Label>
                      <Input 
                        id="name"
                        placeholder="e.g. Summer Sale" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input 
                      id="description"
                      placeholder="Brief description of the offer" 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Discount Type *</Label>
                      <select 
                        id="type"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                      >
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed Amount (₹)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">
                        Discount Value * {formData.type === 'percentage' ? '(%)' : '(₹)'}
                      </Label>
                      <Input 
                        id="value"
                        type="number" 
                        placeholder={formData.type === 'percentage' ? 'e.g. 10' : 'e.g. 100'} 
                        min="0" 
                        max={formData.type === 'percentage' ? '100' : undefined}
                        value={formData.value}
                        onChange={(e) => setFormData({...formData, value: e.target.value})}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="conditions" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerCategory">Customer Eligibility</Label>
                    <select 
                      id="customerCategory"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      value={formData.customerCategory}
                      onChange={(e) => setFormData({...formData, customerCategory: e.target.value})}
                    >
                      {customerCategories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="productCategory">Applicable Products</Label>
                    <select 
                      id="productCategory"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      value={formData.productCategory}
                      onChange={(e) => setFormData({...formData, productCategory: e.target.value})}
                    >
                      {productCategories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minAmount">Minimum Cart Value (₹)</Label>
                      <Input 
                        id="minAmount"
                        type="number" 
                        placeholder="e.g. 1000" 
                        min="0"
                        value={formData.minAmount}
                        onChange={(e) => setFormData({...formData, minAmount: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxDiscount">Maximum Discount (₹)</Label>
                      <Input 
                        id="maxDiscount"
                        type="number" 
                        placeholder="e.g. 500" 
                        min="0"
                        value={formData.maxDiscount}
                        onChange={(e) => setFormData({...formData, maxDiscount: e.target.value})}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="limits" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input 
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date *</Label>
                      <Input 
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="usageLimit">Total Usage Limit</Label>
                    <Input 
                      id="usageLimit"
                      type="number" 
                      placeholder="Leave blank for unlimited" 
                      min="0"
                      value={formData.usageLimit}
                      onChange={(e) => setFormData({...formData, usageLimit: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select 
                      id="status"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleFormSubmit}>Create Discount</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Filter Tabs and Search */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="percentage">Percentage</TabsTrigger>
            <TabsTrigger value="fixed">Fixed Amount</TabsTrigger>
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
      
      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Discounts</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sampleDiscounts.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {sampleDiscounts.filter(d => d.status === 'Active').length} active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sampleDiscounts.reduce((sum, d) => sum + d.usedCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all discounts
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Discount</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(sampleDiscounts.reduce((sum, d) => sum + (d.type === 'percentage' ? d.value : 0), 0) / sampleDiscounts.filter(d => d.type === 'percentage').length)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              For percentage discounts
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">
              Within 7 days
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Discounts Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDiscounts.map((discount) => (
              <TableRow key={discount.id}>
                <TableCell className="font-mono font-medium">{discount.code}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{discount.name}</div>
                    <div className="text-xs text-muted-foreground">{discount.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {discount.type === 'percentage' ? 'Percentage' : 'Fixed Amount'}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {discount.type === 'percentage' ? `${discount.value}%` : `₹${discount.value}`}
                  {discount.minAmount > 0 && <span className="block text-xs text-muted-foreground">Min ₹{discount.minAmount}</span>}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{discount.usedCount}/{discount.usageLimit}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(discount.usedCount / discount.usageLimit) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs">
                    {discount.startDate} to {discount.endDate}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[discount.status] || 'bg-gray-100 text-gray-800'
                    }`}>
                      {discount.status}
                    </span>
                    <Switch 
                      checked={discount.status === 'Active'}
                      onCheckedChange={() => toggleDiscountStatus(discount.id)}
                      size="sm"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
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
