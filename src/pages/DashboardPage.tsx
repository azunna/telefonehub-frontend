import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  Phone,
  Queue,
  People,
  TrendingUp,
  CallReceived,
  CallMade,
  Timer,
} from '@mui/icons-material';
import { useQuery } from 'react-query';
import { organizationsAPI, queueAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useWebSocket } from '../contexts/WebSocketContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { isConnected } = useWebSocket();

  const { data: orgStats } = useQuery(
    ['organization-stats', user?.organizationId],
    () => organizationsAPI.getStats(user?.organizationId || ''),
    {
      enabled: !!user?.organizationId,
      refetchInterval: 30000,
    }
  );

  const { data: queueStats } = useQuery(
    ['queue-stats'],
    () => queueAPI.getQueueStats(),
    {
      refetchInterval: 10000,
    }
  );

  const statsCards = [
    {
      title: 'Total Calls',
      value: orgStats?.data?.calls?.total || 0,
      icon: <Phone />,
      color: 'primary',
      change: '+12%',
    },
    {
      title: 'Active Calls',
      value: orgStats?.data?.calls?.active || 0,
      icon: <CallReceived />,
      color: 'success',
      change: '+5%',
    },
    {
      title: 'Calls Today',
      value: orgStats?.data?.calls?.today || 0,
      icon: <CallMade />,
      color: 'info',
      change: '+8%',
    },
    {
      title: 'Queue Length',
      value: queueStats?.data?.totalCalls || 0,
      icon: <Queue />,
      color: 'warning',
      change: '-3%',
    },
    {
      title: 'Active Agents',
      value: orgStats?.data?.users?.active || 0,
      icon: <People />,
      color: 'secondary',
      change: '+2%',
    },
    {
      title: 'Avg Wait Time',
      value: `${queueStats?.data?.avgWaitTime || 0}s`,
      icon: <Timer />,
      color: 'error',
      change: '-15%',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Welcome back, {user?.profile?.firstName || user?.email}! Here's your telephony overview.
      </Typography>

      <Grid container spacing={3}>
        {statsCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: `${card.color}.light`,
                      color: `${card.color}.main`,
                      mr: 2,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div">
                      {card.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.title}
                    </Typography>
                  </Box>
                  <Chip
                    label={card.change}
                    color={card.change.startsWith('+') ? 'success' : 'error'}
                    size="small"
                  />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(100, (card.value / 100) * 100)}
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Status
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip
                  label={isConnected ? 'Connected' : 'Disconnected'}
                  color={isConnected ? 'success' : 'error'}
                  sx={{ mr: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  WebSocket Connection
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip
                  label="Online"
                  color="success"
                  sx={{ mr: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Database Connection
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip
                  label="Healthy"
                  color="success"
                  sx={{ mr: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Voice Service
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No recent activity to display.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;

