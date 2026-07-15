import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

export const LanguageModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { id: 'en', label: t('lang.en') },
    { id: 'hi', label: t('lang.hi') },
    { id: 'mr', label: t('lang.mr') },
    { id: 'gu', label: t('lang.gu') },
    { id: 'ta', label: t('lang.ta') },
    { id: 'te', label: t('lang.te') },
    { id: 'bn', label: t('lang.bn') },
    { id: 'kn', label: t('lang.kn') },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-slate-950 border rounded-xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b bg-muted/30">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" /> {t('more.menu.language')}
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-4 grid grid-cols-2 gap-3">
              {languages.map(lang => (
                <Button
                  key={lang.id}
                  variant={language === lang.id ? 'default' : 'outline'}
                  className={`justify-start py-6 ${language === lang.id ? 'bg-primary text-white shadow-md' : ''}`}
                  onClick={() => {
                    setLanguage(lang.id);
                    onClose();
                  }}
                  aria-label={`Select ${lang.label}`}
                >
                  <span className="text-base font-medium">{lang.label}</span>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
