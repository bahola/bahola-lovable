
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Razorpay integration function
export const initializeRazorpay = () => {
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

interface PaymentData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  appointmentDate: Date;
  appointmentTime: string;
  amount: number;
  consultationType: 'in-person' | 'video';
}

export const processRazorpayPayment = async (paymentData: PaymentData) => {
  const res = await initializeRazorpay();

  if (!res) {
    toast.error("Razorpay SDK Failed to load");
    return;
  }

  // Basic validation
  if (!paymentData.customerName || !paymentData.customerEmail || !paymentData.customerPhone || !paymentData.appointmentDate || !paymentData.appointmentTime) {
    toast.error("Please fill in all appointment details before proceeding with payment");
    return;
  }

  // Create appointment record in database first
  try {
    const { data: currentUser } = await supabase.auth.getUser();
    
    const appointmentData = {
      user_id: currentUser.user?.id || null,
      customer_name: paymentData.customerName,
      customer_email: paymentData.customerEmail,
      customer_phone: paymentData.customerPhone,
      appointment_date: paymentData.appointmentDate.toISOString().split('T')[0],
      appointment_time: paymentData.appointmentTime,
      consultation_type: paymentData.consultationType,
      amount: paymentData.amount,
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
      amount: paymentData.amount * 100,
      description: paymentData.consultationType === 'in-person' ? "In-Person Consultation Fee" : "Video Consultation Fee",
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
            toast.success(`Payment successful! ${paymentData.consultationType === 'in-person' ? 'Appointment' : 'Video consultation'} confirmed.`);
            
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
        name: paymentData.customerName,
        email: paymentData.customerEmail,
        contact: paymentData.customerPhone,
      },
      notes: {
        consultation_type: paymentData.consultationType,
        appointment_date: paymentData.appointmentDate?.toISOString(),
        appointment_time: paymentData.appointmentTime,
        appointment_id: appointment.id,
      },
      theme: {
        color: "#1e3a8a",
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
