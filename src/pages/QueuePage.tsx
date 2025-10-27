import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVert,
  Phone,
  Timer,
  PriorityHigh,
  People,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { queueAPI } from '../services/api';
import toast from 'react-hot-toast';

const QueuePage: React.FC = () => {
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const queryClient = useQueryClient();

  const { data: queueStats, isLoading } = useQuery(
    ['queue-stats'],
    () => queueAPI.getQueueStats(),
    {
      refetchInterval: 5000,
    }
  );

  const updatePriorityMutation = useMutation(
    ({ callId, priority }: { callId: string; priority: number }) =>
      queueAPI.updatePriority(callId, priority),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['queue-stats']);
        toast.success('Priority updated');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.error?.message || 'Failed to update priority');
      },
    }
  );

  const removeFromQueueMutation = useMutation(
    (callId: string) => queueAPI.removeFromQueue(callId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['queue-stats']);
        toast.success('Call removed from queue');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.error?.message || 'Failed to remove call');
      },
    }
  );

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, call: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedCall(call);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCall(null);
  };

  const handleUpdatePriority = (priority: number) => {
    if (selectedCall) {
      updatePriorityMutation.mutate({ callId: selectedCall.callId, priority });
    }
    handleMenuClose();
  };

  const handleRemoveFromQueue = () => {
    if (selectedCall) {
      removeFromQueueMutation.mutate(selectedCall.callId);
    }
    handleMenuClose();
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return 'error';
    if (priority >= 5) return 'warning';
    return 'default';
  };

  const columns: GridColDef[] = [
    {
      field: 'callId',
      headerName: 'Call ID',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Phone sx={{ mr: 1, fontSize: 16 }} />
          {params.value}
        </Box>
      ),
    },
    {
      field: 'queuePosition',
      headerName: 'Position',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={`#${params.value}`}
          color="primary"
          size="small"
        />
      ),
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getPriorityColor(params.value) as any}
          size="small"
          icon={params.value >= 8 ? <PriorityHigh /> : undefined}
        />
      ),
    },
    {
      field: 'waitTime',
      headerName: 'Wait Time',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Timer sx={{ mr: 1, fontSize: 16 }} />
          {params.value}s
        </Box>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Queued At',
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Call Queue
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {queueStats?.data?.totalCalls || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Calls in Queue
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {queueStats?.data?.avgWaitTime || 0}s
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Wait Time
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {queueStats?.data?.maxWaitTime || 0}s
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Max Wait Time
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {queueStats?.data?.highPriorityCalls || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                High Priority Calls
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <DataGrid
            rows={queueStats?.data?.queue || []}
            columns={columns}
            loading={isLoading}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25 },
              },
            }}
            pageSizeOptions={[25, 50, 100]}
            disableRowSelectionOnClick
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
        <MenuItem onClick={() => handleUpdatePriority(10)}>
          <PriorityHigh sx={{ mr: 1 }} />
          Set High Priority (10)
        </MenuItem>
        <MenuItem onClick={() => handleUpdatePriority(5)}>
          <PriorityHigh sx={{ mr: 1 }} />
          Set Medium Priority (5)
        </MenuItem>
        <MenuItem onClick={() => handleUpdatePriority(1)}>
          <PriorityHigh sx={{ mr: 1 }} />
          Set Low Priority (1)
        </MenuItem>
        <MenuItem onClick={handleRemoveFromQueue} sx={{ color: 'error.main' }}>
          Remove from Queue
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default QueuePage;

