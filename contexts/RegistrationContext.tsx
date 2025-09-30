import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Registration } from '../types';

interface RegistrationContextType {
  registrations: Registration[];
  addRegistration: (formData: Omit<Registration, 'id'>) => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const addRegistration = (formData: Omit<Registration, 'id'>) => {
    const newRegistration: Registration = {
      id: Date.now(), // Simple unique ID generation
      ...formData,
    };
    setRegistrations(prevRegistrations => [newRegistration, ...prevRegistrations]);
  };

  return (
    <RegistrationContext.Provider value={{ registrations, addRegistration }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistrations = (): RegistrationContextType => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistrations must be used within a RegistrationProvider');
  }
  return context;
};
