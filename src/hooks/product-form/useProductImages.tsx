
import { useState, useCallback } from 'react';

export const useProductImages = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleAddImage = useCallback(() => {
    setImageUrls([...imageUrls, ""]);
  }, [imageUrls]);

  const handleChangeImage = useCallback((index: number, url: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = url;
    setImageUrls(newUrls);
  }, [imageUrls]);

  const handleRemoveImage = useCallback((index: number) => {
    const newUrls = [...imageUrls];
    newUrls.splice(index, 1);
    setImageUrls(newUrls);
  }, [imageUrls]);

  const setInitialImages = useCallback((images: string[]) => {
    setImageUrls(images);
  }, []);

  return {
    imageUrls,
    handleAddImage,
    handleChangeImage,
    handleRemoveImage,
    setInitialImages
  };
};
