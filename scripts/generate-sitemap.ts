import { writeFileSync } from 'fs';
import { sitemapUrls, generateSitemap } from '../src/utils/sitemapGenerator';

// Generate sitemap.xml file
const sitemapXml = generateSitemap(sitemapUrls);

// Write to public directory
writeFileSync('./public/sitemap.xml', sitemapXml, 'utf-8');

console.log('✅ Sitemap generated successfully at public/sitemap.xml');
console.log(`📊 Total URLs: ${sitemapUrls.length}`);
