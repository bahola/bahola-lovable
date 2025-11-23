
import React, { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CreditCard, Building, Home, Shield, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartAdapter';
import ShippingCalculator from '@/components/shipping/ShippingCalculator';

const Checkout = () => {
  const [addressType, setAddressType] = useState('home');
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingZone, setShippingZone] = useState<string>('');
  const [pincode, setPincode] = useState('');
  const { items, getSubtotal, getTotalTax } = useCart();
  
  // Calculate order summary using cart methods
  const subtotal = getSubtotal();
  const tax = getTotalTax();
  const total = subtotal + shippingCost + tax;

  const handleShippingUpdate = (cost: number, zone?: string) => {
    setShippingCost(cost);
    setShippingZone(zone || '');
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would handle payment processing in a real app
    console.log('Processing order...');
    // After successful payment, redirect to order confirmation
    window.location.href = '/thank-you';
  };
  
  return (
    <PageLayout title="Checkout" description="Complete your purchase securely">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Contact Information</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" required />
                </div>
              </div>
            </div>
            
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Shipping Address</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex space-x-4 mb-4">
                  <button
                    type="button"
                    className={`flex flex-1 items-center justify-center p-3 border rounded-lg ${addressType === 'home' ? 'border-bahola-blue-500 bg-bahola-blue-50' : 'border-gray-300'}`}
                    onClick={() => setAddressType('home')}
                  >
                    <Home className={`mr-2 h-5 w-5 ${addressType === 'home' ? 'text-bahola-blue-500' : 'text-gray-500'}`} />
                    <span className={addressType === 'home' ? 'font-medium' : ''}>Home</span>
                  </button>
                  
                  <button
                    type="button"
                    className={`flex flex-1 items-center justify-center p-3 border rounded-lg ${addressType === 'work' ? 'border-bahola-blue-500 bg-bahola-blue-50' : 'border-gray-300'}`}
                    onClick={() => setAddressType('work')}
                  >
                    <Building className={`mr-2 h-5 w-5 ${addressType === 'work' ? 'text-bahola-blue-500' : 'text-gray-500'}`} />
                    <span className={addressType === 'work' ? 'font-medium' : ''}>Work</span>
                  </button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <Input id="addressLine1" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                  <Input id="addressLine2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input 
                      id="pincode" 
                      value={pincode}
                      onChange={handlePincodeChange}
                      placeholder="Enter 6-digit pincode"
                      maxLength={6}
                      required 
                    />
                  </div>
                </div>
                
                <div className="flex items-center mt-4">
                  <Checkbox id="saveAddress" />
                  <Label htmlFor="saveAddress" className="ml-2">Save this address for future orders</Label>
                </div>
              </div>
            </div>

            {/* Shipping Calculator */}
            <ShippingCalculator 
              onShippingUpdate={handleShippingUpdate}
              defaultPincode={pincode}
            />
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Payment Method</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'razorpay' ? 'border-bahola-blue-500 bg-bahola-blue-50' : 'border-gray-300'}`}
                    onClick={() => setPaymentMethod('razorpay')}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${paymentMethod === 'razorpay' ? 'border-bahola-blue-500' : 'border-gray-300'}`}>
                        {paymentMethod === 'razorpay' && <div className="w-3 h-3 rounded-full bg-bahola-blue-500"></div>}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">Razorpay</h3>
                        <p className="text-sm text-bahola-neutral-600">Pay securely with credit/debit card, UPI, or net banking</p>
                      </div>
                      <CreditCard className="h-6 w-6 text-bahola-neutral-500" />
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'cod' ? 'border-bahola-blue-500 bg-bahola-blue-50' : 'border-gray-300'}`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-bahola-blue-500' : 'border-gray-300'}`}>
                        {paymentMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-bahola-blue-500"></div>}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">Cash on Delivery</h3>
                        <p className="text-sm text-bahola-neutral-600">Pay when your order is delivered</p>
                      </div>
                      <ShoppingBag className="h-6 w-6 text-bahola-neutral-500" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="ml-2 text-sm">
                    I agree to the <Link to="/terms" className="text-bahola-blue-500 hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-bahola-blue-500 hover:underline">Privacy Policy</Link>
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="lg:hidden">
              {/* Order Summary for Mobile */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">Order Summary</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{Math.round(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping {shippingZone && `(${shippingZone})`}</span>
                    <span>{shippingCost === 0 ? 'Calculate above' : `₹${shippingCost}`}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax (GST)</span>
                    <span>₹{Math.round(tax)}</span>
                  </div>
                  
                  <div className="border-t pt-4 mt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{Math.round(total)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button type="submit" className="w-full lg:w-auto">
              Place Order
            </Button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Order Summary</h2>
            </div>
            
            <div className="p-6">
              <ul className="space-y-4 mb-6">
                {items.map(item => (
                  <li key={item.id} className="flex justify-between">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-bahola-neutral-500 ml-1">x{item.quantity}</span>
                      <div className="text-xs text-bahola-neutral-400">
                        {item.taxStatus === 'non-taxable' ? 'Non-taxable' : `${item.taxClass || '5'}% GST`}
                      </div>
                    </div>
                    <span>₹{Math.round(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-bahola-neutral-600">Subtotal</span>
                  <span>₹{Math.round(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-bahola-neutral-600">
                    Shipping {shippingZone && `(${shippingZone})`}
                  </span>
                  <span>{shippingCost === 0 ? 'Calculate above' : `₹${shippingCost}`}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-bahola-neutral-600">Tax (GST)</span>
                  <span>₹{Math.round(tax)}</span>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{Math.round(total)}</span>
                </div>
              </div>
              
              <div className="mt-6 bg-green-50 p-4 rounded-lg flex items-start">
                <Shield className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-800">
                  Your payment information is encrypted and securely processed. We do not store your card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Checkout;
