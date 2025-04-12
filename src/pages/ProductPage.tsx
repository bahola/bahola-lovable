
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Star, MinusCircle, PlusCircle, ShoppingCart, TruckIcon } from 'lucide-react';

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = React.useState(1);
  
  // This would be fetched from an API in a real implementation
  const product = {
    id: productId,
    name: 'Arnica Montana 30C',
    description: 'A highly recommended remedy for injuries, bruises, and trauma. Helps reduce pain, swelling, and promotes healing.',
    price: 185,
    originalPrice: 215,
    discountPercentage: 14,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    rating: 4.8,
    reviewCount: 142,
    stock: 24,
    potency: '30C',
    brand: 'Bahola Labs',
    benefits: [
      'Relieves pain and swelling from injuries',
      'Helps heal bruises and muscle soreness',
      'Useful for post-surgical recovery',
      'Reduces shock after trauma or accidents'
    ],
    usage: 'Take 3-5 pellets under the tongue 3 times daily or as directed by your homeopathic practitioner.',
    ingredients: 'Arnica montana 30C, Sucrose (inactive)',
    precautions: 'Consult a qualified homeopathic practitioner before use. Not a replacement for emergency medical care for serious injuries.',
    shipping: 'Usually ships within 24 hours. Free shipping on orders above ₹500.',
    reviews: [
      {
        id: 'rev1',
        user: 'Raj Sharma',
        rating: 5,
        date: '2023-12-15',
        comment: 'Excellent product! Helped with my knee pain after a fall during hiking.'
      },
      {
        id: 'rev2',
        user: 'Priya Mehta',
        rating: 4,
        date: '2023-11-28',
        comment: 'Very effective for bruises. I keep this in my first aid kit.'
      }
    ]
  };
  
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    console.log(`Adding ${quantity} of ${product.name} to cart`);
    // In a real app, this would dispatch to a cart context/store
  };
  
  return (
    <PageLayout title="" description="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg overflow-hidden mb-4">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-contain aspect-square"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((img, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden cursor-pointer">
                <img 
                  src={img} 
                  alt={`${product.name} view ${index + 1}`} 
                  className="w-full h-auto object-contain aspect-square"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="ml-2 text-bahola-neutral-600">{product.rating} ({product.reviewCount} reviews)</span>
            </div>
            <span className="text-green-600">In Stock ({product.stock})</span>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center">
              <span className="text-2xl font-bold">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="ml-3 text-bahola-neutral-500 line-through">₹{product.originalPrice}</span>
                  <span className="ml-3 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-sm">
                    {product.discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-bahola-neutral-500 mt-1">Inclusive of all taxes</p>
          </div>
          
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-bahola-neutral-700">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bahola-blue-50 p-3 rounded-lg">
                <span className="block text-sm font-medium">Potency</span>
                <span className="block text-lg">{product.potency}</span>
              </div>
              <div className="bg-bahola-blue-50 p-3 rounded-lg">
                <span className="block text-sm font-medium">Brand</span>
                <span className="block text-lg">{product.brand}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="font-semibold mb-2">Quantity</h2>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={decreaseQuantity} 
                disabled={quantity <= 1}
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
              <span className="mx-4 text-lg font-medium w-8 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Button className="flex-1 bg-bahola-blue-500 hover:bg-bahola-blue-600" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button variant="outline" className="min-w-[48px]">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="min-w-[48px]">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-start mb-4">
              <TruckIcon className="h-5 w-5 text-bahola-blue-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Shipping Information</h3>
                <p className="text-sm text-bahola-neutral-600">{product.shipping}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200 mb-8">
          <div className="flex flex-wrap -mb-px">
            <button className="font-medium text-bahola-blue-600 border-b-2 border-bahola-blue-600 px-4 py-2 mr-4">Benefits</button>
            <button className="font-medium text-bahola-neutral-500 hover:text-bahola-neutral-700 px-4 py-2 mr-4">Usage</button>
            <button className="font-medium text-bahola-neutral-500 hover:text-bahola-neutral-700 px-4 py-2 mr-4">Ingredients</button>
            <button className="font-medium text-bahola-neutral-500 hover:text-bahola-neutral-700 px-4 py-2 mr-4">Reviews</button>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Benefits</h2>
          <ul className="list-disc pl-5 space-y-2">
            {product.benefits.map((benefit, index) => (
              <li key={index} className="text-bahola-neutral-700">{benefit}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Related Products Section - just placeholders */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-medium">Related Product {item}</h3>
                <p className="text-bahola-blue-600 font-bold mt-2">₹195</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductPage;
