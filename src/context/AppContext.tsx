import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'candidate' | 'employer' | null;

type AppContextType = {
  role: UserRole;
  setRole: (role: UserRole) => void;
  candidateProfile: any;
  setCandidateProfile: (data: any) => void;
  assessmentScores: any;
  setAssessmentScores: (scores: any) => void;
  isRegistered: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem('userRole') as UserRole) || null;
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
    if (role) localStorage.setItem('userRole', role);
    else localStorage.removeItem('userRole');
  }, [role]);

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
        role,
        setRole,
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
