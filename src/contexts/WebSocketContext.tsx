import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface WebSocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  joinCall: (callId: string) => void;
  leaveCall: (callId: string) => void;
  joinQueueMonitor: () => void;
  leaveQueueMonitor: () => void;
  updateAgentStatus: (status: string, currentCallId?: string) => void;
  routeCall: (callId: string, priority?: number, metadata?: any) => void;
  updateCallPriority: (callId: string, priority: number) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const newSocket = io(process.env.REACT_APP_WS_URL || 'ws://localhost:3000', {
          auth: { token },
          transports: ['websocket', 'polling'],
        });

        newSocket.on('connect', () => {
          console.log('WebSocket connected');
          setIsConnected(true);
        });

        newSocket.on('disconnect', () => {
          console.log('WebSocket disconnected');
          setIsConnected(false);
        });

        newSocket.on('connect_error', (error) => {
          console.error('WebSocket connection error:', error);
          toast.error('Connection failed. Please refresh the page.');
        });

        // Call events
        newSocket.on('call.incoming', (data) => {
          console.log('Incoming call:', data);
          toast.success(`Incoming call from ${data.callerInfo?.callerNumber || 'Unknown'}`);
        });

        newSocket.on('call.answered', (data) => {
          console.log('Call answered:', data);
          toast.success(`Call answered by ${data.agentEmail}`);
        });

        newSocket.on('call.ended', (data) => {
          console.log('Call ended:', data);
          toast(`Call ended. Duration: ${data.duration}s`);
        });

        // Queue events
        newSocket.on('queue.updated', (data) => {
          console.log('Queue updated:', data);
        });

        newSocket.on('call.assigned', (data) => {
          console.log('Call assigned:', data);
          toast.success('Call assigned to agent');
        });

        newSocket.on('call.queued', (data) => {
          console.log('Call queued:', data);
          toast(`Call queued at position ${data.queuePosition}`);
        });

        // Agent events
        newSocket.on('agent.status_changed', (data) => {
          console.log('Agent status changed:', data);
        });

        newSocket.on('error', (data) => {
          console.error('WebSocket error:', data);
          toast.error(data.message || 'An error occurred');
        });

        setSocket(newSocket);

        return () => {
          newSocket.close();
        };
      }
    }
  }, [user]);

  const joinCall = (callId: string) => {
    if (socket) {
      socket.emit('join-call', { callId });
    }
  };

  const leaveCall = (callId: string) => {
    if (socket) {
      socket.emit('leave-call', { callId });
    }
  };

  const joinQueueMonitor = () => {
    if (socket) {
      socket.emit('join-queue-monitor');
    }
  };

  const leaveQueueMonitor = () => {
    if (socket) {
      socket.emit('leave-queue-monitor');
    }
  };

  const updateAgentStatus = (status: string, currentCallId?: string) => {
    if (socket) {
      socket.emit('update-agent-status', { status, currentCallId });
    }
  };

  const routeCall = (callId: string, priority = 1, metadata = {}) => {
    if (socket) {
      socket.emit('route-call', { callId, priority, metadata });
    }
  };

  const updateCallPriority = (callId: string, priority: number) => {
    if (socket) {
      socket.emit('update-call-priority', { callId, priority });
    }
  };

  const value = {
    socket,
    isConnected,
    joinCall,
    leaveCall,
    joinQueueMonitor,
    leaveQueueMonitor,
    updateAgentStatus,
    routeCall,
    updateCallPriority,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

