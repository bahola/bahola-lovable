
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import { VideoConsultationDetails } from './VideoConsultationDetails';
import { handleVideoConsultationPayment } from '@/utils/videoConsultationPayment';

interface VideoConsultationPaymentProps {
  onPaymentSuccess: (paymentDetails: any) => void;
  consultationPrice?: number;
}

export const VideoConsultationPayment = ({ onPaymentSuccess, consultationPrice = 500 }: VideoConsultationPaymentProps) => {
  const handlePayment = () => {
    handleVideoConsultationPayment({
      consultationPrice,
      onPaymentSuccess
    });
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
        <VideoConsultationDetails consultationPrice={consultationPrice} />
      </CardContent>
      <CardFooter>
        <Button 
          type="button" 
          className="w-full bg-bahola-navy-950 hover:bg-bahola-navy-900 text-white font-helvetica"
          onClick={handlePayment}
        >
          Pay ₹{consultationPrice.toLocaleString()} via Razorpay
        </Button>
      </CardFooter>
    </Card>
  );
};
