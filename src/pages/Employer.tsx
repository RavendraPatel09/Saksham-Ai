import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, Briefcase, FileCheck, CheckCircle2, MoreVertical, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { candidates } from '@/data/mockData';
import { useAppContext } from '@/context/AppContext';

export const Employer = () => {
  const { setRole } = useAppContext();

  useEffect(() => {
    setRole('employer');
  }, []);

  const hiringTrends = [
    { name: 'Jan', hires: 4 },
    { name: 'Feb', hires: 3 },
    { name: 'Mar', hires: 7 },
    { name: 'Apr', hires: 5 },
    { name: 'May', hires: 9 },
    { name: 'Jun', hires: 12 },
  ];

  const diversityData = [
    { name: 'Visual', count: 12 },
    { name: 'Hearing', count: 8 },
    { name: 'Mobility', count: 15 },
    { name: 'Cognitive', count: 5 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
          <p className="text-muted-foreground">Manage your inclusive hiring pipeline and accessibility scores.</p>
        </div>
        <div className="flex gap-4">
          <Link to="/employer/audit" className={buttonVariants({ variant: "outline" })}>
            <FileCheck className="mr-2 h-4 w-4" /> Run Accessibility Audit
          </Link>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Post New Job
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Active Jobs', value: '12', icon: Briefcase, color: 'text-blue-500' },
          { title: 'Applicants', value: '148', icon: Users, color: 'text-purple-500' },
          { title: 'Interviews', value: '32', icon: FileCheck, color: 'text-orange-500' },
          { title: 'Accessibility Score', value: '92/100', icon: Building, color: 'text-green-500' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                <div className="text-3xl font-bold">{stat.value}</div>
              </div>
              <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Hiring Trends (PwD Candidates)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hiringTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip />
                <Line type="monotone" dataKey="hires" stroke="#aa3bff" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Disability Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={diversityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top AI-Matched Candidates</CardTitle>
          <CardDescription>Candidates matched to your open positions based on skills and accessibility accommodations.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">Candidate</th>
                  <th className="px-6 py-4 font-semibold">Disability Profile</th>
                  <th className="px-6 py-4 font-semibold">Top Skills</th>
                  <th className="px-6 py-4 font-semibold text-center">AI Match Score</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium">{candidate.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{candidate.disability} ({candidate.severity})</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 2).map(skill => (
                          <Badge key={skill} variant="secondary" className="text-[10px]">{skill}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-1 font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                        <CheckCircle2 className="h-4 w-4" /> {candidate.matchScore}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm">View Profile</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
