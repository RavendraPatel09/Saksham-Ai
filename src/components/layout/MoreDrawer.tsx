import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  X, Compass, BookOpen, Briefcase, Trophy, Calendar as CalendarIcon, 
  Users, MessageCircle, HeartHandshake, Settings, HelpCircle, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useLanguage } from '@/i18n/LanguageContext';

type MoreDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const MoreDrawer: React.FC<MoreDrawerProps> = ({ isOpen, onClose }) => {
  const { prefs } = useAccessibility();

  const { t } = useLanguage();

  // Close panel on escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const groups = [
    {
      title: t('more.career_tools'),
      items: [
        { name: t('more.menu.assessment'), path: "/assessment", icon: Compass },
        { name: t('more.menu.interview'), path: "/interview", icon: Users },
        { name: t('more.menu.resume'), path: "/resume-builder", icon: Briefcase },
        { name: t('more.menu.roadmap'), path: "/career-roadmap", icon: Compass },
      ]
    },
    {
      title: t('more.accessibility'),
      items: [
        { name: t('more.menu.access_settings'), path: "#accessibility", icon: Settings },
        { name: t('more.menu.language'), path: "#language", icon: Settings },
        { name: t('more.menu.communication'), path: "/communication", icon: MessageCircle },
      ]
    },
    {
      title: t('more.community'),
      items: [
        { name: t('more.menu.community'), path: "/community", icon: Users },
        { name: t('more.menu.events'), path: "/events", icon: CalendarIcon },
      ]
    },
    {
      title: t('more.daily_support'),
      items: [
        { name: t('more.menu.offline'), path: "/offline", icon: HeartHandshake },
        { name: t('more.menu.financial'), path: "/financial", icon: Trophy },
        { name: t('more.menu.safety'), path: "/safety", icon: HeartHandshake },
      ]
    },
    {
      title: t('more.help'),
      items: [
        { name: t('more.menu.gov_support'), path: "/government-support", icon: HeartHandshake },
        { name: t('more.menu.feedback'), path: "/", icon: MessageSquare },
        { name: t('more.menu.help_center'), path: "/", icon: HelpCircle },
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative z-10 w-full max-w-sm bg-white dark:bg-slate-950 h-full border-l shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b bg-muted/30">
              <h2 className="text-xl font-bold flex items-center gap-2">
                Explore More
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar pb-24 md:pb-4">
              {groups.map((group, i) => (
                <div key={i}>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 ml-2">
                    {group.title}
                  </h3>
                  <div className="grid gap-1">
                    {group.items.map((item, j) => (
                      <Link 
                        key={j} 
                        to={item.path}
                        onClick={onClose}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 text-foreground transition-colors font-medium group"
                      >
                        <div className="bg-primary/5 p-2 rounded-md group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
