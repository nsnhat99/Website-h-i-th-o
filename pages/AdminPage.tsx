import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminStats } from '../api';
import type { AdminStats } from '../types';
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
        <div className="bg-slate-800/50 p-4 rounded-lg shadow-md border border-slate-700/50">
            <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
            <img src={currentImage} alt={title} className="w-full h-32 object-contain rounded-md mb-4 bg-slate-900/50 p-2" />
            <label htmlFor={inputId} className="cursor-pointer w-full text-center block bg-sky-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-700 transition-colors">
                Change Image
            </label>
            <input id={inputId} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>
    );
};


const AdminPage: React.FC = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { siteContent, updateImage } = useSiteContent();

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

    const handleImageUpload = (imageKey: keyof SiteContent, file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            updateImage(imageKey, base64String);
        };
        reader.readAsDataURL(file);
    };

    if (isLoading) {
        return (
            <div className="text-center py-10">
                 <svg className="animate-spin mx-auto h-10 w-10 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-lg text-slate-300 mt-4">Loading Dashboard...</p>
            </div>
        )
    }

    if (error) {
         return (
            <div className="max-w-md mx-auto bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        );
    }


    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4 text-slate-100">Admin Dashboard</h1>
            <p className="text-center text-slate-300 text-lg mb-10">Thống kê và báo cáo tổng quan hội thảo.</p>

            {stats && (
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard 
                        icon="fa-users" 
                        title="Tổng số đăng ký" 
                        value={stats.totalRegistrations}
                        color="bg-blue-500"
                    />
                     <StatCard 
                        icon="fa-check-circle" 
                        title="Đã thanh toán" 
                        value={stats.paidAttendees}
                        color="bg-green-500"
                    />
                     <StatCard 
                        icon="fa-file-alt" 
                        title="Bài báo đã nộp" 
                        value={stats.papersSubmitted}
                        color="bg-purple-500"
                    />
                </div>
            )}

            <div className="mt-16">
                <h2 className="text-3xl font-bold text-center mb-8 text-slate-100">Manage Website Images</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ImageUploadCard 
                        title="Conference Logo"
                        currentImage={siteContent.conferenceLogo}
                        onImageSelect={(file) => handleImageUpload('conferenceLogo', file)}
                    />
                    <ImageUploadCard 
                        title="University Logo"
                        currentImage={siteContent.universityLogo}
                        onImageSelect={(file) => handleImageUpload('universityLogo', file)}
                    />
                    <ImageUploadCard 
                        title="Homepage Hero Background"
                        currentImage={siteContent.heroBackground}
                        onImageSelect={(file) => handleImageUpload('heroBackground', file)}
                    />
                    <ImageUploadCard 
                        title="Call for Papers Image"
                        currentImage={siteContent.callForPapersImage}
                        onImageSelect={(file) => handleImageUpload('callForPapersImage', file)}
                    />
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
        </div>
    );
};

export default AdminPage;