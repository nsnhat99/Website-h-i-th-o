import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CONFERENCE_TITLE, CONFERENCE_DATE, CONFERENCE_LOCATION, KEYNOTE_SPEAKERS_DATA, PAPER_SUBMISSIONS_DATA } from '../constants';
import type { PaperSubmission, PaperStatus } from '../types';
import { useAuth } from '../contexts/AuthContext';

const statusStyles: { [key in PaperStatus]: string } = {
  approved: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  rejected: 'bg-red-100 text-red-800',
};
const statusText: { [key in PaperStatus]: string } = {
  approved: 'Đã duyệt',
  pending: 'Đang chờ',
  rejected: 'Không duyệt',
};

const HomePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [papers, setPapers] = useState<PaperSubmission[]>(PAPER_SUBMISSIONS_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<PaperStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const papersPerPage = 5;

  const handleStatusChange = (id: number, newStatus: PaperStatus) => {
    setPapers(papers.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const handleDeletePaper = (id: number) => {
    if(window.confirm('Are you sure you want to delete this submission?')) {
        setPapers(papers.filter(p => p.id !== id));
    }
  };

  const filteredPapers = useMemo(() => {
    return papers
      .filter(paper => 
        filterStatus === 'all' || paper.status === filterStatus
      )
      .filter(paper => 
        paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [papers, searchTerm, filterStatus]);

  const paginatedPapers = useMemo(() => {
    const startIndex = (currentPage - 1) * papersPerPage;
    return filteredPapers.slice(startIndex, startIndex + papersPerPage);
  }, [filteredPapers, currentPage]);
  
  const totalPages = Math.ceil(filteredPapers.length / papersPerPage);

  useEffect(() => {
    if(currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
    }
  }, [filteredPapers, totalPages, currentPage]);


  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat py-24 px-4 sm:px-6 lg:px-8 rounded-lg overflow-hidden text-center"
        style={{ backgroundImage: `url('https://picsum.photos/seed/hero/1200/400')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            {CONFERENCE_TITLE}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Cơ hội kết nối, chia sẻ và phát triển trong lĩnh vực giáo dục.
          </p>
        </div>
      </section>

      {/* Conference Details Section */}
      <section className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
             <div className="bg-blue-100 text-blue-700 rounded-full p-4 mb-3">
                <i className="fas fa-calendar-alt fa-2x"></i>
             </div>
            <h3 className="text-xl font-bold mb-2">Thời gian</h3>
            <p className="text-lg text-gray-600">{CONFERENCE_DATE}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-green-100 text-green-700 rounded-full p-4 mb-3">
                <i className="fas fa-map-marker-alt fa-2x"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Địa điểm</h3>
            <p className="text-lg text-gray-600">{CONFERENCE_LOCATION}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-100 text-purple-700 rounded-full p-4 mb-3">
                <i className="fas fa-users fa-2x"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Diễn giả</h3>
            <p className="text-lg text-gray-600">Các chuyên gia hàng đầu</p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Call to Action */}
        <section className="text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-4 text-white">Đừng bỏ lỡ sự kiện quan trọng này!</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8">
            Hãy đăng ký tham dự ngay hôm nay để cùng chúng tôi khám phá những ý tưởng mới, gặp gỡ các chuyên gia và mở rộng mạng lưới chuyên môn của bạn.
          </p>
          <div className="flex justify-center lg:justify-start items-center gap-4 flex-wrap">
              <Link 
                  to="/register" 
                  className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
              >
                  Đăng ký ngay
              </Link>
              <Link 
                  to="/program"
                  className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-transform transform hover:scale-105 shadow-lg"
              >
                  Xem chương trình
              </Link>
          </div>
        </section>

        {/* Keynote Speakers Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-yellow-300 text-center lg:text-left">Báo cáo viên chính thức</h2>
          <div className="grid grid-cols-4 gap-4">
            {KEYNOTE_SPEAKERS_DATA.map((speaker) => (
              <div key={speaker.id} className="group relative aspect-square" title={`${speaker.name} - ${speaker.keynoteTopic}`}>
                <img 
                  src={speaker.imageUrl} 
                  alt={speaker.name} 
                  className="w-full h-full object-cover rounded-full transition-all duration-300 ease-in-out group-hover:blur-sm group-hover:brightness-50" 
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-2 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <p className="text-xs sm:text-sm font-bold text-white leading-tight">{speaker.name}</p>
                  <p className="text-[10px] sm:text-xs text-yellow-400 mt-1 font-semibold leading-tight hidden sm:block">{speaker.keynoteTopic}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Paper Review Results Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-yellow-300 text-center">Kết quả duyệt bài tham dự hội thảo</h2>
        
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow-xl">
          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="Tìm theo tên bài báo, tác giả..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
            <div className="relative">
               <select
                value={filterStatus}
                onChange={(e) => { setFilterStatus(e.target.value as PaperStatus | 'all'); setCurrentPage(1); }}
                className="appearance-none w-full md:w-48 pl-4 pr-10 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                 <option value="all">Tất cả trạng thái</option>
                 <option value="approved">Đã duyệt</option>
                 <option value="pending">Đang chờ</option>
                 <option value="rejected">Không duyệt</option>
               </select>
               <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-slate-700/50 text-xs uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">Tên bài báo</th>
                  <th scope="col" className="px-6 py-3">Tác giả</th>
                  <th scope="col" className="px-6 py-3 text-center">Trạng thái</th>
                  <th scope="col" className="px-6 py-3 hidden md:table-cell">Ngày nộp</th>
                  <th scope="col" className="px-6 py-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPapers.length > 0 ? paginatedPapers.map((paper: PaperSubmission) => (
                  <tr key={paper.id} className="border-b border-slate-700 hover:bg-slate-700/30">
                    <th scope="row" className="px-6 py-4 font-bold text-white whitespace-nowrap">{paper.title}</th>
                    <td className="px-6 py-4">{paper.author}</td>
                    <td className="px-6 py-4 text-center">
                      {currentUser?.role === 'admin' ? (
                        <select
                          value={paper.status}
                          onChange={(e) => handleStatusChange(paper.id, e.target.value as PaperStatus)}
                          className={`w-full text-xs font-semibold rounded-md p-1 border-0 focus:ring-2 focus:ring-blue-500 ${statusStyles[paper.status]}`}
                        >
                          <option value="approved">Đã duyệt</option>
                          <option value="pending">Đang chờ</option>
                          <option value="rejected">Không duyệt</option>
                        </select>
                      ) : (
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[paper.status]}`}>{statusText[paper.status]}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">{paper.submissionDate}</td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => alert(`Chi tiết bài báo:\n\nTên: ${paper.title}\nTác giả: ${paper.author}\n\nTóm tắt: ${paper.abstract}`)}
                        className="font-medium text-blue-400 hover:underline"
                      >
                        Xem chi tiết
                      </button>
                      {currentUser?.role === 'admin' && (
                        <button
                          onClick={() => handleDeletePaper(paper.id)}
                          className="font-medium text-red-400 hover:underline ml-4"
                          title="Delete Submission"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">Không tìm thấy bài báo nào.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
             <div className="flex justify-between items-center mt-6 text-sm">
                <span className="text-gray-400">
                  Trang {currentPage} trên {totalPages}
                </span>
                <div className="flex items-center gap-2">
                   <button 
                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                     disabled={currentPage === 1}
                     className="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     <i className="fas fa-arrow-left"></i>
                   </button>
                   <button 
                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                     disabled={currentPage === totalPages}
                     className="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     <i className="fas fa-arrow-right"></i>
                   </button>
                </div>
             </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default HomePage;
