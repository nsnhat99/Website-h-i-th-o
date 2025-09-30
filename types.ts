import type { NavLink as BaseNavLink } from 'react-router-dom';

export type NavLink = {
  id: number;
  name: string;
  path?: string;
  children?: NavLink[];
};

export type SubSession = {
  title: string;
  location: string;
};

export type ScheduleEvent = {
  time: string;
  activity: string;
  details?: string;
  location?: string;
  subSessions?: SubSession[];
};

export type SchedulePart = {
  title: string;
  events: ScheduleEvent[];
};

export type ScheduleDay = {
  day: string;
  date: string;
  parts: SchedulePart[];
};

export type Announcement = {
  id: number;
  title: string;
  date: string;
  content: string;
  imageUrl?: string;
};

export type Sponsor = {
  id: number;
  name: string;
  logoUrl: string;
};

export type KeynoteSpeaker = {
  id: number;
  name: string;
  affiliation: string;
  imageUrl: string;
  bio: string;
  keynoteTopic: string;
};

export type AdminStats = {
  totalRegistrations: number;
  paidAttendees: number;
  papersSubmitted: number;
};

export type PaperStatus = 'approved' | 'pending' | 'rejected';

export type PaperSubmission = {
  id: number;
  title: string;
  author: string;
  status: PaperStatus;
  submissionDate: string;
  abstract: string;
  fullTextUrl?: string;
};

export type User = {
  id: number;
  username: string;
  role: 'user' | 'admin';
  email: string;
};

export type ReviewStatus = 'Duyệt' | 'Không duyệt' | 'Đang chờ duyệt';
export type PresentationStatus = 'Trình bày' | 'Không trình bày';

export type DetailedPaperSubmission = {
  id: number;
  authorName: string;
  organization: string;
  paperTitle: string;
  topic: 1 | 2 | 3;
  abstractStatus: ReviewStatus;
  fullTextStatus: ReviewStatus;
  reviewStatus: ReviewStatus;
  presentationStatus: PresentationStatus;
};

export type PaperSubmissionFormData = {
  authorName: string;
  organization: string;
  email: string;
  phone: string;
  paperTitle: string;
  topic: '1' | '2' | '3';
  fullPaperFile: File | null;
};

export type Registration = {
  id: number;
  name: string;
  organization: string;
  email: string;
  phone: string;
  withPaper: string;
};

export type ConferenceTopic = {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
  description: string;
};

// FIX: Define and export the SiteContent type to be shared across the application.
export type SiteContent = {
  conferenceLogo: string;
  universityLogo: string;
  heroBackground: string;
  callForPapersImage: string;
  keynoteSpeakers: KeynoteSpeaker[];
  conferenceTopics: ConferenceTopic[];
  sponsors: Sponsor[];
  coOrganizers: Sponsor[];
  navLinks: NavLink[];
  heroTitle: string;
  heroSubtitle: string;
  conferenceDate: string;
  conferenceLocation: string;
};
