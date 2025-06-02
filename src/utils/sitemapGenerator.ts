
export interface SitemapUrl {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (urls: SitemapUrl[]): string => {
  const baseUrl = 'https://bahola-labs.lovable.app';
  
  const urlEntries = urls.map(({ url, lastmod, changefreq = 'weekly', priority = 0.5 }) => `
  <url>
    <loc>${baseUrl}${url}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

export const sitemapUrls: SitemapUrl[] = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/products', changefreq: 'daily', priority: 0.9 },
  { url: '/health-concerns', changefreq: 'weekly', priority: 0.9 },
  { url: '/consultation', changefreq: 'weekly', priority: 0.8 },
  { url: '/homeopathy', changefreq: 'monthly', priority: 0.7 },
  { url: '/help-center', changefreq: 'weekly', priority: 0.6 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  
  // Health Concerns
  { url: '/concern/anxiety-stress', changefreq: 'weekly', priority: 0.8 },
  { url: '/concern/insomnia-sleep-disorders', changefreq: 'weekly', priority: 0.8 },
  { url: '/concern/digestive-issues', changefreq: 'weekly', priority: 0.8 },
  { url: '/concern/allergies-hay-fever', changefreq: 'weekly', priority: 0.8 },
  { url: '/concern/skin-conditions', changefreq: 'weekly', priority: 0.8 },
  { url: '/concern/cold-flu', changefreq: 'weekly', priority: 0.8 },
  { url: '/concern/joint-pain-arthritis', changefreq: 'weekly', priority: 0.8 },
  { url: '/concern/womens-health', changefreq: 'weekly', priority: 0.8 },
  { url: '/concern/childrens-health', changefreq: 'weekly', priority: 0.8 },
  { url: '/concern/depression-mood', changefreq: 'weekly', priority: 0.8 },
  { url: '/concern/weight-management', changefreq: 'weekly', priority: 0.8 },
  { url: '/concern/eye-problems', changefreq: 'weekly', priority: 0.8 },
  { url: '/concern/high-blood-pressure', changefreq: 'weekly', priority: 0.8 },
  { url: '/concern/diabetes-support', changefreq: 'weekly', priority: 0.8 },
  { url: '/concern/headaches-migraines', changefreq: 'weekly', priority: 0.8 },
];

// Blog integration function to share content URLs
export const addBlogBacklinks = (blogArticles: Array<{slug: string, healthConcern?: string}>) => {
  const blogBaseUrl = 'https://lovable.dev/projects/90f95490-dd0f-4544-953c-3fada8daac1b';
  
  return blogArticles.map(article => ({
    url: `/blog-redirect/${article.slug}`,
    changefreq: 'weekly' as const,
    priority: 0.6,
    canonical: `${blogBaseUrl}#${article.slug}`
  }));
};
