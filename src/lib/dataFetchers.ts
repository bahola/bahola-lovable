
// Data fetching utilities optimized for Next.js migration
// These functions can easily be converted to Next.js getStaticProps/getServerSideProps

export interface ProductData {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export interface HealthConcernData {
  id: string;
  title: string;
  description: string;
  category: string;
  remedies: string[];
}

// Homepage data fetcher - ready for getStaticProps
export async function getHomepageData() {
  // This will be easily convertible to Next.js static generation
  return {
    featuredProducts: await getFeaturedProducts(),
    testimonials: await getTestimonials(),
    healthConcerns: await getHealthConcerns(),
  };
}

// Featured products - can be statically generated
export async function getFeaturedProducts(): Promise<ProductData[]> {
  // Mock data - replace with actual API call
  return [
    {
      id: '1',
      name: 'Arnica Montana',
      price: 299,
      image: '/products/arnica.jpg',
      category: 'Pain Relief',
      description: 'Natural pain relief remedy'
    },
    {
      id: '2',
      name: 'Belladonna',
      price: 249,
      image: '/products/belladonna.jpg',
      category: 'Fever',
      description: 'Fever and inflammation remedy'
    }
  ];
}

// Testimonials data
export async function getTestimonials() {
  return [
    {
      id: '1',
      name: 'Dr. Sarah Wilson',
      text: 'Bahola Labs provides excellent homeopathic remedies.',
      rating: 5
    }
  ];
}

// Health concerns data
export async function getHealthConcerns(): Promise<HealthConcernData[]> {
  return [
    {
      id: 'anxiety',
      title: 'Anxiety & Stress',
      description: 'Natural remedies for anxiety and stress management',
      category: 'Mental Health',
      remedies: ['Ignatia', 'Argentum Nitricum', 'Gelsemium']
    }
  ];
}

// Product page data fetcher
export async function getProductData(productId: string): Promise<ProductData | null> {
  // This will convert to getStaticProps with params
  const products = await getFeaturedProducts();
  return products.find(p => p.id === productId) || null;
}

// Get all product IDs for static generation
export async function getAllProductIds(): Promise<string[]> {
  const products = await getFeaturedProducts();
  return products.map(p => p.id);
}
