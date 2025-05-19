
import React from 'react';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/PageLayout';

const ProductNotFound: React.FC = () => {
  return (
    <PageLayout title="Product Not Found" description="We couldn't find the product you're looking for">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for may have been removed or is temporarily unavailable.</p>
        <Button asChild>
          <a href="/categories">Browse All Products</a>
        </Button>
      </div>
    </PageLayout>
  );
};

export default ProductNotFound;
