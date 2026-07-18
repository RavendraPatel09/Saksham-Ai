import React from 'react';
import { useVoiceNavigation } from '@/hooks/useVoiceNavigation';
import { VoiceMicIndicator } from './VoiceMicIndicator';

export const VoiceGuide = () => {
  const { micStatus, isBlindMode } = useVoiceNavigation();

  if (!isBlindMode) return null;

  return <VoiceMicIndicator status={micStatus} />;
};
