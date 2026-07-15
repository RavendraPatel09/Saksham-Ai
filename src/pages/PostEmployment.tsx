import React, { useState } from 'react';
import { Heart, MessageCircle, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export const PostEmployment = () => {
  const [feedback, setFeedback] = useState('');
  
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
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Satisfaction Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">8.5 / 10</div>
                <Progress value={85} className="h-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Comfort Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500 mb-2">High</div>
                <Progress value={90} className="h-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Stress Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-500 mb-2">Moderate</div>
                <Progress value={40} className="h-2 [&>div]:bg-yellow-500" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-red-500" /> Monthly Check-in</CardTitle>
              <CardDescription>How was your experience this month at HCL Accessibility Hub?</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Share your thoughts about your accommodations, workload, and team..."
                className="min-h-[120px]"
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button>Submit Feedback</Button>
            </CardFooter>
          </Card>
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
