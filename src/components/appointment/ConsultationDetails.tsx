
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ConsultationDetailsProps {
  price: number;
}

export const ConsultationDetails = ({ price }: ConsultationDetailsProps) => {
  return (
    <div className="bg-bahola-navy-50 p-6 rounded-lg mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-bahola-navy-700 font-medium font-helvetica brand-subtitle">Homeopathic Consultation</p>
          <p className="text-2xl font-bold text-bahola-navy-950 font-helvetica tracking-brand-tight brand-emphasis">₹{price.toLocaleString()}</p>
        </div>
        <CheckCircle className="h-6 w-6 text-bahola-green-500" />
      </div>
      
      <div className="space-y-2 text-bahola-navy-600">
        <p className="flex items-center gap-2 brand-body">
          <CheckCircle className="h-4 w-4 text-bahola-green-500" />
          30-minute in-person consultation
        </p>
        <p className="flex items-center gap-2 brand-body">
          <CheckCircle className="h-4 w-4 text-bahola-green-500" />
          Expert homeopathic physician assessment
        </p>
        <p className="flex items-center gap-2 brand-body">
          <CheckCircle className="h-4 w-4 text-bahola-green-500" />
          Personalized treatment plan
        </p>
        <p className="flex items-center gap-2 brand-body">
          <CheckCircle className="h-4 w-4 text-bahola-green-500" />
          <span className="brand-emphasis text-bahola-navy-950">15-day follow-up reviews included</span>
        </p>
      </div>
    </div>
  );
};
