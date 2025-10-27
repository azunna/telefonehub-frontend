import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add,
  Phone,
  MoreVert,
  PlayArrow,
  Stop,
  Download,
  Visibility,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { callsAPI } from '../services/api';
import { useCall } from '../contexts/CallContext';
import toast from 'react-hot-toast';

const CallsPage: React.FC = () => {
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [initiateDialogOpen, setInitiateDialogOpen] = useState(false);
  const [calleeNumber, setCalleeNumber] = useState('');
  const { startCall, answerCall, endCall, isInCall } = useCall();
  const queryClient = useQueryClient();

  const { data: calls, isLoading } = useQuery(
    ['calls'],
    () => callsAPI.getCalls({ page: 1, limit: 50 }),
    {
      refetchInterval: 10000,
    }
  );

  const initiateCallMutation = useMutation(
    (data: { calleeNumber: string; metadata?: any }) =>
      callsAPI.initiateCall(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['calls']);
        setInitiateDialogOpen(false);
        setCalleeNumber('');
        toast.success('Call initiated successfully');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.error?.message || 'Failed to initiate call');
      },
    }
  );

  const answerCallMutation = useMutation(
    (callId: string) => callsAPI.answerCall(callId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['calls']);
        toast.success('Call answered');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.error?.message || 'Failed to answer call');
      },
    }
  );

  const endCallMutation = useMutation(
    (callId: string) => callsAPI.endCall(callId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['calls']);
        toast.success('Call ended');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.error?.message || 'Failed to end call');
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

  const handleAnswerCall = () => {
    if (selectedCall) {
      answerCallMutation.mutate(selectedCall.id);
      answerCall(selectedCall.id);
    }
    handleMenuClose();
  };

  const handleEndCall = () => {
    if (selectedCall) {
      endCallMutation.mutate(selectedCall.id);
      endCall();
    }
    handleMenuClose();
  };

  const handleInitiateCall = () => {
    if (calleeNumber) {
      initiateCallMutation.mutate({ calleeNumber });
      startCall(calleeNumber);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'incoming':
        return 'warning';
      case 'ended':
        return 'default';
      case 'missed':
        return 'error';
      default:
        return 'default';
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'callerNumber',
      headerName: 'Caller',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Phone sx={{ mr: 1, fontSize: 16 }} />
          {params.value || 'Unknown'}
        </Box>
      ),
    },
    {
      field: 'calleeNumber',
      headerName: 'Callee',
      width: 150,
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
        />
      ),
    },
    {
      field: 'direction',
      headerName: 'Direction',
      width: 100,
    },
    {
      field: 'duration',
      headerName: 'Duration',
      width: 100,
      renderCell: (params) => params.value ? `${params.value}s` : '-',
    },
    {
      field: 'createdAt',
      headerName: 'Created',
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Calls</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setInitiateDialogOpen(true)}
          disabled={isInCall}
        >
          Initiate Call
        </Button>
      </Box>

      <Card>
        <CardContent>
          <DataGrid
            rows={calls?.data?.data || []}
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
        {selectedCall?.status === 'incoming' && (
          <MenuItem onClick={handleAnswerCall}>
            <PlayArrow sx={{ mr: 1 }} />
            Answer Call
          </MenuItem>
        )}
        {selectedCall?.status === 'active' && (
          <MenuItem onClick={handleEndCall}>
            <Stop sx={{ mr: 1 }} />
            End Call
          </MenuItem>
        )}
        <MenuItem>
          <Visibility sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem>
          <Download sx={{ mr: 1 }} />
          Download Recording
        </MenuItem>
      </Menu>

      <Dialog open={initiateDialogOpen} onClose={() => setInitiateDialogOpen(false)}>
        <DialogTitle>Initiate Call</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Phone Number"
            fullWidth
            variant="outlined"
            value={calleeNumber}
            onChange={(e) => setCalleeNumber(e.target.value)}
            placeholder="+1234567890"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInitiateDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleInitiateCall}
            variant="contained"
            disabled={!calleeNumber || initiateCallMutation.isLoading}
          >
            {initiateCallMutation.isLoading ? 'Initiating...' : 'Initiate Call'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CallsPage;

