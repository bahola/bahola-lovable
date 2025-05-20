
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ProductListItem } from "@/data/sampleProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from 'react-router-dom';

interface ProductListProps {
  products: ProductListItem[];
  isLoading?: boolean;
  onDelete?: (productId: string) => void;
}

const ProductList = ({ products, isLoading = false, onDelete }: ProductListProps) => {
  const navigate = useNavigate();
  
  const handleEdit = (productId: string) => {
    navigate(`/admin/products/edit/${productId}`);
  };
  
  const handleDelete = (productId: string) => {
    if (onDelete) {
      onDelete(productId);
    }
  };

  // Show skeletons while loading
  if (isLoading) {
    return (
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
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }

  // Show empty state if no products
  if (products.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No products found. Add your first product to get started.</p>
      </Card>
    );
  }

  return (
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
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id.substring(0, 8)}...</TableCell>
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
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(product.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ProductList;
