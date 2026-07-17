import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, AlertTriangle, CheckCircle, Lightbulb, Loader2, Star, Calendar, TrendingUp, Activity, HeartPulse, Users, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export const PostEmployment = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [feedbackHistory, setFeedbackHistory] = useState<any[]>([]);
  
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [historyFilter, setHistoryFilter] = useState('All');

  const moods = [
    { emoji: '🙂', label: 'Excellent' },
    { emoji: '😊', label: 'Good' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😟', label: 'Difficult' },
    { emoji: '😞', label: 'Need Support' }
  ];

  const quickChips = [
    'Workload', 'Accessibility', 'Team Support', 'Stress', 
    'Equipment', 'Communication', 'Office Environment', 'Career Growth'
  ];

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('saksham-feedback') || '[]');
    setFeedbackHistory(history);
  }, []);

  const toggleCategory = (chip: string) => {
    setSelectedCategories(prev => 
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    );
    const textToAdd = `${chip} is... `;
    if (!feedbackText.includes(chip)) {
      setFeedbackText(prev => prev ? `${prev}\n${textToAdd}` : textToAdd);
    }
  };

  const handleSubmitFeedback = () => {
    setErrorMessage('');
    setSuccessMessage('');
    
    const trimmed = feedbackText.trim();
    if (!trimmed || !selectedRating || !selectedMood) {
      const msg = 'Please provide a mood, rating, and feedback message.';
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newFeedback = {
        id: crypto.randomUUID(),
        message: trimmed,
        rating: selectedRating,
        mood: selectedMood,
        category: selectedCategories,
        createdAt: new Date().toISOString(),
      };
      
      const existing = JSON.parse(localStorage.getItem('saksham-feedback') || '[]');
      const updatedHistory = [newFeedback, ...existing];
      localStorage.setItem('saksham-feedback', JSON.stringify(updatedHistory));
      setFeedbackHistory(updatedHistory);
      
      setSubmitting(false);
      setFeedbackText('');
      setSelectedRating(0);
      setSelectedMood('');
      setSelectedCategories([]);
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
          <div className="grid grid-cols-3 gap-4 w-full">
            <Card className="flex flex-1 flex-col items-center justify-center text-center w-full min-w-[140px] p-4 h-full">
              <CardHeader className="pb-2 text-center w-full px-0">
                <CardTitle className="text-sm font-medium text-muted-foreground w-full whitespace-nowrap">Satisfaction Score</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center w-full px-0 pb-0 text-center">
                <div className="text-3xl font-bold text-primary mb-2 whitespace-nowrap">8.5 / 10</div>
                <Progress value={85} className="h-2 w-full max-w-[120px]" />
              </CardContent>
            </Card>
            <Card className="flex flex-1 flex-col items-center justify-center text-center w-full min-w-[140px] p-4 h-full">
              <CardHeader className="pb-2 text-center w-full px-0">
                <CardTitle className="text-sm font-medium text-muted-foreground w-full whitespace-nowrap">Comfort Level</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center w-full px-0 pb-0 text-center">
                <div className="text-3xl font-bold text-green-500 mb-2 whitespace-nowrap">High</div>
                <Progress value={90} className="h-2 w-full max-w-[120px]" />
              </CardContent>
            </Card>
            <Card className="flex flex-1 flex-col items-center justify-center text-center w-full min-w-[140px] p-4 h-full">
              <CardHeader className="pb-2 text-center w-full px-0">
                <CardTitle className="text-sm font-medium text-muted-foreground w-full whitespace-nowrap">Stress Level</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center w-full px-0 pb-0 text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2 whitespace-nowrap">Moderate</div>
                <Progress value={40} className="h-2 w-full max-w-[120px] [&>div]:bg-yellow-500" />
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 w-full">
            
            {/* LEFT COLUMN: Main Feedback Experience */}
            <div className="lg:col-span-2 space-y-6">
              
              <Card className="w-full p-6 space-y-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex items-center gap-2 text-xl"><Heart className="h-6 w-6 text-red-500" /> Monthly Check-in</CardTitle>
                  <CardDescription>How was your experience this month at HCL Accessibility Hub?</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0 space-y-8">
                  
                  {/* Emoji Experience Selector */}
                  <div>
                    <Label className="mb-3 block font-medium">How are you feeling today?</Label>
                    <div className="flex flex-wrap gap-2">
                      {moods.map(m => (
                        <Button
                          key={m.label}
                          type="button"
                          variant="outline"
                          onClick={() => setSelectedMood(m.label)}
                          className={`rounded-full px-4 py-2 h-auto ${selectedMood === m.label ? 'bg-primary/10 border-primary text-primary hover:bg-primary/20 ring-2 ring-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                          <span className="text-xl mr-2">{m.emoji}</span> {m.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <Label className="mb-3 block font-medium">Rate your overall experience</Label>
                    <div className="flex gap-2" role="radiogroup" aria-label="Rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button 
                          key={star} 
                          type="button"
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedRating(star)} 
                          className={`h-12 w-12 rounded-full ${selectedRating >= star ? 'bg-primary/10 border-primary text-primary hover:bg-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
                          aria-label={`${star} star${star > 1 ? 's' : ''}`}
                          role="radio"
                          aria-checked={selectedRating === star}
                        >
                          <Star className={`w-5 h-5 ${selectedRating >= star ? 'fill-primary' : ''}`} />
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Feedback Chips */}
                  <div>
                    <Label className="mb-3 block font-medium">Quick Feedback</Label>
                    <div className="flex flex-wrap gap-2">
                      {quickChips.map(chip => (
                        <Badge 
                          key={chip}
                          variant={selectedCategories.includes(chip) ? 'default' : 'secondary'}
                          className="cursor-pointer hover:bg-primary/80 transition-colors text-sm py-1.5 px-3 rounded-full"
                          onClick={() => toggleCategory(chip)}
                          role="button"
                          tabIndex={0}
                        >
                          {chip} {selectedCategories.includes(chip) && '✓'}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="feedbackInput" className="font-medium block">Additional Details</Label>
                    <Textarea 
                      id="feedbackInput"
                      placeholder="Share any additional thoughts about your accommodations, workload, and team..."
                      className="min-h-[120px] w-full resize-none text-base p-4"
                      value={feedbackText}
                      onChange={e => {
                        setFeedbackText(e.target.value);
                        if (errorMessage) setErrorMessage('');
                        if (successMessage) setSuccessMessage('');
                      }}
                      aria-invalid={!!errorMessage}
                    />
                    <div aria-live="polite" className="min-h-[20px] text-sm">
                      {errorMessage && <span className="text-destructive font-medium flex items-center gap-1"><AlertTriangle className="w-4 h-4"/> {errorMessage}</span>}
                      {successMessage && <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1"><CheckCircle className="w-4 h-4"/> {successMessage}</span>}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-0 pb-0 pt-4">
                  <Button size="lg" className="w-full text-base font-semibold" onClick={handleSubmitFeedback} disabled={submitting || !feedbackText.trim() || !selectedRating || !selectedMood}>
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting Feedback...
                      </>
                    ) : (
                      'Submit Feedback'
                    )}
                  </Button>
                </CardFooter>
              </Card>

              {/* Your Feedback Journey */}
              <Card className="w-full overflow-hidden border-primary/10">
                 <CardHeader className="bg-primary/5 pb-4">
                   <CardTitle>Your Feedback Journey</CardTitle>
                   <CardDescription>Track your workplace experience over time.</CardDescription>
                 </CardHeader>
                 <CardContent className="pt-6">
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                     <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                       <div className="text-3xl font-bold text-foreground/90">{feedbackHistory.length}</div>
                       <div className="text-xs font-medium text-muted-foreground mt-2 uppercase tracking-wider">Submitted</div>
                     </div>
                     <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                       <div className="text-3xl font-bold text-foreground/90 flex items-center justify-center gap-1">
                         <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                         {feedbackHistory.length ? (feedbackHistory.reduce((a,b) => a + (b.rating||0), 0) / feedbackHistory.length).toFixed(1) : 'N/A'}
                       </div>
                       <div className="text-xs font-medium text-muted-foreground mt-2 uppercase tracking-wider">Avg Rating</div>
                     </div>
                     <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                       <div className="text-lg font-bold text-foreground/90 mt-1">{feedbackHistory[0]?.createdAt ? new Date(feedbackHistory[0].createdAt).toLocaleDateString() : 'N/A'}</div>
                       <div className="text-xs font-medium text-muted-foreground mt-2 uppercase tracking-wider">Last Check-in</div>
                     </div>
                     <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                       <div className="text-xl font-bold text-primary mt-1">Improving ↑</div>
                       <div className="text-xs font-medium text-primary/80 mt-2 uppercase tracking-wider">Trend</div>
                     </div>
                   </div>
                 </CardContent>
              </Card>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Recent Feedback</h3>
                  <Dialog open={isHistoryModalOpen} onOpenChange={setIsHistoryModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">View All Feedback</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
                      <DialogHeader>
                        <DialogTitle>Feedback History</DialogTitle>
                        <DialogDescription>Review your past submissions and well-being trends.</DialogDescription>
                      </DialogHeader>
                      <div className="flex gap-2 py-4 overflow-x-auto no-scrollbar border-b">
                        {['All', 'Positive', 'Neutral', 'Negative', 'Last Week', 'Last Month'].map(f => (
                          <Badge 
                            key={f} 
                            variant={historyFilter === f ? 'default' : 'secondary'}
                            className="cursor-pointer whitespace-nowrap rounded-full px-3"
                            onClick={() => setHistoryFilter(f)}
                          >
                            {f}
                          </Badge>
                        ))}
                      </div>
                      <ScrollArea className="flex-1 pr-4 mt-4">
                        <div className="space-y-4 pb-6">
                          {feedbackHistory
                            .filter(item => {
                              if (historyFilter === 'All') return true;
                              if (historyFilter === 'Positive') return item.rating >= 4;
                              if (historyFilter === 'Neutral') return item.rating === 3;
                              if (historyFilter === 'Negative') return item.rating <= 2;
                              return true; // simple mock filter logic
                            })
                            .map(item => (
                            <Card key={item.id} className="w-full">
                               <CardContent className="p-5">
                                 <div className="flex justify-between items-start mb-3">
                                   <div className="flex flex-col gap-1.5">
                                     <div className="flex gap-1" aria-label={`Rating: ${item.rating || 0} out of 5 stars`}>
                                       {Array.from({length: 5}).map((_, i) => (
                                         <Star key={i} className={`w-4 h-4 ${i < (item.rating || 0) ? 'text-primary fill-primary' : 'text-muted-foreground/30'}`} aria-hidden="true" />
                                       ))}
                                     </div>
                                     {item.mood && (
                                       <div className="flex items-center gap-2">
                                         <Badge variant="outline" className="text-xs font-normal">{item.mood}</Badge>
                                       </div>
                                     )}
                                   </div>
                                   <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-1 rounded-md">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                                 </div>
                                 {item.category && item.category.length > 0 && (
                                   <div className="flex flex-wrap gap-1.5 mb-3">
                                     {item.category.map((cat: string) => (
                                       <span key={cat} className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full uppercase tracking-wider">{cat}</span>
                                     ))}
                                   </div>
                                 )}
                                 <p className="text-sm text-foreground/90 whitespace-pre-wrap">{item.message || item.text}</p>
                               </CardContent>
                            </Card>
                          ))}
                          {feedbackHistory.length === 0 && <p className="text-center text-muted-foreground py-12 italic">No feedback history found.</p>}
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {feedbackHistory.slice(0, 3).map(item => (
                    <Card key={item.id} className="w-full border-border/60 hover:border-primary/30 transition-colors">
                       <CardContent className="p-5">
                         <div className="flex justify-between items-start mb-3">
                           <div className="flex flex-col gap-1">
                             <div className="flex gap-1" aria-label={`Rating: ${item.rating || 0} out of 5 stars`}>
                               {Array.from({length: 5}).map((_, i) => (
                                 <Star key={i} className={`w-4 h-4 ${i < (item.rating || 0) ? 'text-primary fill-primary' : 'text-muted-foreground/30'}`} aria-hidden="true" />
                               ))}
                             </div>
                             {item.mood && <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">Feeling: {item.mood}</span>}
                           </div>
                           <span className="text-xs text-muted-foreground font-medium">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                         </div>
                         <p className="text-sm text-foreground/90 whitespace-pre-wrap line-clamp-3">{item.message || item.text}</p>
                       </CardContent>
                    </Card>
                  ))}
                  {feedbackHistory.length === 0 && (
                    <div className="text-center py-10 border border-dashed rounded-xl border-border">
                      <p className="text-sm text-muted-foreground italic">No recent feedback submissions found.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Summary & Quick Actions */}
            <div className="space-y-6">
              
              <Card className="bg-primary/5 border-primary/20 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Today's Well-being</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span className="text-muted-foreground">Mood Trend</span>
                      <span className="text-green-600 dark:text-green-400">Stable</span>
                    </div>
                    <Progress value={75} className="h-2 [&>div]:bg-green-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span className="text-muted-foreground">Work-Life Balance</span>
                      <span className="text-primary">Good</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="pt-5 border-t border-primary/10">
                    <p className="text-sm font-bold mb-3">Recommended Actions</p>
                    <ul className="text-sm text-muted-foreground space-y-3">
                      <li className="flex gap-2 items-start leading-tight">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> 
                        Take a 5-minute screen break to rest your eyes.
                      </li>
                      <li className="flex gap-2 items-start leading-tight">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> 
                        Log your ergonomic needs in the Issue Tracker.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-auto py-4 px-2 flex flex-col gap-2.5 items-center text-center text-xs whitespace-normal bg-card hover:bg-muted/50 border-border/60">
                    <div className="bg-primary/10 p-2 rounded-full"><Calendar className="w-4 h-4 text-primary" /></div>
                    Schedule<br/>Check-in
                  </Button>
                  <Button variant="outline" className="h-auto py-4 px-2 flex flex-col gap-2.5 items-center text-center text-xs whitespace-normal bg-card hover:bg-muted/50 border-border/60">
                    <div className="bg-primary/10 p-2 rounded-full"><Lightbulb className="w-4 h-4 text-primary" /></div>
                    Open AI<br/>Mentor
                  </Button>
                  <Button variant="outline" className="h-auto py-4 px-2 flex flex-col gap-2.5 items-center text-center text-xs whitespace-normal bg-card hover:bg-muted/50 border-border/60">
                    <div className="bg-primary/10 p-2 rounded-full"><AlertTriangle className="w-4 h-4 text-primary" /></div>
                    Create<br/>Issue
                  </Button>
                  <Button variant="outline" className="h-auto py-4 px-2 flex flex-col gap-2.5 items-center text-center text-xs whitespace-normal bg-card hover:bg-muted/50 border-border/60">
                    <div className="bg-primary/10 p-2 rounded-full"><CheckCircle className="w-4 h-4 text-primary" /></div>
                    View<br/>Accommodations
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Personal Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex gap-3 items-start">
                    <TrendingUp className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed"><span className="font-semibold">Improved Comfort:</span> Your comfort score improved this month following your new chair request.</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Activity className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed"><span className="font-semibold">Stress Monitor:</span> Stress levels increased by 12%. Consider utilizing flexible hours.</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Heart className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed"><span className="font-semibold">Team Synergy:</span> You gave positive feedback on team support recently. Keep it up!</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive/20 shadow-sm overflow-hidden">
                <CardHeader className="bg-destructive/5 pb-4">
                  <CardTitle className="text-lg flex items-center gap-2 text-destructive"><HeartPulse className="w-5 h-5" /> Need Immediate Support?</CardTitle>
                </CardHeader>
                <CardContent className="pt-5 space-y-3 bg-card">
                  <Button variant="outline" className="w-full justify-start text-sm border-border/60 hover:bg-muted/50">
                    <MessageCircle className="w-4 h-4 mr-3 text-muted-foreground" /> Talk to AI Mentor
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm border-border/60 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30">
                    <AlertTriangle className="w-4 h-4 mr-3 text-destructive/70" /> Report an Urgent Issue
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm border-border/60 hover:bg-muted/50">
                    <Users className="w-4 h-4 mr-3 text-muted-foreground" /> Contact HR Support
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm text-primary hover:text-primary hover:bg-primary/10 mt-2">
                    <BookOpen className="w-4 h-4 mr-3" /> Mental Wellness Resources <ArrowRight className="w-3 h-3 ml-auto"/>
                  </Button>
                </CardContent>
              </Card>
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
