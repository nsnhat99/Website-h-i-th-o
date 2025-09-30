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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-gray-800 mb-6 border-l-4 border-yellow-500">
      <h2 className="text-2xl font-bold mb-4">{announcement ? 'Edit Announcement' : 'Add New Announcement'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300">Cancel</button>
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
        <h1 className="text-4xl font-bold mb-4 text-white">Thông báo Hội thảo</h1>
        <p className="text-gray-300">Cập nhật các thông tin mới nhất từ ban tổ chức.</p>
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
          <div key={announcement.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 text-gray-800">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-gray-800 flex-grow">{announcement.title}</h2>
              <div className="flex-shrink-0 text-right">
                <span className="text-sm text-gray-500">{announcement.date}</span>
                 {currentUser?.role === 'admin' && (
                  <div className="mt-2">
                    <button onClick={() => handleEdit(announcement)} className="text-sm text-blue-600 hover:underline mr-4">Edit</button>
                    <button onClick={() => handleDelete(announcement.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-600 text-lg">
              {announcement.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
