
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductImportConfig } from '@/services/erpnext/types';
import { supabase } from '@/integrations/supabase/client';

interface ImportConfigFormProps {
  config: ProductImportConfig;
  onConfigChange: (config: ProductImportConfig) => void;
}

const ImportConfigForm: React.FC<ImportConfigFormProps> = ({ config, onConfigChange }) => {
  const [categories, setCategories] = useState<Array<{id: string, name: string}>>([]);
  const [subcategories, setSubcategories] = useState<Array<{id: string, name: string, category_id: string}>>([]);

  React.useEffect(() => {
    fetchCategoriesAndSubcategories();
  }, []);

  const fetchCategoriesAndSubcategories = async () => {
    try {
      const { data: categoriesData } = await supabase
        .from('product_categories')
        .select('id, name')
        .eq('type', 'category');

      const { data: subcategoriesData } = await supabase
        .from('product_subcategories')
        .select('id, name, category_id');

      setCategories(categoriesData || []);
      setSubcategories(subcategoriesData || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleConfigUpdate = (key: keyof ProductImportConfig, value: any) => {
    onConfigChange({ ...config, [key]: value });
  };

  const availableSubcategories = subcategories.filter(sub => 
    sub.category_id === config.defaultCategoryId
  );

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Import Configuration</h3>
      
      {/* Basic Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="updateExisting" 
            checked={config.updateExisting}
            onCheckedChange={(checked) => handleConfigUpdate('updateExisting', !!checked)}
          />
          <Label htmlFor="updateExisting">Update existing products</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="createCategories" 
            checked={config.createCategories}
            onCheckedChange={(checked) => handleConfigUpdate('createCategories', !!checked)}
          />
          <Label htmlFor="createCategories">Create new categories</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="importDisabled" 
            checked={config.importDisabled}
            onCheckedChange={(checked) => handleConfigUpdate('importDisabled', !!checked)}
          />
          <Label htmlFor="importDisabled">Include disabled items</Label>
        </div>
      </div>

      {/* Default Category Assignment */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Default Category Assignment</h4>
        <p className="text-xs text-muted-foreground">
          Items that don't match any mapping rules will be assigned to these defaults
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Default Category</Label>
            <Select
              value={config.defaultCategoryId || ''}
              onValueChange={(value) => handleConfigUpdate('defaultCategoryId', value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select default category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No default</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Default Subcategory</Label>
            <Select
              value={config.defaultSubcategoryId || ''}
              onValueChange={(value) => handleConfigUpdate('defaultSubcategoryId', value || undefined)}
              disabled={!config.defaultCategoryId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select default subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Auto-assign by name</SelectItem>
                {availableSubcategories.map((subcategory) => (
                  <SelectItem key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportConfigForm;
