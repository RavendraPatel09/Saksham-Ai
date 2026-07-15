import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, BookOpen, User, Building } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export const BottomNav = () => {
  const { role } = useAppContext();
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Jobs', path: '/jobs', icon: Briefcase },
    { name: 'Learning', path: '/learning', icon: BookOpen },
    ...(role === 'employer' 
      ? [{ name: 'Employer', path: '/employer', icon: Building }]
      : [{ name: 'Profile', path: '/assessment', icon: User }]
    ),
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-40 w-full border-t bg-background/95 backdrop-blur md:hidden shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]">
      <div className="flex h-16 items-center justify-around px-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 p-2 transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'fill-primary/20' : ''}`} />
              <span className="text-[10px] font-medium">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
