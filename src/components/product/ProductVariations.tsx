
import React, { useState, useEffect, useMemo } from 'react';

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
  const [selectedPotency, setSelectedPotency] = useState<string | null>(null);
  const [selectedPackSize, setSelectedPackSize] = useState<string | null>(null);
  
  // Extract unique potencies and pack sizes
  const { potencies, packSizes } = useMemo(() => {
    const potencySet = new Set<string>();
    const packSizeSet = new Set<string>();
    
    variations.forEach(v => {
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
  }, [variations]);

  // Find matching variation when both are selected
  const selectedVariation = useMemo(() => {
    if (!selectedPotency || !selectedPackSize) return null;
    return variations.find(v => v.potency === selectedPotency && v.pack_size === selectedPackSize) || null;
  }, [variations, selectedPotency, selectedPackSize]);

  // Set defaults on mount
  useEffect(() => {
    if (potencies.length > 0 && !selectedPotency) {
      setSelectedPotency(potencies[0]);
    }
    if (packSizes.length > 0 && !selectedPackSize) {
      setSelectedPackSize(packSizes[0]);
    }
  }, [potencies, packSizes, selectedPotency, selectedPackSize]);

  // Notify parent when variation changes
  useEffect(() => {
    if (selectedVariation && onVariationSelect) {
      onVariationSelect(selectedVariation);
    }
  }, [selectedVariation, onVariationSelect]);

  // If no variations, don't render anything
  if (!variations || variations.length === 0) {
    return null;
  }

  // If there are no meaningful variations, don't show the section
  if (potencies.length === 0 && packSizes.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 space-y-4">
      {/* Potency Selector */}
      {potencies.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2 text-sm text-muted-foreground">Potency</h3>
          <div className="flex flex-wrap gap-2">
            {potencies.map((potency) => (
              <button
                key={potency}
                onClick={() => setSelectedPotency(potency)}
                className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                  selectedPotency === potency
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {potency}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pack Size Selector */}
      {packSizes.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2 text-sm text-muted-foreground">Pack Size</h3>
          <div className="flex flex-wrap gap-2">
            {packSizes.map((packSize) => (
              <button
                key={packSize}
                onClick={() => setSelectedPackSize(packSize)}
                className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                  selectedPackSize === packSize
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {packSize}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Show selected price */}
      {selectedVariation && (
        <div className="pt-2">
          <span className="text-2xl font-bold text-primary">₹{selectedVariation.price}</span>
        </div>
      )}
    </div>
  );
};

export default ProductVariations;
