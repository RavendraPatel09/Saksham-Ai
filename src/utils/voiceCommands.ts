export type CommandType = 
  | { type: 'navigate'; payload: string; confirm: string }
  | { type: 'action'; payload: string; confirm: string }
  | { type: 'accessibility'; payload: string; confirm: string }
  | { type: 'read_page'; confirm: string }
  | { type: 'help'; confirm: string }
  | { type: 'unknown' };

export const normalizeCommand = (transcript: string): string => {
  return transcript.toLowerCase().trim().replace(/[.,!?]/g, '');
};

export const parseCommand = (rawTranscript: string): CommandType => {
  const cmd = normalizeCommand(rawTranscript);

  // NAVIGATION
  if (cmd.match(/go to job|open job|search job|show me job|i want job/)) {
    return { type: 'navigate', payload: '/jobs', confirm: 'Opening jobs.' };
  }
  if (cmd.match(/open home|go home|take me home/)) {
    return { type: 'navigate', payload: '/', confirm: 'Opening home.' };
  }
  if (cmd.match(/open learn|take me to learn|show learning/)) {
    return { type: 'navigate', payload: '/learning', confirm: 'Opening learning.' };
  }
  if (cmd.match(/open feedback|read my latest feedback/)) {
    return { type: 'navigate', payload: '/post-employment', confirm: 'Opening feedback.' };
  }
  if (cmd.match(/open community|show community/)) {
    return { type: 'navigate', payload: '/community', confirm: 'Opening community.' };
  }
  if (cmd.match(/open dashboard|my dashboard/)) {
    return { type: 'navigate', payload: '/dashboard', confirm: 'Opening dashboard.' };
  }
  if (cmd.match(/open profile|my profile/)) {
    return { type: 'navigate', payload: '/dashboard', confirm: 'Opening your profile.' };
  }
  if (cmd.match(/go back|back/)) {
    return { type: 'action', payload: 'go_back', confirm: 'Going back.' };
  }

  // ACTIONS
  if (cmd.match(/start interview|interview practice/)) {
    return { type: 'navigate', payload: '/interview', confirm: 'Starting interview practice.' };
  }
  if (cmd.match(/open resume|resume builder/)) {
    return { type: 'navigate', payload: '/resume-builder', confirm: 'Opening resume builder.' };
  }
  if (cmd.match(/open saved|saved item|saved job/)) {
    return { type: 'navigate', payload: '/saved', confirm: 'Showing your saved items.' };
  }
  if (cmd.match(/government scheme|open scheme/)) {
    return { type: 'navigate', payload: '/government-support', confirm: 'Opening government schemes.' };
  }
  if (cmd.match(/post employment|post-employment/)) {
    return { type: 'navigate', payload: '/post-employment', confirm: 'Opening post employment.' };
  }
  if (cmd.match(/submit feedback/)) {
    return { type: 'action', payload: 'submit_feedback', confirm: 'Submitting feedback.' };
  }

  // ACCESSIBILITY
  if (cmd.match(/enable high contrast|turn on high contrast/)) {
    return { type: 'accessibility', payload: 'highContrast_on', confirm: 'Turning on high contrast.' };
  }
  if (cmd.match(/disable high contrast|turn off high contrast/)) {
    return { type: 'accessibility', payload: 'highContrast_off', confirm: 'Disabling high contrast.' };
  }
  if (cmd.match(/increase text size|make text bigger|larger text/)) {
    return { type: 'accessibility', payload: 'largeText_on', confirm: 'Increasing text size.' };
  }
  if (cmd.match(/reduce text size|make text smaller/)) {
    return { type: 'accessibility', payload: 'largeText_off', confirm: 'Reducing text size.' };
  }
  if (cmd.match(/enable caption|turn on caption/)) {
    return { type: 'accessibility', payload: 'textToSpeech_on', confirm: 'Enabling captions.' };
  }
  if (cmd.match(/disable caption|turn off caption/)) {
    return { type: 'accessibility', payload: 'textToSpeech_off', confirm: 'Disabling captions.' };
  }

  // READ PAGE
  if (cmd.match(/read this page|read page/)) {
    return { type: 'read_page', confirm: '' }; // Handled specially
  }

  // HELP
  if (cmd.match(/help|what can i do|available command/)) {
    return { type: 'help', confirm: '' }; // Handled specially
  }

  return { type: 'unknown' };
};
