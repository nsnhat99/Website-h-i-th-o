import type { NavLink, ScheduleDay, Announcement, Sponsor, KeynoteSpeaker, PaperSubmission } from './types';

export const CONFERENCE_TITLE = "Hội thảo quốc tế về nghiên cứu giáo dục";
export const CONFERENCE_DATE = "08-09/11/2025";
export const CONFERENCE_LOCATION = "Hà Nội, Việt Nam";

export const NAV_LINKS: NavLink[] = [
  { name: "Trang chủ", path: "/" },
  { name: "Đăng ký tham dự", path: "/register" },
  { name: "Chương trình", path: "/program" },
  { name: "Call for Papers", path: "/call-for-papers" },
  { name: "Thông báo", path: "/announcements" },
  { name: "Liên hệ", path: "/contact" },
  { name: "Admin", path: "/admin" },
];

export const SCHEDULE_DATA: ScheduleDay[] = [
  {
    day: "Ngày 1",
    date: "08/11/2025",
    sessions: [
      { time: "08:00 - 09:00", title: "Đăng ký và Check-in", speaker: "Ban tổ chức", location: "Sảnh chính" },
      { time: "09:00 - 09:30", title: "Phát biểu khai mạc", speaker: "GS. TS. Nguyễn Văn A", location: "Hội trường A" },
      { time: "09:30 - 10:30", title: "Bài phát biểu chính: Xu hướng giáo dục trong kỷ nguyên số", speaker: "PGS. TS. Trần Thị B", location: "Hội trường A" },
      { time: "10:30 - 11:00", title: "Giải lao", speaker: "", location: "Khu vực sảnh" },
      { time: "11:00 - 12:30", title: "Phiên 1: Công nghệ và đổi mới trong giảng dạy", speaker: "Nhiều diễn giả", location: "Phòng 101, 102" },
      { time: "12:30 - 14:00", title: "Ăn trưa", speaker: "", location: "Nhà hàng" },
      { time: "14:00 - 15:30", title: "Phiên 2: Đánh giá và kiểm định chất lượng giáo dục", speaker: "Nhiều diễn giả", location: "Phòng 201, 202" },
      { time: "15:30 - 16:00", title: "Giải lao", speaker: "", location: "Khu vực sảnh" },
      { time: "16:00 - 17:30", title: "Workshop: Phương pháp nghiên cứu khoa học giáo dục", speaker: "TS. Lê Văn C", location: "Phòng Lab" },
    ],
  },
  {
    day: "Ngày 2",
    date: "09/11/2025",
    sessions: [
      { time: "09:00 - 10:30", title: "Phiên 3: Tâm lý học đường và tư vấn hướng nghiệp", speaker: "Nhiều diễn giả", location: "Phòng 101, 102" },
      { time: "10:30 - 11:00", title: "Giải lao", speaker: "", location: "Khu vực sảnh" },
      { time: "11:00 - 12:30", title: "Phiên 4: Quản lý giáo dục và chính sách", speaker: "Nhiều diễn giả", location: "Phòng 201, 202" },
      { time: "12:30 - 14:00", title: "Ăn trưa", speaker: "", location: "Nhà hàng" },
      { time: "14:00 - 15:30", title: "Diễn đàn: Tương lai của giáo dục Việt Nam", speaker: "Các chuyên gia hàng đầu", location: "Hội trường A" },
      { time: "15:30 - 16:00", title: "Trao giải thưởng bài báo xuất sắc", speaker: "Ban giám khảo", location: "Hội trường A" },
      { time: "16:00 - 16:30", title: "Phát biểu bế mạc", speaker: "GS. TS. Nguyễn Văn A", location: "Hội trường A" },
    ],
  },
];

export const ANNOUNCEMENTS_DATA: Announcement[] = [
    { id: 1, title: "Gia hạn thời gian nộp bài báo", date: "15/08/2025", content: "Do nhận được nhiều yêu cầu, ban tổ chức quyết định gia hạn thời gian nộp bài báo toàn văn đến hết ngày 30/09/2025. Vui lòng xem chi tiết tại trang Call for Papers." },
    { id: 2, title: "Công bố danh sách diễn giả chính", date: "01/08/2025", content: "Chúng tôi vinh dự công bố danh sách các diễn giả chính sẽ tham gia hội thảo, bao gồm các chuyên gia hàng đầu trong và ngoài nước. Chi tiết về các diễn giả và chủ đề bài nói sẽ được cập nhật trong trang Chương trình." },
    { id: 3, title: "Mở cổng đăng ký sớm với giá ưu đãi", date: "15/07/2025", content: "Cổng đăng ký tham dự hội thảo đã chính thức mở. Đăng ký sớm trước ngày 15/09/2025 để nhận được mức phí ưu đãi. Xin vui lòng truy cập trang Đăng ký để biết thêm chi tiết." },
];

