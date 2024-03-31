import React, { useState, useContext, createContext, FunctionComponent } from 'react';

interface LastUpdatedContextType {
  lastUpdatedString: string;
  setLastUpdatedString: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with a default value
const LastUpdatedContext = createContext<LastUpdatedContextType | undefined>(undefined);

// Create a provider component
export const LastUpdatedProvider: FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lastUpdatedString, setLastUpdatedString] = useState('');

  return (
    <LastUpdatedContext.Provider value={{ lastUpdatedString, setLastUpdatedString }}>
      {children}
    </LastUpdatedContext.Provider>
  );
};

// Create a custom hook to use the context
export const useLastUpdated = () => {
  const context = useContext(LastUpdatedContext);
  if (context === undefined) {
    throw new Error('useLastUpdated must be used within a LastUpdatedProvider');
  }
  return context;
};
