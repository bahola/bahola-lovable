
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface Product {
  id: number;
  name: string;
  category: string;
  sales: number;
  growth: number;
}

interface TopSellingProductsTableProps {
  products: Product[];
}

const TopSellingProductsTable = ({ products }: TopSellingProductsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>Products generating the highest revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Sales</TableHead>
                <TableHead className="text-right">Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">₹{product.sales.toLocaleString()}</TableCell>
                  <TableCell className={`text-right ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <span className="flex items-center justify-end">
                      {product.growth >= 0 ? (
                        <>
                          +{product.growth}% <ArrowUpRight className="ml-1 h-3 w-3" />
                        </>
                      ) : (
                        <>
                          {product.growth}% <ArrowDownRight className="ml-1 h-3 w-3" />
                        </>
                      )}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSellingProductsTable;
