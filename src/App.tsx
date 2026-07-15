import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { AppProvider } from '@/context/AppContext';
import { Layout } from '@/components/layout/Layout';
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

function App() {
  return (
    <AccessibilityProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="assessment" element={<Assessment />} />
              <Route path="skill-gap" element={<SkillGap />} />
              <Route path="learning" element={<Learning />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="interview" element={<Interview />} />
              <Route path="employer" element={<Employer />} />
              <Route path="employer/audit" element={<AccessibilityAudit />} />
              <Route path="post-employment" element={<PostEmployment />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </AppProvider>
    </AccessibilityProvider>
  );
}

export default App;
