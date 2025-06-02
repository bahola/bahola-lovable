
import React from 'react';
import { SEO } from '@/components/SEO';
import { ShopHeroCarousel } from '@/components/shop/ShopHeroCarousel';
import { FeaturedProductsSection } from '@/components/features/FeaturedProductsSection';
import { ConsultSection } from '@/components/features/ConsultSection';
import { ShopCategoriesSection } from '@/components/shop/ShopCategoriesSection';
import { TestimonialsSection } from '@/components/features/TestimonialsSection';
import { ShopBenefitsSection } from '@/components/shop/ShopBenefitsSection';
import { NewsletterSection } from '@/components/shop/NewsletterSection';

const Shop = () => {
  return (
    <>
      <SEO
        title="Shop Homeopathic Remedies - Bahola Labs"
        description="Discover our complete range of authentic homeopathic medicines, remedies, and health solutions. Shop with confidence from India's trusted homeopathy experts."
        keywords={['homeopathic medicines', 'shop homeopathy', 'natural remedies', 'bahola products', 'buy homeopathic']}
      />
      
      <div className="min-h-screen">
        {/* Hero Carousel Section */}
        <ShopHeroCarousel />
        
        {/* Featured Products Section */}
        <FeaturedProductsSection />
        
        {/* Categories Section */}
        <ShopCategoriesSection />
        
        {/* Consultation Section */}
        <ConsultSection />
        
        {/* Benefits Section */}
        <ShopBenefitsSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Newsletter Section */}
        <NewsletterSection />
      </div>
    </>
  );
};

export default Shop;
