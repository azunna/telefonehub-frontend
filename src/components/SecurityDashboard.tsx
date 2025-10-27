import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  Lock, 
  Activity, 
  TrendingUp, 
  Users, 
  Globe,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface SecurityEvent {
  id: string;
  timestamp: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
  source: {
    ip: string;
    userAgent: string;
  };
  target: {
    endpoint: string;
    method: string;
  };
  details: {
    attackType?: string;
    riskScore: number;
    mitigation?: string;
  };
  status: string;
}

interface Vulnerability {
  id: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  title: string;
  description: string;
  cve?: string;
  cwe?: string;
  affectedEndpoint: string;
  status: 'open' | 'investigating' | 'patched' | 'false_positive';
  remediation: string;
}

interface SecurityDashboardProps {
  onBlockIP?: (ip: string) => void;
  onUpdateVulnerability?: (id: string, status: string) => void;
}

export const SecurityDashboard: React.FC<SecurityDashboardProps> = ({ 
  onBlockIP, 
  onUpdateVulnerability 
}) => {
  const [dashboard, setDashboard] = useState<any>(null);
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    fetchSecurityData();
    const interval = setInterval(fetchSecurityData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchSecurityData = async () => {
    try {
      const [dashboardRes, eventsRes, vulnerabilitiesRes] = await Promise.all([
        fetch('/api/v1/security/dashboard'),
        fetch('/api/v1/security/events?limit=20'),
        fetch('/api/v1/security/vulnerabilities')
      ]);

      const [dashboardData, eventsData, vulnerabilitiesData] = await Promise.all([
        dashboardRes.json(),
        eventsRes.json(),
        vulnerabilitiesRes.json()
      ]);

      if (dashboardData.success) setDashboard(dashboardData.data);
      if (eventsData.success) setEvents(eventsData.data.events);
      if (vulnerabilitiesData.success) setVulnerabilities(vulnerabilitiesData.data);
    } catch (error) {
      console.error('Error fetching security data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'emergency':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'emergency':
        return <XCircle className="h-4 w-4" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <AlertCircle className="h-4 w-4" />;
      case 'low':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Security Dashboard</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            Real-time
          </Badge>
          <Button onClick={fetchSecurityData} variant="outline" size="sm">
            Refresh
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Security Events</TabsTrigger>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="threats">Threat Intelligence</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Security Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Threats</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboard?.overview?.totalThreats || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Last 24 hours
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blocked IPs</CardTitle>
                <Lock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboard?.overview?.blockedIPs || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Currently blocked
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboard?.overview?.vulnerabilities || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Open vulnerabilities
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboard?.overview?.activeIncidents || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Under investigation
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Security Events */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Security Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.slice(0, 5).map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${getSeverityColor(event.severity)}`}>
                        {getSeverityIcon(event.severity)}
                      </div>
                      <div>
                        <p className="font-medium">{event.details.attackType || event.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.source.ip} • {event.target.endpoint}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className={getSeverityColor(event.severity)}>
                        {event.severity}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${getSeverityColor(event.severity)}`}>
                          {getSeverityIcon(event.severity)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{event.details.attackType || event.type}</h3>
                            <Badge variant="outline" className={getSeverityColor(event.severity)}>
                              {event.severity}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div>
                              <p><strong>IP:</strong> {event.source.ip}</p>
                              <p><strong>Endpoint:</strong> {event.target.method} {event.target.endpoint}</p>
                            </div>
                            <div>
                              <p><strong>Risk Score:</strong> {event.details.riskScore}/100</p>
                              <p><strong>Time:</strong> {new Date(event.timestamp).toLocaleString()}</p>
                            </div>
                          </div>
                          {event.details.mitigation && (
                            <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                              <strong>Mitigation:</strong> {event.details.mitigation}
                            </div>
                          )}
                          <div className="mt-2 flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => onBlockIP?.(event.source.ip)}
                            >
                              Block IP
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vulnerabilities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vulnerabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vulnerabilities.map((vuln) => (
                  <div key={vuln.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{vuln.title}</h3>
                          <Badge variant="outline" className={getSeverityColor(vuln.severity)}>
                            {vuln.severity}
                          </Badge>
                          <Badge variant="outline">{vuln.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{vuln.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div>
                            <p><strong>Endpoint:</strong> {vuln.affectedEndpoint}</p>
                            {vuln.cve && <p><strong>CVE:</strong> {vuln.cve}</p>}
                            {vuln.cwe && <p><strong>CWE:</strong> {vuln.cwe}</p>}
                          </div>
                          <div>
                            <p><strong>Status:</strong> {vuln.status}</p>
                            <p><strong>Discovered:</strong> {new Date(vuln.timestamp).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="mt-2 p-2 bg-yellow-50 rounded text-sm">
                          <strong>Remediation:</strong> {vuln.remediation}
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onUpdateVulnerability?.(vuln.id, 'investigating')}
                          >
                            Investigate
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onUpdateVulnerability?.(vuln.id, 'patched')}
                          >
                            Mark Patched
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Threat Intelligence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Globe className="h-12 w-12 mx-auto mb-4" />
                <p>Threat intelligence data will be displayed here</p>
                <p className="text-sm">Real-time threat feeds and indicators</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
