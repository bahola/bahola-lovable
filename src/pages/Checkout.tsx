import React, { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CreditCard, Building, Home, Shield, ShoppingBag, X, Loader2, Tag } from 'lucide-react';
import { useCart } from '@/contexts/CartAdapter';
import ShippingCalculator from '@/components/shipping/ShippingCalculator';
import { useCouponCode } from '@/hooks/useCouponCode';
import { useToast } from '@/hooks/use-toast';
import { generateOrderNumber, saveOrder, storeOrderLocally, OrderData } from '@/utils/orderService';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gstin: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [addressType, setAddressType] = useState<'home' | 'work'>('home');
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('cod');
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingZone, setShippingZone] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gstin: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });
  
  const { 
    items, 
    getSubtotal, 
    discountTotal, 
    appliedCoupon, 
    updateCart, 
    submitOrder, 
    clearCart 
  } = useCart();
  
  const {
    couponCode,
    setCouponCode,
    isApplying,
    isRemoving,
    applyCoupon,
    removeCoupon,
  } = useCouponCode();
  
  // Calculate order summary - MRP is tax-inclusive
  const subtotal = getSubtotal();
  const discount = discountTotal || 0;
  const total = subtotal - discount + shippingCost;

  const handleShippingUpdate = (cost: number, zone?: string) => {
    setShippingCost(cost);
    setShippingZone(zone || '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    // Special handling for pincode - only digits, max 6
    if (id === 'pincode') {
      const cleanedValue = value.replace(/\D/g, '').slice(0, 6);
      setFormData(prev => ({ ...prev, [id]: cleanedValue }));
      return;
    }
    
    // Special handling for GSTIN - uppercase, max 15
    if (id === 'gstin') {
      const cleanedValue = value.toUpperCase().slice(0, 15);
      setFormData(prev => ({ ...prev, [id]: cleanedValue }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validateForm = (): boolean => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'addressLine1', 'city', 'state', 'pincode'];
    for (const field of required) {
      if (!formData[field as keyof FormData].trim()) {
        toast({
          title: 'Missing Information',
          description: `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
          variant: 'destructive',
        });
        return false;
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return false;
    }
    
    // Validate pincode
    if (formData.pincode.length !== 6) {
      toast({
        title: 'Invalid Pincode',
        description: 'Please enter a valid 6-digit pincode',
        variant: 'destructive',
      });
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (items.length === 0) {
      toast({
        title: 'Empty Cart',
        description: 'Please add items to your cart before checkout',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Update Swell cart with customer info
      await updateCart({
        account: {
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
        },
        shipping: {
          name: `${formData.firstName} ${formData.lastName}`,
          address1: formData.addressLine1,
          address2: formData.addressLine2 || undefined,
          city: formData.city,
          state: formData.state,
          zip: formData.pincode,
          country: 'IN',
          phone: formData.phone,
        },
        billing: {
          name: `${formData.firstName} ${formData.lastName}`,
          address1: formData.addressLine1,
          address2: formData.addressLine2 || undefined,
          city: formData.city,
          state: formData.state,
          zip: formData.pincode,
          country: 'IN',
          phone: formData.phone,
        },
      });
      
      if (paymentMethod === 'cod') {
        // For COD, submit order directly
        const swellOrder = await submitOrder();
        console.log('[Checkout] Swell order result:', swellOrder);
        
        // Generate order number and save to Supabase
        const orderNumber = generateOrderNumber();
        const orderData: OrderData = {
          orderNumber,
          swellOrderId: swellOrder?.id || swellOrder?.number,
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            addressType,
          },
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          subtotal,
          discountAmount: discount,
          shippingCost,
          total,
          couponCode: appliedCoupon?.code,
          gstin: formData.gstin || undefined,
          paymentMethod: 'cod',
          paymentStatus: 'pending',
          orderStatus: 'processing',
        };
        
        // Save to Supabase
        const saveResult = await saveOrder(orderData);
        if (!saveResult.success) {
          console.error('[Checkout] Failed to save order to Supabase:', saveResult.error);
        }
        
        // Store locally for confirmation page
        storeOrderLocally(orderData);
        
        // Clear cart
        await clearCart();
        
        // Redirect to thank you page
        navigate(`/thank-you?order=${orderNumber}`);
      } else {
        // Razorpay - to be implemented
        toast({
          title: 'Coming Soon',
          description: 'Razorpay payment integration is coming soon. Please use Cash on Delivery for now.',
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('[Checkout] Error submitting order:', error);
      toast({
        title: 'Order Failed',
        description: error instanceof Error ? error.message : 'Failed to place order. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };
  
  return (
    <PageLayout title="Checkout" description="Complete your purchase securely">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">Contact Information</h2>
                <p className="text-sm text-bahola-neutral-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-bahola-blue-500 hover:underline font-medium">
                    Log in
                  </Link>
                </p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gstin" className="text-bahola-neutral-600">
                    Have GSTIN Number? (optional)
                  </Label>
                  <Input 
                    id="gstin" 
                    placeholder="Enter 15-digit GSTIN"
                    value={formData.gstin}
                    onChange={handleInputChange}
                    maxLength={15}
                  />
                </div>

                {/* Coupon Code Section */}
                <div className="pt-2 space-y-2">
                  <Label htmlFor="coupon" className="text-bahola-neutral-600">
                    Have a coupon code?
                  </Label>
                  
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-700">{appliedCoupon.code}</span>
                        <span className="text-green-600 text-sm">
                          (-₹{Math.round(appliedCoupon.discountTotal)})
                        </span>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={removeCoupon}
                        disabled={isRemoving}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        {isRemoving ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input 
                        id="coupon" 
                        placeholder="Enter coupon code"
                        className="flex-1"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={applyCoupon}
                        disabled={isApplying || !couponCode.trim()}
                      >
                        {isApplying ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Apply'}
                      </Button>
                    </div>
                  )}
                  
                  <Link 
                    to="/promo-pocket" 
                    className="text-bahola-blue-500 hover:underline text-xs"
                  >
                    Browse available coupons in Promo Pocket →
                  </Link>
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
                  <Input 
                    id="addressLine1" 
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                  <Input 
                    id="addressLine2" 
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      value={formData.city}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input 
                      id="state" 
                      value={formData.state}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input 
                      id="pincode" 
                      value={formData.pincode}
                      onChange={handleInputChange}
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
              defaultPincode={formData.pincode}
            />
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Payment Method</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <button 
                    type="button"
                    className={`w-full border rounded-lg p-4 cursor-pointer text-left ${paymentMethod === 'cod' ? 'border-bahola-blue-500 bg-bahola-blue-50' : 'border-gray-300'}`}
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
                  </button>
                  
                  <button 
                    type="button"
                    className={`w-full border rounded-lg p-4 cursor-pointer text-left ${paymentMethod === 'razorpay' ? 'border-bahola-blue-500 bg-bahola-blue-50' : 'border-gray-300'}`}
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
                  </button>
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
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount {appliedCoupon && `(${appliedCoupon.code})`}</span>
                      <span>-₹{Math.round(discount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Shipping {shippingZone && `(${shippingZone})`}</span>
                    <span>{shippingCost === 0 ? 'Calculate above' : `₹${shippingCost}`}</span>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{Math.round(total)}</span>
                    </div>
                    <p className="text-bahola-neutral-500 text-xs mt-1">
                      (MRP inclusive of GST{shippingCost > 0 ? ' + Shipping' : ''})
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full lg:w-auto"
              disabled={isSubmitting || items.length === 0}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Place Order'
              )}
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
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount {appliedCoupon && `(${appliedCoupon.code})`}</span>
                    <span>-₹{Math.round(discount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-bahola-neutral-600">
                    Shipping {shippingZone && `(${shippingZone})`}
                  </span>
                  <span>{shippingCost === 0 ? 'Calculate above' : `₹${shippingCost}`}</span>
                </div>
                
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{Math.round(total)}</span>
                </div>
                <p className="text-bahola-neutral-500 text-xs mt-1">
                  (MRP inclusive of GST{shippingCost > 0 ? ' + Shipping' : ''})
                </p>
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
