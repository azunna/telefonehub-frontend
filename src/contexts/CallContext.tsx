import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWebSocket } from './WebSocketContext';
import { useAuth } from './AuthContext';

interface CallContextType {
  currentCall: any | null;
  isInCall: boolean;
  isMuted: boolean;
  isVideoMuted: boolean;
  startCall: (calleeNumber: string, metadata?: any) => void;
  answerCall: (callId: string) => void;
  endCall: () => void;
  muteAudio: () => void;
  unmuteAudio: () => void;
  muteVideo: () => void;
  unmuteVideo: () => void;
  setCurrentCall: (call: any | null) => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const useCall = () => {
  const context = useContext(CallContext);
  if (context === undefined) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
};

interface CallProviderProps {
  children: ReactNode;
}

export const CallProvider: React.FC<CallProviderProps> = ({ children }) => {
  const [currentCall, setCurrentCall] = useState<any | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const { socket } = useWebSocket();
  const { user } = useAuth();

  const isInCall = currentCall !== null;

  useEffect(() => {
    if (socket) {
      // Handle call events
      socket.on('joined-call', (data) => {
        console.log('Joined call:', data);
        setCurrentCall(data);
      });

      socket.on('left-call', (data) => {
        console.log('Left call:', data);
        setCurrentCall(null);
        setIsMuted(false);
        setIsVideoMuted(false);
      });

      socket.on('call-ended', (data) => {
        console.log('Call ended:', data);
        setCurrentCall(null);
        setIsMuted(false);
        setIsVideoMuted(false);
      });

      // Handle audio/video events
      socket.on('audio-muted', (data) => {
        if (data.userId === user?.id) {
          setIsMuted(data.muted);
        }
      });

      socket.on('video-muted', (data) => {
        if (data.userId === user?.id) {
          setIsVideoMuted(data.muted);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('joined-call');
        socket.off('left-call');
        socket.off('call-ended');
        socket.off('audio-muted');
        socket.off('video-muted');
      }
    };
  }, [socket, user?.id]);

  const startCall = (calleeNumber: string, metadata = {}) => {
    if (socket) {
      socket.emit('initiate-call', { calleeNumber, metadata });
    }
  };

  const answerCall = (callId: string) => {
    if (socket) {
      socket.emit('answer-call', { callId });
    }
  };

  const endCall = () => {
    if (socket && currentCall) {
      socket.emit('end-call', { callId: currentCall.callId });
    }
  };

  const muteAudio = () => {
    if (socket && currentCall) {
      socket.emit('mute-audio', { callId: currentCall.callId, muted: true });
      setIsMuted(true);
    }
  };

  const unmuteAudio = () => {
    if (socket && currentCall) {
      socket.emit('mute-audio', { callId: currentCall.callId, muted: false });
      setIsMuted(false);
    }
  };

  const muteVideo = () => {
    if (socket && currentCall) {
      socket.emit('mute-video', { callId: currentCall.callId, muted: true });
      setIsVideoMuted(true);
    }
  };

  const unmuteVideo = () => {
    if (socket && currentCall) {
      socket.emit('mute-video', { callId: currentCall.callId, muted: false });
      setIsVideoMuted(false);
    }
  };

  const value = {
    currentCall,
    isInCall,
    isMuted,
    isVideoMuted,
    startCall,
    answerCall,
    endCall,
    muteAudio,
    unmuteAudio,
    muteVideo,
    unmuteVideo,
    setCurrentCall,
  };

  return (
    <CallContext.Provider value={value}>
      {children}
    </CallContext.Provider>
  );
};

