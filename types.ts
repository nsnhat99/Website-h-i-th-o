export type NavLink = {
  name: string;
  path: string;
};

export type Session = {
  time: string;
  title: string;
  speaker: string;
  location: string;
};

export type ScheduleDay = {
  day: string;
  date: string;
  sessions: Session[];
};

export type Announcement = {
  id: number;
  title: string;
  date: string;
  content: string;
};

export type Sponsor = {
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
