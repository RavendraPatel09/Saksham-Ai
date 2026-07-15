import React, { useState, useEffect, useRef } from 'react';
import { Mic, Play, Square, Settings, Volume2, Type, RefreshCw, Send, Save, StopCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CommunicationAssistant = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [history, setHistory] = useState<{ id: string; text: string; type: 'tts' | 'stt'; time: string }[]>([]);
  const synth = window.speechSynthesis;
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Load history
    const saved = localStorage.getItem('saksham-comm-history');
    if (saved) setHistory(JSON.parse(saved));

    // Setup speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = (event: any) => {
        let current = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          current += event.results[i][0].transcript;
        }
        setText(current);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const saveHistory = (newHistory: any) => {
    setHistory(newHistory);
    localStorage.setItem('saksham-comm-history', JSON.stringify(newHistory));
  };

  const handleSpeak = (phrase: string = text) => {
    if (!phrase.trim()) return;
    if (synth.speaking) synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.onend = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    synth.speak(utterance);
    
    saveHistory([{ id: Date.now().toString(), text: phrase, type: 'tts', time: new Date().toLocaleTimeString() }, ...history]);
  };

  const stopSpeaking = () => {
    synth.cancel();
    setIsSpeaking(false);
  };

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      if (text) {
        saveHistory([{ id: Date.now().toString(), text, type: 'stt', time: new Date().toLocaleTimeString() }, ...history]);
      }
    } else {
      setText('');
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const quickPhrases = [
    "Yes", "No", "Thank you", "Please repeat", 
    "I need assistance", "Can you explain that?", 
    "I am deaf/hard of hearing", "I use a speech assistant"
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary/20 p-3 rounded-full">
          <Volume2 className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Communication Assistant</h1>
          <p className="text-muted-foreground">Real-time text-to-speech and voice-to-text tools.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="premium-card h-fit flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5 text-primary" /> Composer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <textarea 
              className="w-full h-32 p-4 rounded-xl border bg-background/50 focus:ring-2 outline-none resize-none"
              placeholder="Type or speak here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            
            <div className="flex gap-2">
              {isSpeaking ? (
                <Button variant="destructive" className="flex-1" onClick={stopSpeaking}>
                  <Square className="w-4 h-4 mr-2" /> Stop
                </Button>
              ) : (
                <Button className="flex-1 bg-gradient-to-r from-primary to-indigo-600" onClick={() => handleSpeak(text)}>
                  <Play className="w-4 h-4 mr-2" /> Speak
                </Button>
              )}
              
              <Button 
                variant={isListening ? "destructive" : "outline"} 
                className="flex-1" 
                onClick={toggleListen}
                disabled={!recognitionRef.current}
              >
                {isListening ? (
                  <><StopCircle className="w-4 h-4 mr-2" /> Stop Listening</>
                ) : (
                  <><Mic className="w-4 h-4 mr-2" /> Listen (STT)</>
                )}
              </Button>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Quick Phrases</h3>
              <div className="flex flex-wrap gap-2">
                {quickPhrases.map((phrase, i) => (
                  <Button 
                    key={i} 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => handleSpeak(phrase)}
                    className="rounded-full"
                  >
                    {phrase}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card h-fit">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2"><RefreshCw className="w-5 h-5 text-primary" /> History</span>
              <Button variant="ghost" size="sm" onClick={() => saveHistory([])}>Clear</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] overflow-y-auto space-y-3 pr-2">
            {history.length === 0 ? (
              <p className="text-center text-muted-foreground mt-10">No communication history.</p>
            ) : (
              history.map((item) => (
                <div key={item.id} className={`p-3 rounded-lg border ${item.type === 'tts' ? 'bg-primary/5 ml-4 border-primary/20' : 'bg-muted/30 mr-4'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold uppercase text-muted-foreground">{item.type}</span>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-sm">{item.text}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
