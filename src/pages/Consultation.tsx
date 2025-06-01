
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Video, Clock, Users, Shield, Heart, CheckCircle, ArrowRight } from 'lucide-react';

const Consultation = () => {
  return (
    <PageLayout title="Homeopathic Consultations" description="Choose the consultation type that works best for you">
      <div className="max-w-6xl mx-auto">
        
        {/* Introduction Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-bahola-navy-950">Expert Homeopathic Care</h2>
          <p className="text-lg text-bahola-neutral-700 max-w-3xl mx-auto">
            Connect with our experienced homeopaths for personalized treatment plans. 
            Choose between in-person consultations at our Chennai clinic or convenient video consultations from anywhere.
          </p>
        </div>

        {/* Consultation Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* In-Person Consultation */}
          <div className="bg-white rounded-xl shadow-lg border border-bahola-neutral-200 overflow-hidden">
            <div className="bg-bahola-blue-50 p-6 text-center">
              <Calendar className="mx-auto h-16 w-16 text-bahola-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-bahola-navy-950 mb-2">In-Person Consultation</h3>
              <p className="text-bahola-neutral-600">Comprehensive face-to-face consultation</p>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-bahola-blue-600">₹1,000</span>
                <span className="text-bahola-neutral-500 ml-2">per consultation</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-bahola-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-bahola-neutral-700">Detailed physical examination</span>
                </li>
                <li className="flex items-start">
                  <Heart className="h-5 w-5 text-bahola-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-bahola-neutral-700">Comprehensive case taking</span>
                </li>
                <li className="flex items-start">
                  <Users className="h-5 w-5 text-bahola-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-bahola-neutral-700">Direct interaction with homeopath</span>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-bahola-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-bahola-neutral-700">30 minute session</span>
                </li>
              </ul>
              
              <div className="bg-bahola-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-bahola-blue-700">
                  <strong>Location:</strong> 2, Tiger Varachari Road, Kalakshetra Colony, Besant Nagar, Chennai – 600090
                </p>
              </div>
              
              <Button className="w-full btn-bahola" asChild>
                <Link to="/book-appointment">
                  Book In-Person Appointment
                </Link>
              </Button>
            </div>
          </div>

          {/* Video Consultation */}
          <div className="bg-white rounded-xl shadow-lg border border-bahola-neutral-200 overflow-hidden">
            <div className="bg-bahola-green-50 p-6 text-center">
              <Video className="mx-auto h-16 w-16 text-bahola-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-bahola-navy-950 mb-2">Video Consultation</h3>
              <p className="text-bahola-neutral-600">Convenient online consultation</p>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-bahola-green-600">₹500</span>
                <span className="text-bahola-neutral-500 ml-2">per consultation</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Video className="h-5 w-5 text-bahola-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-bahola-neutral-700">High-quality video consultation</span>
                </li>
                <li className="flex items-start">
                  <Heart className="h-5 w-5 text-bahola-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-bahola-neutral-700">Detailed symptom analysis</span>
                </li>
                <li className="flex items-start">
                  <Users className="h-5 w-5 text-bahola-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-bahola-neutral-700">Consultation from anywhere</span>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-bahola-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-bahola-neutral-700">30 minute session</span>
                </li>
              </ul>
              
              <div className="bg-bahola-green-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-bahola-green-700">
                  <strong>Perfect for:</strong> Follow-ups, acute conditions, and patients unable to visit our clinic
                </p>
              </div>
              
              <Button className="w-full bg-bahola-green-600 hover:bg-bahola-green-700" asChild>
                <Link to="/video-consultation">
                  Book Video Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="bg-white rounded-xl shadow-lg border border-bahola-neutral-200 p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6 text-bahola-navy-950 text-center">How It Works - Step by Step</h3>
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* In-Person Steps */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-bahola-blue-600 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                In-Person Consultation Process
              </h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-bahola-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-bahola-blue-600 font-semibold mr-4 mt-0.5 flex-shrink-0">1</div>
                  <div>
                    <h5 className="font-medium text-bahola-navy-900">Book Your Appointment</h5>
                    <p className="text-sm text-bahola-neutral-600">Select your preferred date and time slot online</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-bahola-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-bahola-blue-600 font-semibold mr-4 mt-0.5 flex-shrink-0">2</div>
                  <div>
                    <h5 className="font-medium text-bahola-navy-900">Complete Payment</h5>
                    <p className="text-sm text-bahola-neutral-600">Secure online payment of ₹1,000 to confirm your slot</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-bahola-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-bahola-blue-600 font-semibold mr-4 mt-0.5 flex-shrink-0">3</div>
                  <div>
                    <h5 className="font-medium text-bahola-navy-900">Receive Confirmation</h5>
                    <p className="text-sm text-bahola-neutral-600">Get appointment details and clinic address via email/SMS</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-bahola-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-bahola-blue-600 font-semibold mr-4 mt-0.5 flex-shrink-0">4</div>
                  <div>
                    <h5 className="font-medium text-bahola-navy-900">Visit Our Clinic</h5>
                    <p className="text-sm text-bahola-neutral-600">Arrive 10 minutes early at our Besant Nagar clinic</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-bahola-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-bahola-blue-600 font-semibold mr-4 mt-0.5 flex-shrink-0">5</div>
                  <div>
                    <h5 className="font-medium text-bahola-navy-900">Consultation & Treatment</h5>
                    <p className="text-sm text-bahola-neutral-600">30-minute session with physical examination and personalized remedy</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Steps */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-bahola-green-600 flex items-center">
                <Video className="h-5 w-5 mr-2" />
                Video Consultation Process
              </h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-bahola-green-100 rounded-full w-8 h-8 flex items-center justify-center text-bahola-green-600 font-semibold mr-4 mt-0.5 flex-shrink-0">1</div>
                  <div>
                    <h5 className="font-medium text-bahola-navy-900">Schedule Online</h5>
                    <p className="text-sm text-bahola-neutral-600">Choose your preferred date and time for video call</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-bahola-green-100 rounded-full w-8 h-8 flex items-center justify-center text-bahola-green-600 font-semibold mr-4 mt-0.5 flex-shrink-0">2</div>
                  <div>
                    <h5 className="font-medium text-bahola-navy-900">Make Payment</h5>
                    <p className="text-sm text-bahola-neutral-600">Secure payment of ₹500 to confirm your video session</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-bahola-green-100 rounded-full w-8 h-8 flex items-center justify-center text-bahola-green-600 font-semibold mr-4 mt-0.5 flex-shrink-0">3</div>
                  <div>
                    <h5 className="font-medium text-bahola-navy-900">Get Video Link</h5>
                    <p className="text-sm text-bahola-neutral-600">Receive secure video consultation link via email</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-bahola-green-100 rounded-full w-8 h-8 flex items-center justify-center text-bahola-green-600 font-semibold mr-4 mt-0.5 flex-shrink-0">4</div>
                  <div>
                    <h5 className="font-medium text-bahola-navy-900">Join Video Call</h5>
                    <p className="text-sm text-bahola-neutral-600">Connect from anywhere using your device camera and microphone</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-bahola-green-100 rounded-full w-8 h-8 flex items-center justify-center text-bahola-green-600 font-semibold mr-4 mt-0.5 flex-shrink-0">5</div>
                  <div>
                    <h5 className="font-medium text-bahola-navy-900">Receive Digital Prescription</h5>
                    <p className="text-sm text-bahola-neutral-600">30-minute consultation with digital treatment plan delivered to your email</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What to Expect Section */}
        <div className="bg-bahola-navy-50 p-8 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-bahola-navy-950">What to Expect During Your Consultation</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-bahola-navy-900">Before Your Consultation</h4>
              <ul className="space-y-1 text-sm text-bahola-navy-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-bahola-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Prepare a detailed symptom history
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-bahola-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  List current medications and treatments
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-bahola-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Note what makes symptoms better or worse
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-bahola-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Consider your emotional and mental state
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-bahola-navy-900">During Your Consultation</h4>
              <ul className="space-y-1 text-sm text-bahola-navy-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-bahola-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Comprehensive case taking session
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-bahola-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Discussion of lifestyle and dietary factors
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-bahola-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Personalized remedy recommendation
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-bahola-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Clear dosage and follow-up instructions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Consultation;
