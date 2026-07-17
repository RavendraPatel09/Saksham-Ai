import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, AlertTriangle, CheckCircle, Lightbulb, Loader2, Star } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export const PostEmployment = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [feedbackHistory, setFeedbackHistory] = useState<any[]>([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('saksham-feedback-history') || '[]');
    setFeedbackHistory(history);
  }, []);

  const handleSubmitFeedback = () => {
    setErrorMessage('');
    setSuccessMessage('');
    
    const trimmed = feedbackText.trim();
    if (!trimmed) {
      const msg = 'Feedback cannot be empty.';
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }
    if (trimmed.length < 10) {
      const msg = 'Feedback must be at least 10 characters long.';
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newFeedback = {
        id: `fb-${Date.now()}`,
        text: trimmed,
        rating: selectedRating,
        submittedAt: new Date().toISOString(),
      };
      
      const existing = JSON.parse(localStorage.getItem('saksham-feedback-history') || '[]');
      const updatedHistory = [newFeedback, ...existing];
      localStorage.setItem('saksham-feedback-history', JSON.stringify(updatedHistory));
      setFeedbackHistory(updatedHistory);
      
      setSubmitting(false);
      setFeedbackText('');
      setSelectedRating(0);
      const msg = 'Feedback submitted successfully.';
      setSuccessMessage(msg);
      toast.success(msg);
    }, 800);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Post-Employment Support</h1>
        <p className="text-muted-foreground">We're here to ensure your workplace journey is smooth and fully supported.</p>
      </div>

      <Tabs defaultValue="wellness" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="wellness">Wellness & Check-in</TabsTrigger>
          <TabsTrigger value="issues">Issue Tracker</TabsTrigger>
          <TabsTrigger value="ai-support">AI Mentor</TabsTrigger>
        </TabsList>

        <TabsContent value="wellness" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
            <Card className="flex flex-col items-center justify-center text-center w-full p-4 h-full">
              <CardHeader className="pb-2 text-center w-full px-0">
                <CardTitle className="text-sm font-medium text-muted-foreground w-full break-words">Satisfaction Score</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center w-full px-0 pb-0">
                <div className="text-3xl font-bold text-primary mb-2">8.5 / 10</div>
                <Progress value={85} className="h-2 w-full max-w-[120px]" />
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center justify-center text-center w-full p-4 h-full">
              <CardHeader className="pb-2 text-center w-full px-0">
                <CardTitle className="text-sm font-medium text-muted-foreground w-full break-words">Comfort Level</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center w-full px-0 pb-0">
                <div className="text-3xl font-bold text-green-500 mb-2">High</div>
                <Progress value={90} className="h-2 w-full max-w-[120px]" />
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center justify-center text-center w-full p-4 h-full">
              <CardHeader className="pb-2 text-center w-full px-0">
                <CardTitle className="text-sm font-medium text-muted-foreground w-full break-words">Stress Level</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center w-full px-0 pb-0">
                <div className="text-3xl font-bold text-yellow-500 mb-2">Moderate</div>
                <Progress value={40} className="h-2 w-full max-w-[120px] [&>div]:bg-yellow-500" />
              </CardContent>
            </Card>
          </div>

          <Card className="w-full mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-red-500" /> Monthly Check-in</CardTitle>
              <CardDescription>How was your experience this month at HCL Accessibility Hub?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label className="mb-2 block font-medium">Rate your experience</Label>
                <div className="flex gap-2" role="radiogroup" aria-label="Rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button 
                      key={star} 
                      type="button"
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedRating(star)} 
                      className={selectedRating >= star ? 'bg-primary/10 border-primary text-primary hover:bg-primary/20' : 'text-muted-foreground hover:text-foreground'}
                      aria-label={`${star} star${star > 1 ? 's' : ''}`}
                      role="radio"
                      aria-checked={selectedRating === star}
                    >
                      <Star className={`w-4 h-4 ${selectedRating >= star ? 'fill-primary' : ''}`} />
                    </Button>
                  ))}
                </div>
              </div>
              <Label htmlFor="feedbackInput" className="sr-only">Feedback</Label>
              <Textarea 
                id="feedbackInput"
                placeholder="Share your thoughts about your accommodations, workload, and team..."
                className="min-h-[120px] w-full resize-y"
                value={feedbackText}
                onChange={e => {
                  setFeedbackText(e.target.value);
                  if (errorMessage) setErrorMessage('');
                  if (successMessage) setSuccessMessage('');
                }}
                aria-invalid={!!errorMessage}
              />
              <div aria-live="polite" className="mt-2 min-h-[20px] text-sm">
                {errorMessage && <span className="text-destructive font-medium">{errorMessage}</span>}
                {successMessage && <span className="text-green-600 dark:text-green-400 font-medium">{successMessage}</span>}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmitFeedback} disabled={submitting || !feedbackText.trim()}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Feedback'
                )}
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Recent Feedback</h3>
            <div className="grid grid-cols-1 gap-4">
              {feedbackHistory.slice(0, 3).map(item => (
                <Card key={item.id} className="w-full">
                   <CardContent className="p-4">
                     <div className="flex justify-between items-start mb-2">
                       <div className="flex gap-1" aria-label={`Rating: ${item.rating || 0} out of 5 stars`}>
                         {Array.from({length: 5}).map((_, i) => (
                           <Star key={i} className={`w-4 h-4 ${i < (item.rating || 0) ? 'text-primary fill-primary' : 'text-muted-foreground/30'}`} aria-hidden="true" />
                         ))}
                       </div>
                       <span className="text-xs text-muted-foreground font-medium">{new Date(item.submittedAt).toLocaleDateString()}</span>
                     </div>
                     <p className="text-sm text-foreground/90 whitespace-pre-wrap">{item.text}</p>
                   </CardContent>
                </Card>
              ))}
              {feedbackHistory.length === 0 && (
                <p className="text-sm text-muted-foreground italic">No recent feedback submissions found.</p>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="issues">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Reported Issues & Accommodations</CardTitle>
                <CardDescription>Track the status of your requests.</CardDescription>
              </div>
              <Button size="sm"><AlertTriangle className="mr-2 h-4 w-4" /> Report New Issue</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 'REQ-012', title: 'Update screen-reader software license', status: 'Resolved', date: '2 days ago' },
                  { id: 'REQ-013', title: 'Request ergonomic chair adjustment', status: 'In Progress', date: 'Today' },
                ].map(issue => (
                  <div key={issue.id} className="flex items-center justify-between p-4 bg-muted/30 border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-sm">{issue.title}</h4>
                      <p className="text-xs text-muted-foreground">{issue.id} • {issue.date}</p>
                    </div>
                    <div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        issue.status === 'Resolved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {issue.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-support">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Lightbulb className="h-6 w-6 text-primary" /> AI Career Mentor</CardTitle>
              <CardDescription>Personalized suggestions based on your recent check-ins.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-start bg-background p-4 rounded-lg shadow-sm border">
                <MessageCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Communication Tip</h4>
                  <p className="text-sm text-muted-foreground">You mentioned some difficulty in large meetings. Consider requesting the agenda in advance and using the chat feature if speaking up is challenging.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-background p-4 rounded-lg shadow-sm border">
                <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Wellness Reminder</h4>
                  <p className="text-sm text-muted-foreground">Your stress levels slightly increased this month. Don't forget to take advantage of the flexible hours policy to manage your energy better.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
