import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, Briefcase, FileCheck, CheckCircle2, MoreVertical, Plus, TrendingUp, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { candidates } from '@/data/mockData';
import { useAppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { useAccessibility } from '@/context/AccessibilityContext';

// Animated Counter Component
const AnimatedCounter = ({ from, to, duration = 1.5 }: { from: number, to: number, duration?: number }) => {
  const [count, setCount] = useState(from);
  const { prefs } = useAccessibility();
  
  useEffect(() => {
    if (prefs.reducedMotion) {
      setCount(to);
      return;
    }
    
    let startTime: number;
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);
      
      if (progress < 1) {
        setCount(Math.floor(from + (to - from) * progress));
        requestAnimationFrame(updateCount);
      } else {
        setCount(to);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [from, to, duration, prefs.reducedMotion]);

  return <>{count}</>;
};

export const Employer = () => {
  const { setRole } = useAppContext();
  const { prefs } = useAccessibility();

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: prefs.reducedMotion ? 0.05 : 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefs.reducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-foreground drop-shadow-sm">Employer Dashboard</h1>
            <p className="text-muted-foreground text-lg">Manage your inclusive hiring pipeline and accessibility scores.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/employer/audit" className={buttonVariants({ variant: "outline", className: "h-12 px-6 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors shadow-sm" })}>
              <FileCheck className="mr-2 h-5 w-5" /> Run Accessibility Audit
            </Link>
            <Button className="h-12 px-6 shadow-md shadow-primary/20 hover:shadow-lg transition-all bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90">
              <Plus className="mr-2 h-5 w-5" /> Post New Job
            </Button>
          </div>
        </motion.div>

        <motion.div variants={containerVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { title: 'Active Jobs', value: 12, icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
            { title: 'Applicants', value: 148, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
            { title: 'Interviews', value: 32, icon: FileCheck, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
            { title: 'Accessibility Score', value: 92, suffix: '/100', icon: Building, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
          ].map((stat, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={prefs.reducedMotion ? {} : { y: -5, scale: 1.02 }}>
              <Card className="premium-card h-full">
                <CardContent className="pt-6 flex flex-col h-full justify-between gap-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{stat.title}</p>
                    <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} shadow-inner`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-foreground drop-shadow-sm flex items-baseline">
                    <AnimatedCounter from={0} to={stat.value} duration={1.5} />
                    {stat.suffix && <span className="text-xl text-muted-foreground ml-1">{stat.suffix}</span>}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          <motion.div variants={itemVariants}>
            <Card className="premium-card h-full">
              <CardHeader className="border-b border-border/50 pb-4 bg-muted/20">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-500" />
                  Hiring Trends (PwD Candidates)
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80 pt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hiringTrends}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      cursor={{ stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '3 3' }}
                    />
                    <Line type="monotone" dataKey="hires" stroke="#4f46e5" strokeWidth={4} dot={{ r: 4, fill: '#4f46e5' }} activeDot={{ r: 8, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }} animationDuration={prefs.reducedMotion ? 0 : 2000} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="premium-card h-full">
              <CardHeader className="border-b border-border/50 pb-4 bg-muted/20">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-500" />
                  Disability Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80 pt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={diversityData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <RechartsTooltip 
                      cursor={{fill: 'rgba(16, 185, 129, 0.1)'}} 
                      contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} barSize={45} animationDuration={prefs.reducedMotion ? 0 : 2000} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Inclusive Toolkit Section */}
        <motion.div variants={itemVariants} className="mb-10">
          <Card className="premium-card bg-gradient-to-br from-primary/5 via-transparent to-indigo-600/5">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-500" />
                Inclusive Toolkit & Resources
              </CardTitle>
              <CardDescription>Resources to improve your workplace accessibility and inclusive hiring practices.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['WCAG 2.1 Compliance Guide', 'Accessible Interview Practices', 'Workplace Accommodations FAQ'].map((item, i) => (
                  <Button key={i} variant="outline" className="h-auto py-4 px-4 justify-start text-left whitespace-normal hover:border-primary/50 hover:bg-primary/5 group">
                    <div className="bg-primary/10 p-2 rounded-lg mr-3 group-hover:bg-primary group-hover:text-white transition-colors">
                      <FileCheck className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-sm">{item}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="premium-card overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
              <CardTitle className="text-2xl flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                Top AI-Matched Candidates
              </CardTitle>
              <CardDescription className="text-base ml-11">Candidates matched to your open positions based on skills and accessibility accommodations.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <div className="p-4 bg-muted/20 flex justify-end border-b">
                  <Button variant="outline" size="sm" className="bg-white dark:bg-slate-900" disabled>
                    Compare Selected Candidates
                  </Button>
                </div>
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase tracking-wider bg-muted/30 border-b">
                    <tr>
                      <th className="px-6 py-4 font-bold w-10">
                        <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" disabled />
                      </th>
                      <th className="px-6 py-4 font-bold">Candidate</th>
                      <th className="px-6 py-4 font-bold">Disability Profile</th>
                      <th className="px-6 py-4 font-bold">Top Skills</th>
                      <th className="px-6 py-4 font-bold text-center">AI Match Score</th>
                      <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <motion.tbody 
                    initial="hidden" 
                    animate="visible" 
                    variants={containerVariants}
                    className="divide-y divide-border"
                  >
                    {candidates.map((candidate) => (
                      <motion.tr key={candidate.id} variants={itemVariants} className="hover:bg-primary/5 transition-colors group">
                        <td className="px-6 py-5">
                          <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" />
                        </td>
                        <td className="px-6 py-5 font-bold text-base group-hover:text-primary transition-colors">{candidate.name}</td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="font-medium">{candidate.disability}</span>
                            <span className="text-xs text-muted-foreground">{candidate.severity}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.slice(0, 2).map(skill => (
                              <Badge key={skill} variant="secondary" className="bg-secondary/50 font-medium">{skill}</Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <div className="inline-flex items-center gap-1.5 font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-xl shadow-inner">
                            <CheckCircle2 className="h-4 w-4" /> {candidate.matchScore}%
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <Button variant="ghost" className="hover:bg-primary hover:text-white transition-colors rounded-xl">View Profile</Button>
                        </td>
                      </motion.tr>
                    ))}
                  </motion.tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
      </motion.div>
    </div>
  );
};
