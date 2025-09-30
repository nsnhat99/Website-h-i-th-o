import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { KeynoteSpeaker, ConferenceTopic, Sponsor } from '../types';
import { KEYNOTE_SPEAKERS_DATA, CONFERENCE_TOPICS_DATA, SPONSORS_DATA, CO_ORGANIZERS_DATA } from '../constants';

// Define the shape of the site content
export interface SiteContent {
  conferenceLogo: string;
  universityLogo: string;
  heroBackground: string;
  callForPapersImage: string;
  keynoteSpeakers: KeynoteSpeaker[];
  conferenceTopics: ConferenceTopic[];
  sponsors: Sponsor[];
  coOrganizers: Sponsor[];
}

// Define the context type
interface SiteContentContextType {
  siteContent: SiteContent;
  updateImage: (key: keyof Omit<SiteContent, 'keynoteSpeakers' | 'conferenceTopics' | 'sponsors' | 'coOrganizers'>, newUrl: string) => void;
  
  // Speaker methods
  addKeynoteSpeaker: (speakerData: Omit<KeynoteSpeaker, 'id'>) => void;
  updateKeynoteSpeaker: (speakerId: number, speakerData: Partial<KeynoteSpeaker>) => void;
  deleteKeynoteSpeaker: (speakerId: number) => void;
  
  // Conference Topic methods
  updateConferenceTopic: (topicId: number, data: { title: string; imageUrl: string; description: string }) => void;
  
  // Sponsor/Co-organizer methods
  addSponsorOrCoOrganizer: (data: Omit<Sponsor, 'id'>, type: 'sponsor' | 'coOrganizer') => void;
  updateSponsorOrCoOrganizer: (id: number, data: Partial<Sponsor>, type: 'sponsor' | 'coOrganizer') => void;
  deleteSponsorOrCoOrganizer: (id: number, type: 'sponsor' | 'coOrganizer') => void;
}

// Create the context
const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

// Initial state with default image URLs
const initialState: SiteContent = {
  conferenceLogo: 'https://picsum.photos/seed/conflogo/60/60',
  universityLogo: 'https://picsum.photos/seed/unilogo/60/60',
  heroBackground: 'https://picsum.photos/seed/hero/1200/400',
  callForPapersImage: 'https://picsum.photos/seed/a4-paper/842/1191',
  keynoteSpeakers: KEYNOTE_SPEAKERS_DATA,
  conferenceTopics: CONFERENCE_TOPICS_DATA,
  sponsors: SPONSORS_DATA,
  coOrganizers: CO_ORGANIZERS_DATA,
};

// Create the provider component
export const SiteContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [siteContent, setSiteContent] = useState<SiteContent>(initialState);

  const updateImage = (key: keyof Omit<SiteContent, 'keynoteSpeakers' | 'conferenceTopics' | 'sponsors' | 'coOrganizers'>, newUrl: string) => {
    setSiteContent(prevState => ({ ...prevState, [key]: newUrl }));
  };

  // Speaker implementations
  const addKeynoteSpeaker = (speakerData: Omit<KeynoteSpeaker, 'id'>) => {
    const newSpeaker: KeynoteSpeaker = { id: Date.now(), ...speakerData };
    setSiteContent(prev => ({ ...prev, keynoteSpeakers: [...prev.keynoteSpeakers, newSpeaker]}));
  };
  
  const updateKeynoteSpeaker = (speakerId: number, speakerData: Partial<KeynoteSpeaker>) => {
    setSiteContent(prev => ({
      ...prev,
      keynoteSpeakers: prev.keynoteSpeakers.map(s => s.id === speakerId ? { ...s, ...speakerData } : s),
    }));
  };
  
  const deleteKeynoteSpeaker = (speakerId: number) => {
    setSiteContent(prev => ({
      ...prev,
      keynoteSpeakers: prev.keynoteSpeakers.filter(s => s.id !== speakerId),
    }));
  };

  const updateConferenceTopic = (topicId: number, data: { title: string; imageUrl: string; description: string }) => {
    setSiteContent(prevState => ({
      ...prevState,
      conferenceTopics: prevState.conferenceTopics.map(topic =>
        topic.id === topicId ? { ...topic, ...data } : topic
      ),
    }));
  };

  // Sponsor/Co-organizer implementations
  const addSponsorOrCoOrganizer = (data: Omit<Sponsor, 'id'>, type: 'sponsor' | 'coOrganizer') => {
    const newItem: Sponsor = { id: Date.now(), ...data };
    if (type === 'sponsor') {
      setSiteContent(prev => ({ ...prev, sponsors: [...prev.sponsors, newItem]}));
    } else {
      setSiteContent(prev => ({ ...prev, coOrganizers: [...prev.coOrganizers, newItem]}));
    }
  };

  const updateSponsorOrCoOrganizer = (id: number, data: Partial<Sponsor>, type: 'sponsor' | 'coOrganizer') => {
    const key = type === 'sponsor' ? 'sponsors' : 'coOrganizers';
    setSiteContent(prev => ({
      ...prev,
      [key]: prev[key].map(item => item.id === id ? { ...item, ...data } : item),
    }));
  };

  const deleteSponsorOrCoOrganizer = (id: number, type: 'sponsor' | 'coOrganizer') => {
    const key = type === 'sponsor' ? 'sponsors' : 'coOrganizers';
    setSiteContent(prev => ({
      ...prev,
      [key]: prev[key].filter(item => item.id !== id),
    }));
  };


  return (
    <SiteContentContext.Provider value={{ siteContent, updateImage, addKeynoteSpeaker, updateKeynoteSpeaker, deleteKeynoteSpeaker, updateConferenceTopic, addSponsorOrCoOrganizer, updateSponsorOrCoOrganizer, deleteSponsorOrCoOrganizer }}>
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