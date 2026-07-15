import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { OverlayWrapper } from '@/context/OverlayContext';

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
    <OverlayWrapper isOpen={isOpen} onClose={onClose} position="center" title={t('more.menu.language')}>
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
    </OverlayWrapper>
  );
};
