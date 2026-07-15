import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { SakhiAI } from '../ui-custom/SakhiAI';
import { AccessibilityPanel } from '../ui-custom/AccessibilityPanel';
import { MoreDrawer } from './MoreDrawer';

export const Layout = () => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0 relative">
      <Navbar onOpenMore={() => setIsMoreOpen(true)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomNav onOpenMore={() => setIsMoreOpen(true)} />
      <SakhiAI />
      <AccessibilityPanel />
      <MoreDrawer isOpen={isMoreOpen} onClose={() => setIsMoreOpen(false)} />
    </div>
  );
};
