
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
import { supabase } from '@/integrations/supabase/client';

interface VideoConsultationPaymentProps {
  onPaymentSuccess: (paymentDetails: any) => void;
  consultationPrice?: number;
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

export const VideoConsultationPayment = ({ onPaymentSuccess, consultationPrice = 500 }: VideoConsultationPaymentProps) => {
  const handleRazorpayPayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      toast.error("Razorpay SDK Failed to load");
      return;
    }

    try {
      const { data: currentUser } = await supabase.auth.getUser();
      
      // For demo purposes, we'll use mock data or current user data
      const customerName = currentUser.user?.user_metadata?.name || "Demo User";
      const customerEmail = currentUser.user?.email || "demo@example.com";
      const customerPhone = currentUser.user?.user_metadata?.phone || "1234567890";

      const appointmentData = {
        user_id: currentUser.user?.id || null,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        appointment_date: new Date().toISOString().split('T')[0],
        appointment_time: new Date().toLocaleTimeString(),
        consultation_type: 'video',
        amount: consultationPrice,
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

      const RAZORPAY_KEY_ID = "rzp_live_VQHpUDc1myNrvm";

      const options = {
        key: RAZORPAY_KEY_ID,
        name: "Bahola Labs",
        currency: "INR",
        amount: consultationPrice * 100,
        description: "Video Consultation Fee",
        image: "/bahola-logo.png",
        handler: async function (response: any) {
          console.log("Payment successful:", response);
          
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
              toast.success("Payment successful! Video consultation confirmed.");
              onPaymentSuccess({
                appointmentId: appointment.id,
                paymentId: response.razorpay_payment_id
              });
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
          consultation_type: "video",
          appointment_id: appointment.id,
        },
        theme: {
          color: "#003366",
        },
        modal: {
          ondismiss: async function() {
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
    <Card className="border-bahola-neutral-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-bahola-navy-950 font-helvetica">
          <Video className="h-5 w-5 text-bahola-blue-500" />
          Video Consultation & Payment Details
        </CardTitle>
        <CardDescription className="font-serif text-bahola-neutral-600">
          Complete payment to confirm your video consultation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="bg-bahola-navy-50 p-6 rounded-lg mb-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-bahola-navy-700 font-medium font-helvetica">Video Consultation</p>
                <p className="text-2xl font-bold text-bahola-navy-950 font-helvetica">₹{consultationPrice.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-bahola-green-500" />
            </div>
            
            <div className="space-y-2 text-sm text-bahola-navy-600">
              <p className="flex items-center gap-2 font-serif">
                <CheckCircle className="h-4 w-4 text-bahola-green-500" />
                30-minute secure video consultation
              </p>
              <p className="flex items-center gap-2 font-serif">
                <CheckCircle className="h-4 w-4 text-bahola-green-500" />
                Expert homeopathic physician assessment
              </p>
              <p className="flex items-center gap-2 font-serif">
                <CheckCircle className="h-4 w-4 text-bahola-green-500" />
                Digital prescription and treatment plan
              </p>
              <p className="flex items-center gap-2 font-serif">
                <CheckCircle className="h-4 w-4 text-bahola-green-500" />
                <strong>15-day follow-up reviews included</strong>
              </p>
              <p className="flex items-center gap-2 font-serif">
                <CheckCircle className="h-4 w-4 text-bahola-green-500" />
                <strong>Recorded session for future reference</strong>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          type="button" 
          className="w-full bg-bahola-navy-950 hover:bg-bahola-navy-900 text-white font-helvetica"
          onClick={handleRazorpayPayment}
        >
          Pay ₹{consultationPrice.toLocaleString()} via Razorpay
        </Button>
      </CardFooter>
    </Card>
  );
};
