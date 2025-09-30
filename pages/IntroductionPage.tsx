import React from 'react';
import { Link } from 'react-router-dom';

const topics = [
  {
    title: 'Bản sắc văn hoá trong kỷ nguyên số',
    imageUrl: 'https://picsum.photos/seed/culture-digital/800/600',
    link: '/topics',
  },
  {
    title: 'Giáo dục sáng tạo và phát triển bền vững trong kỷ nguyên số',
    imageUrl: 'https://picsum.photos/seed/education-creative/800/600',
    link: '/topics',
  },
  {
    title: 'Trí tuệ nhân tạo trong bảo tồn, phát triển văn hoá và giáo dục',
    imageUrl: 'https://picsum.photos/seed/ai-future/800/600',
    link: '/topics',
  },
];

const IntroductionPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4 text-slate-100">Giới thiệu</h1>
      <p className="text-center text-slate-300 text-lg mb-10">
        Khám phá các chủ đề chính sẽ được thảo luận và nghiên cứu tại hội thảo.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {topics.map((topic, index) => (
          <Link to={topic.link} key={index} className="group block rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-sky-500/20">
            <div
              className="relative h-96 flex items-center justify-center p-6 text-center bg-cover bg-center"
              style={{ backgroundImage: `url(${topic.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300"></div>
              <h2 className="relative z-10 text-2xl font-bold text-white leading-tight">
                {topic.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IntroductionPage;