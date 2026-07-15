import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Timer, BrainCircuit, ArrowRight, Activity, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { assessmentQuestions } from '@/data/mockData';
import { useAppContext } from '@/context/AppContext';

export const Assessment = () => {
  const navigate = useNavigate();
  const { isRegistered, setAssessmentScores } = useAppContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!isCompleted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isCompleted) {
      handleComplete();
    }
  }, [timeLeft, isCompleted]);

  if (!isRegistered) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Please register first</h2>
        <Button asChild><Link to="/register">Go to Registration</Link></Button>
      </div>
    );
  }

  const handleSelectOption = (option: string) => {
    setAnswers({ ...answers, [assessmentQuestions[currentQuestion].id]: option });
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setIsGenerating(true);
    // Simulate AI scoring
    setTimeout(() => {
      setAssessmentScores({
        strength: 85,
        weakness: 45,
        confidence: 90,
        learningStyle: 'Visual & Hands-on',
        careerReadiness: 78,
      });
      setIsGenerating(false);
    }, 2500);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isGenerating) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <BrainCircuit className="h-20 w-20 text-primary animate-pulse mb-6" />
        <h2 className="text-2xl font-bold mb-2">AI is evaluating your skills...</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Generating your career readiness score and personalized recommendations.
        </p>
      </div>
    );
  }

  if (isCompleted && !isGenerating) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Assessment Results</h1>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-primary/5 border-primary/20 text-center py-6">
            <CardTitle className="text-muted-foreground text-lg">Strength Score</CardTitle>
            <div className="text-4xl font-bold text-primary mt-2">85%</div>
          </Card>
          <Card className="bg-primary/5 border-primary/20 text-center py-6">
            <CardTitle className="text-muted-foreground text-lg">Confidence</CardTitle>
            <div className="text-4xl font-bold text-primary mt-2">90%</div>
          </Card>
          <Card className="bg-primary/5 border-primary/20 text-center py-6">
            <CardTitle className="text-muted-foreground text-lg">Career Readiness</CardTitle>
            <div className="text-4xl font-bold text-primary mt-2">78%</div>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-yellow-500" /> AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Your communication and analytical skills make customer support and accessibility testing highly suitable. You show a strong aptitude for problem-solving, though some upskilling in specific software tools is recommended.
            </p>
            <div className="mt-4 p-4 bg-muted rounded-lg flex items-center gap-4">
              <Activity className="h-6 w-6 text-primary" />
              <div>
                <div className="font-semibold">Learning Style</div>
                <div className="text-muted-foreground">Visual & Hands-on</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button size="lg" onClick={() => navigate('/skill-gap')}>
            View Career Recommendations & Skill Gap <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  const question = assessmentQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
  const isAnswered = !!answers[question.id];

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Skill Assessment</h1>
          <p className="text-muted-foreground">{question.section}</p>
        </div>
        <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full font-mono text-lg">
          <Timer className="h-5 w-5" />
          <span className={timeLeft < 60 ? 'text-destructive font-bold' : ''}>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <Progress value={progress} className="mb-8 h-2" />

      <Card className="shadow-md border-primary/10">
        <CardHeader>
          <div className="text-sm font-medium text-primary mb-2">Question {currentQuestion + 1} of {assessmentQuestions.length}</div>
          <CardTitle className="text-xl leading-relaxed">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option, i) => {
            const selected = answers[question.id] === option;
            return (
              <Button
                key={i}
                variant={selected ? 'default' : 'outline'}
                className={`w-full justify-start text-left h-auto py-4 px-6 text-lg whitespace-normal ${
                  selected ? 'border-primary bg-primary text-primary-foreground' : 'hover:border-primary/50'
                }`}
                onClick={() => handleSelectOption(option)}
              >
                {selected && <CheckCircle2 className="h-5 w-5 mr-3 shrink-0" />}
                {!selected && <div className="h-5 w-5 rounded-full border-2 mr-3 shrink-0" />}
                {option}
              </Button>
            );
          })}
        </CardContent>
        <CardFooter className="flex justify-end pt-6 border-t mt-4">
          <Button size="lg" onClick={handleNext} disabled={!isAnswered}>
            {currentQuestion === assessmentQuestions.length - 1 ? 'Finish Assessment' : 'Next Question'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