export const SPONSORS_DATA: Sponsor[] = [
    { name: "Sponsor 1", logoUrl: "https://picsum.photos/seed/sponsor1/150/60" },
    { name: "Sponsor 2", logoUrl: "https://picsum.photos/seed/sponsor2/150/60" },
    { name: "Sponsor 3", logoUrl: "https://picsum.photos/seed/sponsor3/150/60" },
    { name: "Sponsor 4", logoUrl: "https://picsum.photos/seed/sponsor4/150/60" },
];

export const KEYNOTE_SPEAKERS_DATA: KeynoteSpeaker[] = [
  { id: 1, name: "GS. TS. Lê Minh Trí", affiliation: "Đại học Quốc gia", imageUrl: "https://picsum.photos/seed/speaker1/200/200", bio: "Chuyên gia hàng đầu về trí tuệ nhân tạo trong giáo dục, với hơn 20 năm kinh nghiệm nghiên cứu và giảng dạy.", keynoteTopic: "AI và Tương lai của Việc học Cá nhân hóa" },
  { id: 2, name: "PGS. TS. Trần Thị Bích", affiliation: "Viện Khoa học Giáo dục", imageUrl: "https://picsum.photos/seed/speaker2/200/200", bio: "Tác giả của nhiều công trình nghiên cứu về đổi mới phương pháp giảng dạy và kiểm tra đánh giá.", keynoteTopic: "Đánh giá Năng lực: Từ Lý thuyết đến Thực tiễn" },
  { id: 3, name: "Dr. John Williams", affiliation: "Đại học Stanford", imageUrl: "https://picsum.photos/seed/speaker3/200/200", bio: "Nhà nghiên cứu tiên phong trong lĩnh vực công nghệ giáo dục và học tập kết hợp (blended learning).", keynoteTopic: "Xây dựng Hệ sinh thái Học tập Số" },
  { id: 4, name: "TS. Nguyễn Hoàng Anh", affiliation: "Tổ chức UNICEF", imageUrl: "https://picsum.photos/seed/speaker4/200/200", bio: "Chuyên gia về chính sách giáo dục và phát triển bền vững, đặc biệt là giáo dục cho trẻ em yếu thế.", keynoteTopic: "Giáo dục Hòa nhập trong Bối cảnh Toàn cầu hóa" },
  { id: 5, name: "ThS. Phạm Thu Hà", affiliation: "Trường Quốc tế XYZ", imageUrl: "https://picsum.photos/seed/speaker5/200/200", bio: "Nhà giáo dục thực hành với nhiều sáng kiến áp dụng thành công mô hình giáo dục STEM tại Việt Nam.", keynoteTopic: "Triển khai STEM: Thách thức và Giải pháp" },
  { id: 6, name: "Prof. Emily Chen", affiliation: "Đại học Công nghệ Nanyang", imageUrl: "https://picsum.photos/seed/speaker6/200/200", bio: "Chuyên gia về tâm lý học đường và sức khỏe tinh thần cho học sinh, sinh viên.", keynoteTopic: "Sức khỏe Tinh thần và Môi trường Học đường" },
  { id: 7, name: "TS. Vũ Đức Long", affiliation: "Bộ Giáo dục và Đào tạo", imageUrl: "https://picsum.photos/seed/speaker7/200/200", bio: "Nhà quản lý giáo dục có nhiều đóng góp trong việc xây dựng và triển khai chương trình giáo dục phổ thông mới.", keynoteTopic: "Quản lý Sự thay đổi trong Giáo dục" },
  { id: 8, name: "Ms. Sarah Jones", affiliation: "Coursera", imageUrl: "https://picsum.photos/seed/speaker8/200/200", bio: "Giám đốc đối tác chiến lược tại Coursera, chuyên về xu hướng học tập trực tuyến và kỹ năng tương lai.", keynoteTopic: "Học tập suốt đời trong Kỷ nguyên số" },
];

