
import { useState, useCallback } from 'react';

export function useProductImages(initialImages: string[] = []) {
  const [imageUrls, setImageUrls] = useState<string[]>(initialImages);

  // Use useCallback to prevent unnecessary re-renders
  const handleAddImage = useCallback((url: string) => {
    setImageUrls(prev => [...prev, url]);
  }, []);

  const handleChangeImage = useCallback((index: number, url: string) => {
    setImageUrls(prev => {
      const updatedUrls = [...prev];
      updatedUrls[index] = url;
      return updatedUrls;
    });
  }, []);

  const handleRemoveImage = useCallback((index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  }, []);

  return {
    imageUrls,
    setImageUrls,
    handleAddImage,
    handleChangeImage,
    handleRemoveImage
  };
}
