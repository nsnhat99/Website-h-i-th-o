import React from 'react';
import type { ReviewStatus, PresentationStatus } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { usePapers } from '../contexts/PaperContext';

const reviewStatusStyles: { [key in ReviewStatus]: string } = {
  'Duyệt': 'bg-green-900/60 text-green-300 border border-green-700',
  'Không duyệt': 'bg-red-900/60 text-red-300 border border-red-700',
  'Đang chờ duyệt': 'bg-yellow-900/60 text-yellow-300 border border-yellow-700',
};
const reviewStatusText: { [key in ReviewStatus]: string } = {
    'Duyệt': 'Duyệt',
    'Không duyệt': 'Không duyệt',
    'Đang chờ duyệt': 'Đang chờ',
};

const presentationStatusStyles: { [key in PresentationStatus]: string } = {
  'Trình bày': 'bg-sky-900/60 text-sky-300 border border-sky-700',
  'Không trình bày': 'bg-slate-700/60 text-slate-300 border border-slate-600',
};

const topicStyles: { [key: number]: string } = {
  1: 'bg-amber-900/70 text-amber-300 border border-amber-700',
  2: 'bg-emerald-900/70 text-emerald-300 border border-emerald-700',
  3: 'bg-indigo-900/70 text-indigo-300 border border-indigo-700',
};


