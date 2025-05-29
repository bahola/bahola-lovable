
import React, { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import ShippingCalculator from '@/components/shipping/ShippingCalculator';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getDiscountedPrice, getSubtotal, getTotalTax } = useCart();
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingZone, setShippingZone] = useState<string>('');
  
  const subtotal = getSubtotal();
  const tax = getTotalTax();
  const total = subtotal + shippingCost + tax;

  const handleShippingUpdate = (cost: number, zone?: string) => {
    setShippingCost(cost);
    setShippingZone(zone || '');
  };
  
  return (
    <PageLayout title="Your Cart" description="Review and modify your selected items">
      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">
                  Shopping Cart ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
                </h2>
              </div>
              
              <ul className="divide-y">
                {items.map(item => {
                  const itemPrice = getDiscountedPrice(item);
                  const hasDiscount = item.discountPercentage && item.originalPrice;
                  
                  return (
                    <li key={item.id} className="p-6">
                      <div className="flex flex-wrap md:flex-nowrap items-center">
                        <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0 mr-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        <div className="flex-grow mt-4 md:mt-0">
                          <h3 className="font-medium">
                            <Link to={`/product/${item.id}`} className="hover:text-bahola-blue-500">
                              {item.name}
                            </Link>
                          </h3>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="text-bahola-blue-600 font-bold">₹{Math.round(itemPrice)}</div>
                            {hasDiscount && (
                              <>
                                <span className="text-sm text-bahola-neutral-500 line-through">
                                  ₹{item.originalPrice}
                                </span>
                                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs">
                                  {item.discountPercentage}% OFF
                                </span>
                              </>
                            )}
                          </div>
                          {/* Tax information */}
                          <div className="mt-1 text-xs text-bahola-neutral-500">
                            {item.taxStatus === 'non-taxable' ? 'Non-taxable' : `${item.taxClass || '5'}% GST`}
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-4 md:mt-0">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="mx-3 font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="ml-4 md:ml-8 mt-4 md:mt-0 text-right">
                          <div className="font-bold">₹{Math.round(itemPrice * item.quantity)}</div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 flex items-center mt-2 text-sm"
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              
              <div className="p-6 bg-gray-50">
                <div className="flex justify-between mb-4">
                  <Link to="/categories" className="text-bahola-blue-500 hover:text-bahola-blue-700 flex items-center">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Continue Shopping
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    className="text-red-500 border-red-500 hover:bg-red-50"
                    onClick={clearCart}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
                  </Button>
                </div>
              </div>
            </div>

            {/* Shipping Calculator */}
            <ShippingCalculator onShippingUpdate={handleShippingUpdate} />
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Order Summary</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-bahola-neutral-600">Subtotal</span>
                  <span className="font-medium">₹{Math.round(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-bahola-neutral-600">
                    Shipping {shippingZone && `(${shippingZone})`}
                  </span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'Calculate above' : `₹${shippingCost}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-bahola-neutral-600">Tax (GST)</span>
                  <span className="font-medium">₹{Math.round(tax)}</span>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{Math.round(total)}</span>
                  </div>
                  <p className="text-bahola-neutral-500 text-xs mt-1">
                    (Including GST {shippingCost > 0 ? '& Shipping' : ''})
                  </p>
                </div>
                
                <Button asChild className="w-full mt-6">
                  <Link to="/checkout">
                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <div className="text-center text-sm text-bahola-neutral-500 mt-4">
                  <p>We accept:</p>
                  <div className="flex justify-center space-x-2 mt-2">
                    <span className="p-1 bg-gray-100 rounded">Credit Card</span>
                    <span className="p-1 bg-gray-100 rounded">UPI</span>
                    <span className="p-1 bg-gray-100 rounded">Net Banking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto text-bahola-neutral-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-bahola-neutral-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild>
            <Link to="/categories">Start Shopping</Link>
          </Button>
        </div>
      )}
    </PageLayout>
  );
};

export default Cart;
