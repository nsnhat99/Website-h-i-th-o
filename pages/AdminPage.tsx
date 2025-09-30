import React, { useState, useEffect } from 'react';
import { getAdminStats } from '../api';
import type { AdminStats } from '../types';

const StatCard: React.FC<{ icon: string; title: string; value: number; color: string }> = ({ icon, title, value, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center text-gray-800">
        <div className={`rounded-full p-4 mr-4 ${color}`}>
            <i className={`fas ${icon} fa-2x text-white`}></i>
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);


const AdminPage: React.FC = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

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

    if (isLoading) {
        return (
            <div className="text-center py-10">
                 <svg className="animate-spin mx-auto h-10 w-10 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-lg text-gray-300 mt-4">Loading Dashboard...</p>
            </div>
        )
    }

    if (error) {
         return (
            <div className="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        );
    }


    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4 text-white">Admin Dashboard</h1>
            <p className="text-center text-gray-300 mb-10">Thống kê và báo cáo tổng quan hội thảo.</p>

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
        </div>
    );
};

export default AdminPage;