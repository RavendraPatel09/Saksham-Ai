import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SakhiAI } from '../ui-custom/SakhiAI';
import { AccessibilityPanel } from '../ui-custom/AccessibilityPanel';

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <SakhiAI />
      <AccessibilityPanel />
    </div>
  );
};
