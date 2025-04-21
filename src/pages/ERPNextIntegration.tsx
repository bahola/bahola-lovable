
import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/PageLayout';
import ERPNextConfig from '@/components/erpnext/ERPNextConfig';
import { 
  getERPNextConfig,
  getDocTypes,
  getDocList
} from '@/services/erpnext/erpnextService';
import { ERPNextItem } from '@/types/erpnext';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

const ERPNextIntegration = () => {
  const { toast } = useToast();
  const [isConfigured, setIsConfigured] = useState(false);
  const [activeTab, setActiveTab] = useState("config");
  const [docTypes, setDocTypes] = useState<string[]>([]);
  const [selectedDocType, setSelectedDocType] = useState<string>('Item');
  const [items, setItems] = useState<ERPNextItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Check if ERPNext is configured
  useEffect(() => {
    const config = getERPNextConfig();
    setIsConfigured(!!config);
    
    if (config) {
      setActiveTab("data");
      loadDocTypes();
    }
  }, []);

  const loadDocTypes = async () => {
    try {
      setIsLoading(true);
      const types = await getDocTypes();
      setDocTypes(types);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Failed to load DocTypes",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleFetchItems = async () => {
    try {
      setIsLoading(true);
      const data = await getDocList<ERPNextItem>(selectedDocType, [
        'name', 'item_code', 'item_name', 'item_group', 'description', 'stock_uom', 'standard_rate'
      ]);
      setItems(data);
      toast({
        title: "Data loaded",
        description: `Successfully loaded ${data.length} ${selectedDocType} records`,
      });
      setIsLoading(false);
    } catch (error) {
      toast({
        title: `Failed to load ${selectedDocType}`,
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <PageLayout 
      title="ERPNext Integration" 
      description="Connect and manage your ERPNext data"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="config">Configuration</TabsTrigger>
          {isConfigured && <TabsTrigger value="data">Data Explorer</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="config">
          <ERPNextConfig />
          
          {isConfigured && (
            <div className="mt-6 text-center">
              <Button onClick={() => setActiveTab("data")}>
                Go to Data Explorer
              </Button>
            </div>
          )}
        </TabsContent>
        
        {isConfigured && (
          <TabsContent value="data">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-64">
                    <Select 
                      value={selectedDocType} 
                      onValueChange={setSelectedDocType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select DocType" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Item">Items</SelectItem>
                        <SelectItem value="Customer">Customers</SelectItem>
                        <SelectItem value="Sales Order">Sales Orders</SelectItem>
                        <SelectItem value="Sales Invoice">Invoices</SelectItem>
                        {docTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleFetchItems} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      'Fetch Data'
                    )}
                  </Button>
                </div>
                
                {items.length > 0 && (
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {Object.keys(items[0]).filter(key => 
                            !key.startsWith('_') && 
                            key !== 'docstatus' && 
                            key !== 'owner' &&
                            key !== 'modified' &&
                            key !== 'modified_by' &&
                            key !== 'creation'
                          ).map(header => (
                            <TableHead key={header}>{header}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item, i) => (
                          <TableRow key={i}>
                            {Object.entries(item).filter(([key]) => 
                              !key.startsWith('_') && 
                              key !== 'docstatus' && 
                              key !== 'owner' &&
                              key !== 'modified' &&
                              key !== 'modified_by' &&
                              key !== 'creation'
                            ).map(([key, value]) => (
                              <TableCell key={key}>
                                {value?.toString() || '-'}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </PageLayout>
  );
};

export default ERPNextIntegration;
