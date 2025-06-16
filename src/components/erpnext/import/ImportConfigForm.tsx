
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ProductImportConfig } from '@/services/erpnext/productService';

interface ImportConfigFormProps {
  config: ProductImportConfig;
  onConfigChange: (config: ProductImportConfig) => void;
}

const ImportConfigForm: React.FC<ImportConfigFormProps> = ({ config, onConfigChange }) => {
  const handleConfigUpdate = (key: keyof ProductImportConfig, value: boolean) => {
    onConfigChange({ ...config, [key]: value });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Import Configuration</h3>
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
    </div>
  );
};

export default ImportConfigForm;
