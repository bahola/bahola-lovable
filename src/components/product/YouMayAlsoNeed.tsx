import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { swell } from '@/integrations/swell/client';
import { getSwellProductImage, getSwellEffectivePrice } from '@/hooks/useSwellProducts';

interface CategoryProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: string;
}

const CATEGORY_CONFIG = [
  { key: 'mother-tinctures', label: 'Mother Tincture', swellCategory: 'mother-tinctures' },
  { key: 'dilutions', label: 'Dilutions', swellCategory: 'dilutions' },
  { key: 'bio-chemics', label: 'Bio Chemics', swellCategory: 'bio-combination' },
  { key: 'specialty', label: 'Specialty', swellCategory: 'specialty' },
  { key: 'bach-flower', label: 'Bach Flower', swellCategory: 'bach-flower-remedies' },
];

interface YouMayAlsoNeedProps {
  currentProductId?: string;
}

const YouMayAlsoNeed: React.FC<YouMayAlsoNeedProps> = ({ currentProductId }) => {
  const [products, setProducts] = useState<CategoryProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const results: CategoryProduct[] = [];

      for (const cat of CATEGORY_CONFIG) {
        try {
          const response = await swell.products.list({
            category: cat.swellCategory,
            limit: 5,
          });
          
          if (response?.results?.length > 0) {
            // Pick a random product from the category, excluding current product
            const filtered = response.results.filter((p: any) => p.id !== currentProductId);
            if (filtered.length > 0) {
              const randomIndex = Math.floor(Math.random() * Math.min(filtered.length, 5));
              const product = filtered[randomIndex];
              results.push({
                id: product.id,
                name: product.name,
                price: getSwellEffectivePrice(product),
                image: getSwellProductImage(product),
                slug: product.slug,
                category: cat.label,
              });
            }
          }
        } catch (error) {
          console.error(`Error fetching ${cat.label} products:`, error);
        }
      }

      setProducts(results);
      setLoading(false);
    };

    fetchProducts();
  }, [currentProductId]);

  if (loading) {
    return (
      <section className="py-12 bg-[hsl(var(--generic-cream))]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[hsl(var(--generic-forest))] font-serif mb-8">
            You May Also Need
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-3" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-12 bg-[hsl(var(--generic-cream))]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-[hsl(var(--generic-forest))] font-serif mb-8">
          You May Also Need
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow group"
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
              <span className="text-xs font-medium text-[hsl(var(--generic-gold))] uppercase tracking-wide">
                {product.category}
              </span>
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

export default YouMayAlsoNeed;
