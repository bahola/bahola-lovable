
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Banknote, Wallet } from 'lucide-react';

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = React.useState('card');

  return (
    <PageLayout title="Payment Methods" description="Choose your preferred payment method">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Select Payment Method</CardTitle>
            <CardDescription>
              We use Razorpay as our secure payment processor. Your payment information is never stored on our servers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-4">
              <div className={`flex items-center space-x-3 border rounded-lg p-4 ${selectedMethod === 'card' ? 'border-bahola-blue-500 bg-bahola-blue-50' : 'border-gray-200'}`}>
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer">
                  <CreditCard className="h-5 w-5 text-bahola-blue-500" />
                  <div>
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-gray-500">Pay securely with your card</p>
                  </div>
                </Label>
              </div>
              
              <div className={`flex items-center space-x-3 border rounded-lg p-4 ${selectedMethod === 'upi' ? 'border-bahola-blue-500 bg-bahola-blue-50' : 'border-gray-200'}`}>
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer">
                  <Wallet className="h-5 w-5 text-bahola-blue-500" />
                  <div>
                    <p className="font-medium">UPI</p>
                    <p className="text-sm text-gray-500">Pay instantly with UPI apps like Google Pay, PhonePe, etc.</p>
                  </div>
                </Label>
              </div>
              
              <div className={`flex items-center space-x-3 border rounded-lg p-4 ${selectedMethod === 'cod' ? 'border-bahola-blue-500 bg-bahola-blue-50' : 'border-gray-200'}`}>
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer">
                  <Banknote className="h-5 w-5 text-bahola-blue-500" />
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when you receive your order</p>
                    <p className="text-xs text-bahola-neutral-500 mt-1">Available for orders under ₹10,000</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
            
            {selectedMethod === 'card' && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <input 
                      type="text" 
                      id="cardName" 
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bahola-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <input 
                      type="text" 
                      id="cardNumber" 
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bahola-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <input 
                      type="text" 
                      id="expiry"
                      placeholder="MM/YY"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bahola-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <input 
                      type="text" 
                      id="cvv" 
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bahola-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full">Proceed to Pay</Button>
          </CardFooter>
        </Card>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-2">Secure Payments</h3>
          <p className="text-bahola-neutral-600">
            All transactions are secured and encrypted. We never store your payment details on our servers.
            For any payment-related issues, please contact our customer support.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default PaymentMethods;
