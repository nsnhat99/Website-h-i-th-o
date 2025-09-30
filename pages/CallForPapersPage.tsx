
import React from 'react';
import { Link } from 'react-router-dom';

const CallForPapersPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Call for Papers</h1>
      <p className="text-center text-gray-500 mb-10">Mời nộp bài báo khoa học cho {`Hội thảo quốc tế về nghiên cứu giáo dục`}.</p>

      <div className="space-y-8 text-lg text-gray-700">
        <section>
          <h2 className="text-2xl font-bold text-blue-700 mb-3">Chủ đề Hội thảo</h2>
          <p>Hội thảo chào đón các bài báo nghiên cứu về mọi khía cạnh của giáo dục. Các chủ đề quan tâm bao gồm (nhưng không giới hạn):</p>
          <ul className="list-disc list-inside mt-2 pl-4 space-y-1">
            <li>Công nghệ trong giáo dục và học tập trực tuyến</li>
            <li>Đổi mới phương pháp giảng dạy và học tập</li>
            <li>Kiểm định và đảm bảo chất lượng giáo dục</li>
            <li>Tâm lý học đường và giáo dục hòa nhập</li>
            <li>Quản lý giáo dục và chính sách phát triển</li>
            <li>Giáo dục STEM/STEAM</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-700 mb-3">Các mốc thời gian quan trọng</h2>
          <ul className="list-none space-y-2">
            <li className="flex items-start"><span className="font-semibold w-48">Hạn nộp tóm tắt:</span> <span>30/08/2025</span></li>
            <li className="flex items-start"><span className="font-semibold w-48">Thông báo chấp nhận:</span> <span>15/09/2025</span></li>
            <li className="flex items-start"><span className="font-semibold w-48">Hạn nộp bài toàn văn:</span> <span>15/10/2025</span></li>
            <li className="flex items-start"><span className="font-semibold w-48">Hạn đăng ký sớm:</span> <span>30/09/2025</span></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-700 mb-3">Yêu cầu về Định dạng</h2>
          <p>Bài báo toàn văn cần được định dạng theo mẫu của IEEE. Tóm tắt không quá 300 từ. Bài báo toàn văn có độ dài từ 6 đến 8 trang, bao gồm cả tài liệu tham khảo. Vui lòng sử dụng mẫu được cung cấp trên website để định dạng bài báo của bạn.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-700 mb-3">Quy trình Nộp bài</h2>
          <p>Tất cả các bài báo sẽ được nộp thông qua hệ thống quản lý hội thảo trực tuyến của chúng tôi. Quá trình bình duyệt sẽ được thực hiện theo hình thức double-blind. Vui lòng đảm bảo bài nộp của bạn không chứa thông tin nhận dạng tác giả.</p>
          <div className="text-center mt-8">
            <Link to="/register" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg">
                Nộp bài báo ngay
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CallForPapersPage;
