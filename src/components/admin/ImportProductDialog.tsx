
import React from 'react';
import { Upload, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { TemplateDownloader } from '@/components/product/TemplateDownloader';
import { useNavigate } from 'react-router-dom';

const ImportProductDialog = () => {
  const navigate = useNavigate();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Products</DialogTitle>
          <DialogDescription>
            Upload an Excel file to import multiple products at once.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex justify-center mb-4">
            <TemplateDownloader />
          </div>
          <div className="border-2 border-dashed rounded-md p-6 text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-medium">Need to import multiple products?</p>
            <p className="text-xs text-muted-foreground mb-4">Use our dedicated import page</p>
            <Button onClick={() => navigate('/product-import')}>Go to Import Page</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportProductDialog;
