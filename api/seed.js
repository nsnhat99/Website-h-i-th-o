require('dotenv').config();
const { db } = require('@vercel/postgres');
const { 
    ANNOUNCEMENTS_DATA, 
    DETAILED_PAPER_SUBMISSIONS_DATA, 
    KEYNOTE_SPEAKERS_DATA, 
    CONFERENCE_TOPICS_DATA, 
    SPONSORS_DATA, 
    CO_ORGANIZERS_DATA, 
    NAV_LINKS 
} = require('./constants');

const initialSiteContent = {
    conferenceLogo: 'https://picsum.photos/seed/conflogo/60/60',
    universityLogo: 'https://picsum.photos/seed/unilogo/60/60',
    heroBackground: 'https://picsum.photos/seed/hero/1200/400',
    callForPapersImage: 'https://picsum.photos/seed/a4-paper/842/1191',
    keynoteSpeakers: KEYNOTE_SPEAKERS_DATA,
    conferenceTopics: CONFERENCE_TOPICS_DATA,
    sponsors: SPONSORS_DATA,
    coOrganizers: CO_ORGANIZERS_DATA,
    navLinks: NAV_LINKS,
    heroTitle: "Hội thảo quốc tế về nghiên cứu giáo dục",
    heroSubtitle: "Cơ hội kết nối, chia sẻ và phát triển trong lĩnh vực giáo dục.",
    conferenceDate: "08-09/11/2025",
    conferenceLocation: "Hà Nội, Việt Nam",
};

const initialUsers = [
    { id: 1, username: 'admin', password: 'password', role: 'admin', email: 'admin1@email.com' },
    { id: 2, username: 'user', password: 'password', role: 'user', email: 'user1@email.com' },
];

const initialRegistrations = [
    { id: 1, name: 'Nguyễn Văn An', organization: 'Đại học Quốc gia', email: 'nva@email.com', phone: '123456789', withPaper: 'yes' },
    { id: 2, name: 'Trần Thị Bình', organization: 'Viện Khoa học Giáo dục', email: 'ttb@email.com', phone: '123456789', withPaper: 'yes' },
];


async function seed(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        console.log('PostgreSQL extensions checked/created.');

        // Drop tables if they exist to start fresh
        await client.sql`DROP TABLE IF EXISTS users, registrations, announcements, papers, site_content;`;
        console.log('Dropped existing tables.');

        // Create tables
        await client.sql`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                role TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE
            );
        `;
        console.log('Created "users" table.');

        await client.sql`
            CREATE TABLE registrations (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                organization TEXT,
                email TEXT NOT NULL,
                phone TEXT,
                "withPaper" TEXT
            );
        `;
        console.log('Created "registrations" table.');

        await client.sql`
            CREATE TABLE announcements (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                date TEXT,
                content TEXT,
                "imageUrl" TEXT
            );
        `;
        console.log('Created "announcements" table.');
        
        await client.sql`
            CREATE TABLE papers (
                id SERIAL PRIMARY KEY,
                "authorName" TEXT NOT NULL,
                organization TEXT,
                "paperTitle" TEXT NOT NULL,
                topic INTEGER,
                "abstractStatus" TEXT,
                "fullTextStatus" TEXT,
                "reviewStatus" TEXT,
                "presentationStatus" TEXT
            );
        `;
        console.log('Created "papers" table.');

        await client.sql`
            CREATE TABLE site_content (
                id INTEGER PRIMARY KEY,
                content JSONB
            );
        `;
        console.log('Created "site_content" table.');

        // Insert data
        await Promise.all(
            initialUsers.map(user => 
                client.sql`
                    INSERT INTO users (id, username, password, role, email)
                    VALUES (${user.id}, ${user.username}, ${user.password}, ${user.role}, ${user.email});
                `
            )
        );
        console.log('Seeded "users" table.');

        await Promise.all(
            initialRegistrations.map(reg =>
                client.sql`
                    INSERT INTO registrations (id, name, organization, email, phone, "withPaper")
                    VALUES (${reg.id}, ${reg.name}, ${reg.organization}, ${reg.email}, ${reg.phone}, ${reg.withPaper});
                `
            )
        );
        console.log('Seeded "registrations" table.');

        await Promise.all(
            ANNOUNCEMENTS_DATA.map(ann =>
                client.sql`
                    INSERT INTO announcements (id, title, date, content, "imageUrl")
                    VALUES (${ann.id}, ${ann.title}, ${ann.date}, ${ann.content}, ${ann.imageUrl});
                `
            )
        );
        console.log('Seeded "announcements" table.');
        
        await Promise.all(
            DETAILED_PAPER_SUBMISSIONS_DATA.map(paper =>
                client.sql`
                    INSERT INTO papers (id, "authorName", organization, "paperTitle", topic, "abstractStatus", "fullTextStatus", "reviewStatus", "presentationStatus")
                    VALUES (${paper.id}, ${paper.authorName}, ${paper.organization}, ${paper.paperTitle}, ${paper.topic}, ${paper.abstractStatus}, ${paper.fullTextStatus}, ${paper.reviewStatus}, ${paper.presentationStatus});
                `
            )
        );
        console.log('Seeded "papers" table.');

        await client.sql`
            INSERT INTO site_content (id, content)
            VALUES (1, ${JSON.stringify(initialSiteContent)});
        `;
        console.log('Seeded "site_content" table.');


    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();
    try {
        await seed(client);
    } finally {
        await client.end();
    }
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
  process.exit(1);
});
