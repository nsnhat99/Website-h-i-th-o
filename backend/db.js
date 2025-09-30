
const { ANNOUNCEMENTS_DATA, DETAILED_PAPER_SUBMISSIONS_DATA, KEYNOTE_SPEAKERS_DATA, CONFERENCE_TOPICS_DATA, SPONSORS_DATA, CO_ORGANIZERS_DATA, NAV_LINKS } = require('./constants');

// In-memory "database"
const db = {
  users: [
    { id: 1, username: 'admin', password: 'password', role: 'admin', email: 'admin1@email.com' },
    { id: 2, username: 'user', password: 'password', role: 'user', email: 'user1@email.com' },
  ],
  registrations: [
    { id: 1, name: 'Nguyễn Văn An', organization: 'Đại học Quốc gia', email: 'nva@email.com', phone: '123456789', withPaper: 'yes' },
    { id: 2, name: 'Trần Thị Bình', organization: 'Viện Khoa học Giáo dục', email: 'ttb@email.com', phone: '123456789', withPaper: 'yes' },
    { id: 3, name: 'Lê Văn Cường', organization: 'Đại học Sư phạm', email: 'lvc@email.com', phone: '123456789', withPaper: 'yes' },
    { id: 4, name: 'Some Attendee', organization: 'Some Company', email: 'sa@email.com', phone: '123456789', withPaper: 'no' },
  ],
  announcements: [...ANNOUNCEMENTS_DATA],
  papers: [...DETAILED_PAPER_SUBMISSIONS_DATA],
  siteContent: {
    conferenceLogo: 'https://picsum.photos/seed/conflogo/60/60',
    universityLogo: 'https://picsum.photos/seed/unilogo/60/60',
    heroBackground: 'https://picsum.photos/seed/hero/1200/400',
    callForPapersImage: 'https://picsum.photos/seed/a4-paper/842/1191',
    keynoteSpeakers: [...KEYNOTE_SPEAKERS_DATA],
    conferenceTopics: [...CONFERENCE_TOPICS_DATA],
    sponsors: [...SPONSORS_DATA],
    coOrganizers: [...CO_ORGANIZERS_DATA],
    navLinks: [...NAV_LINKS],
    heroTitle: "Hội thảo quốc tế về nghiên cứu giáo dục",
    heroSubtitle: "Cơ hội kết nối, chia sẻ và phát triển trong lĩnh vực giáo dục.",
    conferenceDate: "08-09/11/2025",
    conferenceLocation: "Hà Nội, Việt Nam",
  },
};

module.exports = db;
