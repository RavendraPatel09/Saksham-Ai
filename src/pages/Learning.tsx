import React, { useState, useEffect } from 'react';
import { PlayCircle, Target, Flame, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { courses } from '@/data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '@/context/AccessibilityContext';

export const Learning = () => {
  const { prefs } = useAccessibility();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Randomly show confetti after a short delay to simulate "just completed" state
    const t = setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  const chartData = [
    { name: 'Completed', value: 3 },
    { name: 'In Progress', value: 2 },
    { name: 'Not Started', value: 5 },
  ];
  
  // Use Tailwind hex colors for charts
  const COLORS = ['#10b981', '#f59e0b', '#e2e8f0'];

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: prefs.reducedMotion ? 0.05 : 0.15 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefs.reducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      
      {/* Confetti simulation overlay */}
      <AnimatePresence>
        {showConfetti && !prefs.reducedMotion && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden"
          >
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: -50, 
                  x: "50%", 
                  opacity: 1,
                  scale: Math.random() * 0.5 + 0.5,
                  rotate: 0 
                }}
                animate={{ 
                  y: "100vh", 
                  x: `${(Math.random() - 0.5) * 100}vw`,
                  opacity: 0,
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: Math.random() * 2 + 2, 
                  ease: "easeOut",
                  delay: Math.random() * 0.5
                }}
                className={`absolute top-0 w-3 h-6 rounded-sm ${['bg-primary', 'bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-coral-500'][Math.floor(Math.random() * 5)]}`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial="hidden" animate="visible" variants={staggerVariants}>
        <motion.div variants={itemVariants} className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-foreground drop-shadow-sm">Learning Dashboard</h1>
            <p className="text-muted-foreground text-lg">Upskill yourself and get ready for your next big opportunity.</p>
          </div>
          {showConfetti && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="hidden md:flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-bold shadow-sm"
            >
              <Award className="h-5 w-5" /> Milestone Reached!
            </motion.div>
          )}
        </motion.div>
        
        {/* Top Widgets */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <motion.div variants={itemVariants} whileHover={prefs.reducedMotion ? {} : { y: -5 }}>
            <Card className="premium-card bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/10 border-amber-200/50 h-full">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <motion.div 
                  animate={prefs.reducedMotion ? {} : { rotate: [-5, 5, -5], scale: [1, 1.1, 1] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-white dark:bg-amber-900/50 p-3 rounded-2xl shadow-sm mb-3"
                >
                  <Flame className="h-8 w-8 text-amber-500" />
                </motion.div>
                <div className="text-4xl font-black text-amber-700 dark:text-amber-500 drop-shadow-sm">12 Days</div>
                <p className="text-sm font-bold uppercase tracking-wider text-amber-600/70 mt-1">Learning Streak</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} whileHover={prefs.reducedMotion ? {} : { y: -5 }}>
            <Card className="premium-card bg-gradient-to-br from-blue-50 to-sky-50/50 dark:from-blue-950/20 dark:to-sky-950/10 border-blue-200/50 h-full">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="bg-white dark:bg-blue-900/50 p-3 rounded-2xl shadow-sm mb-3">
                  <Target className="h-8 w-8 text-blue-500" />
                </div>
                <div className="text-4xl font-black text-blue-700 dark:text-blue-500 drop-shadow-sm">4 / 5</div>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-600/70 mt-1">Weekly Goals Met</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-2">
            <Card className="premium-card bg-gradient-to-r from-primary/10 to-indigo-500/5 border-primary/20 h-full overflow-hidden relative">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-indigo-500/10 rounded-full blur-3xl"
              />
              <CardContent className="pt-6 flex items-center justify-between h-full relative z-10">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                    <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300">Overall Progress</h3>
                  </div>
                  <p className="text-sm text-indigo-700/80 dark:text-indigo-400/80 mb-5 font-medium">You are on track to become job ready in 3 months!</p>
                  <div className="relative h-2.5 bg-indigo-200/50 dark:bg-indigo-950/50 rounded-full overflow-hidden">
                    <motion.div 
                      className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-primary to-indigo-500"
                      initial={{ width: 0 }}
                      animate={{ width: "35%" }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs font-bold text-indigo-800/60 dark:text-indigo-400/60">
                    <span>0%</span>
                    <span>35% Completed</span>
                  </div>
                </div>
                <div className="w-32 h-32 hidden sm:block relative">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={chartData} innerRadius={35} outerRadius={50} paddingAngle={4} dataKey="value" stroke="none">
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">Recommended Courses</motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div key={course.id} variants={itemVariants}>
              <Card className="premium-card flex flex-col h-full overflow-hidden group">
                <div className="h-40 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-6xl relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                  <motion.div 
                    whileHover={prefs.reducedMotion ? {} : { scale: 1.2, rotate: 5 }}
                    className="z-20 drop-shadow-xl"
                  >
                    {course.thumbnail}
                  </motion.div>
                </div>
                
                <CardContent className="pt-6 flex-1 flex flex-col z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors">{course.title}</h3>
                    {course.progress === 100 && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                        <Award className="h-6 w-6 text-amber-500 shrink-0 drop-shadow-sm" />
                      </motion.div>
                    )}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-4 mb-5 bg-muted/50 w-fit px-3 py-1.5 rounded-lg">
                    <span className="flex items-center gap-1.5"><PlayCircle className="h-4 w-4" /> {course.duration}</span>
                    <span className="w-1 h-1 bg-border rounded-full" />
                    <span className="capitalize">{course.difficulty}</span>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">
                      <span>{course.progress}% Completed</span>
                    </div>
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden mb-5">
                      <motion.div 
                        className={`absolute top-0 left-0 bottom-0 ${course.progress === 100 ? 'bg-emerald-500' : 'bg-primary'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    <Button 
                      className={`w-full shadow-sm hover:shadow-md transition-all ${course.progress === 100 ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50' : 'bg-primary hover:bg-primary/90'}`}
                      variant={course.progress === 100 ? 'outline' : 'default'}
                    >
                      {course.progress === 100 ? (
                        <><CheckCircle2 className="mr-2 h-4 w-4" /> Review Course</>
                      ) : (
                        <>{course.progress > 0 ? 'Continue Learning' : 'Start Course'} <PlayCircle className="ml-2 h-4 w-4" /></>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
