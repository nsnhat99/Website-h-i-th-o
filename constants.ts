import type { NavLink, ScheduleDay, Announcement, Sponsor, KeynoteSpeaker, PaperSubmission, DetailedPaperSubmission, ConferenceTopic } from './types';

export const NAV_LINKS: NavLink[] = [
  { id: 1, name: "Trang chủ", path: "/" },
  { id: 2, name: "Giới thiệu", path: "/introduction" },
  { id: 3, name: "Chương trình", path: "/program" },
  { id: 4, name: "Thông báo", path: "/announcements" },
  { id: 5, name: "Đăng ký & Nộp bài", path: "/participation-guide" },
  { id: 6, name: "Kết quả duyệt bài", path: "/paper-review" },
  { id: 7, name: "Admin", path: "/admin" },
];

export const ABSTRACT_SUBMISSION_FORM_URL = "https://forms.gle/placeholder";


export const SCHEDULE_DATA: ScheduleDay[] = [
  {
    day: "Ngày 1",
    date: "08/11/2025",
    parts: [
      {
        title: "Sáng",
        events: [
          { time: "8h00 - 8h30", activity: "Khai mạc phiên toàn thể" },
          { time: "8h30 - 10h00", activity: "Báo cáo tham luận" },
          { time: "10h00 - 10h30", activity: "Nghỉ giữa giờ" },
          { time: "10h30 - 12h00", activity: "Báo cáo tham luận" },
          { time: "12h00 - 12h10", activity: "Kết thúc phiên toàn thể" },
        ]
      },
      {
        title: "Trưa",
        events: [
          { time: "12h10 - 13h30", activity: "Ăn trưa" }
        ]
      },
      {
        title: "Chiều",
        events: [
          { time: "13h30 - 13h45", activity: "Nghỉ giữa giờ" },
          { 
            time: "13h45 - 16h30", 
            activity: "Phiên 3 tiểu ban đồng thời:",
            subSessions: [
              { title: "Tiểu ban 1: Bản sắc văn hoá trong kỷ nguyên số", location: "Phòng họp A, CS1" },
              { title: "Tiểu ban 2: Giáo dục sáng tạo và phát triển bền vững trong kỷ nguyên số", location: "Hội trường lớn, CS1" },
              { title: "Tiểu ban 3: Trí tuệ nhân tạo trong bảo tồn, phát triển văn hóa và giáo dục", location: "Phòng họp A5, CS1" }
            ]
          },
          { time: "16h30 - 17h00", activity: "Thảo luận" },
          { time: "17h00", activity: "Bế mạc hội thảo" }
        ]
      },
      {
        title: "Tối",
        events: [
          { time: "19h00", activity: "Gala Dinner" }
        ]
      }
    ]
  },
  {
    day: "Ngày 2",
    date: "09/11/2025",
    parts: [
      {
        title: "Cả ngày",
        events: [
          { time: "", activity: "Chuyến du lịch tham quan di sản văn hóa tại Hà Nội" }
        ]
      }
    ]
  }
];

export const ANNOUNCEMENTS_DATA: Announcement[] = [
    { id: 1, title: "Gia hạn thời gian nộp bài báo", date: "15/08/2025", content: "Do nhận được nhiều yêu cầu, ban tổ chức quyết định gia hạn thời gian nộp bài báo toàn văn đến hết ngày 30/09/2025. Vui lòng xem chi tiết tại trang Call for Papers.", imageUrl: "https://picsum.photos/seed/announcement1/800/400" },
    { id: 2, title: "Công bố danh sách diễn giả chính", date: "01/08/2025", content: "Chúng tôi vinh dự công bố danh sách các diễn giả chính sẽ tham gia hội thảo, bao gồm các chuyên gia hàng đầu trong và ngoài nước. Chi tiết về các diễn giả và chủ đề bài nói sẽ được cập nhật trong trang Chương trình.", imageUrl: "https://picsum.photos/seed/announcement2/800/400" },
    { id: 3, title: "Mở cổng đăng ký sớm với giá ưu đãi", date: "15/07/2025", content: "Cổng đăng ký tham dự hội thảo đã chính thức mở. Đăng ký sớm trước ngày 15/09/2025 để nhận được mức phí ưu đãi. Xin vui lòng truy cập trang Đăng ký để biết thêm chi tiết.", imageUrl: "https://picsum.photos/seed/announcement3/800/400" },
];

