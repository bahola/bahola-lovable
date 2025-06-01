
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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

interface PaymentHandlerProps {
  consultationPrice: number;
  onPaymentSuccess: (paymentDetails: any) => void;
}

export const handleVideoConsultationPayment = async ({ consultationPrice, onPaymentSuccess }: PaymentHandlerProps) => {
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
