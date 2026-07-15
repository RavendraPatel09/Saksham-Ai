import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Building, GraduationCap, Users, Eye, Ear, Brain, ChevronDown, ChevronUp, Briefcase, Accessibility } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useAppContext } from '@/context/AppContext';
import { Dashboard } from './Dashboard';
import { useLanguage } from '@/i18n/LanguageContext';

export const Home = () => {
  const { prefs } = useAccessibility();
  const { workspaceMode } = useAppContext();
  const { t } = useLanguage();
  const transition = prefs.reducedMotion ? { duration: 0.1 } : { duration: 0.8, ease: "easeOut" as const };
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  if (workspaceMode) {
    return <Dashboard />;
  }

  const faqs = [
    { q: "Is Saksham AI completely free?", a: "Yes, Saksham AI is completely free for all job seekers and learners." },
    { q: "Do I need a disability certificate to apply for jobs?", a: "Some government and corporate schemes require it, but many private employers hire based on skills alone." },
    { q: "How does the AI Accessibility Audit work?", a: "Employers can scan their company website and policies, and our AI will provide actionable feedback to make them compliant with WCAG standards." },
    { q: "Can I use voice commands?", a: "Yes! Enable the voice assistant from the Accessibility settings to navigate the entire platform using your voice." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-slate-950">
      {/* V2 Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32 dot-grid bg-white dark:bg-slate-950 text-center flex flex-col items-center border-b border-border">
        
        {/* Signature Visual Cluster: Accessibility to Opportunity */}
        <div className="relative w-full max-w-lg h-48 md:h-64 mx-auto mb-12 flex items-center justify-center pointer-events-none">
          {/* Central Hub */}
          <div className="absolute z-10 w-20 h-20 md:w-24 md:h-24 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20 backdrop-blur-sm">
            <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </div>
          
          {/* Static Connecting Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full text-border z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="20" y1="20" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" />
            <line x1="80" y1="20" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" />
            <line x1="20" y1="80" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" />
            <line x1="80" y1="80" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" />
          </svg>
          
          {/* Peripheral Icons */}
          <div className="absolute top-4 left-8 md:left-16 w-12 h-12 md:w-16 md:h-16 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20 backdrop-blur-sm">
            <Accessibility className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
          </div>
          <div className="absolute top-4 right-8 md:right-16 w-12 h-12 md:w-16 md:h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 backdrop-blur-sm">
            <Ear className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
          </div>
          <div className="absolute bottom-4 left-8 md:left-16 w-12 h-12 md:w-16 md:h-16 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/20 backdrop-blur-sm">
            <Eye className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />
          </div>
          <div className="absolute bottom-4 right-8 md:right-16 w-12 h-12 md:w-16 md:h-16 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20 backdrop-blur-sm">
            <Brain className="w-6 h-6 md:w-8 md:h-8 text-amber-500" />
          </div>
        </div>

        <motion.div 
          className="z-10 max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 variants={itemVariants} className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground drop-shadow-sm">
            {t('hero.title_part1')} <span className="text-primary">{t('hero.title_part2')}</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center items-center mt-4">
            <motion.div whileHover={prefs.reducedMotion ? {} : { scale: 1.02 }} whileTap={prefs.reducedMotion ? {} : { scale: 0.98 }}>
              <Link to="/register" className={buttonVariants({ size: "lg", className: "w-full sm:w-auto text-lg h-14 px-10 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow rounded-xl" })}>
                {t('nav.get_started')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
            
            <motion.div whileHover={prefs.reducedMotion ? {} : { scale: 1.02 }} whileTap={prefs.reducedMotion ? {} : { scale: 0.98 }}>
              <Link to="/jobs" className={buttonVariants({ size: "lg", variant: "outline", className: "w-full sm:w-auto text-lg h-14 px-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-border hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-xl text-foreground" })}>
                {t('hero.explore_jobs')}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* TRUST BAR (V2: Real employer logos, grayscale, reduced opacity, no cards, single row) */}
      <section className="py-10 bg-transparent">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">Trusted by Inclusive Employers</p>
          <div className="flex flex-row flex-wrap justify-center items-center gap-8 md:gap-16 opacity-55 grayscale">
            <h3 className="font-heading text-xl font-bold">Google</h3>
            <h3 className="font-heading text-xl font-bold">Microsoft</h3>
            <h3 className="font-heading text-xl font-bold">Amazon</h3>
            <h3 className="font-heading text-xl font-bold">TCS</h3>
            <h3 className="font-heading text-xl font-bold">Infosys</h3>
          </div>
        </div>
      </section>

      {/* STATS STRIP (V2: 4-column bordered row, Space Grotesk numbers 24px/700, Inter labels 12px/#64748B) */}
      <section className="py-8 container mx-auto px-4 relative z-20 -mt-4">
        <motion.div 
          className="v2-card grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border overflow-hidden"
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
            <motion.div key={i} variants={itemVariants} className="flex flex-col items-center justify-center p-6 text-center bg-white dark:bg-slate-900">
              <span className="font-heading text-[24px] font-[700] text-foreground mb-1 leading-none">{stat.value}</span>
              <span className="font-inter text-[12px] text-muted-foreground uppercase tracking-wide mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* HOW SAKSHAM AI WORKS (V2: 3 cards, numbered badge, horizontal connecting line) */}
      <section className="py-24 container mx-auto px-4 relative overflow-hidden">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-16 text-foreground"
        >
          How Saksham AI Works
        </motion.h2>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Horizontal Line behind cards */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-border -translate-y-1/2 z-0" />
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 relative z-10"
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
              <motion.div key={i} variants={itemVariants} className="v2-card p-8 flex flex-col items-center text-center relative">
                {/* Numbered Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground font-heading font-bold text-sm flex items-center justify-center shadow-sm border-2 border-white dark:border-slate-900">
                  {i + 1}
                </div>
                
                <div className="mt-4 bg-secondary/50 p-4 rounded-xl mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground flex-1 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SUCCESS STORIES (V2: 2-column testimonial cards, credibility tag, no avatars/ratings) */}
      <section className="py-24 container mx-auto px-4 bg-muted/30 border-y border-border">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-16 text-foreground"
        >
          Success Stories
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            {
              tag: "Matched via AI assessment",
              quote: "The AI assessment perfectly understood my needs. I found a remote role that accommodates my visual impairment seamlessly.",
              author: "Aarav K.",
              role: "Frontend Developer"
            },
            {
              tag: "Used Interview Coach",
              quote: "Saksham's interview coach built my confidence. The accessibility audit feature ensured my new workplace was ready for me.",
              author: "Priya S.",
              role: "Accessibility Tester"
            }
          ].map((testimonial, i) => (
            <motion.div key={i} variants={itemVariants} className="v2-card p-8 flex flex-col">
              <div className="mb-6">
                <Badge variant="outline" className="text-[11px] uppercase tracking-wider text-primary border-primary/20 bg-primary/5">
                  {testimonial.tag}
                </Badge>
              </div>
              <p className="text-base leading-relaxed mb-8 text-foreground/90 flex-1">
                "{testimonial.quote}"
              </p>
              <div className="pt-6 border-t border-border">
                <h4 className="font-heading font-bold text-foreground">{testimonial.author}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FAQ SECTION (V2: Plain accordion, primary color on icon, no cards) */}
      <section className="py-24 container mx-auto px-4 max-w-3xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Frequently Asked Questions
        </h2>
        <div className="space-y-0 border-t border-border">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button 
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                <span className="font-semibold text-foreground text-base md:text-lg pr-8">
                  {faq.q}
                </span>
                <span className="text-primary shrink-0 transition-transform duration-200">
                  {openFaq === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={prefs.reducedMotion ? { duration: 0 } : { duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted-foreground pb-6 text-sm md:text-base leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER (V2: Inter font scale alignment) */}
      <footer className="border-t border-border bg-background py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-primary mb-4">Saksham AI</h2>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Empowering every individual to achieve their full potential through accessible AI and inclusive opportunities.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/jobs" className="hover:text-primary transition-colors">Jobs</Link></li>
              <li><Link to="/learning" className="hover:text-primary transition-colors">Learning</Link></li>
              <li><Link to="/employer" className="hover:text-primary transition-colors">Employers</Link></li>
              <li><Link to="/community" className="hover:text-primary transition-colors">Community</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Accessibility Statement</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Saksham AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
