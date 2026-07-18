import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Survey {
  id: string;
  siteName: string;
  clientName: string;
  description: string;
  priority: string;
  date: string;
  notes: string;
}

interface SurveyContextType {
  surveys: Survey[];
  addSurvey: (survey: Survey) => void;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export function SurveyProvider({ children }: { children: ReactNode }) {
  const [surveys, setSurveys] = useState<Survey[]>([
    // Start with a couple of dummy surveys so the dashboard isn't completely empty initially
    {
      id: '1',
      siteName: 'Site Inspection - Downtown',
      clientName: 'Acme Corp',
      description: 'Routine check',
      priority: 'High',
      date: '2026-07-18',
      notes: '',
    },
    {
      id: '2',
      siteName: 'Client Meeting - Tech Park',
      clientName: 'Globex Inc',
      description: 'Initial site survey',
      priority: 'Medium',
      date: '2026-07-19',
      notes: '',
    },
  ]);

  const addSurvey = (survey: Survey) => {
    // Add the new survey to the beginning of the list
    setSurveys((prevSurveys) => [survey, ...prevSurveys]);
  };

  return (
    <SurveyContext.Provider value={{ surveys, addSurvey }}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurveys() {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurveys must be used within a SurveyProvider');
  }
  return context;
}
