
import React from 'react';
import { Video, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export const ConsultSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {/* Doctor consultation image */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <h2 className="section-title text-left mb-6">Consult a Homeopath</h2>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/0108ad38-606a-475c-a72b-c841b9ba5dae.png" 
                alt="Doctor consultation session"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Appointment blocks */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full pt-16">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-bahola-neutral-200 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-bahola-blue-100 text-bahola-blue-500 mx-auto mb-6">
                  <Calendar size={32} />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">In-Person Appointment</h3>
                <p className="text-bahola-neutral-600 text-center mb-6 flex-grow">
                  Meet with our expert homeopaths for a personalized consultation in our Chennai clinic.
                </p>
                <Button className="w-full btn-bahola mt-auto" asChild>
                  <Link to="/book-appointment">
                    Book Appointment
                  </Link>
                </Button>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border border-bahola-neutral-200 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-bahola-blue-100 text-bahola-blue-500 mx-auto mb-6">
                  <Video size={32} />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Video Consultation</h3>
                <p className="text-bahola-neutral-600 text-center mb-6 flex-grow">
                  Connect with our homeopaths from anywhere through secure video consultations.
                </p>
                <Button className="w-full btn-bahola mt-auto" asChild>
                  <Link to="/video-consultation">
                    Book Video Call
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
