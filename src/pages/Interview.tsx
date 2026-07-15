import React, { useState } from 'react';
import { Mic, Video, Type, Play, Square, RotateCcw, MessageSquare, Bot, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';

export const Interview = () => {
  const [mode, setMode] = useState<'text' | 'voice' | 'video'>('text');
  const [status, setStatus] = useState<'idle' | 'recording' | 'analyzing' | 'results'>('idle');
  const [answer, setAnswer] = useState('');

  const questions = [
    "Tell me about a time you handled a difficult customer.",
    "How do you ensure web accessibility in your projects?",
    "Why do you want to join our company?",
  ];
  
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleStart = () => {
    setStatus('recording');
  };

  const handleStop = () => {
    setStatus('analyzing');
    setTimeout(() => {
      setStatus('results');
    }, 2500);
  };

  const handleRetry = () => {
    setStatus('idle');
    setAnswer('');
  };

  const handleNext = () => {
    setCurrentQuestion(prev => (prev + 1) % questions.length);
    handleRetry();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Interview Coach</h1>
        <p className="text-muted-foreground">Practice your interview skills in a safe, stress-free environment.</p>
      </div>

      <div className="flex gap-4 mb-8">
        <Button variant={mode === 'text' ? 'default' : 'outline'} onClick={() => setMode('text')}>
          <Type className="mr-2 h-4 w-4" /> Text Mode
        </Button>
        <Button variant={mode === 'voice' ? 'default' : 'outline'} onClick={() => setMode('voice')}>
          <Mic className="mr-2 h-4 w-4" /> Voice Mode
        </Button>
        <Button variant={mode === 'video' ? 'default' : 'outline'} onClick={() => setMode('video')}>
          <Video className="mr-2 h-4 w-4" /> Video Mode
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center gap-2">
                <Bot className="h-6 w-6" /> Interviewer
              </CardTitle>
              <CardDescription className="text-lg text-foreground mt-2 font-medium">
                "{questions[currentQuestion]}"
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mode === 'text' && (
                <Textarea 
                  placeholder="Type your answer here..." 
                  className="min-h-[150px] resize-none"
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  disabled={status !== 'idle' && status !== 'recording'}
                />
              )}
              {mode === 'voice' && (
                <div className="h-[150px] bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed">
                  {status === 'recording' ? (
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
                        <Mic className="h-8 w-8" />
                      </div>
                      <p className="font-mono">00:14</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-muted-foreground">
                      <Mic className="h-12 w-12 mb-2 opacity-50" />
                      <p>Click start to begin recording</p>
                    </div>
                  )}
                </div>
              )}
              {mode === 'video' && (
                <div className="h-[250px] bg-muted rounded-lg flex flex-col items-center justify-center border overflow-hidden relative">
                   {status === 'recording' ? (
                     <>
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1 font-bold animate-pulse">
                        <span className="h-2 w-2 rounded-full bg-white block"></span> REC
                      </div>
                      <Video className="h-16 w-16 text-muted-foreground/30" />
                     </>
                   ) : (
                    <>
                      <Video className="h-12 w-12 mb-2 opacity-50 text-muted-foreground" />
                      <p className="text-muted-foreground">Camera placeholder</p>
                    </>
                   )}
                </div>
              )}

              <div className="flex gap-4 mt-6">
                {status === 'idle' && (
                  <Button onClick={handleStart} className="flex-1">
                    <Play className="mr-2 h-4 w-4" /> Start Answering
                  </Button>
                )}
                {status === 'recording' && (
                  <Button onClick={handleStop} variant="destructive" className="flex-1">
                    <Square className="mr-2 h-4 w-4" /> Stop & Analyze
                  </Button>
                )}
                {status === 'analyzing' && (
                  <Button disabled className="flex-1">
                    <Activity className="mr-2 h-4 w-4 animate-spin" /> Analyzing Response...
                  </Button>
                )}
                {status === 'results' && (
                  <>
                    <Button onClick={handleRetry} variant="outline" className="flex-1">
                      <RotateCcw className="mr-2 h-4 w-4" /> Retry
                    </Button>
                    <Button onClick={handleNext} className="flex-1">
                      Next Question
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {status === 'results' && (
            <Card className="border-primary/20 bg-primary/5 animate-in fade-in slide-in-from-bottom-4">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" /> AI Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Confidence</span>
                      <span className="font-bold">85%</span>
                    </div>
                    <Progress value={85} className="h-2 bg-primary/20" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Communication</span>
                      <span className="font-bold">72%</span>
                    </div>
                    <Progress value={72} className="h-2 bg-primary/20" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Clarity</span>
                      <span className="font-bold">90%</span>
                    </div>
                    <Progress value={90} className="h-2 bg-primary/20" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tech Knowledge</span>
                      <span className="font-bold">60%</span>
                    </div>
                    <Progress value={60} className="h-2 bg-primary/20" />
                  </div>
                </div>

                <div className="bg-background rounded-lg p-4 border space-y-3">
                  <h4 className="font-semibold text-sm">Actionable Suggestions:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2"><span className="text-primary">•</span> Try to speak a bit more confidently and avoid filler words like "um".</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> Use the STAR method (Situation, Task, Action, Result) for behavioral questions.</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> Your clarity of thought is excellent. Keep it up!</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Previous Attempts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Session {4 - i}</div>
                      <div className="text-xs text-muted-foreground">Overall Score: {80 - i * 5}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
