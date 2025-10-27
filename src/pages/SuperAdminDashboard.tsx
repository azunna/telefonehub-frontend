import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Tabs,
  Tab,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  AdminPanelSettings,
  VoiceOverOff,
  Language,
  Storage,
  Monitor,
  Security,
  People,
  AttachMoney,
  Upload,
  PlayArrow,
  Stop,
  Delete,
  Add,
  Refresh
} from '@mui/icons-material';

interface VoiceTrainingSession {
  id: string;
  language: string;
  speakerName: string;
  speakerEmail: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  modelId?: string;
  quality: 'low' | 'medium' | 'high';
  accent: string;
  region: string;
}

interface VoiceModel {
  id: string;
  language: string;
  accent: string;
  region: string;
  modelName: string;
  quality: 'low' | 'medium' | 'high';
  isActive: boolean;
  createdAt: string;
  trainingData: {
    totalRecordings: number;
    totalDuration: number;
    averageQuality: number;
  };
}

interface ServiceStatus {
  database: 'connected' | 'disconnected';
  redis: 'connected' | 'disconnected';
  grafana: 'connected' | 'disconnected';
  voiceTraining: 'active' | 'inactive';
}

const SuperAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [voiceSessions, setVoiceSessions] = useState<VoiceTrainingSession[]>([]);
  const [voiceModels, setVoiceModels] = useState<VoiceModel[]>([]);
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>({
    database: 'disconnected',
    redis: 'disconnected',
    grafana: 'disconnected',
    voiceTraining: 'inactive'
  });
  const [newSessionDialog, setNewSessionDialog] = useState(false);
  const [newSession, setNewSession] = useState({
    language: '',
    speakerName: '',
    speakerEmail: '',
    accent: '',
    region: '',
    quality: 'medium' as 'low' | 'medium' | 'high'
  });
  const [supportedLanguages] = useState([
    'hausa', 'igbo', 'yoruba', 'pidgin', 'english', 'french', 'arabic', 'swahili'
  ]);
  const [supportedAccents] = useState([
    'northern', 'southern', 'eastern', 'western', 'central', 'urban', 'rural'
  ]);
  const [supportedRegions] = useState([
    'north', 'south', 'east', 'west', 'central', 'lagos', 'abuja', 'kano'
  ]);

  useEffect(() => {
    loadData();
    checkServiceStatus();
  }, []);

  const loadData = async () => {
    try {
      // Load voice training sessions
      const sessionsResponse = await fetch('/api/v1/voice-training/sessions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (sessionsResponse.ok) {
        const sessionsData = await sessionsResponse.json();
        setVoiceSessions(sessionsData.data || []);
      }

      // Load voice models
      const modelsResponse = await fetch('/api/v1/voice-training/models', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (modelsResponse.ok) {
        const modelsData = await modelsResponse.json();
        setVoiceModels(modelsData.data || []);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const checkServiceStatus = async () => {
    try {
      // Check database status
      const dbResponse = await fetch('/api/v1/health');
      if (dbResponse.ok) {
        const health = await dbResponse.json();
        setServiceStatus(prev => ({
          ...prev,
          database: health.services.database,
          redis: health.services.redis
        }));
      }

      // Check Grafana status
      try {
        const grafanaResponse = await fetch('http://localhost:3001/api/health');
        if (grafanaResponse.ok) {
          setServiceStatus(prev => ({ ...prev, grafana: 'connected' }));
        }
      } catch {
        setServiceStatus(prev => ({ ...prev, grafana: 'disconnected' }));
      }

      // Check voice training status
      const voiceResponse = await fetch('/api/v1/voice-training/health');
      if (voiceResponse.ok) {
        setServiceStatus(prev => ({ ...prev, voiceTraining: 'active' }));
      }
    } catch (error) {
      console.error('Failed to check service status:', error);
    }
  };

  const createTrainingSession = async () => {
    try {
      const response = await fetch('/api/v1/voice-training/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newSession)
      });

      if (response.ok) {
        setNewSessionDialog(false);
        setNewSession({
          language: '',
          speakerName: '',
          speakerEmail: '',
          accent: '',
          region: '',
          quality: 'medium'
        });
        loadData();
      }
    } catch (error) {
      console.error('Failed to create training session:', error);
    }
  };

  const processTrainingSession = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/v1/voice-training/sessions/${sessionId}/process`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        loadData();
      }
    } catch (error) {
      console.error('Failed to process training session:', error);
    }
  };

  const deleteVoiceModel = async (modelId: string) => {
    try {
      const response = await fetch(`/api/v1/voice-training/models/${modelId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        loadData();
      }
    } catch (error) {
      console.error('Failed to delete voice model:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getServiceColor = (status: string) => {
    return status === 'connected' || status === 'active' ? 'success' : 'error';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        <AdminPanelSettings sx={{ mr: 2, verticalAlign: 'middle' }} />
        Super Admin Dashboard
      </Typography>

      {/* Service Status Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>Database</Typography>
                  <Typography variant="h6">
                    <Chip 
                      label={serviceStatus.database} 
                      color={getServiceColor(serviceStatus.database)}
                      size="small"
                    />
                  </Typography>
                </Box>
                <Storage color={getServiceColor(serviceStatus.database) === 'success' ? 'success' : 'error'} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>Redis</Typography>
                  <Typography variant="h6">
                    <Chip 
                      label={serviceStatus.redis} 
                      color={getServiceColor(serviceStatus.redis)}
                      size="small"
                    />
                  </Typography>
                </Box>
                <Storage color={getServiceColor(serviceStatus.redis) === 'success' ? 'success' : 'error'} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>Grafana</Typography>
                  <Typography variant="h6">
                    <Chip 
                      label={serviceStatus.grafana} 
                      color={getServiceColor(serviceStatus.grafana)}
                      size="small"
                    />
                  </Typography>
                </Box>
                <Monitor color={getServiceColor(serviceStatus.grafana) === 'success' ? 'success' : 'error'} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>Voice Training</Typography>
                  <Typography variant="h6">
                    <Chip 
                      label={serviceStatus.voiceTraining} 
                      color={getServiceColor(serviceStatus.voiceTraining)}
                      size="small"
                    />
                  </Typography>
                </Box>
                <VoiceOverOff color={getServiceColor(serviceStatus.voiceTraining) === 'success' ? 'success' : 'error'} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Voice Training Sessions" />
            <Tab label="Voice Models" />
            <Tab label="System Access" />
            <Tab label="Admin Management" />
          </Tabs>
        </Box>

        <CardContent>
          {/* Voice Training Sessions Tab */}
          {activeTab === 0 && (
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">Voice Training Sessions</Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setNewSessionDialog(true)}
                >
                  New Training Session
                </Button>
              </Box>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Language</TableCell>
                      <TableCell>Speaker</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Quality</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {voiceSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Language sx={{ mr: 1 }} />
                            {session.language} ({session.accent})
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2">{session.speakerName}</Typography>
                            <Typography variant="caption" color="textSecondary">
                              {session.speakerEmail}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={session.status} 
                            color={getStatusColor(session.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={session.quality} 
                            color="primary"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(session.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {session.status === 'pending' && (
                            <Tooltip title="Process Training">
                              <IconButton 
                                onClick={() => processTrainingSession(session.id)}
                                color="primary"
                              >
                                <PlayArrow />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="Refresh">
                            <IconButton onClick={loadData}>
                              <Refresh />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* Voice Models Tab */}
          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>Voice Models</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Model Name</TableCell>
                      <TableCell>Language</TableCell>
                      <TableCell>Accent/Region</TableCell>
                      <TableCell>Quality</TableCell>
                      <TableCell>Recordings</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {voiceModels.map((model) => (
                      <TableRow key={model.id}>
                        <TableCell>{model.modelName}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Language sx={{ mr: 1 }} />
                            {model.language}
                          </Box>
                        </TableCell>
                        <TableCell>{model.accent} / {model.region}</TableCell>
                        <TableCell>
                          <Chip 
                            label={model.quality} 
                            color="primary"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{model.trainingData.totalRecordings}</TableCell>
                        <TableCell>
                          <Chip 
                            label={model.isActive ? 'Active' : 'Inactive'} 
                            color={model.isActive ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Delete Model">
                            <IconButton 
                              onClick={() => deleteVoiceModel(model.id)}
                              color="error"
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* System Access Tab */}
          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>System Access</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Database Access</Typography>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        Direct access to PostgreSQL database for advanced queries and maintenance.
                      </Typography>
                      <Button variant="outlined" startIcon={<Storage />}>
                        Open Database Console
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Redis Access</Typography>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        Monitor and manage Redis cache and session storage.
                      </Typography>
                      <Button variant="outlined" startIcon={<Storage />}>
                        Open Redis Console
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Grafana Monitoring</Typography>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        Access real-time monitoring dashboards and analytics.
                      </Typography>
                      <Button 
                        variant="outlined" 
                        startIcon={<Monitor />}
                        href="http://localhost:3001"
                        target="_blank"
                      >
                        Open Grafana
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Security Logs</Typography>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        View security events, access logs, and threat intelligence.
                      </Typography>
                      <Button variant="outlined" startIcon={<Security />}>
                        View Security Logs
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Admin Management Tab */}
          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>Admin Management</Typography>
              <Alert severity="info" sx={{ mb: 3 }}>
                You are logged in as the Super Admin (azunnachukwu@yahoo.com). 
                You can create additional admin users and assign them specific privileges.
              </Alert>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Create Admin User</Typography>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        Create new admin users with specific role permissions.
                      </Typography>
                      <Button variant="contained" startIcon={<People />}>
                        Create Admin
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Manage Roles</Typography>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        Define custom roles and permissions for different admin levels.
                      </Typography>
                      <Button variant="outlined" startIcon={<Security />}>
                        Manage Roles
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* New Training Session Dialog */}
      <Dialog open={newSessionDialog} onClose={() => setNewSessionDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Voice Training Session</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={newSession.language}
                  onChange={(e) => setNewSession({ ...newSession, language: e.target.value })}
                >
                  {supportedLanguages.map((lang) => (
                    <MenuItem key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Speaker Name"
                value={newSession.speakerName}
                onChange={(e) => setNewSession({ ...newSession, speakerName: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Speaker Email"
                type="email"
                value={newSession.speakerEmail}
                onChange={(e) => setNewSession({ ...newSession, speakerEmail: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Accent</InputLabel>
                <Select
                  value={newSession.accent}
                  onChange={(e) => setNewSession({ ...newSession, accent: e.target.value })}
                >
                  {supportedAccents.map((accent) => (
                    <MenuItem key={accent} value={accent}>
                      {accent.charAt(0).toUpperCase() + accent.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Region</InputLabel>
                <Select
                  value={newSession.region}
                  onChange={(e) => setNewSession({ ...newSession, region: e.target.value })}
                >
                  {supportedRegions.map((region) => (
                    <MenuItem key={region} value={region}>
                      {region.charAt(0).toUpperCase() + region.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Quality</InputLabel>
                <Select
                  value={newSession.quality}
                  onChange={(e) => setNewSession({ ...newSession, quality: e.target.value as 'low' | 'medium' | 'high' })}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewSessionDialog(false)}>Cancel</Button>
          <Button onClick={createTrainingSession} variant="contained">
            Create Session
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SuperAdminDashboard;
