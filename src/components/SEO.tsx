import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  structuredData?: object | object[];
  noIndex?: boolean;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Bahola Labs - Premium Homeopathic Remedies & Natural Health Solutions',
  description = 'Discover premium homeopathic medicines and natural health solutions at Bahola Labs. Expert consultations, authentic remedies, and personalized treatment for optimal wellness.',
  keywords = ['homeopathy', 'homeopathic medicine', 'natural remedies', 'holistic health', 'alternative medicine', 'wellness', 'health consultation'],
  image = '/bahola-logo.png',
  url = 'https://bahola-labs.lovable.app',
  type = 'website',
  structuredData,
  noIndex = false,
  breadcrumbs
}) => {
  const fullTitle = title.includes('Bahola Labs') ? title : `${title} | Bahola Labs`;
  const fullUrl = url.startsWith('http') ? url : `https://bahola-labs.lovable.app${url}`;
  const fullImage = image.startsWith('http') ? image : `https://bahola-labs.lovable.app${image}`;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bahola Labs",
    "description": "Premium homeopathic remedies and natural health solutions",
    "url": "https://bahola-labs.lovable.app",
    "logo": "https://bahola-labs.lovable.app/bahola-logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "Customer Service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    },
    "sameAs": [
      "https://www.facebook.com/bahola-labs",
      "https://www.instagram.com/bahola-labs",
      "https://www.twitter.com/bahola-labs"
    ]
  };

  // Generate breadcrumb structured data if breadcrumbs provided
  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `https://bahola-labs.lovable.app${item.url}`
    }))
  } : null;

  // Combine all structured data
  const allStructuredData = [
    structuredData || defaultStructuredData,
    breadcrumbSchema
  ].filter(Boolean);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Bahola Labs" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="Bahola Labs" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      
      {/* Structured Data */}
      {allStructuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};