export const PAPER_SUBMISSIONS_DATA: PaperSubmission[] = [
  { id: 1, title: "Ứng dụng AI trong đánh giá kết quả học tập", author: "Nguyễn Văn An", status: "approved", submissionDate: "15/09/2025", abstract: "Bài báo trình bày một mô hình AI mới giúp tự động hóa việc chấm điểm và phản hồi cho sinh viên, nâng cao hiệu quả và tính khách quan." },
  { id: 2, title: "Mô hình Blended Learning cho giáo dục đại học", author: "Trần Thị Bình", status: "approved", submissionDate: "12/09/2025", abstract: "Nghiên cứu đề xuất và thử nghiệm một mô hình học tập kết hợp tối ưu, phù hợp với bối cảnh các trường đại học tại Việt Nam." },
  { id: 3, title: "Tác động của STEM đến tư duy sáng tạo", author: "Lê Văn Cường", status: "pending", submissionDate: "20/09/2025", abstract: "Nghiên cứu phân tích sự ảnh hưởng của giáo dục STEM đối với sự phát triển tư duy sáng tạo và kỹ năng giải quyết vấn đề của học sinh THPT." },
  { id: 4, title: "Giáo dục hòa nhập cho trẻ tự kỷ", author: "Phạm Thị Dung", status: "rejected", submissionDate: "10/09/2025", abstract: "Bài báo khảo sát các thách thức và đề xuất giải pháp nhằm xây dựng một môi trường giáo dục hòa nhập hiệu quả cho trẻ tự kỷ." },
  { id: 5, title: "Chuyển đổi số trong quản lý trường học", author: "Hoàng Minh Hải", status: "approved", submissionDate: "18/09/2025", abstract: "Đề tài tập trung vào việc xây dựng một hệ thống quản lý trường học thông minh, tích hợp các công nghệ mới." },
  { id: 6, title: "Kỹ năng mềm cho sinh viên thế kỷ 21", author: "Vũ Thu Hoài", status: "pending", submissionDate: "22/09/2025", abstract: "Nghiên cứu tầm quan trọng và đề xuất các phương pháp giảng dạy kỹ năng mềm hiệu quả trong chương trình đào tạo đại học." },
  { id: 7, title: "Gamification trong lớp học ngoại ngữ", author: "Đặng Quốc Hưng", status: "approved", submissionDate: "14/09/2025", abstract: "Bài báo giới thiệu cách áp dụng các yếu tố trò chơi (gamification) để tăng cường động lực và hiệu quả học ngoại ngữ." },
  { id: 8, title: "Phát triển chương trình giáo dục phổ thông mới", author: "Ngô Thị Lan", status: "pending", submissionDate: "25/09/2025", abstract: "Phân tích những điểm mới và thách thức trong quá trình triển khai chương trình giáo dục phổ thông 2018." },
  { id: 9, title: "Đánh giá sách giáo khoa theo định hướng năng lực", author: "Trịnh Văn Minh", status: "approved", submissionDate: "16/09/2025", abstract: "Nghiên cứu xây dựng bộ tiêu chí và quy trình đánh giá sách giáo khoa mới, đảm bảo phù hợp với mục tiêu phát triển năng lực học sinh." },
  { id: 10, title: "Tư vấn hướng nghiệp trong bối cảnh 4.0", author: "Bùi Thúy Nga", status: "rejected", submissionDate: "11/09/2025", abstract: "Bài báo đề cập đến vai trò và những yêu cầu mới đối với công tác tư vấn hướng nghiệp trong thời đại công nghệ số." },
  { id: 11, title: "Ảnh hưởng của mạng xã hội đến học sinh", author: "Lý Thành Nam", status: "pending", submissionDate: "28/09/2025", abstract: "Nghiên cứu khảo sát các tác động tích cực và tiêu cực của mạng xã hội đối với kết quả học tập và sức khỏe tinh thần của học sinh." },
  { id: 12, title: "Xây dựng văn hóa đọc trong trường học", author: "Đỗ Mỹ Linh", status: "approved", submissionDate: "19/09/2025", abstract: "Đề xuất các giải pháp sáng tạo và bền vững nhằm thúc đẩy văn hóa đọc cho học sinh các cấp." },
];
