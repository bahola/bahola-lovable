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
  // Main pages
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/products', changefreq: 'daily', priority: 0.9 },
  { url: '/diseases-conditions', changefreq: 'weekly', priority: 0.9 },
  { url: '/consultation', changefreq: 'weekly', priority: 0.8 },
  { url: '/homeopathy', changefreq: 'monthly', priority: 0.7 },
  { url: '/help-center', changefreq: 'weekly', priority: 0.6 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  
  // Category pages - Products
  { url: '/category/allergies', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/cancer-support', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/heart-health', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/child-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/ent-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/eye-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/gut-health', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/womens-health', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/hair-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/immune-boosters', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/infection-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/lifestyle-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/muscle-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/mental-health', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/nutritive-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/pain-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/reproductive-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/respiratory-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/skin-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/tooth-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/category/urology-care', changefreq: 'weekly', priority: 0.8 },
  
  // Health Concerns - Information pages
  { url: '/diseases-conditions/gut-health', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/heart-health', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/child-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/cancer-support', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/ent-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/eye-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/hair-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/immune-boosters', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/infection-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/lifestyle-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/mental-health', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/muscle-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/nutritive-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/pain-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/reproductive-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/respiratory-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/skin-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/tooth-care', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/urology-care', changefreq: 'weekly', priority: 0.8 },
  
  // Allergy subcategories
  { url: '/diseases-conditions/allergies/seasonal-allergies-hay-fever', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/allergies/dust-allergy', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/allergies/food-allergies-milk-gluten-nuts', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/allergies/drug-allergies', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/allergies/skin-allergies-hives-eczema-urticaria', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/allergies/allergic-rhinitis', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/allergies/pet-dander-allergy', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/allergies/mold-allergy', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/allergies/latex-allergy', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/allergies/sinus-allergy', changefreq: 'weekly', priority: 0.8 },
  
  // Cancer subcategories
  { url: '/diseases-conditions/cancer/chemotherapy-side-effects-nausea-fatigue', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/cancer/radiation-skin-reactions', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/cancer/cancer-related-fatigue', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/cancer/immune-weakness-in-cancer-patients', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/cancer/loss-of-appetite', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/cancer/mouth-ulcers-from-cancer-treatment', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/cancer/lymphedema-support', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/cancer/anxiety-or-sleep-disorders-during-cancer', changefreq: 'weekly', priority: 0.8 },
  
  // Heart Health subcategories
  { url: '/diseases-conditions/heart-health/high-blood-pressure-hypertension', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/heart-health/high-cholesterol-hyperlipidemia', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/heart-health/palpitations', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/heart-health/angina-pectoris-chest-pain', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/heart-health/poor-circulation', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/heart-health/varicose-veins', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/heart-health/arrhythmias-irregular-heartbeat', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/heart-health/post-heart-attack-recovery-support', changefreq: 'weekly', priority: 0.8 },
  
  // Legacy health concern routes
  { url: '/diseases-conditions/anxiety-stress', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/insomnia-sleep-disorders', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/digestive-issues', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/allergies-hay-fever', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/headaches-migraines', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/skin-conditions', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/cold-flu', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/joint-pain-arthritis', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/childrens-health', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/depression-mood', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/weight-management', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/eye-problems', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/high-blood-pressure', changefreq: 'weekly', priority: 0.8 },
  { url: '/diseases-conditions/diabetes-support', changefreq: 'weekly', priority: 0.8 },
  
  // Help Center pages
  { url: '/help/getting-started', changefreq: 'monthly', priority: 0.6 },
  { url: '/help/potency-guide', changefreq: 'monthly', priority: 0.6 },
  { url: '/help/using-pellets', changefreq: 'monthly', priority: 0.6 },
  { url: '/help/first-aid-kit', changefreq: 'monthly', priority: 0.6 },
  { url: '/help/liquid-remedies-troubleshooting', changefreq: 'monthly', priority: 0.6 },
  { url: '/help/no-results-troubleshooting', changefreq: 'monthly', priority: 0.6 },
  { url: '/help/children-safety', changefreq: 'monthly', priority: 0.6 },
  { url: '/help/remedy-interactions', changefreq: 'monthly', priority: 0.6 },
  { url: '/help/bach-flower-selector', changefreq: 'monthly', priority: 0.6 },
  { url: '/help/seasonal-remedies', changefreq: 'monthly', priority: 0.6 },
  { url: '/help/shipping-issues', changefreq: 'monthly', priority: 0.6 },
  { url: '/help/certifications', changefreq: 'monthly', priority: 0.6 },
  
  // Other important pages
  { url: '/bach-flower-concerns', changefreq: 'weekly', priority: 0.7 },
  { url: '/store-locator', changefreq: 'monthly', priority: 0.6 },
  { url: '/faq', changefreq: 'monthly', priority: 0.6 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
  { url: '/terms-conditions', changefreq: 'yearly', priority: 0.3 },
  { url: '/return-policy', changefreq: 'yearly', priority: 0.3 },
  { url: '/shipping-info', changefreq: 'yearly', priority: 0.3 }
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
