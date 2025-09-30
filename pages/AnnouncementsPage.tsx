import React, { useState } from 'react';
import { ANNOUNCEMENTS_DATA } from '../constants';
import type { Announcement } from '../types';
import { useAuth } from '../contexts/AuthContext';

const AnnouncementForm: React.FC<{
  announcement?: Announcement | null;
  onSave: (announcement: Omit<Announcement, 'id' | 'date'> & { id?: number }) => void;
  onCancel: () => void;
}> = ({ announcement, onSave, onCancel }) => {
  const [title, setTitle] = useState(announcement?.title || '');
  const [content, setContent] = useState(announcement?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: announcement?.id, title, content });
  };

  const inputStyles = "mt-1 block w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500";

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow-md mb-6 border-l-4 border-yellow-500">
      <h2 className="text-2xl font-bold mb-4 text-slate-100">{announcement ? 'Edit Announcement' : 'Add New Announcement'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputStyles}
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-300">Content</label>
          <textarea
            id="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={inputStyles}
            required
          ></textarea>
        </div>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md text-slate-200 bg-slate-600 hover:bg-slate-500">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">Save Announcement</button>
        </div>
      </form>
    </div>
  );
};

const AnnouncementsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>(ANNOUNCEMENTS_DATA);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  const handleSave = (announcement: Omit<Announcement, 'id' | 'date'> & { id?: number }) => {
    if (announcement.id) { // Editing existing
      setAnnouncements(announcements.map(a => a.id === announcement.id ? { ...a, title: announcement.title, content: announcement.content } : a));
    } else { // Adding new
      const newAnnouncement: Announcement = {
        id: Date.now(),
        title: announcement.title,
        content: announcement.content,
        date: new Intl.DateTimeFormat('en-GB').format(new Date()),
      };
      setAnnouncements([newAnnouncement, ...announcements]);
    }
    setIsFormVisible(false);
    setEditingAnnouncement(null);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setIsFormVisible(true);
  };
  
  const handleAddNew = () => {
    setEditingAnnouncement(null);
    setIsFormVisible(true);
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-slate-100">Thông báo Hội thảo</h1>
        <p className="text-slate-300 text-lg">Cập nhật các thông tin mới nhất từ ban tổ chức.</p>
         {currentUser?.role === 'admin' && !isFormVisible && (
            <button onClick={handleAddNew} className="mt-6 bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg">
                <i className="fas fa-plus mr-2"></i>Thêm thông báo mới
            </button>
        )}
      </div>

      {isFormVisible && (
        <AnnouncementForm 
          announcement={editingAnnouncement}
          onSave={handleSave}
          onCancel={() => { setIsFormVisible(false); setEditingAnnouncement(null); }}
        />
      )}
      
      <div className="space-y-6">
        {announcements.map((announcement: Announcement) => (
          <div key={announcement.id} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow-md border-l-4 border-sky-500">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-slate-100 flex-grow">{announcement.title}</h2>
              <div className="flex-shrink-0 text-right">
                <span className="text-sm text-slate-400">{announcement.date}</span>
                 {currentUser?.role === 'admin' && (
                  <div className="mt-2">
                    <button onClick={() => handleEdit(announcement)} className="text-sm text-sky-400 hover:underline mr-4">Edit</button>
                    <button onClick={() => handleDelete(announcement.id)} className="text-sm text-red-500 hover:underline">Delete</button>
                  </div>
                )}
              </div>
            </div>
            <p className="text-slate-300 text-lg">
              {announcement.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;