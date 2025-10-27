import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  MoreVert,
  Person,
  Phone,
  Timer,
  OnlinePrediction,
  OfflineBolt,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { queueAPI } from '../services/api';
import { useWebSocket } from '../contexts/WebSocketContext';
import toast from 'react-hot-toast';

const AgentsPage: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { updateAgentStatus } = useWebSocket();
  const queryClient = useQueryClient();

  const { data: agents, isLoading } = useQuery(
    ['agents-availability'],
    () => queueAPI.getAgentAvailability(),
    {
      refetchInterval: 10000,
    }
  );

  const updateAgentStatusMutation = useMutation(
    ({ agentId, status, currentCallId }: { agentId: string; status: string; currentCallId?: string }) =>
      queueAPI.updateAgentStatus(agentId, status, currentCallId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['agents-availability']);
        toast.success('Agent status updated');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.error?.message || 'Failed to update agent status');
      },
    }
  );

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, agent: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedAgent(agent);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAgent(null);
  };

  const handleStatusChange = (status: string) => {
    if (selectedAgent) {
      updateAgentStatusMutation.mutate({ agentId: selectedAgent.id, status });
      updateAgentStatus(status);
    }
    handleMenuClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'success';
      case 'busy':
        return 'warning';
      case 'away':
        return 'info';
      case 'offline':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <OnlinePrediction />;
      case 'busy':
        return <Phone />;
      case 'away':
        return <Timer />;
      case 'offline':
        return <OfflineBolt />;
      default:
        return <Person />;
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'firstName',
      headerName: 'Agent',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Person sx={{ mr: 1, fontSize: 16 }} />
          {params.row.firstName} {params.row.lastName}
        </Box>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color="primary"
          size="small"
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value) as any}
          size="small"
          icon={getStatusIcon(params.value)}
        />
      ),
    },
    {
      field: 'currentCallId',
      headerName: 'Current Call',
      width: 150,
      renderCell: (params) => params.value ? (
        <Chip
          label="In Call"
          color="warning"
          size="small"
        />
      ) : (
        <Typography variant="body2" color="text.secondary">
          Available
        </Typography>
      ),
    },
    {
      field: 'lastSeen',
      headerName: 'Last Seen',
      width: 180,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={(e) => handleMenuClick(e, params.row)}
          size="small"
        >
          <MoreVert />
        </IconButton>
      ),
    },
  ];

  const statusCounts = agents?.data?.reduce((acc: any, agent: any) => {
    acc[agent.status] = (acc[agent.status] || 0) + 1;
    return acc;
  }, {}) || {};

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Agents
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {statusCounts.online || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Online
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {statusCounts.busy || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Busy
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {statusCounts.away || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Away
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {statusCounts.offline || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Offline
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <DataGrid
            rows={agents?.data || []}
            columns={columns}
            loading={isLoading}
            pageSize={25}
            rowsPerPageOptions={[25, 50, 100]}
            disableSelectionOnClick
            autoHeight
            sx={{ border: 0 }}
          />
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleStatusChange('online')}>
          <OnlinePrediction sx={{ mr: 1 }} />
          Set Online
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('busy')}>
          <Phone sx={{ mr: 1 }} />
          Set Busy
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('away')}>
          <Timer sx={{ mr: 1 }} />
          Set Away
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('offline')}>
          <OfflineBolt sx={{ mr: 1 }} />
          Set Offline
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AgentsPage;

