import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface RecentlyViewedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  category?: string;
}

const STORAGE_KEY = 'recently_viewed_products';

interface RecentlyViewedSectionProps {
  currentProductId?: string;
}

const RecentlyViewedSection: React.FC<RecentlyViewedSectionProps> = ({ currentProductId }) => {
  const [products, setProducts] = useState<RecentlyViewedProduct[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const allProducts: RecentlyViewedProduct[] = JSON.parse(stored);
        // Exclude current product and limit to 5
        const filtered = allProducts.filter(p => p.id !== currentProductId).slice(0, 5);
        setProducts(filtered);
      } catch {
        setProducts([]);
      }
    }
  }, [currentProductId]);

  if (products.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-[hsl(var(--generic-forest))] font-serif mb-8">
          Recently Viewed
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="bg-[hsl(var(--generic-cream))] rounded-lg p-4 hover:shadow-md transition-shadow group"
            >
              <div className="aspect-square bg-[hsl(var(--generic-sand))] rounded-lg mb-3 overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[hsl(var(--generic-charcoal))]/30">
                    No Image
                  </div>
                )}
              </div>
              {product.category && (
                <span className="text-xs font-medium text-[hsl(var(--generic-gold))] uppercase tracking-wide">
                  {product.category}
                </span>
              )}
              <h3 className="font-medium text-[hsl(var(--generic-forest))] mt-1 line-clamp-2 text-sm">
                {product.name}
              </h3>
              <p className="text-[hsl(var(--generic-charcoal))] font-semibold mt-2">
                ₹{product.price.toFixed(2)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewedSection;
