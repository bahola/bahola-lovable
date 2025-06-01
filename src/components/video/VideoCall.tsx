
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Monitor,
  Settings,
  Users
} from 'lucide-react';

interface VideoCallProps {
  roomId: string;
  isHost?: boolean;
  onCallEnd: () => void;
}

export const VideoCall: React.FC<VideoCallProps> = ({ 
  roomId, 
  isHost = false, 
  onCallEnd 
}) => {
  const { toast } = useToast();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [participants, setParticipants] = useState(1);

  useEffect(() => {
    initializeCall();
    return () => {
      cleanup();
    };
  }, [roomId]);

  const initializeCall = async () => {
    try {
      setIsConnecting(true);
      
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Initialize WebRTC peer connection
      const configuration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      };
      
      peerConnectionRef.current = new RTCPeerConnection(configuration);
      
      // Add local stream to peer connection
      stream.getTracks().forEach(track => {
        peerConnectionRef.current?.addTrack(track, stream);
      });

      // Handle remote stream
      peerConnectionRef.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
          setParticipants(2);
        }
      };

      // Handle ICE candidates
      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate && wsRef.current) {
          wsRef.current.send(JSON.stringify({
            type: 'ice-candidate',
            candidate: event.candidate,
            roomId
          }));
        }
      };

      // Handle connection state changes
      peerConnectionRef.current.onconnectionstatechange = () => {
        const state = peerConnectionRef.current?.connectionState;
        if (state === 'connected') {
          setIsConnected(true);
          setIsConnecting(false);
          toast({
            title: "Connected",
            description: "Video call connected successfully"
          });
        } else if (state === 'disconnected' || state === 'failed') {
          setIsConnected(false);
          toast({
            title: "Connection Lost",
            description: "Trying to reconnect...",
            variant: "destructive"
          });
        }
      };

      // Initialize WebSocket for signaling
      initializeWebSocket();
      
    } catch (error) {
      console.error('Error initializing call:', error);
      toast({
        title: "Call Failed",
        description: "Could not access camera/microphone",
        variant: "destructive"
      });
      setIsConnecting(false);
    }
  };

  const initializeWebSocket = () => {
    // In a real implementation, this would connect to your signaling server
    // For now, we'll simulate the WebSocket connection
    console.log('WebSocket signaling would be initialized here for room:', roomId);
    
    // Simulate connection after a delay
    setTimeout(() => {
      if (isHost) {
        setIsConnected(true);
        setIsConnecting(false);
      }
    }, 2000);
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const endCall = () => {
    cleanup();
    onCallEnd();
  };

  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    if (wsRef.current) {
      wsRef.current.close();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>Video Consultation - Room {roomId}</span>
          <span className="text-sm text-gray-300">({participants} participant{participants > 1 ? 's' : ''})</span>
        </div>
        <div className="flex items-center space-x-2">
          {isConnecting && <span className="text-yellow-400">Connecting...</span>}
          {isConnected && <span className="text-green-400">Connected</span>}
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative">
        {/* Remote Video (Main) */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover bg-gray-800"
        />
        
        {/* Local Video (Picture-in-Picture) */}
        <Card className="absolute top-4 right-4 w-64 h-48 overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {!isVideoEnabled && (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <VideoOff className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </Card>

        {/* Connection Status */}
        {isConnecting && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p>Connecting to the consultation...</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 bg-gray-800 flex justify-center space-x-4">
        <Button
          variant={isAudioEnabled ? "default" : "destructive"}
          size="lg"
          onClick={toggleAudio}
          className="rounded-full p-3"
        >
          {isAudioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
        </Button>
        
        <Button
          variant={isVideoEnabled ? "default" : "destructive"}
          size="lg"
          onClick={toggleVideo}
          className="rounded-full p-3"
        >
          {isVideoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
        </Button>
        
        <Button
          variant="destructive"
          size="lg"
          onClick={endCall}
          className="rounded-full p-3"
        >
          <PhoneOff className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};
