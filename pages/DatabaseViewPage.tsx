import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, getRegistrations } from '../api';
import { usePapers } from '../contexts/PaperContext';
import { ANNOUNCEMENTS_DATA } from '../constants';
import type { User, DetailedPaperSubmission, Announcement, Registration } from '../types';

const TableCard: React.FC<{ title: string; headers: string[]; children: React.ReactNode }> = ({ title, headers, children }) => (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg shadow-2xl border border-slate-700/50 overflow-hidden mb-12">
        <h2 className="text-2xl font-bold text-sky-400 p-4 bg-slate-900/50">{title}</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-slate-300">
                <thead className="bg-slate-900/50 text-xs text-slate-400 uppercase tracking-wider">
                    <tr>
                        {headers.map(header => <th key={header} scope="col" className="px-6 py-3">{header}</th>)}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                    {children}
                </tbody>
            </table>
        </div>
    </div>
);


const DatabaseViewPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { papers } = usePapers();
    const announcements = ANNOUNCEMENTS_DATA;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [usersData, registrationsData] = await Promise.all([
                    getUsers(),
                    getRegistrations()
                ]);
                setUsers(usersData);
                setRegistrations(registrationsData);
            } catch (error) {
                console.error("Failed to fetch database data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    
    if (isLoading) {
        return (
            <div className="text-center py-10">
                 <svg className="animate-spin mx-auto h-10 w-10 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-lg text-slate-300 mt-4">Loading Database Viewer...</p>
            </div>
        )
    }

    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-bold text-slate-100">Mock Database Viewer</h1>
                    <p className="text-slate-300 text-lg">A read-only view of the application's mock data.</p>
                </div>
                <Link to="/admin" className="bg-slate-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-500 transition-colors">
                    <i className="fas fa-arrow-left mr-2"></i>Back to Dashboard
                </Link>
            </div>
            
            {/* Users Table */}
            <TableCard title="Users" headers={['ID', 'Username', 'Email', 'Role']}>
                {users.map(user => (
                    <tr key={user.id} className="hover:bg-slate-700/30">
                        <td className="px-6 py-4">{user.id}</td>
                        <td className="px-6 py-4 font-medium text-slate-100">{user.username}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin' ? 'bg-amber-800 text-amber-300' : 'bg-sky-800 text-sky-300'}`}>{user.role}</span></td>
                    </tr>
                ))}
            </TableCard>

            {/* Paper Submissions Table */}
            <TableCard title="Paper Submissions" headers={['Author', 'Title', 'Review Status', 'Presentation']}>
                 {papers.map(paper => (
                    <tr key={paper.id} className="hover:bg-slate-700/30">
                        <td className="px-6 py-4 font-medium text-slate-100">{paper.authorName}</td>
                        <td className="px-6 py-4">{paper.paperTitle}</td>
                        <td className="px-6 py-4">{paper.reviewStatus}</td>
                        <td className="px-6 py-4">{paper.presentationStatus}</td>
                    </tr>
                ))}
            </TableCard>
            
            {/* Announcements Table */}
            <TableCard title="Announcements" headers={['Date', 'Title', 'Content']}>
                 {announcements.map(item => (
                    <tr key={item.id} className="hover:bg-slate-700/30">
                        <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                        <td className="px-6 py-4 font-medium text-slate-100">{item.title}</td>
                        <td className="px-6 py-4">{item.content}</td>
                    </tr>
                ))}
            </TableCard>

             {/* Registrations Table */}
            <TableCard title="Registrations" headers={['Name', 'Organization', 'Email', 'With Paper?']}>
                {/* FIX: Use item.id as the key for the list item instead of the index. */}
                {registrations.length > 0 ? registrations.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-700/30">
                        <td className="px-6 py-4 font-medium text-slate-100">{item.name}</td>
                        <td className="px-6 py-4">{item.organization}</td>
                        <td className="px-6 py-4">{item.email}</td>
                        <td className="px-6 py-4">{item.withPaper}</td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan={4} className="text-center px-6 py-4 text-slate-400">No registrations yet.</td>
                    </tr>
                )}
            </TableCard>

        </div>
    );
};

export default DatabaseViewPage;
