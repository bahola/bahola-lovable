
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { UseFormWatch } from 'react-hook-form';

interface PaymentFormProps {
  watch: UseFormWatch<any>;
}

export const PaymentForm = ({ watch }: PaymentFormProps) => {
  const paymentMethod = watch("paymentMethod");

  if (paymentMethod === "card") {
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="cardName">Name on Card</Label>
          <Input id="cardName" placeholder="John Doe" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input id="expiry" placeholder="MM/YY" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input id="cvv" placeholder="123" className="mt-1" />
          </div>
        </div>
      </div>
    );
  }

  if (paymentMethod === "upi") {
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="upiId">UPI ID</Label>
          <Input id="upiId" placeholder="yourname@upi" className="mt-1" />
        </div>
      </div>
    );
  }

  return null;
};
