
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/PageLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VideoConsultationPayment } from '@/components/appointment/VideoConsultationPayment';
import { useToast } from "@/hooks/use-toast";
import { Video, Clock, Shield, Users } from 'lucide-react';

const VideoConsultation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [appointmentId, setAppointmentId] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  const handleQuickConsultation = () => {
    setShowPayment(true);
  };

  const handleJoinExisting = () => {
    if (!appointmentId.trim()) {
      toast({
        title: "Appointment ID Required",
        description: "Please enter your appointment ID to join",
        variant: "destructive"
      });
      return;
    }
    
    navigate(`/join-consultation/${appointmentId}`);
  };

  const handlePaymentSuccess = (paymentDetails: any) => {
    // Generate a new appointment ID for the consultation
    const newAppointmentId = `CONS${Date.now()}`;
    
    toast({
      title: "Payment Successful",
      description: "Your video consultation is ready to start"
    });
    
    // Navigate to the consultation room
    navigate(`/video-room/${newAppointmentId}`);
  };

  if (showPayment) {
    return (
      <PageLayout 
        title="Video Consultation Payment" 
        description="Complete payment to start your consultation"
      >
        <div className="max-w-2xl mx-auto">
          <VideoConsultationPayment onPaymentSuccess={handlePaymentSuccess} />
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              onClick={() => setShowPayment(false)}
            >
              Back to Options
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="Video Consultation" 
      description="Connect with our homeopathy experts through secure video calls"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50">
          <CardContent className="p-8 text-center">
            <Video className="h-16 w-16 mx-auto mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold mb-2">Professional Video Consultations</h2>
            <p className="text-gray-600 mb-4">
              Get expert homeopathic advice from certified practitioners through our secure video platform
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                Secure & Private
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Available 24/7
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Expert Doctors
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Book New Consultation */}
          <Card>
            <CardHeader>
              <CardTitle>Book New Consultation</CardTitle>
              <CardDescription>
                Start a new video consultation with our homeopathy experts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">What's included:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 30-minute video consultation</li>
                  <li>• Personalized treatment plan</li>
                  <li>• Follow-up recommendations</li>
                  <li>• Prescription if needed</li>
                </ul>
              </div>
              <div className="text-2xl font-bold text-green-600">₹500</div>
              <Button 
                onClick={handleQuickConsultation}
                className="w-full"
              >
                Book Consultation Now
              </Button>
            </CardContent>
          </Card>

          {/* Join Existing Consultation */}
          <Card>
            <CardHeader>
              <CardTitle>Join Existing Consultation</CardTitle>
              <CardDescription>
                Enter your appointment ID to join a scheduled consultation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="appointmentId">Appointment ID</Label>
                <Input
                  id="appointmentId"
                  type="text"
                  placeholder="Enter your appointment ID"
                  value={appointmentId}
                  onChange={(e) => setAppointmentId(e.target.value)}
                />
                <p className="text-sm text-gray-500">
                  You received this ID via email or SMS after booking
                </p>
              </div>
              <Button 
                onClick={handleJoinExisting}
                variant="outline"
                className="w-full"
              >
                Join Consultation
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card>
          <CardHeader>
            <CardTitle>Why Choose Video Consultations?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-medium mb-2">High-Quality Video</h4>
                <p className="text-sm text-gray-600">
                  Crystal clear video and audio for effective consultations
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-medium mb-2">Secure Platform</h4>
                <p className="text-sm text-gray-600">
                  End-to-end encrypted calls protecting your privacy
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-medium mb-2">Convenient Access</h4>
                <p className="text-sm text-gray-600">
                  Consult from anywhere, anytime that suits you
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Minimum Requirements:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Chrome, Firefox, Safari, or Edge browser</li>
                  <li>• Stable internet connection (1 Mbps+)</li>
                  <li>• Working camera and microphone</li>
                  <li>• Quiet, well-lit environment</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">For Best Experience:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• High-speed broadband connection</li>
                  <li>• External headphones/microphone</li>
                  <li>• Good lighting facing you</li>
                  <li>• Desktop or laptop computer</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default VideoConsultation;
