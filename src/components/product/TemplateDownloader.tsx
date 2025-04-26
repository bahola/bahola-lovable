
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

export const TemplateDownloader: React.FC = () => {
  const generateExcelTemplate = () => {
    // Create template data
    const templateData = [
      {
        name: 'Product Name',
        type: 'simple/variable',
        description: 'Product description',
        hsnCode: 'HSN Code',
        price: 'Sale Price',
        weight: 'Base Weight in grams',
        dimensions: 'L/W/H in cm',
        packSizes: 'Pack sizes (comma-separated, for variable products)',
        potencies: 'Potencies (comma-separated, for variable products)',
        variations: 'Variations in format: potency/packSize/price/stock/weight (comma-separated)'
      },
      {
        name: 'Arnica Montana',
        type: 'variable',
        description: 'Homeopathic remedy for bruising',
        hsnCode: '30049011',
        price: '185',
        weight: '50',
        dimensions: '5/2/2',
        packSizes: '10g, 20g',
        potencies: '30C, 200C, 1M',
        variations: '30C/10g/185/24/25, 30C/20g/300/18/45, 200C/10g/195/15/25, 200C/20g/320/12/45, 1M/10g/220/10/25, 1M/20g/350/8/45'
      },
      {
        name: 'Bryonia Alba',
        type: 'simple',
        description: 'Homeopathic remedy for dry cough',
        hsnCode: '30049011',
        price: '175',
        weight: '25',
        dimensions: '4/2/2',
        packSizes: '',
        potencies: '30C',
        variations: ''
      }
    ];
    
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // Convert JSON to worksheet
    const ws = XLSX.utils.json_to_sheet(templateData);
    
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Products Template');
    
    // Generate Excel file
    XLSX.writeFile(wb, 'bahola_products_import_template.xlsx');
  };
  
  return (
    <Button variant="default" onClick={generateExcelTemplate}>
      <Download className="h-4 w-4 mr-2" />
      Download Template
    </Button>
  );
};
