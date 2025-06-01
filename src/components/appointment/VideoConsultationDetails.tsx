
import React from 'react';
import { CheckCircle, Video } from 'lucide-react';

interface VideoConsultationDetailsProps {
  consultationPrice: number;
}

export const VideoConsultationDetails = ({ consultationPrice }: VideoConsultationDetailsProps) => {
  return (
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
  );
};
