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

  // Enhanced validation for Supabase bucket URLs and external URLs
  const isValidImageUrl = (url: string) => {
    return url && 
           url.trim() !== '' && 
           url !== '/placeholder.svg' && 
           url !== 'null' && 
           url !== 'undefined' &&
           (url.startsWith('http') || 
            url.startsWith('https://vjkhsdwavbswcoyfgyvg.supabase.co/storage') ||
            url.startsWith('https://'));
  };

  const hasValidImage = isValidImageUrl(image);
  
  // Use the main image if it's valid, otherwise show placeholder
  const displayImage = hasValidImage ? image : null;
  
  // For thumbnails, only show if we have valid images (prioritize Supabase bucket URLs)
  const validImages = images?.filter(img => isValidImageUrl(img)) || [];
  const displayImages = hasValidImage ? [image, ...validImages.slice(0, 2)] : validImages.slice(0, 3);

  console.log('ProductImages - image:', image, 'hasValidImage:', hasValidImage, 'displayImage:', displayImage);
  console.log('ProductImages - valid images from bucket:', validImages);

  return (
    <div>
      <div className="bg-white rounded-lg overflow-hidden mb-4 aspect-square">
        {!displayImage || mainImageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
            <ImageOff className="h-16 w-16 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Image not available</p>
            {image && !hasValidImage && (
              <p className="text-xs text-gray-400 mt-1 text-center px-2">
                {image.includes('supabase.co') ? 'Bucket image not found' : 'Invalid image URL'}
              </p>
            )}
          </div>
        ) : (
          <img 
            src={displayImage} 
            alt={productName} 
            className="w-full h-full object-contain"
            onError={handleMainImageError}
            loading="lazy"
          />
        )}
      </div>
      
      {/* Only show thumbnails if we have valid images */}
      {displayImages.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {displayImages.slice(0, 3).map((img, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden cursor-pointer aspect-square">
              {thumbnailErrors[index] || !isValidImageUrl(img) ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <ImageOff className="h-8 w-8 text-gray-400" />
                </div>
              ) : (
                <img 
                  src={img} 
                  alt={`${productName} view ${index + 1}`} 
                  className="w-full h-full object-contain"
                  onError={() => handleThumbnailError(index)}
                  loading="lazy"
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
