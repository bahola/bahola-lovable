
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductImagesProps {
  image: string;
  images: string[];
  productName: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({ image, images, productName }) => {
  return (
    <div>
      <div className="bg-white rounded-lg overflow-hidden mb-4">
        <img 
          src={image} 
          alt={productName} 
          className="w-full h-auto object-contain aspect-square"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden cursor-pointer">
            <img 
              src={img} 
              alt={`${productName} view ${index + 1}`} 
              className="w-full h-auto object-contain aspect-square"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProductImagesLoading: React.FC = () => {
  return (
    <div>
      <Skeleton className="w-full h-[400px] rounded-lg" />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="w-full h-24 rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
