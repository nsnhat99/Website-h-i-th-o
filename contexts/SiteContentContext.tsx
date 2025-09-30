import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
// FIX: Import the 'SiteContent' type from the centralized types file.
import type { KeynoteSpeaker, ConferenceTopic, Sponsor, NavLink, SiteContent } from '../types';
import * as api from '../api';


// FIX: The SiteContent interface has been moved to types.ts to be shared across the application.

// Define the context type
interface SiteContentContextType {
  siteContent: SiteContent | null; // Can be null initially while loading
  updateImage: (key: keyof Omit<SiteContent, 'keynoteSpeakers' | 'conferenceTopics' | 'sponsors' | 'coOrganizers' | 'navLinks' | 'heroTitle' | 'heroSubtitle' | 'conferenceDate' | 'conferenceLocation'>, newUrl: string) => Promise<void>;
  updateConferenceInfo: (data: { title: string; subtitle: string; date: string; location: string }) => Promise<void>;
  addNavLink: (navLinkData: Omit<NavLink, 'id'>) => Promise<void>;
  updateNavLink: (navLinkId: number, navLinkData: Partial<NavLink>) => Promise<void>;
  deleteNavLink: (navLinkId: number) => Promise<void>;
  addKeynoteSpeaker: (speakerData: Omit<KeynoteSpeaker, 'id'>) => Promise<void>;
  updateKeynoteSpeaker: (speakerId: number, speakerData: Partial<KeynoteSpeaker>) => Promise<void>;
  deleteKeynoteSpeaker: (speakerId: number) => Promise<void>;
  updateConferenceTopic: (topicId: number, data: { title: string; imageUrl: string; description: string }) => Promise<void>;
  addSponsorOrCoOrganizer: (data: Omit<Sponsor, 'id'>, type: 'sponsor' | 'coOrganizer') => Promise<void>;
  updateSponsorOrCoOrganizer: (id: number, data: Partial<Sponsor>, type: 'sponsor' | 'coOrganizer') => Promise<void>;
  deleteSponsorOrCoOrganizer: (id: number, type: 'sponsor' | 'coOrganizer') => Promise<void>;
}

// Create the context
const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

// Create the provider component
export const SiteContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
        const data = await api.getSiteContent();
        setSiteContent(data);
    }
    fetchContent();
  }, []);
  
  const updateContent = async (updatedData: Partial<SiteContent>) => {
      if (!siteContent) return;
      const updatedContent = { ...siteContent, ...updatedData };
      const result = await api.updateSiteContent(updatedContent);
      setSiteContent(result);
  }

  const updateImage = async (key: keyof Omit<SiteContent, 'keynoteSpeakers' | 'conferenceTopics' | 'sponsors' | 'coOrganizers' | 'navLinks' | 'heroTitle' | 'heroSubtitle' | 'conferenceDate' | 'conferenceLocation'>, newUrl: string) => {
    await updateContent({ [key]: newUrl });
  };
  
  const updateConferenceInfo = async (data: { title: string; subtitle: string; date: string; location: string }) => {
    await updateContent({ 
        heroTitle: data.title, 
        heroSubtitle: data.subtitle,
        conferenceDate: data.date,
        conferenceLocation: data.location,
    });
  };

  const addNavLink = async (navLinkData: Omit<NavLink, 'id'>) => {
    if (!siteContent) return;
    const newLink: NavLink = { id: Date.now(), ...navLinkData };
    await updateContent({ navLinks: [...siteContent.navLinks, newLink] });
  };

  const updateNavLink = async (navLinkId: number, navLinkData: Partial<NavLink>) => {
    if (!siteContent) return;
    await updateContent({
      navLinks: siteContent.navLinks.map(link => link.id === navLinkId ? { ...link, ...navLinkData } : link),
    });
  };

  const deleteNavLink = async (navLinkId: number) => {
    if (!siteContent) return;
    await updateContent({
      navLinks: siteContent.navLinks.filter(link => link.id !== navLinkId),
    });
  };

  const addKeynoteSpeaker = async (speakerData: Omit<KeynoteSpeaker, 'id'>) => {
    if (!siteContent) return;
    const newSpeaker: KeynoteSpeaker = { id: Date.now(), ...speakerData };
    await updateContent({ keynoteSpeakers: [...siteContent.keynoteSpeakers, newSpeaker]});
  };
  
  const updateKeynoteSpeaker = async (speakerId: number, speakerData: Partial<KeynoteSpeaker>) => {
    if (!siteContent) return;
    await updateContent({
      keynoteSpeakers: siteContent.keynoteSpeakers.map(s => s.id === speakerId ? { ...s, ...speakerData } : s),
    });
  };
  
  const deleteKeynoteSpeaker = async (speakerId: number) => {
    if (!siteContent) return;
    await updateContent({
      keynoteSpeakers: siteContent.keynoteSpeakers.filter(s => s.id !== speakerId),
    });
  };

  const updateConferenceTopic = async (topicId: number, data: { title: string; imageUrl: string; description: string }) => {
    if (!siteContent) return;
    await updateContent({
      conferenceTopics: siteContent.conferenceTopics.map(topic =>
        topic.id === topicId ? { ...topic, ...data } : topic
      ),
    });
  };

  const addSponsorOrCoOrganizer = async (data: Omit<Sponsor, 'id'>, type: 'sponsor' | 'coOrganizer') => {
    if (!siteContent) return;
    const newItem: Sponsor = { id: Date.now(), ...data };
    const key = type === 'sponsor' ? 'sponsors' : 'coOrganizers';
    await updateContent({ [key]: [...siteContent[key], newItem] });
  };

  const updateSponsorOrCoOrganizer = async (id: number, data: Partial<Sponsor>, type: 'sponsor' | 'coOrganizer') => {
    if (!siteContent) return;
    const key = type === 'sponsor' ? 'sponsors' : 'coOrganizers';
    await updateContent({
      [key]: siteContent[key].map(item => item.id === id ? { ...item, ...data } : item),
    });
  };

  const deleteSponsorOrCoOrganizer = async (id: number, type: 'sponsor' | 'coOrganizer') => {
    if (!siteContent) return;
    const key = type === 'sponsor' ? 'sponsors' : 'coOrganizers';
    await updateContent({
      [key]: siteContent[key].filter(item => item.id !== id),
    });
  };

  const value = { siteContent, updateImage, updateConferenceInfo, addNavLink, updateNavLink, deleteNavLink, addKeynoteSpeaker, updateKeynoteSpeaker, deleteKeynoteSpeaker, updateConferenceTopic, addSponsorOrCoOrganizer, updateSponsorOrCoOrganizer, deleteSponsorOrCoOrganizer };

  // Render a loading state or nothing until content is fetched
  if (!siteContent) {
    return null; 
  }

  return (
    <SiteContentContext.Provider value={value}>
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
  return context as SiteContentContextType;
};
