export interface UserProfile {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  timezone?: string;
  language?: string;
}

export interface User {
  id: string;
  email: string;
  phone?: string;
  name?: string;
  avatar?: string;
  role?: 'admin' | 'manager' | 'agent' | 'viewer';
  status?: 'active' | 'inactive' | 'suspended';
  profile?: UserProfile;
  isOnline?: boolean;
  lastSeen?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

