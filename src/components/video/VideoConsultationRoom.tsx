
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VideoCall } from './VideoCall';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Clock, User, Calendar } from 'lucide-react';

interface AppointmentDetails {
  id: string;
  customerName: string;
  appointmentDate: string;
  appointmentTime: string;
  consultationType: string;
  status: string;
}

const VideoConsultationRoom: React.FC = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isInCall, setIsInCall] = useState(false);
  const [appointment, setAppointment] = useState<AppointmentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (appointmentId) {
      loadAppointmentDetails(appointmentId);
    }
  }, [appointmentId]);

  const loadAppointmentDetails = async (id: string) => {
    try {
      setIsLoading(true);
      // In a real implementation, fetch from your appointments API
      // For now, we'll simulate the data
      const mockAppointment: AppointmentDetails = {
        id,
        customerName: "John Doe",
        appointmentDate: "2024-01-15",
        appointmentTime: "10:00 AM",
        consultationType: "Video Consultation",
        status: "confirmed"
      };
      
      setAppointment(mockAppointment);
    } catch (error) {
      console.error('Error loading appointment:', error);
      toast({
        title: "Error",
        description: "Could not load appointment details",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startCall = () => {
    setIsInCall(true);
  };

  const endCall = () => {
    setIsInCall(false);
    toast({
      title: "Call Ended",
      description: "The video consultation has ended"
    });
    navigate('/admin'); // Navigate back to admin dashboard
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <p>Appointment not found</p>
            <Button onClick={() => navigate('/')} className="mt-4">
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isInCall) {
    return (
      <VideoCall
        roomId={appointmentId!}
        isHost={true}
        onCallEnd={endCall}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Video Consultation</CardTitle>
          <CardDescription>Ready to start your consultation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Patient: {appointment.customerName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Date: {appointment.appointmentDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Time: {appointment.appointmentTime}</span>
            </div>
          </div>

          <div className="border-t pt-4 space-y-3">
            <p className="text-sm text-gray-600">
              Make sure your camera and microphone are working properly before starting the call.
            </p>
            <Button 
              onClick={startCall} 
              className="w-full"
              size="lg"
            >
              Start Video Consultation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoConsultationRoom;
