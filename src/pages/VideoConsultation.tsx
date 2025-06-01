
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/PageLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from '@/components/ui/form';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VideoConsultationPayment } from '@/components/appointment/VideoConsultationPayment';
import { AppointmentDatePicker } from '@/components/appointment/AppointmentDatePicker';
import { AppointmentTimeSlots } from '@/components/appointment/AppointmentTimeSlots';
import { PatientInformationForm } from '@/components/appointment/PatientInformationForm';
import { generateTimeSlots } from '@/utils/timeSlots';
import { useToast } from "@/hooks/use-toast";
import { Video, Clock, Shield, Users } from 'lucide-react';

// Form schema for validation
const formSchema = z.object({
  appointmentDate: z.date({
    required_error: "Please select a date for your consultation",
  }),
  appointmentTime: z.string({
    required_error: "Please select a time slot",
  }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
});

const VideoConsultation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [appointmentId, setAppointmentId] = useState('');
  const [showBooking, setShowBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState(selectedDate ? generateTimeSlots(selectedDate) : []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // Generate new time slots when the selected date changes
  React.useEffect(() => {
    if (selectedDate) {
      setTimeSlots(generateTimeSlots(selectedDate));
      form.setValue("appointmentDate", selectedDate);
      form.resetField("appointmentTime");
    }
  }, [selectedDate, form]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleQuickConsultation = () => {
    setShowBooking(true);
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form validation passed:", values);
    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentDetails: any) => {
    const newAppointmentId = `CONS${Date.now()}`;
    
    toast({
      title: "Payment Successful",
      description: "Your video consultation is ready to start"
    });
    
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
              Back to Booking
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (showBooking) {
    return (
      <PageLayout 
        title="Book Video Consultation" 
        description="Schedule your video consultation with our expert physicians"
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 p-6 bg-bahola-green-50 rounded-lg border-l-4 border-bahola-green-600">
            <h2 className="text-xl font-medium text-bahola-green-800 mb-2 font-helvetica brand-subtitle">Video Consultation Booking</h2>
            <p className="text-bahola-green-700 brand-body">Schedule your convenient online consultation with our homeopathy experts.</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AppointmentDatePicker
                  control={form.control}
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                />
                
                <AppointmentTimeSlots
                  control={form.control}
                  selectedDate={selectedDate}
                  timeSlots={timeSlots}
                />
              </div>

              <PatientInformationForm control={form.control} />

              <div className="flex justify-center">
                <Button 
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-bahola-green-600 hover:bg-bahola-green-700"
                >
                  Proceed to Payment
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              onClick={() => setShowBooking(false)}
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
                Schedule a video consultation with our homeopathy experts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">What's included:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 30-minute video consultation</li>
                  <li>• Personalized treatment plan</li>
                  <li>• Follow-up recommendations</li>
                  <li>• Digital prescription</li>
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