const PaperReviewPage: React.FC = () => {
    const { currentUser } = useAuth();
    const { papers, updateAbstractStatus, updateFullTextStatus, updateReviewStatus, updatePresentationStatus } = usePapers();

    const handleAbstractStatusChange = (id: number, newStatus: ReviewStatus) => {
        updateAbstractStatus(id, newStatus);
    };
    
    const handleFullTextStatusChange = (id: number, newStatus: ReviewStatus) => {
        updateFullTextStatus(id, newStatus);
    };

    const handleReviewStatusChange = (id: number, newStatus: ReviewStatus) => {
        updateReviewStatus(id, newStatus);
    };

    const handlePresentationStatusChange = (id: number, newStatus: PresentationStatus) => {
        updatePresentationStatus(id, newStatus);
    };

    const selectBaseClasses = "w-full min-w-[120px] text-xs font-bold rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none transition appearance-none text-center";
    const spanBaseClasses = "inline-block px-3 py-1.5 text-xs font-bold leading-none rounded-full";

    return (
        <div className="max-w-screen-xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4 text-slate-100">Kết quả duyệt bài tham dự hội thảo</h1>
            <p className="text-center text-slate-300 text-lg mb-10">
                Danh sách các bài báo đã nộp và trạng thái duyệt, trình bày.
            </p>

            <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg shadow-2xl border border-slate-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-slate-300">
                        <thead className="bg-slate-900/50 text-xs text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th scope="col" className="px-6 py-3 w-16 text-center text-sm">TT</th>
                                <th scope="col" className="px-6 py-3 text-sm">Họ tên</th>
                                <th scope="col" className="px-6 py-3 text-sm">Đơn vị công tác</th>
                                <th scope="col" className="px-6 py-3 text-sm">Tên bài</th>
                                <th scope="col" className="px-6 py-3 text-center">Chủ đề</th>
                                <th scope="col" className="px-6 py-3 text-center">Tóm tắt</th>
                                <th scope="col" className="px-6 py-3 text-center">Toàn văn</th>
                                <th scope="col" className="px-6 py-3 text-center">Kết quả</th>
                                <th scope="col" className="px-6 py-3 text-center">Trình bày</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {papers.map((paper, index) => (
                                <tr key={paper.id} className="hover:bg-slate-700/30 transition-colors duration-200">
                                    <td className="px-6 py-4 text-center font-medium text-slate-400 text-base">{index + 1}</td>
                                    <td className="px-6 py-4 font-medium text-slate-100 whitespace-nowrap text-base">{paper.authorName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-base">{paper.organization}</td>
                                    <td className="px-6 py-4 font-semibold text-slate-100 text-base">{paper.paperTitle}</td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                       <span className={`px-3 py-1 text-xs font-semibold rounded-full ${topicStyles[paper.topic] || 'bg-cyan-900/70 text-cyan-300 border border-cyan-700'}`}>
                                          Tiểu ban {paper.topic}
                                       </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {currentUser?.role === 'admin' ? (
                                            <select
                                                value={paper.abstractStatus}
                                                onChange={(e) => handleAbstractStatusChange(paper.id, e.target.value as ReviewStatus)}
                                                onClick={(e) => e.stopPropagation()}
                                                className={`${selectBaseClasses} ${reviewStatusStyles[paper.abstractStatus]}`}
                                            >
                                                <option className="bg-slate-800 text-white" value="Duyệt">Duyệt</option>
                                                <option className="bg-slate-800 text-white" value="Không duyệt">Không duyệt</option>
                                                <option className="bg-slate-800 text-white" value="Đang chờ duyệt">Đang chờ duyệt</option>
                                            </select>
                                        ) : (
                                            <span className={`${spanBaseClasses} ${reviewStatusStyles[paper.abstractStatus]}`}>
                                                {reviewStatusText[paper.abstractStatus]}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {currentUser?.role === 'admin' ? (
                                            <select
                                                value={paper.fullTextStatus}
                                                onChange={(e) => handleFullTextStatusChange(paper.id, e.target.value as ReviewStatus)}
                                                onClick={(e) => e.stopPropagation()}
                                                className={`${selectBaseClasses} ${reviewStatusStyles[paper.fullTextStatus]}`}
                                            >
                                                <option className="bg-slate-800 text-white" value="Duyệt">Duyệt</option>
                                                <option className="bg-slate-800 text-white" value="Không duyệt">Không duyệt</option>
                                                <option className="bg-slate-800 text-white" value="Đang chờ duyệt">Đang chờ duyệt</option>
                                            </select>
                                        ) : (
                                            <span className={`${spanBaseClasses} ${reviewStatusStyles[paper.fullTextStatus]}`}>
                                                {reviewStatusText[paper.fullTextStatus]}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {currentUser?.role === 'admin' ? (
                                            <select
                                                value={paper.reviewStatus}
                                                onChange={(e) => handleReviewStatusChange(paper.id, e.target.value as ReviewStatus)}
                                                onClick={(e) => e.stopPropagation()}
                                                className={`${selectBaseClasses} ${reviewStatusStyles[paper.reviewStatus]}`}
                                            >
                                                <option className="bg-slate-800 text-white" value="Duyệt">Duyệt</option>
                                                <option className="bg-slate-800 text-white" value="Không duyệt">Không duyệt</option>
                                                <option className="bg-slate-800 text-white" value="Đang chờ duyệt">Đang chờ duyệt</option>
                                            </select>
                                        ) : (
                                            <span className={`${spanBaseClasses} ${reviewStatusStyles[paper.reviewStatus]}`}>
                                                {reviewStatusText[paper.reviewStatus]}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {currentUser?.role === 'admin' ? (
                                            <select
                                                value={paper.presentationStatus}
                                                onChange={(e) => handlePresentationStatusChange(paper.id, e.target.value as PresentationStatus)}
                                                onClick={(e) => e.stopPropagation()}
                                                className={`${selectBaseClasses} ${presentationStatusStyles[paper.presentationStatus]}`}
                                            >
                                                <option className="bg-slate-800 text-white" value="Trình bày">Trình bày</option>
                                                <option className="bg-slate-800 text-white" value="Không trình bày">Không trình bày</option>
                                            </select>
                                        ) : (
                                            <span className={`${spanBaseClasses} ${presentationStatusStyles[paper.presentationStatus]}`}>
                                                {paper.presentationStatus}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaperReviewPage;