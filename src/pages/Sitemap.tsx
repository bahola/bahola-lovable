
import React, { useEffect, useState } from 'react';
import { generateSitemap, sitemapUrls } from '@/utils/sitemapGenerator';

const Sitemap = () => {
  const [sitemap, setSitemap] = useState<string>('');

  useEffect(() => {
    const generatedSitemap = generateSitemap(sitemapUrls);
    setSitemap(generatedSitemap);
    
    // Set content type for XML
    document.title = 'Sitemap - Bahola Labs';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">XML Sitemap</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <pre className="whitespace-pre-wrap text-sm overflow-x-auto">
          {sitemap}
        </pre>
      </div>
      <div className="mt-4">
        <p className="text-gray-600">
          This sitemap is also available at: 
          <a href="/sitemap.xml" className="text-blue-600 hover:underline ml-1">
            /sitemap.xml
          </a>
        </p>
      </div>
    </div>
  );
};

export default Sitemap;
