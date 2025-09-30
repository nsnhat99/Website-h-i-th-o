import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminStats } from '../api';
import type { AdminStats, KeynoteSpeaker, Sponsor } from '../types';
import { useSiteContent } from '../contexts/SiteContentContext';
import type { SiteContent } from '../contexts/SiteContentContext';

const StatCard: React.FC<{ icon: string; title: string; value: number; color: string }> = ({ icon, title, value, color }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow-md flex items-center border border-slate-700/50">
        <div className={`rounded-full p-4 mr-4 ${color}`}>
            <i className={`fas ${icon} fa-2x text-white`}></i>
        </div>
        <div>
            <p className="text-sm text-slate-400">{title}</p>
            <p className="text-3xl font-bold text-slate-100">{value}</p>
        </div>
    </div>
);

const ManagementCard: React.FC<{
    imageUrl: string;
    title: string;
    description?: string;
    onEdit: () => void;
    onDelete: () => void;
}> = ({ imageUrl, title, description, onEdit, onDelete }) => (
    <div className="bg-slate-800/50 p-4 rounded-lg shadow-md border border-slate-700/50 flex flex-col">
        <img src={imageUrl} alt={title} className="w-full h-32 object-contain rounded-md bg-slate-900/50 p-1 mb-4" />
        <div className="flex-grow">
            <h3 className="text-lg font-semibold text-slate-100 truncate" title={title}>{title}</h3>
            {description && <p className="text-sm text-slate-400">{description}</p>}
        </div>
        <div className="mt-4 flex justify-end gap-2">
            <button onClick={onEdit} className="text-sm font-medium text-sky-400 hover:text-sky-300 py-1 px-3 rounded bg-sky-900/50 hover:bg-sky-800/50">Edit</button>
            <button onClick={onDelete} className="text-sm font-medium text-red-400 hover:text-red-300 py-1 px-3 rounded bg-red-900/50 hover:bg-red-800/50">Delete</button>
        </div>
    </div>
);

const ImageUploadCard: React.FC<{
    title: string;
    currentImage: string;
    onImageSelect: (file: File) => void;
}> = ({ title, currentImage, onImageSelect }) => {
    const inputId = `upload-${title.replace(/\s+/g, '-')}`;
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onImageSelect(e.target.files[0]);
        }
    };

    return (
        <div className="bg-slate-800/50 p-4 rounded-lg shadow-md border border-slate-700/50 flex flex-col">
            <h3 className="text-lg font-semibold text-slate-100 mb-2 truncate" title={title}>{title}</h3>
            <div className="w-full h-32 mb-4">
              <img src={currentImage} alt={title} className="w-full h-full rounded-md bg-slate-900/50 p-1 object-contain" />
            </div>
            <label htmlFor={inputId} className="cursor-pointer w-full text-center block bg-sky-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-700 transition-colors mt-auto">
                Change Image
            </label>
            <input id={inputId} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>
    );
};

