import React, { createContext, useContext, useState, useEffect } from 'react';

type WorkspaceMode = 'candidate' | 'employer' | 'accessibility' | null;

type AppContextType = {
  workspaceMode: WorkspaceMode;
  setWorkspaceMode: (mode: WorkspaceMode) => void;
  candidateProfile: any;
  setCandidateProfile: (data: any) => void;
  assessmentScores: any;
  setAssessmentScores: (scores: any) => void;
  isRegistered: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>(() => {
    return (localStorage.getItem('workspaceMode') as WorkspaceMode) || null;
  });

  const [candidateProfile, setCandidateProfile] = useState<any>(() => {
    const saved = localStorage.getItem('candidateProfile');
    return saved ? JSON.parse(saved) : null;
  });

  const [assessmentScores, setAssessmentScores] = useState<any>(() => {
    const saved = localStorage.getItem('assessmentScores');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (workspaceMode) localStorage.setItem('workspaceMode', workspaceMode);
    else localStorage.removeItem('workspaceMode');
  }, [workspaceMode]);

  useEffect(() => {
    if (candidateProfile) localStorage.setItem('candidateProfile', JSON.stringify(candidateProfile));
    else localStorage.removeItem('candidateProfile');
  }, [candidateProfile]);

  useEffect(() => {
    if (assessmentScores) localStorage.setItem('assessmentScores', JSON.stringify(assessmentScores));
    else localStorage.removeItem('assessmentScores');
  }, [assessmentScores]);

  const isRegistered = !!candidateProfile;

  return (
    <AppContext.Provider
      value={{
        workspaceMode,
        setWorkspaceMode,
        candidateProfile,
        setCandidateProfile,
        assessmentScores,
        setAssessmentScores,
        isRegistered,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
