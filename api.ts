import type { User, Registration, Announcement, DetailedPaperSubmission, PaperSubmissionFormData, SiteContent } from './types';

const API_BASE_URL = '/api';

// Helper function for fetch requests
const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(errorData.message || 'API request failed');
  }
  
  if (response.status === 204 || response.status === 200 && response.headers.get('content-length') === '0') {
    return;
  }

  return response.json();
};

// Helper function for file uploads (multipart/form-data)
const fetchAPIWithFile = async (endpoint: string, formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    body: formData,
    // Don't set Content-Type header - browser will set it with boundary
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(errorData.message || 'File upload failed');
  }

  return response.json();
};


// --- AUTH & USERS ---
export const login = (username: string, password: string): Promise<User> => {
  return fetchAPI('/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
};

export const getUsers = (): Promise<User[]> => {
  return fetchAPI('/users');
};


// --- REGISTRATIONS ---
export const getRegistrations = (): Promise<Registration[]> => {
  return fetchAPI('/registrations');
};

export const addRegistration = (formData: Omit<Registration, 'id'>): Promise<Registration> => {
  return fetchAPI('/registrations', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};


// --- ANNOUNCEMENTS ---
export const getAnnouncements = (): Promise<Announcement[]> => {
  return fetchAPI('/announcements');
};

export const addAnnouncement = (data: Omit<Announcement, 'id' | 'date'>): Promise<Announcement> => {
  return fetchAPI('/announcements', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateAnnouncement = (id: number, data: Partial<Announcement>): Promise<Announcement> => {
  return fetchAPI(`/announcements/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteAnnouncement = (id: number): Promise<{ id: number }> => {
  return fetchAPI(`/announcements/${id}`, {
    method: 'DELETE',
  });
};


// --- PAPERS ---
export const getPapers = (): Promise<DetailedPaperSubmission[]> => {
  return fetchAPI('/papers');
};

export const getPaper = (id: number): Promise<DetailedPaperSubmission> => {
  return fetchAPI(`/papers/${id}`);
};

export const addPaper = (formData: PaperSubmissionFormData): Promise<DetailedPaperSubmission> => {
  const { fullPaperFile, ...dataToSend } = formData;
  return fetchAPI('/papers', {
    method: 'POST',
    body: JSON.stringify(dataToSend),
  });
};

export const updatePaper = (id: number, data: Partial<DetailedPaperSubmission>): Promise<DetailedPaperSubmission> => {
  return fetchAPI(`/papers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deletePaper = (id: number): Promise<{ id: number }> => {
  return fetchAPI(`/papers/${id}`, {
    method: 'DELETE',
  });
};

export const uploadFullTextFile = (paperId: number, file: File): Promise<{ message: string; paper: DetailedPaperSubmission; fileUrl: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  return fetchAPIWithFile(`/papers/${paperId}/upload-fulltext`, formData);
};

export const deleteFullTextFile = (paperId: number): Promise<{ message: string; paper: DetailedPaperSubmission }> => {
  return fetchAPI(`/papers/${paperId}/delete-fulltext`, {
    method: 'DELETE',
  });
};

// --- SITE CONTENT ---
export const getSiteContent = (): Promise<SiteContent> => {
  return fetchAPI('/site-content');
};

export const updateSiteContent = (data: Partial<SiteContent>): Promise<SiteContent> => {
  return fetchAPI('/site-content', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};