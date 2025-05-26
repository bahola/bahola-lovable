
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CreditCard, CheckCircle } from 'lucide-react';
import { Control, FieldValues, UseFormWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ConsultationPaymentProps {
  control: Control<any>;
  watch: UseFormWatch<FieldValues>;
  appointmentPrice: number;
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

export const ConsultationPayment = ({ control, watch, appointmentPrice }: ConsultationPaymentProps) => {
  const handleRazorpayPayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      toast.error("Razorpay SDK Failed to load");
      return;
    }

    // Get form data for prefill
    const customerName = watch("name") || "";
    const customerEmail = watch("email") || "";
    const customerPhone = watch("phone") || "";
    const appointmentDate = watch("appointmentDate");
    const appointmentTime = watch("appointmentTime") || "";

    // Basic validation
    if (!customerName || !customerEmail || !customerPhone || !appointmentDate || !appointmentTime) {
      toast.error("Please fill in all appointment details before proceeding with payment");
      return;
    }

    // Create appointment record in database first
    try {
      const { data: currentUser } = await supabase.auth.getUser();
      
      const appointmentData = {
        user_id: currentUser.user?.id || null,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        appointment_date: appointmentDate.toISOString().split('T')[0], // Convert to date format
        appointment_time: appointmentTime,
        consultation_type: 'in-person',
        amount: appointmentPrice,
        payment_status: 'pending'
      };

      const { data: appointment, error } = await supabase
        .from('appointments')
        .insert(appointmentData)
        .select()
        .single();

      if (error) {
        console.error('Error creating appointment:', error);
        toast.error("Failed to create appointment record");
        return;
      }

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace this with your actual Razorpay Key ID
        name: "Bahola Labs",
        currency: "INR",
        amount: appointmentPrice * 100, // Razorpay expects amount in paise
        description: "In-Person Consultation Fee",
        image: "/bahola-logo.png",
        handler: async function (response: any) {
          console.log("Payment successful:", response);
          
          // Update appointment with payment details
          try {
            const { error: updateError } = await supabase
              .from('appointments')
              .update({
                payment_id: response.razorpay_payment_id,
                payment_status: 'completed',
                updated_at: new Date().toISOString()
              })
              .eq('id', appointment.id);

            if (updateError) {
              console.error('Error updating payment status:', updateError);
              toast.error("Payment successful but failed to update record");
            } else {
              toast.success("Payment successful! Appointment confirmed.");
              
              // Redirect to confirmation page
              setTimeout(() => {
                window.location.href = "/appointment-confirmation";
              }, 1000);
            }
          } catch (updateError) {
            console.error('Error updating appointment:', updateError);
            toast.error("Payment successful but failed to update record");
          }
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        notes: {
          consultation_type: "in-person",
          appointment_date: appointmentDate?.toISOString(),
          appointment_time: appointmentTime,
          appointment_id: appointment.id,
        },
        theme: {
          color: "#1e3a8a", // Bahola blue color
        },
        modal: {
          ondismiss: async function() {
            // Update appointment status to cancelled if payment is dismissed
            await supabase
              .from('appointments')
              .update({ payment_status: 'cancelled' })
              .eq('id', appointment.id);
            
            toast.info("Payment cancelled");
          }
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error('Error creating appointment:', error);
      toast.error("Failed to create appointment. Please try again.");
    }
  };

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
        <Button 
          type="button" 
          className="w-full bg-bahola-blue-500 hover:bg-bahola-blue-600"
          onClick={handleRazorpayPayment}
        >
          Pay ₹{appointmentPrice.toLocaleString()} & Confirm Appointment
        </Button>
      </CardFooter>
    </Card>
  );
};
