import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Code, 
  Phone, 
  MessageSquare, 
  Video, 
  FileText, 
  Shield, 
  CreditCard,
  Globe,
  Database,
  Zap,
  BookOpen,
  Copy,
  Check
} from 'lucide-react';

const DeveloperDocs: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const apiEndpoints = [
    {
      category: 'Authentication',
      icon: <Shield className="h-5 w-5" />,
      endpoints: [
        {
          method: 'POST',
          path: '/api/v1/auth/login',
          description: 'User authentication',
          example: {
            request: `{
  "email": "user@example.com",
  "password": "password123"
}`,
            response: `{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "role": "user"
    }
  }
}`
          }
        }
      ]
    },
    {
      category: 'Voice Calls',
      icon: <Phone className="h-5 w-5" />,
      endpoints: [
        {
          method: 'POST',
          path: '/api/v1/calls/make',
          description: 'Make a voice call',
          example: {
            request: `{
  "to": "+1234567890",
  "from": "+0987654321",
  "context": {
    "type": "business_call",
    "customerId": "customer-123"
  }
}`,
            response: `{
  "success": true,
  "data": {
    "callId": "call-456",
    "status": "initiated",
    "duration": 0
  }
}`
          }
        }
      ]
    },
    {
      category: 'SMS',
      icon: <MessageSquare className="h-5 w-5" />,
      endpoints: [
        {
          method: 'POST',
          path: '/api/v1/sms/send',
          description: 'Send SMS message',
          example: {
            request: `{
  "to": "+1234567890",
  "message": "Hello from TelephonyHub!",
  "from": "+0987654321"
}`,
            response: `{
  "success": true,
  "data": {
    "messageId": "msg-789",
    "status": "sent",
    "cost": 0.01
  }
}`
          }
        }
      ]
    },
    {
      category: 'Video Calls',
      icon: <Video className="h-5 w-5" />,
      endpoints: [
        {
          method: 'POST',
          path: '/api/v1/video/rooms',
          description: 'Create video call room',
          example: {
            request: `{
  "name": "Team Meeting",
  "participants": ["user-1", "user-2"],
  "settings": {
    "recording": true,
    "maxParticipants": 10
  }
}`,
            response: `{
  "success": true,
  "data": {
    "roomId": "room-123",
    "joinUrl": "https://telephonyhub.com/video/room-123",
    "token": "video-token-456"
  }
}`
          }
        }
      ]
    },
    {
      category: 'Marketplace',
      icon: <Globe className="h-5 w-5" />,
      endpoints: [
        {
          method: 'GET',
          path: '/api/v1/marketplace/merchants',
          description: 'Get all merchants',
          example: {
            request: `GET /api/v1/marketplace/merchants?category=electronics&location=lagos`,
            response: `{
  "success": true,
  "data": {
    "merchants": [
      {
        "id": "merchant-1",
        "name": "Tech Store",
        "category": "Electronics",
        "rating": 4.5,
        "isOnline": true
      }
    ]
  }
}`
          }
        },
        {
          method: 'POST',
          path: '/api/v1/marketplace/merchants/:id/call',
          description: 'Call a merchant',
          example: {
            request: `{
  "customerId": "customer-123",
  "productId": "product-456",
  "message": "I'm interested in this product"
}`,
            response: `{
  "success": true,
  "data": {
    "callSession": {
      "id": "session-789",
      "status": "initiated"
    },
    "callId": "call-456"
  }
}`
          }
        }
      ]
    },
    {
      category: 'Payments',
      icon: <CreditCard className="h-5 w-5" />,
      endpoints: [
        {
          method: 'POST',
          path: '/api/v1/payments/initialize',
          description: 'Initialize payment',
          example: {
            request: `{
  "amount": 5000,
  "email": "customer@example.com",
  "currency": "NGN",
  "reference": "order-123"
}`,
            response: `{
  "success": true,
  "data": {
    "authorizationUrl": "https://checkout.paystack.com/...",
    "reference": "order-123"
  }
}`
          }
        }
      ]
    }
  ];

  const sdkExamples = {
    javascript: `// Install the SDK
npm install @telephonyhub/sdk

// Initialize the client
import { TelephonyHub } from '@telephonyhub/sdk';

const client = new TelephonyHub({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.telephonyhub.com'
});

// Make a call
const call = await client.calls.make({
  to: '+1234567890',
  from: '+0987654321',
  context: {
    type: 'business_call'
  }
});

// Send SMS
const sms = await client.sms.send({
  to: '+1234567890',
  message: 'Hello from TelephonyHub!'
});

// Create video room
const room = await client.video.createRoom({
  name: 'Team Meeting',
  participants: ['user-1', 'user-2']
});`,

    python: `# Install the SDK
pip install telephonyhub

# Initialize the client
from telephonyhub import TelephonyHub

client = TelephonyHub(
    api_key='your-api-key',
    base_url='https://api.telephonyhub.com'
)

# Make a call
call = client.calls.make(
    to='+1234567890',
    from_='+0987654321',
    context={
        'type': 'business_call'
    }
)

# Send SMS
sms = client.sms.send(
    to='+1234567890',
    message='Hello from TelephonyHub!'
)

# Create video room
room = client.video.create_room(
    name='Team Meeting',
    participants=['user-1', 'user-2']
)`,

    php: `<?php
// Install via Composer
composer require telephonyhub/telephonyhub

// Initialize the client
use TelephonyHub\\TelephonyHub;

$client = new TelephonyHub([
    'api_key' => 'your-api-key',
    'base_url' => 'https://api.telephonyhub.com'
]);

// Make a call
$call = $client->calls->make([
    'to' => '+1234567890',
    'from' => '+0987654321',
    'context' => [
        'type' => 'business_call'
    ]
]);

// Send SMS
$sms = $client->sms->send([
    'to' => '+1234567890',
    'message' => 'Hello from TelephonyHub!'
]);

// Create video room
$room = $client->video->createRoom([
    'name' => 'Team Meeting',
    'participants' => ['user-1', 'user-2']
]);
?>`
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">TelephonyHub API</h1>
              <p className="mt-2 text-lg text-gray-600">
                Build powerful communication features with our comprehensive API
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                v1.0.0
              </Badge>
              <Button variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Full Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Start</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Code className="h-4 w-4 mr-2" />
                  Getting Started
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Authentication
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Voice Calls
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  SMS
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Video Calls
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Marketplace
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payments
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
                <TabsTrigger value="sdks">SDKs</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Welcome to TelephonyHub API</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">
                      TelephonyHub provides a comprehensive API for building communication features 
                      into your applications. From voice calls and SMS to video conferencing and 
                      marketplace integration, we've got you covered.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">🚀 Quick Start</h3>
                        <p className="text-sm text-gray-600">
                          Get up and running in minutes with our simple API endpoints and comprehensive documentation.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">🔒 Secure</h3>
                        <p className="text-sm text-gray-600">
                          Enterprise-grade security with JWT authentication and rate limiting.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">📱 Multi-Platform</h3>
                        <p className="text-sm text-gray-600">
                          SDKs available for JavaScript, Python, PHP, and more.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">🌍 Global</h3>
                        <p className="text-sm text-gray-600">
                          Reach customers worldwide with our global infrastructure.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>API Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { icon: <Phone className="h-6 w-6" />, title: 'Voice Calls', desc: 'Make and receive calls' },
                        { icon: <MessageSquare className="h-6 w-6" />, title: 'SMS', desc: 'Send text messages' },
                        { icon: <Video className="h-6 w-6" />, title: 'Video Calls', desc: 'HD video conferencing' },
                        { icon: <FileText className="h-6 w-6" />, title: 'Recording', desc: 'Call recording & transcription' },
                        { icon: <Shield className="h-6 w-6" />, title: 'Security', desc: 'End-to-end encryption' },
                        { icon: <Globe className="h-6 w-6" />, title: 'Marketplace', desc: 'E-commerce integration' }
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className="text-blue-600">{feature.icon}</div>
                          <div>
                            <h4 className="font-medium">{feature.title}</h4>
                            <p className="text-sm text-gray-600">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="endpoints" className="space-y-6">
                {apiEndpoints.map((category, categoryIndex) => (
                  <Card key={categoryIndex}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {category.icon}
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {category.endpoints.map((endpoint, endpointIndex) => (
                        <div key={endpointIndex} className="border rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge 
                              variant={endpoint.method === 'GET' ? 'default' : 'destructive'}
                              className="font-mono"
                            >
                              {endpoint.method}
                            </Badge>
                            <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                              {endpoint.path}
                            </code>
                          </div>
                          <p className="text-gray-600 mb-4">{endpoint.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Request</h4>
                              <div className="relative">
                                <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
                                  <code>{endpoint.example.request}</code>
                                </pre>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="absolute top-2 right-2"
                                  onClick={() => copyToClipboard(endpoint.example.request, `req-${categoryIndex}-${endpointIndex}`)}
                                >
                                  {copiedCode === `req-${categoryIndex}-${endpointIndex}` ? (
                                    <Check className="h-4 w-4" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Response</h4>
                              <div className="relative">
                                <pre className="bg-gray-900 text-blue-400 p-3 rounded text-xs overflow-x-auto">
                                  <code>{endpoint.example.response}</code>
                                </pre>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="absolute top-2 right-2"
                                  onClick={() => copyToClipboard(endpoint.example.response, `res-${categoryIndex}-${endpointIndex}`)}
                                >
                                  {copiedCode === `res-${categoryIndex}-${endpointIndex}` ? (
                                    <Check className="h-4 w-4" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="sdks" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Official SDKs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { name: 'JavaScript/Node.js', version: '1.0.0', install: 'npm install @telephonyhub/sdk' },
                        { name: 'Python', version: '1.0.0', install: 'pip install telephonyhub' },
                        { name: 'PHP', version: '1.0.0', install: 'composer require telephonyhub/telephonyhub' }
                      ].map((sdk, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <h3 className="font-semibold mb-2">{sdk.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">Version {sdk.version}</p>
                          <code className="text-xs bg-gray-100 p-2 rounded block">{sdk.install}</code>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="examples" className="space-y-6">
                <Tabs defaultValue="javascript" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="php">PHP</TabsTrigger>
                  </TabsList>
                  
                  {Object.entries(sdkExamples).map(([language, code]) => (
                    <TabsContent key={language} value={language}>
                      <Card>
                        <CardHeader>
                          <CardTitle className="capitalize">{language} Example</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="relative">
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                              <code>{code}</code>
                            </pre>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute top-2 right-2"
                              onClick={() => copyToClipboard(code, language)}
                            >
                              {copiedCode === language ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDocs;
