
import { useState, useCallback } from 'react';

export const useProductImages = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleAddImage = useCallback(() => {
    console.log('Adding new image URL to state');
    setImageUrls([...imageUrls, ""]);
  }, [imageUrls]);

  const handleChangeImage = useCallback((index: number, url: string) => {
    console.log(`Changing image URL at index ${index} to: ${url}`);
    const newUrls = [...imageUrls];
    newUrls[index] = url;
    setImageUrls(newUrls);
  }, [imageUrls]);

  const handleRemoveImage = useCallback((index: number) => {
    console.log(`Removing image URL at index ${index}`);
    const newUrls = [...imageUrls];
    newUrls.splice(index, 1);
    setImageUrls(newUrls);
  }, [imageUrls]);

  const setInitialImages = useCallback((images: string[]) => {
    console.log('Setting initial image URLs:', images);
    setImageUrls(images.filter(url => url !== null && url !== undefined));
  }, []);

  return {
    imageUrls,
    handleAddImage,
    handleChangeImage,
    handleRemoveImage,
    setInitialImages
  };
};
