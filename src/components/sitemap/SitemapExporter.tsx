
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import { sitemapUrls } from '@/utils/sitemapGenerator';

export const SitemapExporter: React.FC = () => {
  const exportToExcel = () => {
    // Prepare data for Excel export
    const excelData = sitemapUrls.map((url, index) => ({
      'S.No': index + 1,
      'URL': url.url,
      'Full URL': `https://bahola-labs.lovable.app${url.url}`,
      'Change Frequency': url.changefreq || 'weekly',
      'Priority': url.priority || 0.5,
      'Last Modified': url.lastmod || 'Not specified',
      'Category': getCategoryFromUrl(url.url)
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const colWidths = [
      { wch: 8 },   // S.No
      { wch: 50 },  // URL
      { wch: 60 },  // Full URL
      { wch: 15 },  // Change Frequency
      { wch: 10 },  // Priority
      { wch: 15 },  // Last Modified
      { wch: 20 }   // Category
    ];
    ws['!cols'] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sitemap URLs');

    // Generate and download the file
    const fileName = `bahola-labs-sitemap-${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const getCategoryFromUrl = (url: string): string => {
    if (url === '/') return 'Home';
    if (url.startsWith('/category/')) return 'Product Category';
    if (url.startsWith('/diseases-conditions/')) return 'Health Information';
    if (url.startsWith('/help/')) return 'Help Center';
    if (url.includes('allergies')) return 'Allergies';
    if (url.includes('cancer')) return 'Cancer Support';
    if (url.includes('heart')) return 'Heart Health';
    if (url.includes('child')) return 'Child Care';
    if (url.includes('ent')) return 'ENT Care';
    if (url.includes('eye')) return 'Eye Care';
    if (url.includes('gut')) return 'Gut Health';
    if (url.includes('women') || url.includes('reproductive')) return 'Womens Health';
    if (url.includes('hair')) return 'Hair Care';
    if (url.includes('immune')) return 'Immune Support';
    if (url.includes('infection')) return 'Infection Care';
    if (url.includes('lifestyle')) return 'Lifestyle';
    if (url.includes('muscle') || url.includes('joint')) return 'Muscle & Joint';
    if (url.includes('mental')) return 'Mental Health';
    if (url.includes('nutritive')) return 'Nutrition';
    if (url.includes('pain')) return 'Pain Care';
    if (url.includes('respiratory')) return 'Respiratory Care';
    if (url.includes('skin')) return 'Skin Care';
    if (url.includes('tooth') || url.includes('dental')) return 'Dental Care';
    if (url.includes('urology') || url.includes('urinary')) return 'Urinary Care';
    return 'General';
  };

  return (
    <Button onClick={exportToExcel} className="flex items-center gap-2">
      <Download size={16} />
      Export as Excel
    </Button>
  );
};
