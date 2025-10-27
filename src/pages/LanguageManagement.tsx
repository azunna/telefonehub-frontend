import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Globe, CheckCircle, XCircle, Languages, BarChart3 } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  enabled: boolean;
  default?: boolean;
  flag?: string;
  rtl?: boolean;
}

interface TranslationStats {
  totalLanguages: number;
  enabledLanguages: number;
  translationsTotal: number;
  translationsComplete: Record<string, number>;
  lastUpdated: string;
}

export default function LanguageManagement() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [stats, setStats] = useState<TranslationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en-US');

  useEffect(() => {
    loadLanguages();
    loadStats();
  }, []);

  const loadLanguages = async () => {
    try {
      const response = await fetch('/api/v1/i18n/supported');
      const data = await response.json();
      setLanguages(Object.entries(data).map(([code, info]: [string, any]) => ({
        code,
        ...info
      })));
    } catch (error) {
      console.error('Error loading languages:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch('/api/v1/i18n/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const toggleLanguage = async (code: string, enabled: boolean) => {
    try {
      const updated = languages.map(lang => 
        lang.code === code ? { ...lang, enabled: !enabled } : lang
      );
      setLanguages(updated);
      // In production, this would make an API call to update
    } catch (error) {
      console.error('Error toggling language:', error);
    }
  };

  const getCompletionPercentage = (code: string) => {
    if (!stats) return 0;
    const complete = stats.translationsComplete[code] || 0;
    return Math.round((complete / stats.translationsTotal) * 100);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Language Management</h1>
          <p className="text-gray-600 mt-2">Manage supported languages and translations</p>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-blue-600" />
          <span className="text-sm text-gray-600">
            {stats?.enabledLanguages} languages enabled
          </span>
        </div>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Languages</p>
                  <p className="text-2xl font-bold">{stats.totalLanguages}</p>
                </div>
                <Languages className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Enabled</p>
                  <p className="text-2xl font-bold">{stats.enabledLanguages}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Translation Keys</p>
                  <p className="text-2xl font-bold">{stats.translationsTotal}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="text-sm font-medium">
                    {new Date(stats.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Languages List */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Languages</TabsTrigger>
          <TabsTrigger value="enabled">Enabled Only</TabsTrigger>
          <TabsTrigger value="disabled">Disabled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supported Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{lang.name}</h3>
                          {lang.default && (
                            <Badge variant="default" className="text-xs">Default</Badge>
                          )}
                          {lang.rtl && (
                            <Badge variant="secondary" className="text-xs">RTL</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{lang.code}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {stats && (
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {getCompletionPercentage(lang.code)}%
                          </p>
                          <p className="text-xs text-gray-600">Complete</p>
                        </div>
                      )}
                      <Button
                        variant={lang.enabled ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleLanguage(lang.code, lang.enabled)}
                      >
                        {lang.enabled ? (
                          <><CheckCircle className="h-4 w-4 mr-2" /> Enabled</>
                        ) : (
                          <><XCircle className="h-4 w-4 mr-2" /> Disabled</>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enabled">
          <Card>
            <CardHeader>
              <CardTitle>Enabled Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {languages.filter(l => l.enabled).length} languages are currently enabled
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disabled">
          <Card>
            <CardHeader>
              <CardTitle>Disabled Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {languages.filter(l => !l.enabled).length} languages are currently disabled
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

