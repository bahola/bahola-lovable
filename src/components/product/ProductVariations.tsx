
import React, { useState, useEffect } from 'react';

interface Variation {
  id: string;
  potency: string;
  pack_size: string;
  price: number;
}

interface ProductVariationsProps {
  variations: Variation[];
  onVariationSelect?: (variation: Variation) => void;
}

const ProductVariations: React.FC<ProductVariationsProps> = ({ variations, onVariationSelect }) => {
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  
  useEffect(() => {
    // Set first variation as default when component mounts
    if (variations && variations.length > 0 && !selectedVariation) {
      setSelectedVariation(variations[0].id);
      if (onVariationSelect) {
        onVariationSelect(variations[0]);
      }
    }
  }, [variations, selectedVariation, onVariationSelect]);
  
  // If no variations, don't render anything
  if (!variations || variations.length === 0) {
    return null;
  }

  // Group variations by attributes to only show attributes that have values
  const hasPotencyVariations = variations.some(v => v.potency && v.potency.trim() !== '');
  const hasPackSizeVariations = variations.some(v => v.pack_size && v.pack_size.trim() !== '');

  const handleVariationClick = (variation: Variation) => {
    setSelectedVariation(variation.id);
    if (onVariationSelect) {
      onVariationSelect(variation);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-2">Available Variations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {variations.map((variation) => (
          <div 
            key={variation.id}
            className={`border rounded p-2 text-center cursor-pointer transition-colors ${
              selectedVariation === variation.id 
                ? 'border-bahola-blue-500 bg-bahola-blue-50' 
                : 'border-bahola-neutral-200 hover:bg-bahola-blue-50'
            }`}
            onClick={() => handleVariationClick(variation)}
          >
            {hasPotencyVariations && (
              <div className="font-medium">{variation.potency}</div>
            )}
            {hasPackSizeVariations && (
              <div className="text-sm">{variation.pack_size}</div>
            )}
            <div className="text-bahola-blue-600">₹{variation.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductVariations;
