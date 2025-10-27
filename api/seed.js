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
    conferenceDate: "08/11/2025",
    conferenceLocation: "Trường Đại học Thủ đô Hà Nội, 98 Dương Quảng Hàm, Nghĩa Đô, Hà Nội",
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

        // Create tables only if they don't exist (safe for production)
        await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                role TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE
            );
        `;
        console.log('Checked/Created "users" table.');

        await client.sql`
            CREATE TABLE IF NOT EXISTS registrations (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                organization TEXT,
                email TEXT NOT NULL,
                phone TEXT,
                "withPaper" TEXT
            );
        `;
        console.log('Checked/Created "registrations" table.');

        await client.sql`
            CREATE TABLE IF NOT EXISTS announcements (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                date TEXT,
                content TEXT,
                "imageUrl" TEXT
            );
        `;
        console.log('Checked/Created "announcements" table.');
        
        await client.sql`
            CREATE TABLE IF NOT EXISTS papers (
                id SERIAL PRIMARY KEY,
                "authorName" TEXT NOT NULL,
                organization TEXT,
                "paperTitle" TEXT NOT NULL,
                topic INTEGER,
                "abstractStatus" TEXT,
                "fullTextStatus" TEXT,
                "reviewStatus" TEXT,
                "presentationStatus" TEXT,
                "fullTextUrl" TEXT,
                "fullTextFileName" TEXT
            );
        `;
        console.log('Checked/Created "papers" table.');

        // Add new columns if they don't exist (migration-safe)
        try {
            await client.sql`ALTER TABLE papers ADD COLUMN IF NOT EXISTS "fullTextUrl" TEXT;`;
            await client.sql`ALTER TABLE papers ADD COLUMN IF NOT EXISTS "fullTextFileName" TEXT;`;
            console.log('Added file columns to papers table (if not exist).');
        } catch (error) {
            console.log('File columns already exist or error adding them:', error.message);
        }

        await client.sql`
            CREATE TABLE IF NOT EXISTS site_content (
                id INTEGER PRIMARY KEY,
                content JSONB
            );
        `;
        console.log('Checked/Created "site_content" table.');

        // Only insert initial data if tables are empty
        const { rows: userCount } = await client.sql`SELECT COUNT(*) FROM users;`;
        if (parseInt(userCount[0].count) === 0) {
            await Promise.all(
                initialUsers.map(user => 
                    client.sql`
                        INSERT INTO users (id, username, password, role, email)
                        VALUES (${user.id}, ${user.username}, ${user.password}, ${user.role}, ${user.email})
                        ON CONFLICT (username) DO NOTHING;
                    `
                )
            );
            console.log('Seeded "users" table.');
        } else {
            console.log('Users table already has data, skipping seed.');
        }

        const { rows: regCount } = await client.sql`SELECT COUNT(*) FROM registrations;`;
        if (parseInt(regCount[0].count) === 0) {
            await Promise.all(
                initialRegistrations.map(reg =>
                    client.sql`
                        INSERT INTO registrations (id, name, organization, email, phone, "withPaper")
                        VALUES (${reg.id}, ${reg.name}, ${reg.organization}, ${reg.email}, ${reg.phone}, ${reg.withPaper});
                    `
                )
            );
            console.log('Seeded "registrations" table.');
        } else {
            console.log('Registrations table already has data, skipping seed.');
        }

        const { rows: annCount } = await client.sql`SELECT COUNT(*) FROM announcements;`;
        if (parseInt(annCount[0].count) === 0) {
            await Promise.all(
                ANNOUNCEMENTS_DATA.map(ann =>
                    client.sql`
                        INSERT INTO announcements (id, title, date, content, "imageUrl")
                        VALUES (${ann.id}, ${ann.title}, ${ann.date}, ${ann.content}, ${ann.imageUrl});
                    `
                )
            );
            console.log('Seeded "announcements" table.');
        } else {
            console.log('Announcements table already has data, skipping seed.');
        }
        
        const { rows: paperCount } = await client.sql`SELECT COUNT(*) FROM papers;`;
        if (parseInt(paperCount[0].count) === 0) {
            await Promise.all(
                DETAILED_PAPER_SUBMISSIONS_DATA.map(paper =>
                    client.sql`
                        INSERT INTO papers (id, "authorName", organization, "paperTitle", topic, "abstractStatus", "fullTextStatus", "reviewStatus", "presentationStatus")
                        VALUES (${paper.id}, ${paper.authorName}, ${paper.organization}, ${paper.paperTitle}, ${paper.topic}, ${paper.abstractStatus}, ${paper.fullTextStatus}, ${paper.reviewStatus}, ${paper.presentationStatus});
                    `
                )
            );
            console.log('Seeded "papers" table.');
        } else {
            console.log('Papers table already has data, skipping seed.');
        }

        const { rows: contentCount } = await client.sql`SELECT COUNT(*) FROM site_content;`;
        if (parseInt(contentCount[0].count) === 0) {
            await client.sql`
                INSERT INTO site_content (id, content)
                VALUES (1, ${JSON.stringify(initialSiteContent)});
            `;
            console.log('Seeded "site_content" table.');
        } else {
            console.log('Site content already exists, skipping seed.');
        }

        console.log('\n✅ Database setup completed successfully!');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
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