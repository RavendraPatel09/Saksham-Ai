import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { SakhiAI } from '../ui-custom/SakhiAI';
import { AccessibilityPanel } from '../ui-custom/AccessibilityPanel';

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0 relative">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomNav />
      <SakhiAI />
      <AccessibilityPanel />
    </div>
  );
};
