
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Video, CheckCircle, CreditCard } from 'lucide-react';
import { Control, FieldValues, UseFormWatch } from 'react-hook-form';
import { toast } from 'sonner';

interface VideoConsultationPaymentProps {
  control: Control<any>;
  watch: UseFormWatch<FieldValues>;
  consultationPrice: number;
}

// Razorpay integration function
const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const VideoConsultationPayment = ({ control, watch, consultationPrice }: VideoConsultationPaymentProps) => {
  const handleRazorpayPayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      toast.error("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to create order (in real app, this would be your backend endpoint)
    const data = {
      amount: consultationPrice * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `video_consultation_${Date.now()}`,
    };

    const options = {
      key: "rzp_test_9999999999", // Replace with your Razorpay key
      name: "Bahola Labs",
      currency: data.currency,
      amount: data.amount,
      order_id: `order_${Date.now()}`, // In real app, this comes from your backend
      description: "Video Consultation Fee",
      image: "/bahola-logo.png",
      handler: function (response: any) {
        // Verify payment on your server (in real app)
        console.log("Payment successful:", response);
        toast.success("Payment successful! Video consultation confirmed.");
        
        // Redirect to confirmation page or handle success
        setTimeout(() => {
          window.location.href = "/appointment-confirmation";
        }, 1000);
      },
      prefill: {
        name: watch("name"),
        email: watch("email"),
        contact: watch("phone"),
      },
      notes: {
        consultation_type: "video",
        appointment_date: watch("appointmentDate"),
        appointment_time: watch("appointmentTime"),
      },
      theme: {
        color: "#1e3a8a", // Bahola blue color
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5 text-bahola-blue-500" />
          Video Consultation & Payment Details
        </CardTitle>
        <CardDescription>
          Complete payment to confirm your video consultation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="bg-bahola-blue-50 p-6 rounded-lg mb-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-bahola-blue-700 font-medium">Video Consultation</p>
                <p className="text-2xl font-bold text-bahola-blue-800">₹{consultationPrice.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            
            <div className="space-y-2 text-sm text-bahola-blue-600">
              <p className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                30-minute secure video consultation
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Expert homeopathic physician assessment
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Digital prescription and treatment plan
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <strong>15-day follow-up reviews included</strong>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <strong>Recorded session for future reference</strong>
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
        <Button 
          type="button" 
          className="w-full bg-bahola-blue-500 hover:bg-bahola-blue-600"
          onClick={handleRazorpayPayment}
        >
          Pay ₹{consultationPrice.toLocaleString()} via Razorpay
        </Button>
      </CardFooter>
    </Card>
  );
};
