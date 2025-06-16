
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  RefreshCw, 
  Package, 
  Loader2,
  Eye,
  EyeOff,
  Settings
} from 'lucide-react';
import CredentialsForm from './import/CredentialsForm';
import ImportConfigForm from './import/ImportConfigForm';
import CategoryMappingManager from './import/CategoryMappingManager';
import EnhancedItemsPreviewTable from './import/EnhancedItemsPreviewTable';
import ImportProgress from './import/ImportProgress';
import ImportResultAlert from './import/ImportResultAlert';
import { useERPNextImport } from './import/useERPNextImport';

const ERPNextProductImport: React.FC = () => {
  const {
    items,
    selectedItems,
    isLoading,
    isImporting,
    importProgress,
    importResult,
    showPreview,
    showCategoryMapping,
    isConnected,
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
  } = useERPNextImport();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            ERPNext Product Import with Category Mapping
          </CardTitle>
          <CardDescription>
            Import products from your ERPNext instance and automatically assign them to website categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="setup" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="setup">Setup</TabsTrigger>
              <TabsTrigger value="mapping">Category Mapping</TabsTrigger>
              <TabsTrigger value="preview">Preview & Import</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="setup" className="space-y-4">
              {/* Credentials Form */}
              <CredentialsForm 
                onCredentialsUpdate={handleCredentialsUpdate}
                isConnected={isConnected}
              />

              {isConnected && (
                <>
                  {/* Import Configuration */}
                  <ImportConfigForm 
                    config={config}
                    onConfigChange={setConfig}
                  />

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
                      <div className="text-sm text-muted-foreground">
                        {items.length} items loaded
                      </div>
                    )}
                  </div>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="mapping" className="space-y-4">
              <CategoryMappingManager
                rules={config.mappingRules || []}
                onRulesChange={handleMappingRulesChange}
              />
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-4">
              {items.length > 0 ? (
                <div className="space-y-4">
                  <EnhancedItemsPreviewTable
                    items={items}
                    selectedItems={selectedItems}
                    mappingRules={config.mappingRules || []}
                    onSelectAll={handleSelectAll}
                    onSelectItem={handleSelectItem}
                    onCategoryAssignmentChange={handleCategoryAssignmentChange}
                  />

                  <ImportProgress
                    isImporting={isImporting}
                    importProgress={importProgress}
                    selectedItemsCount={selectedItems.size}
                    onImport={handleImport}
                  />
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No items loaded</h3>
                  <p className="text-muted-foreground mb-4">
                    Please go to the Setup tab and fetch items from ERPNext first.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="results" className="space-y-4">
              {importResult ? (
                <ImportResultAlert result={importResult} />
              ) : (
                <div className="text-center py-8">
                  <div className="text-muted-foreground mb-4">
                    Import results will appear here after you run an import.
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ERPNextProductImport;
