
import React, { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from 'lucide-react';

interface ProductImagesProps {
  image: string;
  images: string[];
  productName: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({ image, images, productName }) => {
  const [mainImageError, setMainImageError] = useState(false);
  const [thumbnailErrors, setThumbnailErrors] = useState<Record<number, boolean>>({});

  const handleMainImageError = () => {
    console.error("Error loading main product image:", image);
    setMainImageError(true);
  };

  const handleThumbnailError = (index: number) => {
    console.error("Error loading thumbnail image:", images[index]);
    setThumbnailErrors(prev => ({ ...prev, [index]: true }));
  };

  // Check if we have a valid image URL
  const hasValidImage = image && image !== '' && image !== '/placeholder.svg' && image !== 'null' && image !== null;
  
  // Use the main image if it's valid, otherwise show placeholder
  const displayImage = hasValidImage ? image : null;
  
  // For thumbnails, only show if we have valid images
  const validImages = images?.filter(img => img && img !== '' && img !== '/placeholder.svg' && img !== 'null') || [];
  const displayImages = hasValidImage ? [image, ...validImages.slice(0, 2)] : validImages.slice(0, 3);

  return (
    <div>
      <div className="bg-white rounded-lg overflow-hidden mb-4 aspect-square">
        {!displayImage || mainImageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
            <ImageOff className="h-16 w-16 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Image not available</p>
          </div>
        ) : (
          <img 
            src={displayImage} 
            alt={productName} 
            className="w-full h-full object-contain"
            onError={handleMainImageError}
          />
        )}
      </div>
      
      {/* Only show thumbnails if we have valid images */}
      {displayImages.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {displayImages.slice(0, 3).map((img, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden cursor-pointer aspect-square">
              {thumbnailErrors[index] || !img ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <ImageOff className="h-8 w-8 text-gray-400" />
                </div>
              ) : (
                <img 
                  src={img} 
                  alt={`${productName} view ${index + 1}`} 
                  className="w-full h-full object-contain"
                  onError={() => handleThumbnailError(index)}
                />
              )}
            </div>
          ))}
        </div>
      )}
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
