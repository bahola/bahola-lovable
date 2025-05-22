
import { useState } from 'react';

export function useProductImages(initialImages: string[] = []) {
  const [imageUrls, setImageUrls] = useState<string[]>(initialImages);

  const handleAddImage = (url: string) => {
    setImageUrls([...imageUrls, url]);
  };

  const handleChangeImage = (index: number, url: string) => {
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = url;
    setImageUrls(updatedUrls);
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  return {
    imageUrls,
    setImageUrls,
    handleAddImage,
    handleChangeImage,
    handleRemoveImage
  };
}
