import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, Sun, Moon, Settings } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { useAccessibility } from '@/context/AccessibilityContext';
import { GlobalSearch } from '../ui-custom/GlobalSearch';
import { Logo } from '../ui-custom/Logo';
import { useLanguage } from '@/i18n/LanguageContext';
import { useOffline } from '@/context/OfflineContext';
import { useOverlay } from '@/context/OverlayContext';

export const Navbar = () => {
  const { workspaceMode, setWorkspaceMode } = useAppContext();
  const { openOverlay } = useOverlay();
  const { prefs, updatePrefs } = useAccessibility();
  const { t } = useLanguage();
  const { isOffline } = useOffline();
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
    { name: t('nav.home'), path: '/' },
    { name: t('nav.learn'), path: '/learning' },
    { name: t('nav.jobs'), path: '/jobs' },
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
            onClick={() => openOverlay('more')}
            className="relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
          >
            {t('nav.more')}
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" onClick={() => openOverlay('search')} className="hover:bg-primary/10 hover:text-primary transition-colors">
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
            onClick={() => openOverlay('accessibility')}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label="Accessibility & Preferences"
          >
            <Settings className="w-5 h-5" />
          </Button>

          <div className="hidden md:flex gap-3">
            {workspaceMode !== 'employer' ? (
              <>
                <Link to="/register" className={buttonVariants({ variant: "ghost", className: "hover:bg-primary/10 transition-colors" })}>
                  {t('nav.get_started')}
                </Link>
              </>
            ) : (
              <Button variant="outline" onClick={() => setWorkspaceMode(null)} className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors">
                {t('nav.logout')}
              </Button>
            )}
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu" onClick={() => openOverlay('more')}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};