// Generic Modal for editing items
const EditModal: React.FC<{
    item: KeynoteSpeaker | Sponsor | null;
    itemType: 'speaker' | 'sponsor';
    onClose: () => void;
    onSave: (itemData: any) => void;
}> = ({ item, itemType, onClose, onSave }) => {
    const [formData, setFormData] = useState<any>({});
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        setFormData(item || {});
        setImagePreview(item ? (item as any).imageUrl || (item as any).logoUrl : null);
    }, [item]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                if (itemType === 'speaker') {
                    onSave({ ...formData, imageUrl: base64String });
                } else {
                    onSave({ ...formData, logoUrl: base64String });
                }
            };
            reader.readAsDataURL(imageFile);
        } else {
            onSave(formData);
        }
    };
    
    const inputStyles = "mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500";
    const labelStyles = "block text-sm font-medium text-slate-300";

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-6 border border-slate-700" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-slate-100 mb-4">{item?.id ? 'Edit' : 'Add'} {itemType === 'speaker' ? 'Keynote Speaker' : 'Sponsor/Partner'}</h2>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    <input type="text" name="name" value={formData.name || ''} onChange={handleChange} placeholder="Name" className={inputStyles} />
                    {itemType === 'speaker' && (
                        <>
                            <input type="text" name="affiliation" value={formData.affiliation || ''} onChange={handleChange} placeholder="Affiliation" className={inputStyles} />
                            <textarea name="bio" value={formData.bio || ''} onChange={handleChange} placeholder="Bio" className={inputStyles} rows={3}></textarea>
                            <input type="text" name="keynoteTopic" value={formData.keynoteTopic || ''} onChange={handleChange} placeholder="Keynote Topic" className={inputStyles} />
                        </>
                    )}
                    <div>
                        <label className={labelStyles}>Image/Logo</label>
                        {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-40 object-contain rounded-md my-2 bg-slate-900" />}
                        <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-900/50 file:text-sky-300 hover:file:bg-sky-800/50"/>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 rounded-md text-slate-200 bg-slate-600 hover:bg-slate-500">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 rounded-md text-white bg-sky-600 hover:bg-sky-700">Save</button>
                </div>
            </div>
        </div>
    );
};


