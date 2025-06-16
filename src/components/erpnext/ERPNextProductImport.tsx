
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  RefreshCw, 
  AlertCircle, 
  Package, 
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';
import ImportConfigForm from './import/ImportConfigForm';
import ItemsPreviewTable from './import/ItemsPreviewTable';
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
    isConnected,
    config,
    setConfig,
    setShowPreview,
    handleFetchItems,
    handleSelectAll,
    handleSelectItem,
    handleImport
  } = useERPNextImport();

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
              <ItemsPreviewTable
                items={items}
                selectedItems={selectedItems}
                onSelectAll={handleSelectAll}
                onSelectItem={handleSelectItem}
              />

              {/* Import Button */}
              <ImportProgress
                isImporting={isImporting}
                importProgress={importProgress}
                selectedItemsCount={selectedItems.size}
                onImport={handleImport}
              />
            </div>
          )}

          {/* Import Results */}
          {importResult && (
            <ImportResultAlert result={importResult} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ERPNextProductImport;
