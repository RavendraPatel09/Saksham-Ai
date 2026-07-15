import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Building, Briefcase, GraduationCap, Users, Eye, Ear, Brain } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useAppContext } from '@/context/AppContext';
import { Dashboard } from './Dashboard';
import { useLanguage } from '@/i18n/LanguageContext';

export const Home = () => {
  const { prefs } = useAccessibility();
  const { workspaceMode } = useAppContext();
  const { t } = useLanguage();
  const transition = prefs.reducedMotion ? { duration: 0.1 } : { duration: 0.8, ease: "easeOut" as const };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefs.reducedMotion ? 0.1 : 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefs.reducedMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition }
  };

  const floatingTransition = prefs.reducedMotion ? {} : {
    y: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const
    }
  };

  if (workspaceMode) {
    return <Dashboard />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32 bg-hero-gradient text-center flex flex-col items-center">
        
        {/* Glowing Orb */}
        {!prefs.reducedMotion && (
          <motion.div 
            className="absolute top-20 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10 pointer-events-none"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
          />
        )}

        {/* Floating Icons Background */}
        {!prefs.reducedMotion && (
          <>
            <motion.div className="absolute top-24 left-[10%] text-primary/20 z-0" animate={{ y: [-15, 15] }} transition={floatingTransition}><Eye size={64} /></motion.div>
            <motion.div className="absolute bottom-32 left-[20%] text-indigo-500/20 z-0" animate={{ y: [15, -15] }} transition={floatingTransition}><Ear size={48} /></motion.div>
            <motion.div className="absolute top-32 right-[15%] text-emerald-500/20 z-0" animate={{ y: [-10, 20] }} transition={floatingTransition}><Brain size={80} /></motion.div>
          </>
        )}

        <motion.div 
          className="z-10 max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-foreground drop-shadow-sm">
            {t('hero.title_part1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">{t('hero.title_part2')}</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center">
            <motion.div whileHover={prefs.reducedMotion ? {} : { scale: 1.05 }} whileTap={prefs.reducedMotion ? {} : { scale: 0.95 }}>
              <Link to="/register" className={buttonVariants({ size: "lg", className: "w-full sm:w-auto text-lg h-14 px-8 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow" })}>
                {t('nav.get_started')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={prefs.reducedMotion ? {} : { scale: 1.05 }} whileTap={prefs.reducedMotion ? {} : { scale: 0.95 }}>
              <Link to="/jobs" className={buttonVariants({ size: "lg", variant: "outline", className: "w-full sm:w-auto text-lg h-14 px-8 bg-white/50 backdrop-blur-sm border-primary/20 hover:bg-white/80 transition-colors" })}>
                {t('hero.explore_jobs')}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Trusted Companies */}
      <section className="py-12 bg-white/30 dark:bg-slate-900/30 border-b">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">Trusted by Inclusive Employers</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Mock Company Logos using text for simplicity */}
            <h3 className="text-2xl font-black">Google</h3>
            <h3 className="text-2xl font-black">Microsoft</h3>
            <h3 className="text-2xl font-black">Amazon</h3>
            <h3 className="text-2xl font-black">TCS</h3>
            <h3 className="text-2xl font-black">Infosys</h3>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-y border-border/50">
        <motion.div 
          className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {[
            { label: t('stat.users'), value: '10,000+' },
            { label: t('stat.jobs'), value: '5,000+' },
            { label: t('stat.employers'), value: '500+' },
            { label: t('stat.stories'), value: '2,500+' },
          ].map((stat, i) => (
            <motion.div key={i} variants={itemVariants} className="flex flex-col items-center p-4">
              <span className="text-4xl font-bold text-primary mb-2 drop-shadow-sm">{stat.value}</span>
              <span className="text-muted-foreground font-medium uppercase tracking-wider text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 container mx-auto px-4 relative">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          How Saksham AI Works
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            {
              icon: Sparkles,
              title: t('feature.assessment.title'),
              desc: t('feature.assessment.desc')
            },
            {
              icon: GraduationCap,
              title: t('feature.skills.title'),
              desc: t('feature.skills.desc')
            },
            {
              icon: Building,
              title: t('feature.matching.title'),
              desc: t('feature.matching.desc')
            }
          ].map((feature, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="premium-card h-full">
                <CardContent className="pt-8 text-center flex flex-col items-center h-full">
                  <div className="bg-gradient-to-br from-primary/20 to-indigo-500/20 p-5 rounded-2xl mb-6 shadow-inner">
                    <feature.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground flex-1">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Decorative Transition */}
      <section className="py-12 relative overflow-hidden flex justify-center items-center">
        {!prefs.reducedMotion && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent dark:via-primary/10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
          />
        )}
        <div className="flex gap-12 text-primary/20 dark:text-primary/30 z-10">
          <Brain className="w-8 h-8 md:w-12 md:h-12 animate-pulse" style={{ animationDelay: '0s' }} />
          <Sparkles className="w-8 h-8 md:w-12 md:h-12 animate-pulse" style={{ animationDelay: '1s' }} />
          <Eye className="w-8 h-8 md:w-12 md:h-12 animate-pulse" style={{ animationDelay: '2s' }} />
          <Ear className="w-8 h-8 md:w-12 md:h-12 animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Success Stories
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            {
              quote: "The AI assessment perfectly understood my needs. I found a remote role that accommodates my visual impairment seamlessly.",
              author: "Aarav K.",
              role: "Frontend Developer"
            },
            {
              quote: "Saksham's interview coach built my confidence. The accessibility audit feature ensured my new workplace was ready for me.",
              author: "Priya S.",
              role: "Accessibility Tester"
            }
          ].map((testimonial, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="premium-card bg-gradient-to-br from-white to-primary/5 dark:from-slate-900 dark:to-primary/10">
                <CardContent className="pt-8">
                  <p className="text-lg italic mb-6 text-foreground/90">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/30 to-indigo-500/30 flex items-center justify-center shadow-inner">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { q: "Is Saksham AI completely free?", a: "Yes, Saksham AI is completely free for all job seekers and learners." },
            { q: "Do I need a disability certificate to apply for jobs?", a: "Some government and corporate schemes require it, but many private employers hire based on skills alone." },
            { q: "How does the AI Accessibility Audit work?", a: "Employers can scan their company website and policies, and our AI will provide actionable feedback to make them compliant with WCAG standards." },
            { q: "Can I use voice commands?", a: "Yes! Enable the voice assistant from the Accessibility settings to navigate the entire platform using your voice." }
          ].map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl border bg-card hover:border-primary/50 transition-colors">
              <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-slate-950 py-12 mt-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-black tracking-tighter text-primary mb-4">Saksham AI</h2>
            <p className="text-muted-foreground max-w-sm">Empowering every individual to achieve their full potential through accessible AI and inclusive opportunities.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/jobs" className="hover:text-primary">Jobs</Link></li>
              <li><Link to="/learning" className="hover:text-primary">Learning</Link></li>
              <li><Link to="/employer" className="hover:text-primary">Employers</Link></li>
              <li><Link to="/community" className="hover:text-primary">Community</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Accessibility Statement</a></li>
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Saksham AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
