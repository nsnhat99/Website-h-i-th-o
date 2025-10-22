import React from 'react';
import { SCHEDULE_DATA } from '../constants';
import type { ScheduleDay, ScheduleEvent, SubSession } from '../types';

// Helper function to get icon and color based on activity
const getEventStyle = (activity: string) => {
    const lowerActivity = activity.toLowerCase();
    if (lowerActivity.includes('khai mạc')) return { icon: 'fa-bullhorn', color: 'bg-green-500' };
    if (lowerActivity.includes('báo cáo')) return { icon: 'fa-microphone-alt', color: 'bg-blue-500' };
    if (lowerActivity.includes('nghỉ') || lowerActivity.includes('break')) return { icon: 'fa-coffee', color: 'bg-orange-500' };
    if (lowerActivity.includes('kết thúc')) return { icon: 'fa-flag-checkered', color: 'bg-gray-600' };
    if (lowerActivity.includes('ăn trưa')) return { icon: 'fa-utensils', color: 'bg-teal-500' };
    if (lowerActivity.includes('tiểu ban')) return { icon: 'fa-comments', color: 'bg-indigo-500' };
    if (lowerActivity.includes('thảo luận')) return { icon: 'fa-question-circle', color: 'bg-purple-500' };
    if (lowerActivity.includes('bế mạc')) return { icon: 'fa-door-closed', color: 'bg-red-500' };
    if (lowerActivity.includes('gala dinner')) return { icon: 'fa-glass-cheers', color: 'bg-pink-500' };
    if (lowerActivity.includes('du lịch')) return { icon: 'fa-bus-alt', color: 'bg-cyan-500' };
    return { icon: 'fa-calendar-day', color: 'bg-gray-400' };
};


const ProgramPage: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-3xl sm:text-2xl sm:text-xl md:text-4xl font-bold text-center mb-4 text-slate-100">Chương trình Hội thảo</h1>
            <p className="text-center text-lg text-slate-100 mb-16">Lịch trình chi tiết các phiên thảo luận, diễn giả và sự kiện.</p>
            
            <div className="space-y-20">
                {SCHEDULE_DATA.map((day: ScheduleDay) => (
                    <div key={day.day}>
                        <h2 className="text-3xl sm:text-2xl sm:text-xl font-bold text-yellow-100 text-center bg-slate-900/60 backdrop-blur-sm py-3 px-6 rounded-lg w-fit mx-auto mb-10 sticky top-44 z-20 border border-slate-700 shadow-md">
                            {day.day} - {day.date}
                        </h2>
                        
                        <div className="relative pl-8 md:pl-12 border-l-2 border-slate-600">
                            {day.parts.flatMap(part => part.events).map((event, index) => (
                                <div key={index} className="relative mb-12">
                                    {/* Timeline Node/Dot with Icon */}
                                    <div className={`absolute -left-[26px] md:-left-[34px] top-1 h-12 w-12 md:h-16 md:w-16 rounded-full flex items-center justify-center ring-8 ring-slate-800 ${getEventStyle(event.activity).color}`}>
                                        <i className={`fas ${getEventStyle(event.activity).icon} text-white text-xl md:text-2xl sm:text-xl`}></i>
                                    </div>

                                    {/* Event Card */}
                                    <div className="ml-8 md:ml-12">
                                        <div className="p-6 rounded-lg shadow-lg bg-slate-800/40 backdrop-blur-sm border border-slate-700/50">
                                            {event.time && <p className="text-yellow-100 font-semibold mb-2 text-lg">{event.time}</p>}
                                            <h3 className="text-2xl sm:text-xl font-bold text-slate-100 mb-3">{event.activity}</h3>
                                            
                                            {event.subSessions && (
                                                <div className="mt-4 space-y-4 pt-4 border-t border-slate-700">
                                                    {event.subSessions.map((sub: SubSession, sIndex: number) => (
                                                        <div key={sIndex} className="p-4 rounded-md bg-yellow-900/50 border-l-4 border-yellow-500">
                                                            <p className="font-bold text-yellow-300 text-lg">{sub.title}</p>
                                                            <p className="text-sm text-slate-100 mt-1">
                                                                <i className="fas fa-map-marker-alt mr-2 text-indigo-400"></i>{sub.location}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgramPage;