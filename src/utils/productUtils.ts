
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageSrc: string;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  url: string;
}

export const formatName = (str: string = '') => {
  return str.replace(/-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
};

export const getPageInfo = (id: string | undefined, isConcernPage: boolean, subcategoryId?: string) => {
  const baseName = formatName(id);
  
  if (subcategoryId) {
    return {
      name: `${baseName} - ${subcategoryId.toUpperCase()}`,
      description: `Browse our ${baseName} remedies that start with ${subcategoryId.toUpperCase()}.`,
      productCount: 8 + Math.floor(Math.random() * 30) // Random number for demo
    };
  }
  
  return {
    name: baseName,
    description: isConcernPage 
      ? `Browse our homeopathic remedies for ${baseName}.`
      : `Explore our range of high-quality ${baseName} designed to support your health naturally.`,
    productCount: 10 + Math.floor(Math.random() * 30) // Random number for demo
  };
};

export const generateMockProducts = (subcategoryId?: string): Product[] => {
  const productTypes = [
    'Arnica', 'Belladonna', 'Nux Vomica', 'Bryonia', 'Allium Cepa', 'Chamomilla',
    'Arsenicum Album', 'Pulsatilla', 'Rhus Tox', 'Apis Mel', 'Aconite', 'Sepia'
  ];
  
  const filteredProducts = productTypes
    // If we have a subcategory, filter to only show products starting with that letter
    .filter(product => !subcategoryId || product.charAt(0).toLowerCase() === subcategoryId.toLowerCase())
    // Create product objects
    .map(product => {
      const potency = ['6C', '30C', '200C', '1M'][Math.floor(Math.random() * 4)];
      const id = `${product.toLowerCase().replace(/\s+/g, '-')}-${potency.toLowerCase()}`;
      const price = 300 + Math.floor(Math.random() * 500);
      const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 15) + 5 : 0;
      
      return {
        id,
        title: `${product} ${potency}`,
        description: `For various health conditions and symptoms.`,
        price,
        imageSrc: `https://placehold.co/300x300/bahola-blue/white?text=${encodeURIComponent(product)}`,
        discountPercentage: discount,
        rating: 4 + (Math.random() * 1),
        reviewCount: 10 + Math.floor(Math.random() * 100),
        url: `/product/${id}`
      };
    });
  
  return filteredProducts;
};
