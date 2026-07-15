import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeartHandshake, Menu } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';

export const Navbar = () => {
  const { role, setRole } = useAppContext();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Assessment', path: '/assessment' },
    { name: 'Learning', path: '/learning' },
    { name: 'Interview Coach', path: '/interview' },
    { name: 'Employer Portal', path: '/employer' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2" aria-label="Saksham AI Home">
          <div className="bg-primary p-2 rounded-lg">
            <HeartHandshake className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">Saksham AI</span>
        </Link>
        
        <div className="hidden md:flex flex-1 items-center justify-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2">
            {!role ? (
              <>
                <Link to="/employer" className={buttonVariants({ variant: "ghost" })}>
                  Employer Login
                </Link>
                <Link to="/register" className={buttonVariants()}>
                  Get Started
                </Link>
              </>
            ) : (
              <Button variant="outline" onClick={() => setRole(null)}>
                Logout
              </Button>
            )}
          </div>
          
          {/* Mobile Menu Button placeholder */}
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
