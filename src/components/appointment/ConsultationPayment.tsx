
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { Control, FieldValues, UseFormWatch } from 'react-hook-form';
import { processRazorpayPayment } from '@/utils/razorpayService';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { PaymentForm } from './PaymentForm';
import { ConsultationDetails } from './ConsultationDetails';

interface ConsultationPaymentProps {
  control: Control<any>;
  watch: UseFormWatch<FieldValues>;
  appointmentPrice: number;
}

export const ConsultationPayment = ({ control, watch, appointmentPrice }: ConsultationPaymentProps) => {
  const handleRazorpayPayment = async () => {
    const paymentData = {
      customerName: watch("name") || "",
      customerEmail: watch("email") || "",
      customerPhone: watch("phone") || "",
      appointmentDate: watch("appointmentDate"),
      appointmentTime: watch("appointmentTime") || "",
      amount: appointmentPrice,
      consultationType: 'in-person' as const
    };

    await processRazorpayPayment(paymentData);
  };

  return (
    <Card className="border-bahola-neutral-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-bahola-navy-950 font-helvetica">
          <CreditCard className="h-5 w-5 text-bahola-blue-500" />
          Consultation & Payment Details
        </CardTitle>
        <CardDescription className="font-serif text-bahola-neutral-600">
          Complete payment to confirm your appointment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <ConsultationDetails price={appointmentPrice} />
          <PaymentMethodSelector control={control} />
        </div>
        <PaymentForm watch={watch} />
      </CardContent>
      <CardFooter>
        <Button 
          type="button" 
          className="w-full bg-bahola-navy-950 hover:bg-bahola-navy-900 text-white font-helvetica"
          onClick={handleRazorpayPayment}
        >
          Pay ₹{appointmentPrice.toLocaleString()} & Confirm Appointment
        </Button>
      </CardFooter>
    </Card>
  );
};