const AdminPage: React.FC = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { siteContent, updateImage, addKeynoteSpeaker, updateKeynoteSpeaker, deleteKeynoteSpeaker, addSponsorOrCoOrganizer, updateSponsorOrCoOrganizer, deleteSponsorOrCoOrganizer } = useSiteContent();

    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        item: KeynoteSpeaker | Sponsor | null;
        itemType: 'speaker' | 'sponsor';
        subType?: 'sponsor' | 'coOrganizer';
    }>({ isOpen: false, item: null, itemType: 'sponsor' });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setIsLoading(true);
                const data = await getAdminStats();
                setStats(data);
            } catch (err) {
                setError('Could not fetch admin statistics.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);
    
    const handleImageUpload = (imageKey: keyof Omit<SiteContent, 'keynoteSpeakers' | 'conferenceTopics' | 'sponsors' | 'coOrganizers'>, file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            updateImage(imageKey, reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleOpenModal = (item: KeynoteSpeaker | Sponsor | null, itemType: 'speaker' | 'sponsor', subType?: 'sponsor' | 'coOrganizer') => {
        setModalState({ isOpen: true, item, itemType, subType });
    };

    const handleCloseModal = () => {
        setModalState({ isOpen: false, item: null, itemType: 'sponsor' });
    };

    const handleSave = (itemData: any) => {
        if (modalState.itemType === 'speaker') {
            itemData.id ? updateKeynoteSpeaker(itemData.id, itemData) : addKeynoteSpeaker(itemData);
        } else {
            itemData.id ? updateSponsorOrCoOrganizer(itemData.id, itemData, modalState.subType!) : addSponsorOrCoOrganizer(itemData, modalState.subType!);
        }
        handleCloseModal();
    };
    
    const handleDelete = (id: number, type: 'speaker' | 'sponsor' | 'coOrganizer') => {
        if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
        if(type === 'speaker') deleteKeynoteSpeaker(id);
        else deleteSponsorOrCoOrganizer(id, type);
    }
    
    if (isLoading) { /* loading state... */ }
    if (error) { /* error state... */ }

    return (
        <div className="max-w-7xl mx-auto space-y-16">
            <div>
                <h1 className="text-4xl font-bold text-center mb-4 text-slate-100">Admin Dashboard</h1>
                <p className="text-center text-slate-300 text-lg mb-10">Thống kê và báo cáo tổng quan hội thảo.</p>
                {stats && (
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard icon="fa-users" title="Tổng số đăng ký" value={stats.totalRegistrations} color="bg-blue-500" />
                        <StatCard icon="fa-check-circle" title="Đã thanh toán" value={stats.paidAttendees} color="bg-green-500" />
                        <StatCard icon="fa-file-alt" title="Bài báo đã nộp" value={stats.papersSubmitted} color="bg-purple-500" />
                    </div>
                )}
            </div>

            {/* Content Management Section */}
            <div className="space-y-12">
                <h2 className="text-3xl font-bold text-center text-slate-100 border-b-2 border-slate-700 pb-4">Content Management</h2>
                
                {/* Keynote Speakers */}
                <div>
                    <div className="flex justify-between items-center mb-8">
                         <h3 className="text-2xl font-semibold text-sky-400">Keynote Speakers</h3>
                         <button onClick={() => handleOpenModal(null, 'speaker')} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">Add Speaker</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {siteContent.keynoteSpeakers.map(speaker => (
                            <ManagementCard 
                                key={speaker.id}
                                imageUrl={speaker.imageUrl}
                                title={speaker.name}
                                description={speaker.affiliation}
                                onEdit={() => handleOpenModal(speaker, 'speaker')}
                                onDelete={() => handleDelete(speaker.id, 'speaker')}
                            />
                        ))}
                    </div>
                </div>

                {/* Sponsors & Partners */}
                <div>
                    <div className="flex justify-between items-center mb-8">
                         <h3 className="text-2xl font-semibold text-sky-400">Sponsors & Partners</h3>
                         <div>
                            <button onClick={() => handleOpenModal(null, 'sponsor', 'coOrganizer')} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors mr-2">Add Co-organizer</button>
                            <button onClick={() => handleOpenModal(null, 'sponsor', 'sponsor')} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">Add Sponsor</button>
                         </div>
                    </div>
                    <h4 className="text-xl font-medium text-slate-300 mb-4">Co-organizers</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                         {siteContent.coOrganizers.map(item => (
                            <ManagementCard 
                                key={item.id}
                                imageUrl={item.logoUrl}
                                title={item.name}
                                onEdit={() => handleOpenModal(item, 'sponsor', 'coOrganizer')}
                                onDelete={() => handleDelete(item.id, 'coOrganizer')}
                            />
                        ))}
                    </div>
                    <h4 className="text-xl font-medium text-slate-300 mb-4">Sponsors</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                         {siteContent.sponsors.map(item => (
                            <ManagementCard 
                                key={item.id}
                                imageUrl={item.logoUrl}
                                title={item.name}
                                onEdit={() => handleOpenModal(item, 'sponsor', 'sponsor')}
                                onDelete={() => handleDelete(item.id, 'sponsor')}
                            />
                        ))}
                    </div>
                </div>

                 {/* General Images */}
                <div>
                     <h3 className="text-2xl font-semibold text-sky-400 mb-8">General Site Images</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ImageUploadCard title="Conference Logo" currentImage={siteContent.conferenceLogo} onImageSelect={(file) => handleImageUpload('conferenceLogo', file)} />
                        <ImageUploadCard title="University Logo" currentImage={siteContent.universityLogo} onImageSelect={(file) => handleImageUpload('universityLogo', file)} />
                        <ImageUploadCard title="Homepage Hero Background" currentImage={siteContent.heroBackground} onImageSelect={(file) => handleImageUpload('heroBackground', file)} />
                        <ImageUploadCard title="Call for Papers Image" currentImage={siteContent.callForPapersImage} onImageSelect={(file) => handleImageUpload('callForPapersImage', file)} />
                    </div>
                </div>
            </div>


            <div className="mt-16">
                <h2 className="text-3xl font-bold text-center mb-8 text-slate-100">Database Management</h2>
                <div className="bg-slate-800/50 p-6 rounded-lg shadow-md border border-slate-700/50 text-center">
                    <p className="text-slate-300 mb-4">View the raw data used in this mock application.</p>
                    <Link to="/admin/database" className="inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-lg">
                        <i className="fas fa-database mr-2"></i>View Mock Database
                    </Link>
                </div>
            </div>

             {modalState.isOpen && (
                <EditModal
                    item={modalState.item}
                    itemType={modalState.itemType}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default AdminPage;