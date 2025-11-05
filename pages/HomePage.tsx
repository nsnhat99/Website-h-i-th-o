import React from 'react';
import { Link } from 'react-router-dom';
import type { KeynoteSpeaker } from '../types';
import { useSiteContent } from '../contexts/SiteContentContext';

const HomePage: React.FC = () => {
  const { siteContent } = useSiteContent();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat py-24 px-4 sm:px-6 lg:px-8 rounded-lg overflow-hidden text-center"
        style={{ backgroundImage: `url('${siteContent.heroBackground}')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            {siteContent.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-slate-200">
            {siteContent.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Conference Details Section */}
      <section className="bg-slate-900/40 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-slate-700/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
             <div className="bg-yellow-900/50 text-yellow-300 rounded-full flex items-center justify-center mb-3 w-[70px] h-[70px]">
                <i className="fas fa-calendar-alt fa-2x"></i>
             </div>
            <h3 className="text-xl font-bold mb-2 text-slate-100">Thời gian</h3>
            <p className="text-lg text-slate-100">{siteContent.conferenceDate}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-emerald-900/50 text-emerald-300 rounded-full flex items-center justify-center mb-3 w-[70px] h-[70px]">
                <i className="fas fa-map-marker-alt fa-2x"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-100">Địa điểm</h3>
            <p className="text-lg text-slate-100">{siteContent.conferenceLocation}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-violet-900/50 text-violet-300 rounded-full flex items-center justify-center mb-3 w-[70px] h-[70px]">
                <i className="fas fa-users fa-2x"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-100">Diễn giả</h3>
            <p className="text-lg text-slate-100">Các chuyên gia hàng đầu</p>
          </div>
        </div>
      </section>

      {/* Call for Papers & Keynote Speakers Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-yellow-100 text-center">Kêu gọi bài báo & Báo cáo viên</h2>
        <div className="flex flex-col gap-12 items-start">
            {/* Call for Papers Image Section (1/2 width) */}
            <div className="bg-slate-900/40 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg border border-slate-700/50">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-slate-100 text-center">Thông tin Kêu gọi Bài báo</h3>
                <img
                    src={siteContent.callForPapersImage}
                    alt="Call for Papers A4 Document"
                    className="w-full h-auto object-contain rounded-md shadow-md border border-gray-700"
                />
            </div>

            {/* Keynote Speakers Section (1/2 width) */}
            <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-yellow-100 text-center">Báo cáo viên</h3>
                <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg shadow-xl grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-4 border border-slate-700">
                    {siteContent.keynoteSpeakers.map((speaker: KeynoteSpeaker) => (
                        <div key={speaker.id} className="group relative aspect-square" title={`${speaker.name} - ${speaker.keynoteTopic}`}>
                            <img
                                src={speaker.imageUrl}
                                alt={speaker.name}
                                className="w-full h-full object-cover rounded-full transition-all duration-300 ease-in-out group-hover:blur-sm group-hover:brightness-50"
                            />
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-2 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                <p className="text-xs sm:text-sm font-bold text-white leading-tight">{speaker.name}</p>
                                <p className="text-[10px] sm:text-xs text-yellow-100 mt-1 font-semibold leading-tight hidden sm:block">{speaker.keynoteTopic}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-100">Đừng bỏ lỡ sự kiện quan trọng này!</h2>
        <p className="text-lg text-slate-100 mb-8">
          Hãy đăng ký tham dự ngay hôm nay để cùng chúng tôi khám phá những ý tưởng mới, gặp gỡ các chuyên gia và mở rộng mạng lưới chuyên môn của bạn.
        </p>
        <div className="flex justify-center items-center gap-4 flex-wrap">
            <Link 
                to="/participation-guide" 
                className="bg-yellow-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-yellow-700 transition-transform transform hover:scale-105 shadow-lg"
            >
                Đăng ký ngay
            </Link>
            <Link 
                to="/program"
                className="bg-yellow-900/50 text-yellow-50 font-bold py-3 px-8 rounded-lg hover:bg-yellow-800/50 transition-transform transform hover:scale-105 shadow-lg border border-yellow-700"
            >
                Xem chương trình
            </Link>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
