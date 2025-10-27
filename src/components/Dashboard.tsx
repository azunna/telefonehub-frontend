import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Phone, 
  MessageSquare, 
  Video, 
  Users, 
  Settings, 
  Plus,
  Search,
  Bell,
  User,
  PhoneCall,
  PhoneMissed,
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  Star,
  MoreVertical,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Volume2,
  VolumeX
} from 'lucide-react';

interface Call {
  id: string;
  type: 'incoming' | 'outgoing' | 'missed';
  contact: {
    name: string;
    phone: string;
    avatar?: string;
  };
  duration?: number;
  timestamp: Date;
  status: 'completed' | 'missed' | 'in-progress';
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
  status?: string;
}

interface DashboardProps {
  onMakeCall: (phone: string) => void;
  onStartVideoCall: (phone: string) => void;
  onSendSMS: (phone: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  onMakeCall, 
  onStartVideoCall, 
  onSendSMS 
}) => {
  const [activeTab, setActiveTab] = useState('calls');
  const [isCalling, setIsCalling] = useState(false);
  const [currentCall, setCurrentCall] = useState<Call | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in real app, this would come from API
  const [calls, setCalls] = useState<Call[]>([
    {
      id: '1',
      type: 'incoming',
      contact: { name: 'John Doe', phone: '+1234567890', avatar: 'https://via.placeholder.com/40' },
      duration: 120,
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      status: 'completed'
    },
    {
      id: '2',
      type: 'outgoing',
      contact: { name: 'Jane Smith', phone: '+0987654321', avatar: 'https://via.placeholder.com/40' },
      duration: 45,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      status: 'completed'
    },
    {
      id: '3',
      type: 'missed',
      contact: { name: 'Bob Johnson', phone: '+1122334455' },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      status: 'missed'
    }
  ]);

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'John Doe',
      phone: '+1234567890',
      avatar: 'https://via.placeholder.com/40',
      isOnline: true,
      lastSeen: new Date(),
      status: 'Available'
    },
    {
      id: '2',
      name: 'Jane Smith',
      phone: '+0987654321',
      avatar: 'https://via.placeholder.com/40',
      isOnline: false,
      lastSeen: new Date(Date.now() - 1000 * 60 * 30),
      status: 'Last seen 30 minutes ago'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      phone: '+1122334455',
      isOnline: true,
      lastSeen: new Date(),
      status: 'Busy'
    }
  ]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const getCallIcon = (type: string, status: string) => {
    if (status === 'in-progress') return <PhoneCall className="h-4 w-4 text-green-500" />;
    if (type === 'missed') return <PhoneMissed className="h-4 w-4 text-red-500" />;
    if (type === 'incoming') return <PhoneIncoming className="h-4 w-4 text-blue-500" />;
    return <PhoneOutgoing className="h-4 w-4 text-green-500" />;
  };

  const handleCall = (phone: string) => {
    setIsCalling(true);
    onMakeCall(phone);
  };

  const handleVideoCall = (phone: string) => {
    onStartVideoCall(phone);
  };

  const handleSMS = (phone: string) => {
    onSendSMS(phone);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">TelefoneHub</h1>
                <p className="text-sm text-gray-500">Communication Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calls">Calls</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
          </TabsList>

          {/* Calls Tab */}
          <TabsContent value="calls" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Calls
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    New Call
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {calls.map((call) => (
                    <div key={call.id} className="flex items-center justify-between p-4 hover:bg-gray-50 border-b last:border-b-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {call.contact.avatar ? (
                            <img src={call.contact.avatar} alt={call.contact.name} className="w-10 h-10 rounded-full" />
                          ) : (
                            <User className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{call.contact.name}</p>
                          <p className="text-sm text-gray-500">{call.contact.phone}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            {getCallIcon(call.type, call.status)}
                            <span>{formatTimestamp(call.timestamp)}</span>
                            {call.duration && <span>• {formatDuration(call.duration)}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleCall(call.contact.phone)}>
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleVideoCall(call.contact.phone)}>
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Contacts
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contact
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  {contacts
                    .filter(contact => 
                      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      contact.phone.includes(searchQuery)
                    )
                    .map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-4 hover:bg-gray-50 border-b last:border-b-0">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {contact.avatar ? (
                              <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full" />
                            ) : (
                              <User className="h-5 w-5 text-gray-500" />
                            )}
                          </div>
                          {contact.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{contact.name}</p>
                          <p className="text-sm text-gray-500">{contact.phone}</p>
                          <p className="text-xs text-gray-400">{contact.status}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleCall(contact.phone)}>
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleVideoCall(contact.phone)}>
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleSMS(contact.phone)}>
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SMS Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>SMS messaging will be available here</p>
                  <p className="text-sm">Send and receive text messages</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Video Tab */}
          <TabsContent value="video" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Video Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Video className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Video calling will be available here</p>
                  <p className="text-sm">Start HD video calls with contacts</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Call Interface (when calling) */}
      {isCalling && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-80 bg-white">
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Calling...</h3>
              <p className="text-gray-500 mb-6">+1234567890</p>
              <div className="flex justify-center gap-4">
                <Button size="lg" variant="destructive" onClick={() => setIsCalling(false)}>
                  <Phone className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Volume2 className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
