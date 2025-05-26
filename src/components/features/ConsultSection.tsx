
import React from 'react';
import { Video, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export const ConsultSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Consult a Homeopath</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-bahola-neutral-200 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-bahola-blue-100 text-bahola-blue-500 mx-auto mb-6">
              <Calendar size={32} />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">In-Person Appointment</h3>
            <p className="text-bahola-neutral-600 text-center mb-6">
              Meet with our expert homeopaths for a personalized consultation in our Chennai clinic.
            </p>
            <Button className="w-full btn-bahola" asChild>
              <Link to="/book-appointment">
                Book Appointment
              </Link>
            </Button>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-bahola-neutral-200 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-bahola-blue-100 text-bahola-blue-500 mx-auto mb-6">
              <Video size={32} />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">Video Consultation</h3>
            <p className="text-bahola-neutral-600 text-center mb-6">
              Connect with our homeopaths from anywhere through secure video consultations.
            </p>
            <Button className="w-full btn-bahola" asChild>
              <Link to="/video-consultation">
                Book Video Call
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
