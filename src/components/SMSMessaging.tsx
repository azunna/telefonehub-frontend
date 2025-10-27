import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Search, 
  Filter,
  Archive,
  Trash2,
  Star,
  StarOff,
  Reply,
  Forward,
  Copy,
  Download,
  User,
  Clock,
  Check,
  CheckCheck,
  AlertCircle,
  MessageSquare,
  X
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isFromUser: boolean;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  isRead: boolean;
  isStarred: boolean;
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
  }>;
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
  unreadCount: number;
  lastMessage?: string;
  lastMessageTime?: Date;
  isStarred: boolean;
}

interface SMSMessagingProps {
  selectedContact?: Contact;
  onSelectContact: (contact: Contact) => void;
  onMakeCall: (phone: string) => void;
  onStartVideoCall: (phone: string) => void;
}

export const SMSMessaging: React.FC<SMSMessagingProps> = ({
  selectedContact,
  onSelectContact,
  onMakeCall,
  onStartVideoCall
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'starred'>('all');
  const [showContactList, setShowContactList] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data
  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'John Doe',
      phone: '+1234567890',
      avatar: 'https://via.placeholder.com/40',
      isOnline: true,
      lastSeen: new Date(),
      unreadCount: 2,
      lastMessage: 'Hey, how are you?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
      isStarred: false
    },
    {
      id: '2',
      name: 'Jane Smith',
      phone: '+0987654321',
      avatar: 'https://via.placeholder.com/40',
      isOnline: false,
      lastSeen: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 0,
      lastMessage: 'Thanks for the call!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isStarred: false
    },
    {
      id: '3',
      name: 'Bob Johnson',
      phone: '+1122334455',
      isOnline: true,
      lastSeen: new Date(),
      unreadCount: 1,
      lastMessage: 'Can we schedule a meeting?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isStarred: false
    }
  ]);

  useEffect(() => {
    if (selectedContact) {
      // Load messages for selected contact
      const mockMessages: Message[] = [
        {
          id: '1',
          text: 'Hey, how are you doing?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          isFromUser: false,
          status: 'read',
          isRead: true,
          isStarred: false
        },
        {
          id: '2',
          text: 'I\'m doing great! Thanks for asking. How about you?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
          isFromUser: true,
          status: 'read',
          isRead: true,
          isStarred: false
        },
        {
          id: '3',
          text: 'I\'m good too! Just working on some projects.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          isFromUser: false,
          status: 'read',
          isRead: true,
          isStarred: false
        },
        {
          id: '4',
          text: 'That sounds interesting! What kind of projects?',
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          isFromUser: true,
          status: 'delivered',
          isRead: false,
          isStarred: false
        }
      ];
      setMessages(mockMessages);
    }
  }, [selectedContact]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date(),
      isFromUser: true,
      status: 'sending',
      isRead: false,
      isStarred: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate message sending
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id 
            ? { ...msg, status: 'sent' as const }
            : msg
        )
      );
    }, 1000);

    // Simulate delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id 
            ? { ...msg, status: 'delivered' as const }
            : msg
        )
      );
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return <Clock className="h-3 w-3 text-gray-400" />;
      case 'sent':
        return <Check className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.phone.includes(searchQuery);
    
    switch (filterStatus) {
      case 'unread':
        return matchesSearch && contact.unreadCount > 0;
      case 'starred':
        return matchesSearch && contact.isStarred;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Contact List */}
      {showContactList && (
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Messages</h2>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowContactList(false)}
                className="lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                size="sm"
                variant={filterStatus === 'unread' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('unread')}
              >
                Unread
              </Button>
              <Button
                size="sm"
                variant={filterStatus === 'starred' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('starred')}
              >
                Starred
              </Button>
            </div>
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  selectedContact?.id === contact.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
                onClick={() => onSelectContact(contact)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      {contact.avatar ? (
                        <img 
                          src={contact.avatar} 
                          alt={contact.name} 
                          className="w-12 h-12 rounded-full object-cover" 
                        />
                      ) : (
                        <User className="h-6 w-6 text-gray-500" />
                      )}
                    </div>
                    {contact.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                      {contact.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {contact.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-400">
                        {contact.lastMessageTime && formatTime(contact.lastMessageTime)}
                      </p>
                      {contact.isStarred && (
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowContactList(true)}
                    className="lg:hidden"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {selectedContact.avatar ? (
                        <img 
                          src={selectedContact.avatar} 
                          alt={selectedContact.name} 
                          className="w-10 h-10 rounded-full object-cover" 
                        />
                      ) : (
                        <User className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    {selectedContact.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedContact.name}</h3>
                    <p className="text-sm text-gray-500">{selectedContact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onMakeCall(selectedContact.phone)}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onStartVideoCall(selectedContact.phone)}
                  >
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => {
                const showDate = index === 0 || 
                  formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);
                
                return (
                  <div key={message.id}>
                    {showDate && (
                      <div className="text-center text-sm text-gray-500 mb-4">
                        {formatDate(message.timestamp)}
                      </div>
                    )}
                    <div className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isFromUser 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-900'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <div className={`flex items-center justify-end gap-1 mt-1 ${
                          message.isFromUser ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          <span className="text-xs">{formatTime(message.timestamp)}</span>
                          {message.isFromUser && getStatusIcon(message.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p>Choose a contact to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
