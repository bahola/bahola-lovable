
import React from 'react';
import { SEO } from '@/components/SEO';
import { ShopHeroCarousel } from '@/components/shop/ShopHeroCarousel';
import { SearchActionBar } from '@/components/SearchActionBar';
import { ConsultSection, DiscoverSection } from '@/components/features';

// Server-side compatible props interface
interface IndexOptimizedProps {
  featuredProducts?: any[];
  testimonials?: any[];
  healthConcerns?: any[];
  // Add other data that will come from getStaticProps
}

// Optimized homepage component ready for Next.js migration
const IndexOptimized: React.FC<IndexOptimizedProps> = ({
  featuredProducts = [],
  testimonials = [],
  healthConcerns = []
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bahola Labs",
    "description": "Leading provider of premium homeopathic medicines and natural health solutions with expert consultations and personalized treatment plans.",
    "url": "https://bahola-labs.lovable.app",
    "logo": "https://bahola-labs.lovable.app/bahola-logo.png",
    "foundingDate": "1982",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "Customer Service",
      "availableLanguage": ["English", "Hindi"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/bahola-labs",
      "https://www.instagram.com/bahola-labs",
      "https://www.twitter.com/bahola-labs"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Homeopathic Medicines",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Homeopathic Remedies for Anxiety & Stress"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Natural Sleep Disorder Solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Digestive Health Remedies"
          }
        }
      ]
    }
  };

  return (
    <>
      <SEO
        title="Bahola Labs - Premium Homeopathic Remedies & Natural Health Solutions"
        description="Discover premium homeopathic medicines and natural health solutions at Bahola Labs. Expert consultations, authentic remedies, and personalized treatment for optimal wellness since 1982."
        keywords={[
          'homeopathic medicine',
          'natural remedies',
          'holistic health',
          'alternative medicine',
          'homeopathy consultation',
          'natural health solutions',
          'bahola labs',
          'wellness products',
          'anxiety treatment',
          'sleep disorders',
          'digestive health',
          'skin conditions',
          'joint pain relief'
        ]}
        url="/"
        structuredData={structuredData}
      />
      
      {/* Critical above-the-fold content - renders immediately */}
      <ShopHeroCarousel />
      <SearchActionBar />
      <ConsultSection />
      <DiscoverSection healthConcerns={healthConcerns} />
      
      {/* Below-the-fold content - can be lazy loaded or server rendered */}
      <FeaturedProductsSection products={featuredProducts} />
      <AboutSection />
      <TestimonialsSection testimonials={testimonials} />
    </>
  );
};

// Server-compatible featured products section
const FeaturedProductsSection: React.FC<{ products: any[] }> = ({ products }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice(0, 6).map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-bahola-blue-600">₹{product.price}</span>
                <button className="btn-bahola px-4 py-2 rounded">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Server-compatible about section
const AboutSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">About Bahola Labs</h2>
          <p className="text-lg text-gray-700 mb-6">
            Since 1982, Bahola Labs has been a trusted name in homeopathic medicines, 
            providing natural healing solutions for families worldwide.
          </p>
          <p className="text-lg text-gray-700">
            Our commitment to quality, authenticity, and patient care has made us 
            a leader in the homeopathic industry.
          </p>
        </div>
      </div>
    </section>
  );
};

// Server-compatible testimonials section
const TestimonialsSection: React.FC<{ testimonials: any[] }> = ({ testimonials }) => {
  return (
    <section className="py-16 bg-bahola-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
              <p className="font-semibold">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndexOptimized;
