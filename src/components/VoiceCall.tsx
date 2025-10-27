import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  PhoneCall,
  Clock,
  User,
  MoreVertical,
  Speaker,
  Bluetooth,
  Wifi
} from 'lucide-react';

interface VoiceCallProps {
  isActive: boolean;
  contact: {
    name: string;
    phone: string;
    avatar?: string;
  };
  onEndCall: () => void;
  onMuteToggle: () => void;
  onSpeakerToggle: () => void;
  callDuration: number;
  isMuted: boolean;
  isSpeakerOn: boolean;
  callStatus: 'connecting' | 'ringing' | 'connected' | 'ended';
}

export const VoiceCall: React.FC<VoiceCallProps> = ({
  isActive,
  contact,
  onEndCall,
  onMuteToggle,
  onSpeakerToggle,
  callDuration,
  isMuted,
  isSpeakerOn,
  callStatus
}) => {
  const [callTime, setCallTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isBluetoothConnected, setIsBluetoothConnected] = useState(false);
  const [isWifiCall, setIsWifiCall] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusText = () => {
    switch (callStatus) {
      case 'connecting':
        return 'Connecting...';
      case 'ringing':
        return 'Ringing...';
      case 'connected':
        return formatTime(callTime);
      case 'ended':
        return 'Call ended';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (callStatus) {
      case 'connecting':
        return 'text-yellow-500';
      case 'ringing':
        return 'text-blue-500';
      case 'connected':
        return 'text-green-500';
      case 'ended':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-8 text-center text-white">
          {/* Contact Info */}
          <div className="mb-8">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              {contact.avatar ? (
                <img 
                  src={contact.avatar} 
                  alt={contact.name} 
                  className="w-32 h-32 rounded-full object-cover" 
                />
              ) : (
                <User className="h-16 w-16 text-white/70" />
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2">{contact.name}</h2>
            <p className="text-white/70 mb-2">{contact.phone}</p>
            <div className="flex items-center justify-center gap-2">
              <Badge 
                variant="secondary" 
                className={`bg-white/20 text-white border-white/30 ${getStatusColor()}`}
              >
                {getStatusText()}
              </Badge>
              {isWifiCall && (
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Wifi className="h-3 w-3 mr-1" />
                  WiFi
                </Badge>
              )}
            </div>
          </div>

          {/* Call Controls */}
          <div className="space-y-6">
            {/* Primary Controls */}
            <div className="flex justify-center gap-6">
              <Button
                size="lg"
                variant="outline"
                className="w-16 h-16 rounded-full bg-white/20 border-white/30 hover:bg-white/30"
                onClick={onMuteToggle}
              >
                {isMuted ? (
                  <MicOff className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </Button>

              <Button
                size="lg"
                variant="destructive"
                className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600"
                onClick={onEndCall}
              >
                <PhoneOff className="h-8 w-8" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-16 h-16 rounded-full bg-white/20 border-white/30 hover:bg-white/30"
                onClick={onSpeakerToggle}
              >
                {isSpeakerOn ? (
                  <Speaker className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </Button>
            </div>

            {/* Secondary Controls */}
            <div className="flex justify-center gap-4">
              <Button
                size="sm"
                variant="outline"
                className="bg-white/20 border-white/30 hover:bg-white/30"
                onClick={() => setIsBluetoothConnected(!isBluetoothConnected)}
              >
                <Bluetooth className={`h-4 w-4 ${isBluetoothConnected ? 'text-blue-300' : ''}`} />
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="bg-white/20 border-white/30 hover:bg-white/30"
                onClick={() => setIsRecording(!isRecording)}
              >
                <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500' : 'bg-white/50'}`} />
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="bg-white/20 border-white/30 hover:bg-white/30"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Call Quality Indicator */}
          {callStatus === 'connected' && (
            <div className="mt-6 text-sm text-white/70">
              <div className="flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="ml-2">Excellent</span>
              </div>
            </div>
          )}

          {/* Recording Indicator */}
          {isRecording && (
            <div className="mt-4 flex items-center justify-center gap-2 text-red-300">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Recording in progress</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
