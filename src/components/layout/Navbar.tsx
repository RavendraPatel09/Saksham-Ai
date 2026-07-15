import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, Sun, Moon, Settings } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { useAccessibility } from '@/context/AccessibilityContext';
import { GlobalSearch } from '../ui-custom/GlobalSearch';
import { Logo } from '../ui-custom/Logo';

export const Navbar = ({ onOpenMore, onOpenAccessibility }: { onOpenMore?: () => void, onOpenAccessibility?: () => void }) => {
  const { workspaceMode, setWorkspaceMode } = useAppContext();
  const { prefs, updatePrefs } = useAccessibility();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Learn', path: '/learning' },
    { name: 'Jobs', path: '/jobs' },
    ...(workspaceMode === 'employer' 
      ? [{ name: 'Employer Dashboard', path: '/employer' }]
      : (!workspaceMode ? [{ name: 'Employer Portal', path: '/employer' }] : [])),
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-white/80 dark:bg-[#0F172A]/75 backdrop-blur-[20px] shadow-md border-border/50 dark:border-white/[0.06]' 
          : 'bg-background/95 dark:bg-[#0F172A]/75 backdrop-blur-[20px] supports-[backdrop-filter]:bg-background/60 border-transparent shadow-none dark:border-white/[0.06]'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" aria-label="Saksham AI Home" className="shrink-0 flex items-center">
          <Logo />
        </Link>
        
        <div className="hidden md:flex flex-1 items-center justify-center gap-1 lg:gap-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {isActive && !prefs.reducedMotion && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
          <button
            onClick={onOpenMore}
            className="relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
          >
            More
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="hover:bg-primary/10 hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </Button>

          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => updatePrefs({ darkMode: !prefs.darkMode })}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label="Toggle Theme"
          >
            {prefs.darkMode || prefs.highContrast || prefs.profile.visual ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onOpenAccessibility}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label="Accessibility & Preferences"
          >
            <Settings className="w-5 h-5" />
          </Button>

          <div className="hidden md:flex gap-3">
            {!workspaceMode ? (
              <>
                <Link to="/employer" className={buttonVariants({ variant: "ghost", className: "hover:bg-primary/10 transition-colors" })}>
                  Employer Login
                </Link>
                <Link to="/register" className={buttonVariants({ className: "shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90" })}>
                  Get Started
                </Link>
              </>
            ) : (
              <Button variant="outline" onClick={() => setWorkspaceMode(null)} className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors">
                Logout
              </Button>
            )}
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu" onClick={onOpenMore}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </motion.nav>
  );
};