export const CO_ORGANIZERS_DATA: Sponsor[] = [
    { id: 1, name: "Tạp chí Giáo dục", logoUrl: "https://picsum.photos/seed/coorganizer1/150/60" },
];

export const SPONSORS_DATA: Sponsor[] = [
    { id: 1, name: "Báo Kinh tế - Đô thị", logoUrl: "https://picsum.photos/seed/sponsor1/150/60" },
    { id: 2, name: "Nhà xuất bản Hà Nội", logoUrl: "https://picsum.photos/seed/sponsor2/150/60" },
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

export const CONFERENCE_TOPICS_DATA: ConferenceTopic[] = [
  { 
    id: 1, 
    title: 'Bản sắc văn hoá trong kỷ nguyên số', 
    imageUrl: 'https://picsum.photos/seed/culture-digital/800/600', 
    link: '/topic/1',
    description: 'Trong bối cảnh toàn cầu hóa và sự phát triển mạnh mẽ của công nghệ số, việc giữ gìn và phát huy bản sắc văn hóa dân tộc trở nên cấp thiết hơn bao giờ hết. Tiểu ban sẽ tập trung thảo luận về các giải pháp để văn hóa thực sự trở thành nền tảng tinh thần, động lực phát triển của xã hội, từ việc số hóa di sản, xây dựng các sản phẩm văn hóa số, đến việc giáo dục và nâng cao nhận thức cho thế hệ trẻ về giá trị văn hóa truyền thống.' 
  },
  { 
    id: 2, 
    title: 'Giáo dục sáng tạo và phát triển bền vững trong kỷ nguyên số', 
    imageUrl: 'https://picsum.photos/seed/education-creative/800/600', 
    link: '/topic/2',
    description: 'Kỷ nguyên số đòi hỏi một nền giáo dục không chỉ truyền thụ kiến thức mà còn phải khơi dậy tiềm năng sáng tạo, tư duy phản biện và khả năng thích ứng của người học. Tiểu ban này sẽ là diễn đàn để các chuyên gia chia sẻ các mô hình giáo dục tiên tiến, phương pháp giảng dạy đổi mới, và các chiến lược tích hợp công nghệ nhằm tạo ra một môi trường học tập linh hoạt, hiệu quả, hướng tới sự phát triển bền vững của cá nhân và xã hội.' 
  },
  { 
    id: 3, 
    title: 'Trí tuệ nhân tạo trong bảo tồn, phát triển văn hoá và giáo dục', 
    imageUrl: 'https://picsum.photos/seed/ai-future/800/600', 
    link: '/topic/3',
    description: 'Trí tuệ nhân tạo (AI) đang mở ra những cơ hội và thách thức chưa từng có cho các lĩnh vực văn hóa và giáo dục. Tiểu ban sẽ khám phá các ứng dụng của AI trong việc phân tích dữ liệu lớn để cá nhân hóa lộ trình học tập, tự động hóa các tác vụ quản lý, bảo tồn di sản văn hóa thông qua công nghệ 3D và thực tế ảo, cũng như thảo luận về các vấn đề đạo đức và chính sách cần thiết để đảm bảo việc ứng dụng AI một cách có trách nhiệm và hiệu quả.' 
  },
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
  { id: 12, "title": "Xây dựng văn hóa đọc trong trường học", author: "Đỗ Mỹ Linh", status: "approved", submissionDate: "19/09/2025", abstract: "Đề xuất các giải pháp sáng tạo và bền vững nhằm thúc đẩy văn hóa đọc cho học sinh các cấp." },
];

export const DETAILED_PAPER_SUBMISSIONS_DATA: DetailedPaperSubmission[] = [
    { id: 1, authorName: 'Nguyễn Văn An', organization: 'Đại học Quốc gia', paperTitle: 'Ứng dụng AI trong đánh giá kết quả học tập', topic: 3, abstractStatus: 'Duyệt', fullTextStatus: 'Duyệt', reviewStatus: 'Duyệt', presentationStatus: 'Trình bày' },
    { id: 2, authorName: 'Trần Thị Bình', organization: 'Viện Khoa học Giáo dục', paperTitle: 'Mô hình Blended Learning cho giáo dục đại học', topic: 2, abstractStatus: 'Duyệt', fullTextStatus: 'Duyệt', reviewStatus: 'Duyệt', presentationStatus: 'Trình bày' },
    { id: 3, authorName: 'Lê Văn Cường', organization: 'Đại học Sư phạm', paperTitle: 'Tác động của STEM đến tư duy sáng tạo', topic: 2, abstractStatus: 'Duyệt', fullTextStatus: 'Đang chờ duyệt', reviewStatus: 'Đang chờ duyệt', presentationStatus: 'Không trình bày' },
    { id: 4, authorName: 'Phạm Thị Dung', organization: 'Tổ chức UNICEF', paperTitle: 'Giáo dục hòa nhập cho trẻ tự kỷ', topic: 2, abstractStatus: 'Duyệt', fullTextStatus: 'Không duyệt', reviewStatus: 'Không duyệt', presentationStatus: 'Không trình bày' },
    { id: 5, authorName: 'Hoàng Minh Hải', organization: 'Trường Quốc tế XYZ', paperTitle: 'Chuyển đổi số trong quản lý trường học', topic: 1, abstractStatus: 'Duyệt', fullTextStatus: 'Duyệt', reviewStatus: 'Duyệt', presentationStatus: 'Không trình bày' },
    { id: 6, authorName: 'Vũ Thu Hoài', organization: 'Đại học Stanford', paperTitle: 'Kỹ năng mềm cho sinh viên thế kỷ 21', topic: 1, abstractStatus: 'Duyệt', fullTextStatus: 'Duyệt', reviewStatus: 'Duyệt', presentationStatus: 'Trình bày' },
    { id: 7, authorName: 'Đặng Quốc Hưng', organization: 'Đại học Công nghệ Nanyang', paperTitle: 'Gamification trong lớp học ngoại ngữ', topic: 3, abstractStatus: 'Duyệt', fullTextStatus: 'Đang chờ duyệt', reviewStatus: 'Đang chờ duyệt', presentationStatus: 'Không trình bày' },
    { id: 8, authorName: 'Ngô Thị Lan', organization: 'Bộ Giáo dục và Đào tạo', paperTitle: 'Phát triển chương trình giáo dục phổ thông mới', topic: 2, abstractStatus: 'Duyệt', fullTextStatus: 'Duyệt', reviewStatus: 'Duyệt', presentationStatus: 'Trình bày' },
    { id: 9, authorName: 'Trịnh Văn Minh', organization: 'Đại học Quốc gia', paperTitle: 'Đánh giá sách giáo khoa theo định hướng năng lực', topic: 2, abstractStatus: 'Duyệt', fullTextStatus: 'Duyệt', reviewStatus: 'Duyệt', presentationStatus: 'Không trình bày' },
    { id: 10, authorName: 'Bùi Thúy Nga', organization: 'Coursera', paperTitle: 'Tư vấn hướng nghiệp trong bối cảnh 4.0', topic: 1, abstractStatus: 'Không duyệt', fullTextStatus: 'Không duyệt', reviewStatus: 'Không duyệt', presentationStatus: 'Không trình bày' },
    { id: 11, authorName: 'Lý Thành Nam', organization: 'Viện Khoa học Giáo dục', paperTitle: 'Ảnh hưởng của mạng xã hội đến học sinh', topic: 1, abstractStatus: 'Duyệt', fullTextStatus: 'Đang chờ duyệt', reviewStatus: 'Đang chờ duyệt', presentationStatus: 'Không trình bày' },
    { id: 12, authorName: 'Đỗ Mỹ Linh', organization: 'Đại học Sư phạm', paperTitle: 'Xây dựng văn hóa đọc trong trường học', topic: 1, abstractStatus: 'Duyệt', fullTextStatus: 'Duyệt', reviewStatus: 'Duyệt', presentationStatus: 'Trình bày' },
];