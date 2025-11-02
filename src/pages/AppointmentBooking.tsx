import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Video, Calendar, Clock, CheckCircle } from 'lucide-react';

const AppointmentBooking = () => {
  return (
    <PageLayout title="Video Consultation" description="Connect with our expert homeopathic physicians from the comfort of your home">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Video size={40} className="text-blue-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Video Consultation Coming Soon
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            We're working hard to bring you the convenience of online consultations with our expert homeopathic physicians.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <Video size={24} className="text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">HD Video Calls</h3>
              <p className="text-sm text-gray-600">Crystal clear video consultations with our physicians</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Calendar size={24} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
              <p className="text-sm text-gray-600">Book appointments at your convenience</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                <CheckCircle size={24} className="text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Care</h3>
              <p className="text-sm text-gray-600">Consultation with qualified homeopathic doctors</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Stay Updated</h3>
            <p className="text-gray-700 mb-4">
              We'll notify our customers as soon as video consultations become available. In the meantime, explore our range of homeopathic remedies and health resources.
            </p>
            <a 
              href="/" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Browse Products
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AppointmentBooking;
