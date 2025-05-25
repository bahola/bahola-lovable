
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CreditCard, CheckCircle } from 'lucide-react';
import { Control, FieldValues, UseFormWatch } from 'react-hook-form';

interface ConsultationPaymentProps {
  control: Control<any>;
  watch: UseFormWatch<FieldValues>;
  appointmentPrice: number;
}

export const ConsultationPayment = ({ control, watch, appointmentPrice }: ConsultationPaymentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-bahola-blue-500" />
          Consultation & Payment Details
        </CardTitle>
        <CardDescription>
          Complete payment to confirm your appointment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="bg-bahola-blue-50 p-6 rounded-lg mb-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-bahola-blue-700 font-medium">Homeopathic Consultation</p>
                <p className="text-2xl font-bold text-bahola-blue-800">₹{appointmentPrice.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            
            <div className="space-y-2 text-sm text-bahola-blue-600">
              <p className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                30-minute in-person consultation
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Expert homeopathic physician assessment
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Personalized treatment plan
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <strong>15-day follow-up reviews included</strong>
              </p>
            </div>
          </div>
          
          <FormField
            control={control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi">UPI Payment</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {watch("paymentMethod") === "card" && (
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
        )}

        {watch("paymentMethod") === "upi" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="upiId">UPI ID</Label>
              <Input id="upiId" placeholder="yourname@upi" className="mt-1" />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full bg-bahola-blue-500 hover:bg-bahola-blue-600">
          Pay ₹{appointmentPrice.toLocaleString()} & Confirm Appointment
        </Button>
      </CardFooter>
    </Card>
  );
};
