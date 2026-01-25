import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { ChevronRight } from 'lucide-react';
import { parseProductContent } from '@/utils/parseProductContent';
import { PageLayout } from '@/components/PageLayout';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartAdapter';
import { useSwellProduct, getSwellProductImage, getSwellProductImages, getSwellEffectivePrice } from '@/hooks/useSwellProducts';
import ProductImages, { ProductImagesLoading } from '@/components/product/ProductImages';
import ProductNotFound from '@/components/product/ProductNotFound';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, Award, Package, Star } from 'lucide-react';
import YouMayAlsoNeed from '@/components/product/YouMayAlsoNeed';
import RecentlyViewedSection from '@/components/product/RecentlyViewedSection';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';

// Categories that should NOT show potency selection (only pack sizes)
const POTENCY_EXCLUDED_CATEGORIES = [
  'mother tinctures',
  'mother-tinctures',
  'homeopathic mother tinctures',
];

// Map Swell category names to display names
const CATEGORY_DISPLAY_MAP: Record<string, string> = {
  'homeopathic dilutions': 'Dilutions',
  'homeopathic mother tinctures': 'Mother Tinctures',
  'mother tinctures': 'Mother Tinctures',
  'lm potencies': 'LM Potencies',
  'bio chemics': 'Bio Chemics',
  'bio combinations': 'Bio Combinations',
  'triturations': 'Triturations',
  'single remedies': 'Single Remedies',
};

// Map subcategory slugs to display names (e.g., "Dil-A" → "Dil A")
const formatSubcategory = (name: string): string => {
  if (!name) return '';
  // Replace hyphens with spaces and clean up
  return name.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
};

// Get display category name
const getDisplayCategory = (categoryName: string): string => {
  const normalized = categoryName.toLowerCase().trim();
  return CATEGORY_DISPLAY_MAP[normalized] || categoryName;
};

interface Variation {
  id: string;
  potency: string;
  pack_size: string;
  price: number;
  stock: number;
}

interface GenericProductPageProps {
  swellProduct?: any;
}

