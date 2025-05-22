
import React from 'react';
import { Button } from "@/components/ui/button";
import { ProductCard } from '@/components/ProductCard';

export const FeaturedProductsSection = () => {
  const products = [
    { id: 1, name: 'Arnica Montana 30C', price: 120, rating: 4.8, image: '/placeholder.svg' },
    { id: 2, name: 'Rhus Toxicodendron 200C', price: 150, rating: 4.6, image: '/placeholder.svg' },
    { id: 3, name: 'Nux Vomica 30C', price: 120, rating: 4.9, image: '/placeholder.svg' },
    { id: 4, name: 'Belladonna 30C', price: 130, rating: 4.7, image: '/placeholder.svg' },
    { id: 5, name: 'Arsenicum Album 30C', price: 120, rating: 4.5, image: '/placeholder.svg' },
    { id: 6, name: 'Bryonia Alba 200C', price: 150, rating: 4.6, image: '/placeholder.svg' },
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button className="btn-bahola">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};
