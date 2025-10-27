import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/api/v1/auth/refresh`, {
            refreshToken,
          });

          const { accessToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle error messages
    if (error.response?.data?.error?.message) {
      toast.error(error.response.data.error.message);
    } else if (error.message) {
      toast.error(error.message);
    } else {
      toast.error('An unexpected error occurred');
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  logout: () => apiClient.post('/auth/logout'),
  getProfile: () => apiClient.get('/auth/profile'),
  updateProfile: (updates: any) => apiClient.put('/auth/profile', updates),
};

export const callsAPI = {
  getCalls: (params?: any) => apiClient.get('/calls', { params }),
  getCall: (id: string) => apiClient.get(`/calls/${id}`),
  initiateCall: (data: any) => apiClient.post('/calls/initiate', data),
  answerCall: (id: string) => apiClient.put(`/calls/${id}/answer`),
  endCall: (id: string) => apiClient.put(`/calls/${id}/hangup`),
  getRecording: (id: string) => apiClient.get(`/calls/${id}/recording`),
  getTranscript: (id: string) => apiClient.get(`/calls/${id}/transcript`),
};

export const queueAPI = {
  getQueue: () => apiClient.get('/queue'),
  getQueueStats: () => apiClient.get('/queue/stats'),
  updatePriority: (callId: string, priority: number) =>
    apiClient.put(`/queue/${callId}/priority?priority=${priority}`),
  removeFromQueue: (callId: string) => apiClient.delete(`/queue/${callId}`),
  getAgentAvailability: () => apiClient.get('/queue/agents/availability'),
  updateAgentStatus: (agentId: string, status: string, currentCallId?: string) =>
    apiClient.put(`/queue/agents/${agentId}/status?status=${status}&currentCallId=${currentCallId || ''}`),
};

export const organizationsAPI = {
  getOrganization: (id: string) => apiClient.get(`/organizations/${id}`),
  updateOrganization: (id: string, updates: any) => apiClient.put(`/organizations/${id}`, updates),
  getStats: (id: string) => apiClient.get(`/organizations/${id}/stats`),
};

export const usersAPI = {
  getUsers: (params?: any) => apiClient.get('/users', { params }),
  getUser: (id: string) => apiClient.get(`/users/${id}`),
  createUser: (data: any) => apiClient.post('/users', data),
  updateUser: (id: string, updates: any) => apiClient.put(`/users/${id}`, updates),
  deleteUser: (id: string) => apiClient.delete(`/users/${id}`),
};

export const voiceAPI = {
  getCallRoom: (callId: string) => apiClient.get(`/calls/${callId}/room`),
  createCallRoom: (callId: string) => apiClient.post(`/calls/${callId}/room`),
  getRtpCapabilities: (callId: string) => apiClient.get(`/calls/${callId}/rtp-capabilities`),
  endCallRoom: (callId: string) => apiClient.delete(`/calls/${callId}/room`),
  getRoom: (roomId: string) => apiClient.get(`/rooms/${roomId}`),
  getRoomRtpCapabilities: (roomId: string) => apiClient.get(`/rooms/${roomId}/rtp-capabilities`),
  getRoomStats: (roomId: string) => apiClient.get(`/rooms/${roomId}/stats`),
};

