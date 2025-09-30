import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { DetailedPaperSubmission, ReviewStatus, PresentationStatus, PaperSubmissionFormData } from '../types';
import { DETAILED_PAPER_SUBMISSIONS_DATA } from '../constants';

interface PaperContextType {
  papers: DetailedPaperSubmission[];
  addPaper: (formData: PaperSubmissionFormData) => void;
  updateAbstractStatus: (id: number, status: ReviewStatus) => void;
  updateFullTextStatus: (id: number, status: ReviewStatus) => void;
  updateReviewStatus: (id: number, status: ReviewStatus) => void;
  updatePresentationStatus: (id: number, status: PresentationStatus) => void;
}

const PaperContext = createContext<PaperContextType | undefined>(undefined);

export const PaperProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [papers, setPapers] = useState<DetailedPaperSubmission[]>(DETAILED_PAPER_SUBMISSIONS_DATA);

  const addPaper = (formData: PaperSubmissionFormData) => {
    const newPaper: DetailedPaperSubmission = {
      id: Date.now(), // Simple unique ID generation
      authorName: formData.authorName,
      organization: formData.organization,
      paperTitle: formData.paperTitle,
      topic: parseInt(formData.topic, 10) as 1 | 2 | 3,
      abstractStatus: 'Duyệt',
      fullTextStatus: 'Đang chờ duyệt',
      reviewStatus: 'Đang chờ duyệt',
      presentationStatus: 'Không trình bày',
    };
    setPapers(prevPapers => [newPaper, ...prevPapers]);
  };

  const updateAbstractStatus = (id: number, status: ReviewStatus) => {
    setPapers(papers.map(p => (p.id === id ? { ...p, abstractStatus: status } : p)));
  };

  const updateFullTextStatus = (id: number, status: ReviewStatus) => {
    setPapers(papers.map(p => (p.id === id ? { ...p, fullTextStatus: status } : p)));
  };

  const updateReviewStatus = (id: number, status: ReviewStatus) => {
    setPapers(papers.map(p => (p.id === id ? { ...p, reviewStatus: status } : p)));
  };

  const updatePresentationStatus = (id: number, status: PresentationStatus) => {
    setPapers(papers.map(p => (p.id === id ? { ...p, presentationStatus: status } : p)));
  };

  return (
    <PaperContext.Provider value={{ papers, addPaper, updateAbstractStatus, updateFullTextStatus, updateReviewStatus, updatePresentationStatus }}>
      {children}
    </PaperContext.Provider>
  );
};

export const usePapers = (): PaperContextType => {
  const context = useContext(PaperContext);
  if (context === undefined) {
    throw new Error('usePapers must be used within a PaperProvider');
  }
  return context;
};
