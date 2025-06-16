import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  importProductsFromERPNext, 
  ProductImportConfig,
  ImportResult,
  CategoryMappingRule,
  ImportPreviewItem
} from '@/services/erpnext/types';
import { ERPNextItem } from '@/types/erpnext';
import { erpnextAPI } from '@/services/erpnext/api';
import { applyCategoryMappingRules } from '@/services/erpnext/mapping';

export const useERPNextImport = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<ImportPreviewItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showCategoryMapping, setShowCategoryMapping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  
  // Import configuration with mapping rules
  const [config, setConfig] = useState<ProductImportConfig>({
    updateExisting: true,
    createCategories: true,
    importDisabled: false,
    mappingRules: [],
  });

  // Check if credentials are configured
  useEffect(() => {
    setIsConnected(erpnextAPI.isConfigured());
  }, [credentials]);

  const handleCredentialsUpdate = (username: string, password: string) => {
    setCredentials({ username, password });
    erpnextAPI.updateCredentials(username, password);
    setIsConnected(erpnextAPI.isConfigured());
  };

  const handleFetchItems = async () => {
    if (!isConnected) {
      toast({
        title: "Credentials required",
        description: "Please enter your ERPNext username and password first.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Fetching ERPNext items from Drops and Specialties item groups...');
      
      // Build filters - fetch both Drops and Specialties
      const filters = config.importDisabled ? {} : { disabled: 0 };
      
      const result = await erpnextAPI.fetchItems(filters);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch items');
      }
      
      // Convert to ImportPreviewItem format and apply initial mapping
      const previewItems: ImportPreviewItem[] = await Promise.all(
        (result.data || []).map(async (item) => {
          // Apply mapping rules including health condition analysis
          const mappingResult = await applyCategoryMappingRules(item, config.mappingRules || [], []);
          
          return {
            ...item,
            proposedCategoryId: mappingResult.categoryId,
            proposedSubcategoryId: mappingResult.subcategoryId,
            proposedCategoryName: undefined,
            proposedSubcategoryName: undefined,
            mappingRule: mappingResult.ruleName,
            suggestedSubcategories: mappingResult.suggestedSubcategories
          };
        })
      );
      
      setItems(previewItems);
      setSelectedItems(new Set(previewItems.map(item => item.item_code)));
      setShowPreview(true);
      
      toast({
        title: "Items loaded",
        description: `Successfully loaded ${previewItems.length} items with intelligent health condition mapping.`,
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

  const handleCategoryAssignmentChange = (itemCode: string, categoryId: string, subcategoryId?: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.item_code === itemCode 
          ? { 
              ...item, 
              proposedCategoryId: categoryId,
              proposedSubcategoryId: subcategoryId,
              mappingRule: 'Manual Assignment'
            }
          : item
      )
    );
  };

  const handleMappingRulesChange = (rules: CategoryMappingRule[]) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      mappingRules: rules
    }));
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
      
      // Simulate progress updates
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
    showCategoryMapping,
    isConnected,
    credentials,
    config,
    setConfig,
    setShowPreview,
    setShowCategoryMapping,
    handleCredentialsUpdate,
    handleFetchItems,
    handleSelectAll,
    handleSelectItem,
    handleCategoryAssignmentChange,
    handleMappingRulesChange,
    handleImport
  };
};
