import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Mic, MicOff, Languages, Volume2 } from 'lucide-react';

interface VoiceTranslationProps {
  callId: string;
  participants: {
    [participantId: string]: {
      language: string;
      voiceId: string;
      gender: 'male' | 'female';
    };
  };
}

const SUPPORTED_LANGUAGES = {
  'en': { name: 'English', voices: ['en-US', 'en-GB', 'en-AU'] },
  'es': { name: 'Spanish', voices: ['es-ES', 'es-MX', 'es-AR'] },
  'fr': { name: 'French', voices: ['fr-FR', 'fr-CA', 'fr-BE'] },
  'de': { name: 'German', voices: ['de-DE', 'de-AT', 'de-CH'] },
  'ha': { name: 'Hausa', voices: ['ha-NG'] },
  'ig': { name: 'Igbo', voices: ['ig-NG'] },
  'yo': { name: 'Yoruba', voices: ['yo-NG'] },
  'sw': { name: 'Swahili', voices: ['sw-KE', 'sw-TZ'] },
  'am': { name: 'Amharic', voices: ['am-ET'] },
  'zu': { name: 'Zulu', voices: ['zu-ZA'] },
  'xh': { name: 'Xhosa', voices: ['xh-ZA'] },
  'af': { name: 'Afrikaans', voices: ['af-ZA'] }
};

export const VoiceTranslation: React.FC<VoiceTranslationProps> = ({ callId, participants }) => {
  const [session, setSession] = useState<any>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [translationHistory, setTranslationHistory] = useState<any[]>([]);

  // Create translation session
  const createSession = async () => {
    try {
      const response = await fetch('/api/v1/voice-translation/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callId, participants })
      });
      const data = await response.json();
      setSession(data.data);
    } catch (error) {
      console.error('Error creating translation session:', error);
    }
  };

  // Start/stop recording
  const toggleRecording = async () => {
    if (!isRecording) {
      setIsRecording(true);
      // Start recording logic here
    } else {
      setIsRecording(false);
      // Stop recording logic here
    }
  };

  // Translate speech
  const translateSpeech = async (audioBlob: Blob) => {
    if (!session) return;

    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('sessionId', session.sessionId);
    formData.append('participantId', 'current-user');

    try {
      setIsTranslating(true);
      const response = await fetch('/api/v1/voice-translation/translate', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      
      if (data.success) {
        setTranslationHistory(prev => [...prev, data.data]);
      }
    } catch (error) {
      console.error('Error translating speech:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  useEffect(() => {
    createSession();
  }, [callId]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="h-5 w-5" />
          Voice Translation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Session Status */}
        {session && (
          <div className="flex items-center gap-2">
            <Badge variant="outline">Session Active</Badge>
            <span className="text-sm text-muted-foreground">
              Session ID: {session.sessionId}
            </span>
          </div>
        )}

        {/* Language Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Source Language</label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => (
                  <SelectItem key={code} value={code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Target Language</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select target language" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => (
                  <SelectItem key={code} value={code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Recording Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={toggleRecording}
            variant={isRecording ? "destructive" : "default"}
            size="lg"
            disabled={!session || isTranslating}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>
          
          {isTranslating && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
              Translating...
            </div>
          )}
        </div>

        {/* Translation History */}
        {translationHistory.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Translation History</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {translationHistory.map((translation, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{translation.sourceLanguage}</Badge>
                    <span>→</span>
                    <Badge variant="secondary">{translation.targetLanguage}</Badge>
                    <Badge variant="outline">
                      {Math.round(translation.confidence * 100)}% confidence
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Original:</span>
                      <p className="text-sm text-muted-foreground">{translation.originalText}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Translated:</span>
                      <p className="text-sm">{translation.translatedText}</p>
                    </div>
                  </div>
                  {translation.audioBuffer && (
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      <audio controls className="flex-1">
                        <source src={`data:audio/mpeg;base64,${translation.audioBuffer}`} type="audio/mpeg" />
                      </audio>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Participants */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Participants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.entries(participants).map(([id, participant]) => (
              <div key={id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">User {id}</span>
                  <Badge variant="outline">
                    {SUPPORTED_LANGUAGES[participant.language as keyof typeof SUPPORTED_LANGUAGES]?.name || participant.language}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Voice: {participant.voiceId} • {participant.gender}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
