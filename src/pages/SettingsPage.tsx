import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  IconButton,
  Alert,
} from '@mui/material';
import {
  PhotoCamera,
  Save,
  Security,
  Notifications,
  Phone,
  Language,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useWebSocket } from '../contexts/WebSocketContext';
import toast from 'react-hot-toast';

const SettingsPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { isConnected } = useWebSocket();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    incomingCalls: true,
    callEnded: true,
    queueUpdates: true,
    agentStatus: false,
  });
  const [callSettings, setCallSettings] = useState({
    autoAnswer: false,
    ringTone: 'default',
    volume: 50,
    videoEnabled: true,
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: user?.profile?.firstName || '',
      lastName: user?.profile?.lastName || '',
      phone: user?.phone || '',
      email: user?.email || '',
      timezone: user?.profile?.timezone || 'UTC',
      language: user?.profile?.language || 'en',
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await updateProfile({
        profile: {
          firstName: data.firstName,
          lastName: data.lastName,
          timezone: data.timezone,
          language: data.language,
        },
        phone: data.phone,
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications(prev => ({
      ...prev,
      [key]: event.target.checked,
    }));
  };

  const handleCallSettingChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCallSettings(prev => ({
      ...prev,
      [key]: event.target.checked,
    }));
  };

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    setCallSettings(prev => ({
      ...prev,
      volume: newValue as number,
    }));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Information
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{ width: 80, height: 80, mr: 2 }}
                  src={user?.profile?.avatar}
                >
                  {user?.profile?.firstName?.[0] || user?.email?.[0] || 'U'}
                </Avatar>
                <Box>
                  <IconButton color="primary" component="label">
                    <PhotoCamera />
                    <input hidden accept="image/*" type="file" />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    Click to change avatar
                  </Typography>
                </Box>
              </Box>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      {...register('firstName', { required: 'First name is required' })}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      {...register('lastName', { required: 'Last name is required' })}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      {...register('email')}
                      disabled
                      helperText="Email cannot be changed"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      {...register('phone')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Timezone"
                      select
                      SelectProps={{ native: true }}
                      {...register('timezone')}
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                      <option value="Europe/London">London</option>
                      <option value="Europe/Paris">Paris</option>
                      <option value="Asia/Tokyo">Tokyo</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Language"
                      select
                      SelectProps={{ native: true }}
                      {...register('language')}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="it">Italian</option>
                      <option value="pt">Portuguese</option>
                      <option value="zh">Chinese</option>
                      <option value="ja">Japanese</option>
                    </TextField>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Notifications sx={{ mr: 1, verticalAlign: 'middle' }} />
                Notifications
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.incomingCalls}
                      onChange={handleNotificationChange('incomingCalls')}
                    />
                  }
                  label="Incoming calls"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.callEnded}
                      onChange={handleNotificationChange('callEnded')}
                    />
                  }
                  label="Call ended notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.queueUpdates}
                      onChange={handleNotificationChange('queueUpdates')}
                    />
                  }
                  label="Queue updates"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.agentStatus}
                      onChange={handleNotificationChange('agentStatus')}
                    />
                  }
                  label="Agent status changes"
                />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Phone sx={{ mr: 1, verticalAlign: 'middle' }} />
                Call Settings
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={callSettings.autoAnswer}
                      onChange={handleCallSettingChange('autoAnswer')}
                    />
                  }
                  label="Auto-answer calls"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={callSettings.videoEnabled}
                      onChange={handleCallSettingChange('videoEnabled')}
                    />
                  }
                  label="Enable video by default"
                />
                <TextField
                  fullWidth
                  label="Ringtone"
                  select
                  SelectProps={{ native: true }}
                  value={callSettings.ringTone}
                  onChange={(e) => setCallSettings(prev => ({ ...prev, ringTone: e.target.value }))}
                >
                  <option value="default">Default</option>
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                  <option value="soft">Soft</option>
                </TextField>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* System Status */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Security sx={{ mr: 1, verticalAlign: 'middle' }} />
                System Status
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Alert severity={isConnected ? 'success' : 'error'}>
                    WebSocket: {isConnected ? 'Connected' : 'Disconnected'}
                  </Alert>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Alert severity="success">
                    Database: Connected
                  </Alert>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Alert severity="success">
                    Voice Service: Online
                  </Alert>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Alert severity="success">
                    API Gateway: Healthy
                  </Alert>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;
