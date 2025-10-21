// Enhanced structured data schemas for different page types

export interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  rating?: number;
  reviewCount?: number;
  brand?: string;
  sku?: string;
}

export interface MedicalWebPageSchemaProps {
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}

export interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export interface FAQSchemaProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export const generateProductSchema = (props: ProductSchemaProps) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": props.name,
    "description": props.description,
    "image": props.image,
    "brand": {
      "@type": "Brand",
      "name": props.brand || "Bahola Labs"
    },
    "sku": props.sku || props.name.replace(/\s+/g, '-').toLowerCase(),
    "offers": {
      "@type": "Offer",
      "url": props.image,
      "priceCurrency": props.currency || "INR",
      "price": props.price,
      "availability": `https://schema.org/${props.availability || 'InStock'}`,
      "seller": {
        "@type": "Organization",
        "name": "Bahola Labs"
      }
    },
    ...(props.rating && props.reviewCount ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": props.rating,
        "reviewCount": props.reviewCount
      }
    } : {})
  };
};

export const generateMedicalWebPageSchema = (props: MedicalWebPageSchemaProps) => {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": props.name,
    "description": props.description,
    "url": props.url,
    "datePublished": props.datePublished || new Date().toISOString(),
    "dateModified": props.dateModified || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": props.author || "Bahola Labs Medical Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bahola Labs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bahola-labs.lovable.app/bahola-logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": props.url
    }
  };
};

export const generateBreadcrumbSchema = (props: BreadcrumbSchemaProps) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": props.items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const generateFAQSchema = (props: FAQSchemaProps) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": props.questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };
};

export const generateOrganizationSchema = () => {
  return {
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
};
