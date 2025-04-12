
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Upload, 
  Edit, 
  Trash2 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Sample data
const sampleProducts = [
  {
    id: 'PRD001',
    name: 'Arnica Montana',
    type: 'variable',
    hsnCode: '30049011',
    price: 185,
    stock: 96,
    variations: 6
  },
  {
    id: 'PRD002',
    name: 'Bryonia Alba',
    type: 'simple',
    hsnCode: '30049011',
    price: 175,
    stock: 45,
    variations: 0
  },
  {
    id: 'PRD003',
    name: 'Belladonna',
    type: 'variable',
    hsnCode: '30049011',
    price: 195,
    stock: 72,
    variations: 4
  },
  {
    id: 'PRD004',
    name: 'Nux Vomica',
    type: 'variable',
    hsnCode: '30049011',
    price: 205,
    stock: 63,
    variations: 5
  },
  {
    id: 'PRD005',
    name: 'Pulsatilla',
    type: 'simple',
    hsnCode: '30049011',
    price: 170,
    stock: 38,
    variations: 0
  },
];

const ProductsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredProducts(sampleProducts);
    } else {
      const filtered = sampleProducts.filter(product => 
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.hsnCode.includes(term) ||
        product.id.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Add New Product</SheetTitle>
                <SheetDescription>Create a new product in your inventory.</SheetDescription>
              </SheetHeader>
              <div className="py-4">
                {/* Form would go here - simplified for demo */}
                <p className="text-sm text-muted-foreground mb-4">Complete the form below to add a new product.</p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Product Name</label>
                    <Input placeholder="Enter product name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Product Type</label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <option value="simple">Simple</option>
                        <option value="variable">Variable</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">HSN Code</label>
                      <Input placeholder="Enter HSN code" />
                    </div>
                  </div>
                  {/* More fields would be added here */}
                  <Button className="w-full mt-4">Save Product</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Products</DialogTitle>
                <DialogDescription>
                  Upload an Excel file to import multiple products at once.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="flex justify-center mb-4">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </div>
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">Drag & drop your file here</p>
                  <p className="text-xs text-muted-foreground">or</p>
                  <Button variant="outline" size="sm" className="mt-2">Browse Files</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search products..." 
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
      
      {/* Products Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>HSN Code</TableHead>
              <TableHead>Base Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Variations</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    product.type === 'variable' 
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {product.type}
                  </span>
                </TableCell>
                <TableCell>{product.hsnCode}</TableCell>
                <TableCell>₹{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.variations}</TableCell>
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

export default ProductsManagement;
