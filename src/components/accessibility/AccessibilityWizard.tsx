import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '@/context/AccessibilityContext';
import { AccessibilityProfile } from '@/accessibility/AccessibilitySettings';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Eye, Ear, Activity, Brain, Speech, ArrowRight } from 'lucide-react';

const OPTIONS = [
  { id: 'visual', label: 'Blind / Low vision', icon: Eye },
  { id: 'hearing', label: 'Deaf / Hard of hearing', icon: Ear },
  { id: 'speech', label: 'Speech impairment', icon: Speech },
  { id: 'mobility', label: 'Mobility impairment', icon: Activity },
  { id: 'dyslexia', label: 'Dyslexia', icon: Brain },
  { id: 'autism', label: 'Autism spectrum', icon: Brain },
  { id: 'cognitive', label: 'Cognitive disability', icon: Brain },
  { id: 'multiple', label: 'Multiple disabilities', icon: CheckCircle2 },
];

export const AccessibilityWizard = () => {
  const { isWizardCompleted, completeWizard, updateProfile } = useAccessibility();
  const [selected, setSelected] = useState<Partial<AccessibilityProfile>>({});

  const toggleOption = (id: keyof AccessibilityProfile) => {
    setSelected(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleComplete = () => {
    updateProfile(selected);
    completeWizard();
  };

  if (isWizardCompleted) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/95 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-3xl bg-white dark:bg-slate-950 border border-primary/20 rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wizard-title"
      >
        <div className="bg-primary/5 border-b p-8 text-center">
          <h1 id="wizard-title" className="text-3xl font-extrabold text-foreground mb-4">
            How can Saksham AI assist you?
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Select the options that apply to you. We'll automatically adjust the interface to provide the best possible experience.
          </p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {OPTIONS.map((opt) => {
              const isSelected = !!selected[opt.id as keyof AccessibilityProfile];
              return (
                <Card 
                  key={opt.id} 
                  className={`cursor-pointer transition-all border-2 ${isSelected ? 'border-primary bg-primary/10 shadow-md' : 'border-border/50 hover:border-primary/50'}`}
                  onClick={() => toggleOption(opt.id as keyof AccessibilityProfile)}
                >
                  <CardContent className="p-4 flex items-center gap-3 h-full">
                    <div className={`p-2 rounded-full ${isSelected ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                      <opt.icon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-sm md:text-base">{opt.label}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <Button variant="ghost" onClick={handleComplete} className="text-muted-foreground hover:text-foreground">
              Skip for now
            </Button>
            <Button size="lg" onClick={handleComplete} className="shadow-lg shadow-primary/20 hover:shadow-primary/40">
              Apply Settings <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
