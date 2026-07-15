import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { AccessibilitySwitcher } from '../ui-custom/AccessibilitySwitcher';
import { SakhiAI } from '../ui-custom/SakhiAI';

export const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300 pb-16 md:pb-0 relative">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomNav />
      <AccessibilitySwitcher />
      <SakhiAI />
    </div>
  );
};
