
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VideoCall } from './VideoCall';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Clock, User, Calendar, Video } from 'lucide-react';

const VideoConsultationJoin: React.FC = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isInCall, setIsInCall] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [hasPermissions, setHasPermissions] = useState(false);

  useEffect(() => {
    checkMediaPermissions();
  }, []);

  const checkMediaPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      stream.getTracks().forEach(track => track.stop());
      setHasPermissions(true);
    } catch (error) {
      console.error('Media permissions not granted:', error);
      toast({
        title: "Permissions Required",
        description: "Please allow camera and microphone access to join the consultation",
        variant: "destructive"
      });
    }
  };

  const joinCall = async () => {
    if (!patientName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name to join the consultation",
        variant: "destructive"
      });
      return;
    }

    if (!hasPermissions) {
      await checkMediaPermissions();
      if (!hasPermissions) return;
    }

    setIsJoining(true);
    
    // Simulate joining delay
    setTimeout(() => {
      setIsInCall(true);
      setIsJoining(false);
    }, 1000);
  };

  const endCall = () => {
    setIsInCall(false);
    toast({
      title: "Call Ended",
      description: "Thank you for using our video consultation service"
    });
    navigate('/');
  };

  if (isInCall) {
    return (
      <VideoCall
        roomId={appointmentId!}
        isHost={false}
        onCallEnd={endCall}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Video className="h-12 w-12 mx-auto mb-2 text-blue-600" />
          <CardTitle>Join Video Consultation</CardTitle>
          <CardDescription>
            You're about to join a video consultation with a homeopathy doctor
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="patientName">Your Name</Label>
              <Input
                id="patientName"
                type="text"
                placeholder="Enter your full name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="border-t pt-4 space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Before joining:</strong>
              </p>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• Ensure you're in a quiet, well-lit space</li>
                <li>• Check your camera and microphone</li>
                <li>• Have your medical history ready if needed</li>
              </ul>
            </div>
            
            <Button 
              onClick={joinCall} 
              disabled={isJoining || !hasPermissions}
              className="w-full"
              size="lg"
            >
              {isJoining ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Joining...
                </>
              ) : (
                'Join Consultation'
              )}
            </Button>

            {!hasPermissions && (
              <p className="text-sm text-red-600 text-center">
                Camera and microphone access required
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoConsultationJoin;
