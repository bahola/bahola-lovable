
import React, { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Button } from "@/components/ui/button";
import { Upload, FileText, Download, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ExcelImporter } from '@/components/product/ExcelImporter';
import { TemplateDownloader } from '@/components/product/TemplateDownloader';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const ProductImport = () => {
  const [importedData, setImportedData] = useState<any[]>([]);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error' | 'processing'>('idle');

  const handleImportSuccess = (data: any[]) => {
    setImportedData(data);
    setImportStatus('success');
    toast({
      title: "Products imported successfully",
      description: `${data.length} products imported from Excel file.`,
    });
  };

  const handleImportError = (error: string) => {
    setImportStatus('error');
    toast({
      title: "Import failed",
      description: error,
      variant: "destructive"
    });
  };

  return (
    <PageLayout title="Product Import" description="Import products from Excel sheets">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Product Import</CardTitle>
          <CardDescription>
            Import multiple products at once using an Excel sheet. Download the template below to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="import">
            <TabsList className="mb-4">
              <TabsTrigger value="import">Import Products</TabsTrigger>
              <TabsTrigger value="guide">Import Guide</TabsTrigger>
            </TabsList>
            
            <TabsContent value="import">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="border rounded-md p-6 bg-gray-50">
                    <h3 className="text-lg font-medium mb-2">Step 1: Download Template</h3>
                    <p className="text-muted-foreground mb-4">
                      Start by downloading our Excel template which includes all required fields.
                    </p>
                    <TemplateDownloader />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border rounded-md p-6 bg-gray-50">
                    <h3 className="text-lg font-medium mb-2">Step 2: Upload Your File</h3>
                    <p className="text-muted-foreground mb-4">
                      Once you've filled in your product data, upload the Excel file here.
                    </p>
                    <ExcelImporter 
                      onImportSuccess={handleImportSuccess} 
                      onImportError={handleImportError} 
                    />
                  </div>
                </div>
              </div>
              
              {importStatus === 'success' && (
                <div className="mt-6">
                  <Alert variant="default" className="bg-green-50 border-green-200">
                    <AlertCircle className="h-4 w-4 text-green-600" />
                    <AlertTitle>Import Successful</AlertTitle>
                    <AlertDescription>
                      {importedData.length} products were successfully imported. You can now view them in your product catalog.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="mt-4 border rounded-md p-4 max-h-96 overflow-auto">
                    <h3 className="font-medium mb-2">Imported Products Preview</h3>
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-2 text-left">Name</th>
                          <th className="p-2 text-left">Type</th>
                          <th className="p-2 text-left">HSN Code</th>
                          <th className="p-2 text-left">Price</th>
                          <th className="p-2 text-left">Pack Sizes</th>
                          <th className="p-2 text-left">Potencies</th>
                        </tr>
                      </thead>
                      <tbody>
                        {importedData.slice(0, 5).map((product, index) => (
                          <tr key={index} className="border-t">
                            <td className="p-2">{product.name}</td>
                            <td className="p-2">{product.type}</td>
                            <td className="p-2">{product.hsnCode}</td>
                            <td className="p-2">₹{product.price}</td>
                            <td className="p-2">{product.packSizes?.join(', ') || '-'}</td>
                            <td className="p-2">{product.potencies?.join(', ') || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {importedData.length > 5 && (
                      <p className="text-sm text-gray-500 p-2">
                        Showing 5 of {importedData.length} products
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              {importStatus === 'error' && (
                <div className="mt-6">
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Import Failed</AlertTitle>
                    <AlertDescription>
                      There was an error importing your products. Please check your file format and try again.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="guide">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Required Fields</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>name</strong> - Product name</li>
                    <li><strong>type</strong> - Either "simple" or "variable"</li>
                    <li><strong>description</strong> - Product description</li>
                    <li><strong>hsnCode</strong> - HSN (Harmonized System Nomenclature) code</li>
                    <li><strong>price</strong> - Sale price</li>
                    <li><strong>weight</strong> - Weight in grams</li>
                    <li><strong>dimensions</strong> - Product dimensions (Length/Width/Height in cm)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Variable Products</h3>
                  <p className="mb-2">For variable products, include the following fields:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>packSizes</strong> - Comma-separated list of available pack sizes</li>
                    <li><strong>potencies</strong> - Comma-separated list of available potencies</li>
                    <li><strong>variations</strong> - Each variation should specify: potency, packSize, price, stock</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Example</h3>
                  <p>Here's an example of how to structure your Excel file:</p>
                  <div className="bg-gray-50 p-4 rounded-md text-sm">
                    <p><strong>Row 1:</strong> Arnica Montana, variable, Homeopathic remedy for bruising, 30049011, 185, 50, 5/2/2</p>
                    <p><strong>packSizes:</strong> 10g, 20g</p>
                    <p><strong>potencies:</strong> 30C, 200C, 1M</p>
                    <p><strong>variations:</strong> 30C/10g/185/24, 30C/20g/300/18, 200C/10g/195/15, 200C/20g/320/12, 1M/10g/220/10, 1M/20g/350/8</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ProductImport;
