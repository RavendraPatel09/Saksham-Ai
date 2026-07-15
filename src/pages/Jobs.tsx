import React from 'react';
import { Briefcase, MapPin, Building, Sparkles, Zap, Bookmark, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { jobs } from '@/data/mockData';

export const Jobs = () => {
  // Simulate AI Match Score logic
  const getMatchScore = (index: number) => 94 - index * 2; // Mock scores from 94 downwards

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Recommended Jobs</h1>
          <p className="text-muted-foreground">AI-curated opportunities matching your skills and accessibility needs.</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">
          <Sparkles className="h-5 w-5" /> 15 New Matches
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {jobs.map((job, index) => {
          const matchScore = getMatchScore(index);
          return (
            <Card key={job.id} className={`overflow-hidden transition-all hover:shadow-md ${index === 0 ? 'border-primary ring-1 ring-primary/20' : ''}`}>
              <CardContent className="p-0">
                <div className="p-6 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                      <div className="flex items-center text-muted-foreground text-sm gap-2">
                        <Building className="h-4 w-4" /> {job.company}
                      </div>
                    </div>
                    <div className="flex flex-col items-end bg-primary/5 p-2 rounded-lg border border-primary/10">
                      <span className="text-xl font-bold text-primary">{matchScore}%</span>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">AI Match</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm mb-4">
                    <div className="flex items-center gap-1"><MapPin className="h-4 w-4 text-muted-foreground" /> {job.location}</div>
                    <div className="flex items-center gap-1"><Briefcase className="h-4 w-4 text-muted-foreground" /> {job.workMode}</div>
                    <div className="font-medium text-foreground">{job.salary}</div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-xs font-semibold mb-1.5 text-muted-foreground">Required Skills:</div>
                      <div className="flex flex-wrap gap-2">
                        {job.requiredSkills.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold mb-1.5 text-muted-foreground">Accessibility Support:</div>
                      <div className="flex flex-wrap gap-2">
                        {job.accessibility.map(a => <Badge key={a} variant="outline" className="border-green-200 bg-green-50 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">{a}</Badge>)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/30 px-6 py-4 border-t border-b">
                  <div className="flex gap-3">
                    <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold">Why this matches:</span>
                      <ul className="text-sm text-muted-foreground list-disc pl-4 mt-1 space-y-1">
                        <li>Matches your preferred work mode ({job.workMode})</li>
                        <li>Provides {job.accessibility[0]} as requested</li>
                        <li>Strong alignment with your core skills</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-4 flex gap-3">
                <Button className="flex-1">Apply Now <ExternalLink className="ml-2 h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><Bookmark className="h-4 w-4" /></Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
