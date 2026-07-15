import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { AppProvider } from '@/context/AppContext';
import { Layout } from '@/components/layout/Layout';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Toaster } from '@/components/ui/sonner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Loader2 } from 'lucide-react';

// Lazy load pages for performance
const Home = lazy(() => import('@/pages/Home').then(module => ({ default: module.Home })));
const Register = lazy(() => import('@/pages/Register').then(module => ({ default: module.Register })));
const Assessment = lazy(() => import('@/pages/Assessment').then(module => ({ default: module.Assessment })));
const SkillGap = lazy(() => import('@/pages/SkillGap').then(module => ({ default: module.SkillGap })));
const Learning = lazy(() => import('@/pages/Learning').then(module => ({ default: module.Learning })));
const Jobs = lazy(() => import('@/pages/Jobs').then(module => ({ default: module.Jobs })));
const Interview = lazy(() => import('@/pages/Interview').then(module => ({ default: module.Interview })));
const Employer = lazy(() => import('@/pages/Employer').then(module => ({ default: module.Employer })));
const AccessibilityAudit = lazy(() => import('@/pages/AccessibilityAudit').then(module => ({ default: module.AccessibilityAudit })));
const PostEmployment = lazy(() => import('@/pages/PostEmployment').then(module => ({ default: module.PostEmployment })));
const Community = lazy(() => import('@/pages/Community').then(module => ({ default: module.Community })));
const GovernmentSupport = lazy(() => import('@/pages/GovernmentSupport').then(module => ({ default: module.GovernmentSupport })));
const ResumeBuilder = lazy(() => import('@/pages/ResumeBuilder').then(module => ({ default: module.ResumeBuilder })));
const CareerRoadmap = lazy(() => import('@/pages/CareerRoadmap').then(module => ({ default: module.CareerRoadmap })));
const SavedItems = lazy(() => import('@/pages/SavedItems').then(module => ({ default: module.SavedItems })));
const CalendarSchedule = lazy(() => import('@/pages/CalendarSchedule').then(module => ({ default: module.CalendarSchedule })));
const NotFound = lazy(() => import('@/pages/NotFound').then(module => ({ default: module.NotFound })));

// Loading Fallback Component
const PageLoader = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center">
    <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
    <p className="text-muted-foreground font-medium animate-pulse">Loading experience...</p>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="register" element={<PageWrapper><Register /></PageWrapper>} />
          <Route path="assessment" element={<PageWrapper><Assessment /></PageWrapper>} />
          <Route path="skill-gap" element={<PageWrapper><SkillGap /></PageWrapper>} />
          <Route path="learning" element={<PageWrapper><Learning /></PageWrapper>} />
          <Route path="jobs" element={<PageWrapper><Jobs /></PageWrapper>} />
          <Route path="interview" element={<PageWrapper><Interview /></PageWrapper>} />
          <Route path="employer" element={<PageWrapper><Employer /></PageWrapper>} />
          <Route path="employer/audit" element={<PageWrapper><AccessibilityAudit /></PageWrapper>} />
          <Route path="post-employment" element={<PageWrapper><PostEmployment /></PageWrapper>} />
          <Route path="community" element={<PageWrapper><Community /></PageWrapper>} />
          <Route path="government-support" element={<PageWrapper><GovernmentSupport /></PageWrapper>} />
          <Route path="resume-builder" element={<PageWrapper><ResumeBuilder /></PageWrapper>} />
          <Route path="career-roadmap" element={<PageWrapper><CareerRoadmap /></PageWrapper>} />
          <Route path="saved" element={<PageWrapper><SavedItems /></PageWrapper>} />
          <Route path="calendar" element={<PageWrapper><CalendarSchedule /></PageWrapper>} />
          
          {/* Catch-all 404 Route */}
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AccessibilityProvider>
        <AppProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <AnimatedRoutes />
            </Suspense>
          </BrowserRouter>
          <Toaster />
        </AppProvider>
      </AccessibilityProvider>
    </ErrorBoundary>
  );
}

export default App;
