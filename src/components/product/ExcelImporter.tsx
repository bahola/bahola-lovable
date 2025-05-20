
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import { toast } from '@/hooks/use-toast';
import { ExcelImporterProps } from './excel-import/types';
import { processExcelData } from './excel-import/dataProcessor';
import { importProductsToSupabase } from './excel-import/supabaseImporter';

export const ExcelImporter: React.FC<ExcelImporterProps> = ({ onImportSuccess, onImportError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    setIsLoading(true);
    
    try {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          const data = event.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
          
          console.log('Raw Excel data:', jsonData);
          
          if (jsonData.length === 0) {
            throw new Error('Excel file appears to be empty or has no valid data.');
          }
          
          // Process the data
          const processedData = await processExcelData(jsonData);
          
          // Import to Supabase
          const importedProducts = await importProductsToSupabase(processedData);
          
          setIsLoading(false);
          toast({
            title: "Import successful",
            description: `${importedProducts.length} products imported to the database.`
          });
          onImportSuccess(importedProducts);
        } catch (error) {
          setIsLoading(false);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          onImportError(errorMessage);
          toast({
            title: "Import failed",
            description: errorMessage,
            variant: "destructive"
          });
        }
      };
      
      reader.onerror = () => {
        setIsLoading(false);
        onImportError('Failed to read the file.');
        toast({
          title: "Import failed",
          description: "Failed to read the file.",
          variant: "destructive"
        });
      };
      
      reader.readAsBinaryString(file);
    } catch (error) {
      setIsLoading(false);
      onImportError('Failed to process the file.');
      toast({
        title: "Import failed",
        description: "Failed to process the file.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" className="relative" disabled={isLoading}>
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            disabled={isLoading}
          />
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Upload className="h-4 w-4 mr-2" />
          )}
          {isLoading ? 'Processing...' : 'Select Excel File'}
        </Button>
        
        {fileName && !isLoading && (
          <div className="flex items-center text-sm text-muted-foreground">
            <FileText className="h-4 w-4 mr-1" />
            {fileName}
          </div>
        )}
      </div>
      
      <div className="text-xs text-muted-foreground">
        Supported formats: .xlsx, .xls
      </div>
    </div>
  );
};