const GenericProductPage: React.FC<GenericProductPageProps> = ({ swellProduct: passedProduct }) => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedPotency, setSelectedPotency] = useState<string | null>(null);
  const [selectedPackSize, setSelectedPackSize] = useState<string | null>(null);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToRecentlyViewed } = useRecentlyViewed();
  
  // Only fetch if no product was passed
  const { product: fetchedProduct, loading, error } = useSwellProduct(passedProduct ? undefined : productSlug);
  
  // Use passed product or fetched product
  const swellProduct = passedProduct || fetchedProduct;
  const isLoading = passedProduct ? false : loading;

  // Helper to safely get variants array
  const getVariantsArray = (variants: any): any[] => {
    if (!variants) return [];
    if (Array.isArray(variants)) return variants;
    if (variants.results && Array.isArray(variants.results)) return variants.results;
    return [];
  };

  // Transform Swell product
  const product = useMemo(() => {
    if (!swellProduct) return null;

    const rawCategoryName = Array.isArray(swellProduct.categories) 
      ? swellProduct.categories[0]?.name 
      : (swellProduct.categories as any)?.results?.[0]?.name || 'Homeopathic Medicine';
    
    // Get subcategory (second category or parent_id reference)
    const rawSubcategory = Array.isArray(swellProduct.categories) && swellProduct.categories.length > 1
      ? swellProduct.categories[1]?.name
      : (swellProduct.categories as any)?.results?.[1]?.name || '';

    const content = swellProduct.content as Record<string, any> | undefined;

    return {
      id: swellProduct.id,
      name: swellProduct.name,
      latinName: content?.latin_name || '',
      description: swellProduct.description || '',
      price: getSwellEffectivePrice(swellProduct),
      image: getSwellProductImage(swellProduct),
      images: getSwellProductImages(swellProduct),
      stock: swellProduct.stock_level ?? 100,
      category: getDisplayCategory(rawCategoryName),
      subcategory: formatSubcategory(rawSubcategory),
      rawCategory: rawCategoryName,
      categorySlug: Array.isArray(swellProduct.categories)
        ? swellProduct.categories[0]?.slug
        : (swellProduct.categories as any)?.results?.[0]?.slug || '',
      variations: getVariantsArray(swellProduct.variants).map((v: any) => {
        const variantName = v.name || '';
        // Check if variant name contains comma (potency, pack_size format)
        const parts = variantName.split(',').map((s: string) => s.trim());
        
        // Determine if this is a pack-size-only variant (e.g., "30ml", "100ml")
        const isPackSizeOnly = /^\d+\s*(ml|g|gm|kg|l|oz)$/i.test(variantName);
        
        return {
          id: v.id,
          potency: isPackSizeOnly ? '' : (parts[0] || variantName),
          pack_size: isPackSizeOnly ? variantName : (parts[1] || variantName),
          price: v.price || swellProduct.price || 0,
          stock: v.stock_level ?? 100
        };
      }),
      // Parse description to extract benefits
      parsedContent: parseProductContent(swellProduct.description),
      dosage: content?.dosage || `Adults: 10-15 drops in water, 3 times daily or as directed by physician.\n\nChildren: 5-10 drops in water, 3 times daily or as directed by physician.\n\nTake 30 minutes before or after meals. For acute conditions, may be taken every 2-3 hours.`,
      safetyInfo: content?.safety_info || [
        'Read the label carefully before use',
        'Keep out of reach of children',
        'Store in a cool, dry place away from direct sunlight',
        'Do not exceed recommended dosage',
        'Pregnant or nursing mothers should consult physician',
        'Avoid strong flavors 30 minutes before/after taking medicine'
      ],
      disclaimer: content?.disclaimer || 'The information provided is for educational purposes only and should not be used as a substitute for professional medical advice. Always consult a registered medical practitioner for diagnosis and treatment. Results may vary from person to person.',
      slug: swellProduct.slug
    };
  }, [swellProduct]);

  // Check if this category should hide potency
  const shouldHidePotency = useMemo(() => {
    if (!product) return false;
    
    // Check by category name/slug
    const rawCat = product.rawCategory?.toLowerCase() || '';
    const displayCat = product.category.toLowerCase();
    const slug = product.categorySlug?.toLowerCase() || '';
    const hasCategoryMatch = POTENCY_EXCLUDED_CATEGORIES.some(c => 
      rawCat.includes(c) || displayCat.includes(c) || slug.includes(c)
    );
    
    if (hasCategoryMatch) return true;
    
    // Also check if product name ends with "Q" (Mother Tincture indicator)
    // or if all variations have no potency (only pack sizes)
    const productName = product.name?.toLowerCase() || '';
    const isMTByName = productName.endsWith(' q') || productName.includes(' q ');
    
    // Check if variations only have pack sizes (no potencies)
    const hasOnlyPackSizes = product.variations?.length > 0 && 
      product.variations.every((v: Variation) => !v.potency || v.potency.trim() === '');
    
    return isMTByName || hasOnlyPackSizes;
  }, [product]);

  // Extract unique potencies and pack sizes
  const { potencies, packSizes } = useMemo(() => {
    if (!product?.variations) return { potencies: [], packSizes: [] };
    
    const potencySet = new Set<string>();
    const packSizeSet = new Set<string>();
    
    product.variations.forEach((v: Variation) => {
      if (v.potency && v.potency.trim() !== '' && v.potency !== 'undefined') {
        potencySet.add(v.potency);
      }
      if (v.pack_size && v.pack_size.trim() !== '' && v.pack_size !== 'undefined') {
        packSizeSet.add(v.pack_size);
      }
    });
    
    return {
      potencies: Array.from(potencySet),
      packSizes: Array.from(packSizeSet)
    };
  }, [product?.variations]);

  // Set defaults on mount
  useEffect(() => {
    if (potencies.length > 0 && !selectedPotency && !shouldHidePotency) {
      setSelectedPotency(potencies[0]);
    }
    if (packSizes.length > 0 && !selectedPackSize) {
      setSelectedPackSize(packSizes[0]);
    }
  }, [potencies, packSizes, selectedPotency, selectedPackSize, shouldHidePotency]);

  // Track recently viewed products
  useEffect(() => {
    if (product) {
      addToRecentlyViewed({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug,
        category: product.category
      });
    }
  }, [product?.id]);

  // Find matching variation
  const selectedVariation = useMemo(() => {
    if (!product?.variations) return null;
    
    if (shouldHidePotency) {
      // For Mother Tinctures, match only by pack size
      return product.variations.find((v: Variation) => v.pack_size === selectedPackSize) || null;
    }
    
    if (!selectedPotency || !selectedPackSize) return null;
    return product.variations.find((v: Variation) => 
      v.potency === selectedPotency && v.pack_size === selectedPackSize
    ) || null;
  }, [product?.variations, selectedPotency, selectedPackSize, shouldHidePotency]);

  // Product name - keep original from Swell
  const displayProductName = product?.name || '';

  // Current price
  const currentPrice = selectedVariation?.price || product?.price || 0;

  const handleAddToCart = () => {
    if (!product) return;
    
    try {
      addToCart({
        id: String(product.id),
        name: displayProductName,
        price: currentPrice,
        image: product.image || '/placeholder.svg',
        taxStatus: 'taxable',
        taxClass: '5'
      }, quantity);
      
      toast({
        title: "Added to cart",
        description: `${quantity} x ${displayProductName} added to your cart`,
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    }
  };

  // Render Product Description from parsed plain-text (more reliable than Swell's pasted HTML tables)
  const safeDescription = useMemo(() => {
    const text = product?.parsedContent?.description || '';
    return DOMPurify.sanitize(text).trim();
  }, [product?.parsedContent?.description]);

  // Get benefits from parsed content with fallback
  const displayBenefits = useMemo(() => {
    const parsed = product?.parsedContent?.benefits;
    if (parsed && parsed.length > 0) return parsed;
    // Fallback if no benefits parsed
    return [
      'Effective relief from bruises, sprains, and muscle soreness',
      'Reduces swelling and inflammation naturally',
      'Accelerates healing of injuries and trauma',
      'Relieves shock and trauma following accidents',
      'Helps with post-surgical recovery',
      'Safe for all age groups when used as directed'
    ];
  }, [product?.parsedContent?.benefits]);

  // Loading state
  if (isLoading) {
    return (
      <PageLayout title="Loading..." description="">
        <div className="bg-[hsl(var(--generic-cream))] min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ProductImagesLoading />
              <div className="space-y-6">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if ((error && !passedProduct) || !product) {
    return <ProductNotFound />;
  }

  return (
    <PageLayout title={displayProductName} description={product.description?.substring(0, 157)} heroDescription={null}>
      <div className="bg-[hsl(var(--generic-cream))] min-h-screen">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
          <nav className="text-sm text-[hsl(var(--generic-sage))]" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li className="inline-flex items-center">
                <Link to="/" className="hover:text-[hsl(var(--generic-forest))] transition-colors">
                  Home
                </Link>
              </li>
              <li className="inline-flex items-center gap-1.5">
                <ChevronRight className="w-4 h-4" />
                <Link to="/shop" className="hover:text-[hsl(var(--generic-forest))] transition-colors">
                  Shop
                </Link>
              </li>
              {product.categorySlug && (
                <li className="inline-flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4" />
                  <Link 
                    to={`/shop?category=${product.categorySlug}`} 
                    className="hover:text-[hsl(var(--generic-forest))] transition-colors"
                  >
                    {product.category}
                  </Link>
                </li>
              )}
              <li className="inline-flex items-center gap-1.5">
                <ChevronRight className="w-4 h-4" />
                <span className="text-[hsl(var(--generic-charcoal))] font-medium" aria-current="page">
                  {displayProductName}
                </span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Main Product Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Product Image Section */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white to-[hsl(var(--generic-sand))] rounded-xl p-6 lg:p-8 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--generic-gold)/0.1),transparent_70%)]" />
                <div className="relative z-10">
                  <ProductImages 
                    image={product.image} 
                    images={product.images} 
                    productName={product.name}
                  />
                </div>
              </div>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-lg border border-[hsl(var(--generic-sand))] text-center">
                  <Check className="w-6 h-6 text-[hsl(var(--generic-gold))] mx-auto mb-2" />
                  <span className="text-xs font-semibold text-[hsl(var(--generic-sage))] uppercase tracking-wide">GMP Certified</span>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[hsl(var(--generic-sand))] text-center">
                  <Package className="w-6 h-6 text-[hsl(var(--generic-gold))] mx-auto mb-2" />
                  <span className="text-xs font-semibold text-[hsl(var(--generic-sage))] uppercase tracking-wide">Made in India</span>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[hsl(var(--generic-sand))] text-center">
                  <Award className="w-6 h-6 text-[hsl(var(--generic-gold))] mx-auto mb-2" />
                  <span className="text-xs font-semibold text-[hsl(var(--generic-sage))] uppercase tracking-wide">Fast Acting</span>
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              {/* Category & Name */}
              <div>
                <p className="text-sm font-semibold tracking-widest uppercase text-[hsl(var(--generic-sage))] mb-2">
                  {product.category}
                </p>
                <h1 className="text-4xl lg:text-5xl font-bold text-[hsl(var(--generic-forest))] leading-tight font-serif">
                  {displayProductName}
                </h1>
                {product.latinName && (
                  <p className="text-lg italic text-[hsl(var(--generic-sage))] mt-2">{product.latinName}</p>
                )}
                
                {/* Show "From ₹X" for Mother Tinctures */}
                {shouldHidePotency && product.variations?.length > 0 && (() => {
                  const prices = product.variations.map((v: Variation) => v.price).filter((p: number) => p > 0);
                  const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;
                  return lowestPrice > 0 ? (
                    <p className="text-xl font-semibold text-[hsl(var(--generic-forest))] mt-2">
                      From ₹{lowestPrice.toFixed(2)}
                    </p>
                  ) : null;
                })()}
                
                {/* Rating */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 text-[hsl(var(--generic-gold))] fill-[hsl(var(--generic-gold))]"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-[hsl(var(--generic-sage))]">4.8 (2,847 reviews)</span>
                </div>
              </div>

              {/* Potency Selection - Hidden for Mother Tinctures */}
              {!shouldHidePotency && potencies.length > 0 && (
                <div>
                  <label className="block font-semibold text-sm text-[hsl(var(--generic-charcoal))] uppercase tracking-wide mb-3">
                    Select Potency
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {potencies.map((potency) => (
                      <button
                        key={potency}
                        onClick={() => setSelectedPotency(potency)}
                        className={`px-5 py-3 rounded-lg border-2 font-semibold text-sm transition-all duration-200 min-w-[70px] ${
                          selectedPotency === potency
                            ? 'bg-[hsl(var(--generic-forest))] border-[hsl(var(--generic-forest))] text-white'
                            : 'bg-white border-[hsl(var(--generic-sand))] text-[hsl(var(--generic-charcoal))] hover:border-[hsl(var(--generic-sage))] hover:bg-[hsl(var(--generic-cream))]'
                        }`}
                      >
                        {potency}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pack Size Selection */}
              {packSizes.length > 0 && (
                <div>
                  <label className="block font-semibold text-sm text-[hsl(var(--generic-charcoal))] uppercase tracking-wide mb-3">
                    Select Pack Size
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {packSizes.map((packSize) => (
                      <button
                        key={packSize}
                        onClick={() => setSelectedPackSize(packSize)}
                        className={`px-5 py-3 rounded-lg border-2 font-semibold text-sm transition-all duration-200 min-w-[80px] ${
                          selectedPackSize === packSize
                            ? 'bg-[hsl(var(--generic-forest))] border-[hsl(var(--generic-forest))] text-white ring-2 ring-[hsl(var(--generic-gold))] ring-offset-2'
                            : 'bg-white border-[hsl(var(--generic-sand))] text-[hsl(var(--generic-charcoal))] hover:border-[hsl(var(--generic-sage))] hover:bg-[hsl(var(--generic-cream))]'
                        }`}
                      >
                        {packSize}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Section */}
              <div className="bg-white p-6 rounded-xl border-2 border-[hsl(var(--generic-sand))]">
                <div className="text-4xl font-bold text-[hsl(var(--generic-forest))] font-serif">
                  ₹{currentPrice.toFixed(2)}
                </div>
                <p className="text-sm text-[hsl(var(--generic-sage))] mt-1">MRP inclusive of all taxes</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[hsl(var(--generic-forest))] text-white py-4 px-6 rounded-lg font-semibold uppercase tracking-wide text-sm transition-all duration-300 hover:bg-[hsl(var(--generic-charcoal))] hover:shadow-lg hover:-translate-y-0.5"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    handleAddToCart();
                    // Navigate to cart
                  }}
                  className="flex-1 bg-white text-[hsl(var(--generic-forest))] py-4 px-6 rounded-lg font-semibold uppercase tracking-wide text-sm border-2 border-[hsl(var(--generic-forest))] transition-all duration-200 hover:bg-[hsl(var(--generic-cream))]"
                >
                  Buy Now
                </button>
              </div>

              {/* Product Information Sections */}
              <div className="space-y-6 pt-6 border-t border-[hsl(var(--generic-sand))]">
                
                {/* Product Description */}
                <section className="pb-6 border-b border-[hsl(var(--generic-sand))]">
                  <h2 className="text-2xl font-bold text-[hsl(var(--generic-forest))] mb-4 font-serif">
                    Product Description
                  </h2>
                  {safeDescription ? (
                    <p className="text-[hsl(var(--generic-charcoal))] leading-relaxed whitespace-pre-line">
                      {safeDescription}
                    </p>
                  ) : (
                    <p className="text-[hsl(var(--generic-charcoal))] leading-relaxed">
                      {product.name} is a premier homeopathic remedy trusted by families for generations. Bahola's formulation delivers consistent results in managing various health conditions naturally.
                    </p>
                  )}
                </section>

                {/* Accordion Sections */}
                <Accordion type="multiple" defaultValue={["benefits"]} className="w-full">
                  {/* Key Benefits */}
                  <AccordionItem value="benefits" className="border-[hsl(var(--generic-sand))]">
                    <AccordionTrigger className="text-xl font-bold text-[hsl(var(--generic-forest))] font-serif hover:no-underline">
                      Key Benefits
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 pt-2">
                        {displayBenefits.map((benefit: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[hsl(var(--generic-gold))] flex-shrink-0 mt-0.5" />
                            <span className="text-[hsl(var(--generic-charcoal))]">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Dosage & Directions */}
                  <AccordionItem value="dosage" className="border-[hsl(var(--generic-sand))]">
                    <AccordionTrigger className="text-xl font-bold text-[hsl(var(--generic-forest))] font-serif hover:no-underline">
                      Dosage & Directions
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-[hsl(var(--generic-charcoal))] leading-relaxed whitespace-pre-line pt-2">
                        {product.dosage}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Safety Information */}
                  <AccordionItem value="safety" className="border-[hsl(var(--generic-sand))]">
                    <AccordionTrigger className="text-xl font-bold text-[hsl(var(--generic-forest))] font-serif hover:no-underline">
                      Safety Information
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-[hsl(var(--generic-charcoal))] pt-2">
                        {product.safetyInfo.map((info: string, index: number) => (
                          <li key={index}>• {info}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Disclaimer */}
                <section className="bg-[hsl(var(--generic-sand))] p-5 rounded-lg">
                  <p className="text-sm text-[hsl(var(--generic-charcoal))] leading-relaxed">
                    <strong>Disclaimer:</strong> {product.disclaimer}
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Need Section */}
      <YouMayAlsoNeed currentProductId={product.id} />

      {/* Recently Viewed Section */}
      <RecentlyViewedSection currentProductId={product.id} />
    </PageLayout>
  );
};

export default GenericProductPage;
