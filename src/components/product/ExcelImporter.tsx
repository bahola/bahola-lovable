import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2 } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ExcelImporterProps {
  onImportSuccess: (data: any[]) => void;
  onImportError: (error: string) => void;
}

export const ExcelImporter: React.FC<ExcelImporterProps> = ({ onImportSuccess, onImportError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  
  const processExcelData = (data: any[]) => {
    try {
      // Process the raw Excel data into the format we need
      const processedData = data.map(row => {
        // Basic validation
        if (!row.name || !row.type || !row.hsnCode || !row.category) {
          throw new Error('Missing required fields: name, type, category, or hsnCode');
        }
        
        // Process variable product data if applicable
        let processedRow = { ...row };
        
        if (row.type === 'variable') {
          // Convert pack sizes from string to array
          if (row.packSizes) {
            processedRow.packSizes = row.packSizes.split(',').map((size: string) => size.trim());
          }
          
          // Convert potencies from string to array
          if (row.potencies) {
            processedRow.potencies = row.potencies.split(',').map((potency: string) => potency.trim());
          }
          
          // Process variations
          if (row.variations) {
            processedRow.variations = row.variations.split(',').map((variation: string) => {
              const [potency, packSize, price, stock, weight] = variation.trim().split('/');
              return {
                potency,
                packSize,
                price: Number(price),
                stock: Number(stock),
                weight: Number(weight)
              };
            });
          }
        }
        
        return processedRow;
      });
      
      return processedData;
    } catch (error) {
      console.error('Error processing Excel data:', error);
      throw new Error('Failed to process Excel data. Please check the format.');
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    setIsLoading(true);
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Process the data
        const processedData = processExcelData(jsonData);
        
        setIsLoading(false);
        onImportSuccess(processedData);
      } catch (error) {
        setIsLoading(false);
        onImportError(error instanceof Error ? error.message : 'Unknown error');
      }
    };
    
    reader.onerror = () => {
      setIsLoading(false);
      onImportError('Failed to read the file.');
    };
    
    reader.readAsBinaryString(file);
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
