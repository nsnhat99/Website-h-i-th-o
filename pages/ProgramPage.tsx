import React, { useState } from 'react';
import { SCHEDULE_DATA } from '../constants';
import type { ScheduleDay, Session } from '../types';

const ProgramPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4 text-white">Chương trình Hội thảo</h1>
            <p className="text-center text-gray-300 mb-10">Lịch trình chi tiết các phiên thảo luận, diễn giả và sự kiện.</p>
            
            <div className="mb-4 flex justify-center border-b border-gray-600">
                {SCHEDULE_DATA.map((day: ScheduleDay, index: number) => (
                    <button
                        key={day.day}
                        className={`py-4 px-6 block hover:text-blue-300 focus:outline-none font-medium text-lg transition-colors
                            ${activeTab === index ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`
                        }
                        onClick={() => setActiveTab(index)}
                    >
                        {day.day} - {day.date}
                    </button>
                ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
                {SCHEDULE_DATA.map((day: ScheduleDay, index: number) => (
                    <div key={day.day} className={activeTab === index ? 'block' : 'hidden'}>
                        <h2 className="text-2xl font-bold mb-6 text-blue-700">{day.day}: {day.date}</h2>
                        <div className="space-y-6">
                            {day.sessions.map((session: Session, sIndex: number) => (
                                <div key={sIndex} className="flex flex-col md:flex-row gap-4 p-4 rounded-md border-l-4 border-blue-500 bg-blue-50/50">
                                    <div className="w-full md:w-1/4">
                                        <p className="font-bold text-blue-600 text-lg">{session.time}</p>
                                    </div>
                                    <div className="w-full md:w-3/4">
                                        <h3 className="font-semibold text-xl text-gray-800">{session.title}</h3>
                                        {session.speaker && <p className="text-gray-600 mt-1"><i className="fas fa-user-tie mr-2 text-gray-400"></i>{session.speaker}</p>}
                                        {session.location && <p className="text-gray-600"><i className="fas fa-map-marker-alt mr-2 text-gray-400"></i>{session.location}</p>}
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