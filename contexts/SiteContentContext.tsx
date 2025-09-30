import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the site content
export interface SiteContent {
  conferenceLogo: string;
  universityLogo: string;
  heroBackground: string;
  callForPapersImage: string;
}

// Define the context type
interface SiteContentContextType {
  siteContent: SiteContent;
  updateImage: (key: keyof SiteContent, newUrl: string) => void;
}

// Create the context
const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

// Initial state with default image URLs
const initialState: SiteContent = {
  conferenceLogo: 'https://picsum.photos/seed/conflogo/60/60',
  universityLogo: 'https://picsum.photos/seed/unilogo/60/60',
  heroBackground: 'https://picsum.photos/seed/hero/1200/400',
  callForPapersImage: 'https://picsum.photos/seed/a4-paper/842/1191',
};

// Create the provider component
export const SiteContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [siteContent, setSiteContent] = useState<SiteContent>(initialState);

  const updateImage = (key: keyof SiteContent, newUrl: string) => {
    setSiteContent(prevState => ({
      ...prevState,
      [key]: newUrl,
    }));
  };

  return (
    <SiteContentContext.Provider value={{ siteContent, updateImage }}>
      {children}
    </SiteContentContext.Provider>
  );
};

// Create the custom hook
export const useSiteContent = (): SiteContentContextType => {
  const context = useContext(SiteContentContext);
  if (context === undefined) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};