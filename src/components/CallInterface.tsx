import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Chip,
  Avatar,
  Slider,
} from '@mui/material';
import {
  Phone,
  PhoneDisabled,
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  VolumeUp,
  VolumeOff,
  CallEnd,
  Call,
} from '@mui/icons-material';
import { useCall } from '../contexts/CallContext';
import { useWebSocket } from '../contexts/WebSocketContext';

const CallInterface: React.FC = () => {
  const {
    currentCall,
    isInCall,
    isMuted,
    isVideoMuted,
    muteAudio,
    unmuteAudio,
    muteVideo,
    unmuteVideo,
    endCall,
  } = useCall();
  const { socket } = useWebSocket();
  const [volume, setVolume] = useState(50);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);

  if (!isInCall || !currentCall) {
    return null;
  }

  const handleMuteToggle = () => {
    if (isMuted) {
      unmuteAudio();
    } else {
      muteAudio();
    }
  };

  const handleVideoToggle = () => {
    if (isVideoMuted) {
      unmuteVideo();
    } else {
      muteVideo();
    }
  };

  const handleSpeakerToggle = () => {
    setIsSpeakerMuted(!isSpeakerMuted);
  };

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: '90%',
        maxWidth: 600,
      }}
    >
      <Card
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}>
              <Phone />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="div">
                {currentCall.callerNumber || 'Unknown Caller'}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {currentCall.direction === 'inbound' ? 'Incoming Call' : 'Outgoing Call'}
              </Typography>
            </Box>
            <Chip
              label="Active"
              color="success"
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <IconButton
              onClick={handleMuteToggle}
              sx={{
                bgcolor: isMuted ? 'rgba(255,0,0,0.2)' : 'rgba(255,255,255,0.2)',
                color: 'white',
                '&:hover': {
                  bgcolor: isMuted ? 'rgba(255,0,0,0.3)' : 'rgba(255,255,255,0.3)',
                },
              }}
            >
              {isMuted ? <MicOff /> : <Mic />}
            </IconButton>

            <IconButton
              onClick={handleVideoToggle}
              sx={{
                bgcolor: isVideoMuted ? 'rgba(255,0,0,0.2)' : 'rgba(255,255,255,0.2)',
                color: 'white',
                '&:hover': {
                  bgcolor: isVideoMuted ? 'rgba(255,0,0,0.3)' : 'rgba(255,255,255,0.3)',
                },
              }}
            >
              {isVideoMuted ? <VideocamOff /> : <Videocam />}
            </IconButton>

            <IconButton
              onClick={handleSpeakerToggle}
              sx={{
                bgcolor: isSpeakerMuted ? 'rgba(255,0,0,0.2)' : 'rgba(255,255,255,0.2)',
                color: 'white',
                '&:hover': {
                  bgcolor: isSpeakerMuted ? 'rgba(255,0,0,0.3)' : 'rgba(255,255,255,0.3)',
                },
              }}
            >
              {isSpeakerMuted ? <VolumeOff /> : <VolumeUp />}
            </IconButton>

            <IconButton
              onClick={endCall}
              sx={{
                bgcolor: 'rgba(255,0,0,0.3)',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255,0,0,0.5)',
                },
              }}
            >
              <CallEnd />
            </IconButton>
          </Box>

          {!isSpeakerMuted && (
            <Box sx={{ mt: 2, px: 2 }}>
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                Volume
              </Typography>
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                min={0}
                max={100}
                sx={{
                  color: 'white',
                  '& .MuiSlider-thumb': {
                    bgcolor: 'white',
                  },
                  '& .MuiSlider-track': {
                    bgcolor: 'white',
                  },
                  '& .MuiSlider-rail': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  },
                }}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CallInterface;

