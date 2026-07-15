import React, { useState } from 'react';
import { ShieldCheck, Building, Laptop, MessagesSquare, FileText, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

export const AccessibilityAudit = () => {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [auditData, setAuditData] = useState({
    physical_ramp: false, physical_elevator: false, physical_restroom: false, physical_parking: false,
    tech_screenreader: false, tech_captions: false, tech_software: false,
    comm_sign: false, comm_docs: false,
    policy_hiring: false, policy_training: false
  });

  const handleToggle = (key: keyof typeof auditData) => {
    setAuditData(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRunAudit = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  if (isAnalyzing) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <ShieldCheck className="h-20 w-20 text-primary animate-pulse mb-6" />
        <h2 className="text-2xl font-bold mb-2">AI is auditing your workplace...</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Analyzing infrastructure, technology, and policy readiness for inclusive hiring.
        </p>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Workplace Audit Results</h1>
          <p className="text-muted-foreground">Here is your AI-generated accessibility report.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Overall Accessibility', score: 65, color: 'text-primary' },
            { label: 'Infrastructure', score: 50, color: 'text-blue-500' },
            { label: 'Technology', score: 66, color: 'text-orange-500' },
            { label: 'Culture & Policy', score: 100, color: 'text-green-500' },
          ].map((stat, i) => (
            <Card key={i} className="text-center">
              <CardContent className="pt-6">
                <div className={`text-4xl font-bold mb-2 ${stat.color}`}>{stat.score}%</div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <Progress value={stat.score} className="h-1.5 mt-4" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> AI Recommendations</CardTitle>
                <CardDescription>Actionable steps to improve your inclusive hiring readiness.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Improve physical infrastructure by adding accessible restrooms and tactile navigation.",
                  "Install and license screen-reader support software for employee workstations.",
                  "Consider partnering with sign-language interpretation services for key meetings.",
                  "Your culture and policy scores are excellent, keep up the awareness training!"
                ].map((rec, i) => (
                  <div key={i} className="flex gap-3 bg-background p-4 rounded-lg border shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{rec}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Compliance Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">WCAG 2.1 AA</span>
                  <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">Partial</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">RPWD Act 2016</span>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Compliant</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Physical Access</span>
                  <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">Action Needed</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Download Full PDF Report</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Accessibility Audit Wizard</h1>
        <p className="text-muted-foreground">Evaluate your workplace readiness for inclusive hiring.</p>
        <Progress value={(step / 4) * 100} className="h-2 mt-6" />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          {step === 1 && <CardTitle className="flex items-center gap-2 text-xl"><Building className="text-primary h-6 w-6" /> Physical Accessibility</CardTitle>}
          {step === 2 && <CardTitle className="flex items-center gap-2 text-xl"><Laptop className="text-primary h-6 w-6" /> Technology Readiness</CardTitle>}
          {step === 3 && <CardTitle className="flex items-center gap-2 text-xl"><MessagesSquare className="text-primary h-6 w-6" /> Communication Support</CardTitle>}
          {step === 4 && <CardTitle className="flex items-center gap-2 text-xl"><FileText className="text-primary h-6 w-6" /> Policy & Culture</CardTitle>}
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          {step === 1 && (
            <>
              <ToggleRow id="physical_ramp" label="Wheelchair Ramps at Entrances" checked={auditData.physical_ramp} onChange={() => handleToggle('physical_ramp')} />
              <ToggleRow id="physical_elevator" label="Accessible Elevators" checked={auditData.physical_elevator} onChange={() => handleToggle('physical_elevator')} />
              <ToggleRow id="physical_restroom" label="Accessible Restrooms" checked={auditData.physical_restroom} onChange={() => handleToggle('physical_restroom')} />
              <ToggleRow id="physical_parking" label="Designated Accessible Parking" checked={auditData.physical_parking} onChange={() => handleToggle('physical_parking')} />
            </>
          )}
          {step === 2 && (
            <>
              <ToggleRow id="tech_screenreader" label="Screen-Reader Supported Internal Tools" checked={auditData.tech_screenreader} onChange={() => handleToggle('tech_screenreader')} />
              <ToggleRow id="tech_captions" label="Closed Captions in Video Meetings" checked={auditData.tech_captions} onChange={() => handleToggle('tech_captions')} />
              <ToggleRow id="tech_software" label="Licenses for Assistive Software (JAWS, NVDA)" checked={auditData.tech_software} onChange={() => handleToggle('tech_software')} />
            </>
          )}
          {step === 3 && (
            <>
              <ToggleRow id="comm_sign" label="Sign-Language Interpreters Available" checked={auditData.comm_sign} onChange={() => handleToggle('comm_sign')} />
              <ToggleRow id="comm_docs" label="Accessible Formats for Company Documents" checked={auditData.comm_docs} onChange={() => handleToggle('comm_docs')} />
            </>
          )}
          {step === 4 && (
            <>
              <ToggleRow id="policy_hiring" label="Documented Inclusive Hiring Policy" checked={auditData.policy_hiring} onChange={() => handleToggle('policy_hiring')} />
              <ToggleRow id="policy_training" label="Disability Awareness Training for Staff" checked={auditData.policy_training} onChange={() => handleToggle('policy_training')} />
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>Back</Button>
          {step < 4 ? (
            <Button onClick={() => setStep(step + 1)}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
          ) : (
            <Button onClick={handleRunAudit}>Generate AI Report <Zap className="ml-2 h-4 w-4" /></Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

const ToggleRow = ({ id, label, checked, onChange }: { id: string, label: string, checked: boolean, onChange: () => void }) => (
  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-transparent hover:border-border transition-colors">
    <Label htmlFor={id} className="text-base cursor-pointer flex-1">{label}</Label>
    <Switch id={id} checked={checked} onCheckedChange={onChange} />
  </div>
);

const Badge = ({ children, className, variant }: any) => {
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}>{children}</span>
}
