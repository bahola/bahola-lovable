
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  Package, 
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  fetchERPNextItems, 
  importProductsFromERPNext, 
  ProductImportConfig,
  ImportResult
} from '@/services/erpnext/productService';
import { ERPNextItem } from '@/types/erpnext';
import { getERPNextConfig } from '@/services/erpnext/erpnextService';

const ERPNextProductImport: React.FC = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<ERPNextItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  // Import configuration
  const [config, setConfig] = useState<ProductImportConfig>({
    updateExisting: true,
    createCategories: true,
    importDisabled: false,
  });

  // Check ERPNext connection status
  useEffect(() => {
    const erpConfig = getERPNextConfig();
    setIsConnected(!!erpConfig);
  }, []);

  const handleFetchItems = async () => {
    if (!isConnected) {
      toast({
        title: "Not connected",
        description: "Please configure ERPNext connection first.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Fetching ERPNext items...');
      
      const filters = config.importDisabled ? undefined : [['disabled', '=', 0]];
      const fetchedItems = await fetchERPNextItems(filters);
      
      setItems(fetchedItems);
      setSelectedItems(new Set(fetchedItems.map(item => item.item_code)));
      setShowPreview(true);
      
      toast({
        title: "Items loaded",
        description: `Successfully loaded ${fetchedItems.length} items from ERPNext.`,
      });
    } catch (error) {
      console.error('Error fetching items:', error);
      toast({
        title: "Failed to load items",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(items.map(item => item.item_code)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (itemCode: string, checked: boolean) => {
    const newSelection = new Set(selectedItems);
    if (checked) {
      newSelection.add(itemCode);
    } else {
      newSelection.delete(itemCode);
    }
    setSelectedItems(newSelection);
  };

  const handleImport = async () => {
    if (selectedItems.size === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item to import.",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    setImportProgress(0);
    setImportResult(null);

    try {
      const selectedItemsData = items.filter(item => selectedItems.has(item.item_code));
      
      console.log(`Starting import of ${selectedItemsData.length} selected items...`);
      
      // Simulate progress updates (in a real implementation, you'd get this from the import function)
      const progressInterval = setInterval(() => {
        setImportProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const result = await importProductsFromERPNext(selectedItemsData, config);
      
      clearInterval(progressInterval);
      setImportProgress(100);
      setImportResult(result);

      if (result.success) {
        toast({
          title: "Import completed",
          description: `Successfully imported ${result.imported} products and updated ${result.updated} products.`,
        });
      } else {
        toast({
          title: "Import completed with errors",
          description: `${result.errors.length} errors occurred during import.`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Import error:', error);
      setImportResult({
        success: false,
        imported: 0,
        updated: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error occurred'],
        skipped: 0
      });
      
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>ERPNext Product Import</CardTitle>
          <CardDescription>
            Import products from your ERPNext instance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>ERPNext Not Connected</AlertTitle>
            <AlertDescription>
              Please configure your ERPNext connection first before importing products.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            ERPNext Product Import
          </CardTitle>
          <CardDescription>
            Import products from your ERPNext instance into the local database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Import Configuration */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Import Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="updateExisting" 
                  checked={config.updateExisting}
                  onCheckedChange={(checked) => setConfig(prev => ({ ...prev, updateExisting: !!checked }))}
                />
                <Label htmlFor="updateExisting">Update existing products</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="createCategories" 
                  checked={config.createCategories}
                  onCheckedChange={(checked) => setConfig(prev => ({ ...prev, createCategories: !!checked }))}
                />
                <Label htmlFor="createCategories">Create new categories</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="importDisabled" 
                  checked={config.importDisabled}
                  onCheckedChange={(checked) => setConfig(prev => ({ ...prev, importDisabled: !!checked }))}
                />
                <Label htmlFor="importDisabled">Include disabled items</Label>
              </div>
            </div>
          </div>

          {/* Fetch Items */}
          <div className="flex items-center gap-2">
            <Button onClick={handleFetchItems} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Loading Items...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Fetch Items from ERPNext
                </>
              )}
            </Button>
            
            {items.length > 0 && (
              <Button 
                variant="outline" 
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
            )}
          </div>

          {/* Items Preview */}
          {showPreview && items.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-sm font-medium">
                    Items from ERPNext ({items.length} total)
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="selectAll"
                      checked={selectedItems.size === items.length}
                      onCheckedChange={handleSelectAll}
                    />
                    <Label htmlFor="selectAll">Select All</Label>
                  </div>
                </div>
                
                <Badge variant="secondary">
                  {selectedItems.size} selected
                </Badge>
              </div>

              <div className="border rounded-md max-h-96 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Select</TableHead>
                      <TableHead>Item Code</TableHead>
                      <TableHead>Item Name</TableHead>
                      <TableHead>Item Group</TableHead>
                      <TableHead>HSN Code</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.slice(0, 50).map((item) => (
                      <TableRow key={item.item_code}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedItems.has(item.item_code)}
                            onCheckedChange={(checked) => handleSelectItem(item.item_code, !!checked)}
                          />
                        </TableCell>
                        <TableCell className="font-mono text-sm">{item.item_code}</TableCell>
                        <TableCell>{item.item_name}</TableCell>
                        <TableCell>{item.item_group}</TableCell>
                        <TableCell>{item.gst_hsn_code || item.hsn_code || '-'}</TableCell>
                        <TableCell>₹{item.standard_rate || 0}</TableCell>
                        <TableCell>
                          <Badge variant={item.disabled ? "destructive" : "default"}>
                            {item.disabled ? 'Disabled' : 'Active'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {items.length > 50 && (
                  <div className="p-2 text-sm text-gray-500 text-center">
                    Showing first 50 items of {items.length} total
                  </div>
                )}
              </div>

              {/* Import Button */}
              <div className="flex items-center gap-4">
                <Button 
                  onClick={handleImport} 
                  disabled={isImporting || selectedItems.size === 0}
                  className="flex items-center gap-2"
                >
                  {isImporting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Import Selected Products ({selectedItems.size})
                    </>
                  )}
                </Button>

                {isImporting && (
                  <div className="flex-1">
                    <Progress value={importProgress} className="w-full" />
                    <p className="text-sm text-gray-500 mt-1">{importProgress}% complete</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Import Results */}
          {importResult && (
            <Alert className={importResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              {importResult.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertTitle>
                {importResult.success ? "Import Completed" : "Import Failed"}
              </AlertTitle>
              <AlertDescription>
                <div className="space-y-2">
                  <div>
                    <strong>Imported:</strong> {importResult.imported} products
                  </div>
                  <div>
                    <strong>Updated:</strong> {importResult.updated} products
                  </div>
                  <div>
                    <strong>Skipped:</strong> {importResult.skipped} products
                  </div>
                  {importResult.errors.length > 0 && (
                    <div>
                      <strong>Errors:</strong>
                      <ul className="list-disc list-inside mt-1">
                        {importResult.errors.slice(0, 5).map((error, index) => (
                          <li key={index} className="text-sm">{error}</li>
                        ))}
                        {importResult.errors.length > 5 && (
                          <li className="text-sm">... and {importResult.errors.length - 5} more errors</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ERPNextProductImport;
