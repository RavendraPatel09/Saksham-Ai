import React, { useState } from 'react';
import { Search, X, Briefcase, GraduationCap, Users, Building, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { OverlayWrapper } from '@/context/OverlayContext';

const SUGGESTIONS = [
  { id: 1, title: 'Frontend Developer', type: 'job', path: '/jobs' },
  { id: 2, title: 'Accessibility Testing Course', type: 'learning', path: '/learning' },
  { id: 3, title: 'Priya Sharma (Mentor)', type: 'mentor', path: '/community' },
  { id: 4, title: 'TechCorp Inclusive Policies', type: 'employer', path: '/employer' },
];

export const GlobalSearch = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  const filtered = query.trim() ? SUGGESTIONS.filter(s => s.title.toLowerCase().includes(query.toLowerCase())) : SUGGESTIONS;

  const getIcon = (type: string) => {
    switch(type) {
      case 'job': return <Briefcase className="w-4 h-4 text-indigo-500" />;
      case 'learning': return <GraduationCap className="w-4 h-4 text-emerald-500" />;
      case 'mentor': return <Users className="w-4 h-4 text-amber-500" />;
      case 'employer': return <Building className="w-4 h-4 text-purple-500" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  return (
    <OverlayWrapper isOpen={isOpen} onClose={onClose} position="center" title="Global Search">
      <div className="flex flex-col w-full">
        <div className="flex items-center px-4 py-3 border-b">
          <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
          <input 
            type="text" 
            placeholder="Search jobs, courses, mentors, schemes..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-lg py-2 focus:outline-none"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <kbd className="hidden md:inline-flex items-center gap-1 bg-muted px-2 py-1 rounded border">
              <CornerDownLeft className="w-3 h-3" /> ESC
            </kbd>
          </div>
        </div>

        <div className="p-2 max-h-[60vh] overflow-y-auto no-scrollbar">
          {filtered.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {query.trim() ? 'Search Results' : 'Suggested'}
              </div>
              {filtered.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.path)}
                  className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-md group-hover:bg-background">
                      {getIcon(item.type)}
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-20" />
              <p>No results found for "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </OverlayWrapper>
  );
};
