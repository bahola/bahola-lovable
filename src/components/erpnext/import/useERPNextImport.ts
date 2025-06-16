
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  fetchERPNextItems, 
  importProductsFromERPNext, 
  ProductImportConfig,
  ImportResult
} from '@/services/erpnext/productService';
import { ERPNextItem } from '@/types/erpnext';
import { getERPNextConfig } from '@/services/erpnext/erpnextService';

export const useERPNextImport = () => {
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

  return {
    items,
    selectedItems,
    isLoading,
    isImporting,
    importProgress,
    importResult,
    showPreview,
    isConnected,
    config,
    setConfig,
    setShowPreview,
    handleFetchItems,
    handleSelectAll,
    handleSelectItem,
    handleImport
  };
};
