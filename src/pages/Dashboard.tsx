import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, GraduationCap, CheckCircle, Activity, ChevronRight, 
  BarChart, Users, Landmark, BookOpen 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useAppContext } from '@/context/AppContext';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { prefs } = useAccessibility();
  const { workspaceMode } = useAppContext();
  const isEmployer = workspaceMode === 'employer';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-12">
      
      {/* LEVEL 1: Quick Overview */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Quick Overview</h2>
        <motion.div 
          variants={prefs.reducedMotion ? {} : containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { title: isEmployer ? 'Active Jobs' : 'Applications', value: isEmployer ? '12' : '3', icon: Briefcase, color: 'bg-blue-500/10 text-blue-500' },
            { title: isEmployer ? 'Candidates' : 'Learning Progress', value: isEmployer ? '48' : '65%', icon: GraduationCap, color: 'bg-emerald-500/10 text-emerald-500' },
            { title: 'Accessibility Score', value: '92/100', icon: Activity, color: 'bg-purple-500/10 text-purple-500' },
            { title: isEmployer ? 'Interviews' : 'Assessments', value: isEmployer ? '5' : '1', icon: CheckCircle, color: 'bg-amber-500/10 text-amber-500' },
          ].map((stat, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                  </div>
                  <div className={`p-4 rounded-full ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* LEVEL 2: Recommended Actions */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Recommended Actions</h2>
        <motion.div 
          variants={prefs.reducedMotion ? {} : containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[
            { 
              title: isEmployer ? 'Review Candidates for UI Engineer' : 'Finish your AI Assessment', 
              desc: isEmployer ? '3 new highly matched candidates' : 'Unlock personalized career paths', 
              action: isEmployer ? 'Review' : 'Resume', 
              path: isEmployer ? '/employer' : '/assessment'
            },
            { 
              title: isEmployer ? 'Complete Accessibility Audit' : 'Complete React Basics Course', 
              desc: isEmployer ? 'Ensure your workplace is compliant' : 'You are 80% done', 
              action: isEmployer ? 'Start Audit' : 'Continue', 
              path: isEmployer ? '/employer/audit' : '/learning'
            },
            { 
              title: isEmployer ? 'Post a new Job' : 'Practice AI Interview', 
              desc: 'Reach out to diverse talent', 
              action: isEmployer ? 'Post Job' : 'Practice', 
              path: isEmployer ? '/employer' : '/interview' 
            },
            { 
              title: isEmployer ? 'View Diversity Analytics' : 'Review Job Matches', 
              desc: 'Track your inclusive hiring goals', 
              action: 'View', 
              path: isEmployer ? '/employer' : '/jobs'
            },
          ].map((action, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 hover:border-primary/50 transition-colors">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-lg font-bold">{action.title}</h3>
                  <p className="text-muted-foreground">{action.desc}</p>
                </div>
                <Link to={action.path}>
                  <Button variant="secondary" className="shrink-0 w-full sm:w-auto">
                    {action.action} <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* LEVEL 3: Advanced Features */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Advanced Features</h2>
        <Card>
          <CardHeader>
            <CardTitle>Explore More Tools</CardTitle>
            <CardDescription>Deep dive into analytics, community, and support.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="analytics" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
                <TabsTrigger value="analytics" className="py-3"><BarChart className="w-4 h-4 mr-2" /> Analytics</TabsTrigger>
                <TabsTrigger value="community" className="py-3"><Users className="w-4 h-4 mr-2" /> Community</TabsTrigger>
                <TabsTrigger value="mentorship" className="py-3"><BookOpen className="w-4 h-4 mr-2" /> Mentor Hub</TabsTrigger>
                <TabsTrigger value="schemes" className="py-3"><Landmark className="w-4 h-4 mr-2" /> Gov Schemes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="analytics" className="p-6 bg-muted/20 rounded-lg mt-4 border">
                <h3 className="text-lg font-bold mb-2">Diversity & Progress Analytics</h3>
                <p className="text-muted-foreground mb-4">View detailed reports on your performance and growth over time.</p>
                <Button variant="outline">View Reports</Button>
              </TabsContent>
              
              <TabsContent value="community" className="p-6 bg-muted/20 rounded-lg mt-4 border">
                <h3 className="text-lg font-bold mb-2">Community Discussions</h3>
                <p className="text-muted-foreground mb-4">Engage with peers, share experiences, and learn together.</p>
                <Link to="/community"><Button variant="outline">Join Community</Button></Link>
              </TabsContent>

              <TabsContent value="mentorship" className="p-6 bg-muted/20 rounded-lg mt-4 border">
                <h3 className="text-lg font-bold mb-2">Connect with Mentors</h3>
                <p className="text-muted-foreground mb-4">Find experienced professionals who can guide your inclusive career journey.</p>
                <Link to="/community"><Button variant="outline">Find a Mentor</Button></Link>
              </TabsContent>

              <TabsContent value="schemes" className="p-6 bg-muted/20 rounded-lg mt-4 border">
                <h3 className="text-lg font-bold mb-2">Government Support</h3>
                <p className="text-muted-foreground mb-4">Discover schemes, scholarships, and benefits tailored for you.</p>
                <Link to="/government-support"><Button variant="outline">Explore Schemes</Button></Link>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
      
    </div>
  );
};
