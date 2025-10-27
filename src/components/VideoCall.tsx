import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Volume2, 
  VolumeX, 
  User,
  MoreVertical,
  Maximize2,
  Minimize2,
  Settings,
  Users,
  MessageSquare,
  Share,
  Camera,
  CameraOff,
  RotateCcw
} from 'lucide-react';

interface VideoCallProps {
  isActive: boolean;
  contact: {
    name: string;
    phone: string;
    avatar?: string;
  };
  onEndCall: () => void;
  onMuteToggle: () => void;
  onVideoToggle: () => void;
  onSpeakerToggle: () => void;
  callDuration: number;
  isMuted: boolean;
  isVideoOn: boolean;
  isSpeakerOn: boolean;
  callStatus: 'connecting' | 'ringing' | 'connected' | 'ended';
  participants?: number;
}

export const VideoCall: React.FC<VideoCallProps> = ({
  isActive,
  contact,
  onEndCall,
  onMuteToggle,
  onVideoToggle,
  onSpeakerToggle,
  callDuration,
  isMuted,
  isVideoOn,
  isSpeakerOn,
  callStatus,
  participants = 2
}) => {
  const [callTime, setCallTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [cameraDevice, setCameraDevice] = useState('front');
  const [showControls, setShowControls] = useState(true);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  useEffect(() => {
    // Auto-hide controls after 3 seconds
    if (showControls) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showControls]);

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
    <div 
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 ${
        isFullscreen ? 'z-50' : 'z-40'
      }`}
      onClick={() => setShowControls(!showControls)}
    >
      {/* Remote Video */}
      <div className="absolute inset-0 bg-gray-900">
        {isVideoOn ? (
          <video
            ref={remoteVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                {contact.avatar ? (
                  <img 
                    src={contact.avatar} 
                    alt={contact.name} 
                    className="w-32 h-32 rounded-full object-cover" 
                  />
                ) : (
                  <User className="h-16 w-16 text-gray-400" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{contact.name}</h3>
              <p className="text-gray-400">{contact.phone}</p>
            </div>
          </div>
        )}
      </div>

      {/* Local Video (Picture-in-Picture) */}
      <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white/20">
        {isVideoOn ? (
          <video
            ref={localVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>

      {/* Top Bar */}
      {showControls && (
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge 
              variant="secondary" 
              className={`bg-black/50 text-white border-white/30 ${getStatusColor()}`}
            >
              {getStatusText()}
            </Badge>
            {participants > 2 && (
              <Badge variant="secondary" className="bg-black/50 text-white border-white/30">
                <Users className="h-3 w-3 mr-1" />
                {participants}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-black/50 border-white/30 text-white hover:bg-white/20"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-black/50 border-white/30 text-white hover:bg-white/20"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      {showControls && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-4 bg-black/50 backdrop-blur-lg rounded-full px-6 py-4">
            {/* Mute Button */}
            <Button
              size="lg"
              variant="outline"
              className={`w-12 h-12 rounded-full ${
                isMuted 
                  ? 'bg-red-500 border-red-500 text-white hover:bg-red-600' 
                  : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
              }`}
              onClick={onMuteToggle}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>

            {/* Video Toggle */}
            <Button
              size="lg"
              variant="outline"
              className={`w-12 h-12 rounded-full ${
                !isVideoOn 
                  ? 'bg-red-500 border-red-500 text-white hover:bg-red-600' 
                  : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
              }`}
              onClick={onVideoToggle}
            >
              {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>

            {/* End Call */}
            <Button
              size="lg"
              variant="destructive"
              className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600"
              onClick={onEndCall}
            >
              <PhoneOff className="h-6 w-6" />
            </Button>

            {/* Speaker Toggle */}
            <Button
              size="lg"
              variant="outline"
              className={`w-12 h-12 rounded-full ${
                isSpeakerOn 
                  ? 'bg-blue-500 border-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
              }`}
              onClick={onSpeakerToggle}
            >
              {isSpeakerOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>

            {/* Screen Share */}
            <Button
              size="lg"
              variant="outline"
              className={`w-12 h-12 rounded-full ${
                isScreenSharing 
                  ? 'bg-green-500 border-green-500 text-white hover:bg-green-600' 
                  : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
              }`}
              onClick={() => setIsScreenSharing(!isScreenSharing)}
            >
              <Share className="h-5 w-5" />
            </Button>

            {/* More Options */}
            <Button
              size="lg"
              variant="outline"
              className="w-12 h-12 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Chat Panel */}
      {isChatOpen && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-80 h-96 bg-white rounded-lg shadow-xl">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Chat</h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsChatOpen(false)}
              >
                ×
              </Button>
            </div>
          </div>
          <div className="p-4 h-80 overflow-y-auto">
            <div className="space-y-3">
              <div className="text-sm text-gray-500 text-center">
                Chat messages will appear here
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button size="sm">Send</Button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {isSettingsOpen && (
        <div className="absolute right-4 top-16 w-80 bg-white rounded-lg shadow-xl p-4">
          <h3 className="font-semibold mb-4">Call Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Camera</label>
              <select 
                value={cameraDevice}
                onChange={(e) => setCameraDevice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="front">Front Camera</option>
                <option value="back">Back Camera</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Video Quality</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="auto">Auto</option>
                <option value="hd">HD (720p)</option>
                <option value="fhd">Full HD (1080p)</option>
                <option value="4k">4K (2160p)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Audio Quality</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="auto">Auto</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Screen Sharing Overlay */}
      {isScreenSharing && (
        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          Screen sharing active
        </div>
      )}
    </div>
  );
};
