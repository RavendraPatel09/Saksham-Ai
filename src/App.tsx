import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { AppProvider } from '@/context/AppContext';
import { Layout } from '@/components/layout/Layout';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Toaster } from '@/components/ui/sonner';

import { Home } from '@/pages/Home';
import { Register } from '@/pages/Register';
import { Assessment } from '@/pages/Assessment';
import { SkillGap } from '@/pages/SkillGap';
import { Learning } from '@/pages/Learning';
import { Jobs } from '@/pages/Jobs';
import { Interview } from '@/pages/Interview';
import { Employer } from '@/pages/Employer';
import { AccessibilityAudit } from '@/pages/AccessibilityAudit';
import { PostEmployment } from '@/pages/PostEmployment';

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
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AccessibilityProvider>
      <AppProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
        <Toaster />
      </AppProvider>
    </AccessibilityProvider>
  );
}

export default App;
