const express = require('express');
const cors = require('cors');
const { sql } = require('@vercel/postgres');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit to handle base64 images

app.get('/api/test-db', async (req, res) => {
  try {
    const { rows } = await sql`SELECT NOW();`;
    res.json({ message: 'Database connected', time: rows[0].now });
  } catch (error) {
    res.status(500).json({ message: 'Database error', details: error.message });
  }
});

// --- AUTH & USERS ---
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const { rows } = await sql`SELECT * FROM users WHERE username = ${username};`;
        const user = rows[0];
        if (user && user.password === password) { // Note: In a real app, use hashed passwords!
            const { password, ...userWithoutPassword } = user;
            res.json(userWithoutPassword);
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database error during login', details: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const { rows } = await sql`SELECT id, username, role, email FROM users;`;
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', details: error.message });
    }
});

// --- REGISTRATIONS ---
app.get('/registrations', async (req, res) => {
    try {
        const { rows } = await sql`SELECT * FROM registrations ORDER BY id DESC;`;
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch registrations', details: error.message });
    }
});
app.post('/registrations', async (req, res) => {
    const { name, organization, email, phone, withPaper } = req.body;
    try {
        const { rows } = await sql`
            INSERT INTO registrations (name, organization, email, phone, "withPaper")
            VALUES (${name}, ${organization}, ${email}, ${phone}, ${withPaper})
            RETURNING *;
        `;
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create registration', details: error.message });
    }
});

// --- ANNOUNCEMENTS ---
app.get('/announcements', async (req, res) => {
    try {
        const { rows } = await sql`SELECT * FROM announcements ORDER BY id DESC;`;
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch announcements', details: error.message });
    }
});

app.post('/announcements', async (req, res) => {
    const { title, content, imageUrl } = req.body;
    const date = new Intl.DateTimeFormat('en-GB').format(new Date());
    try {
        const { rows } = await sql`
            INSERT INTO announcements (title, content, "imageUrl", date)
            VALUES (${title}, ${content}, ${imageUrl}, ${date})
            RETURNING *;
        `;
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create announcement', details: error.message });
    }
});

app.put('/announcements/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title, content, imageUrl } = req.body;
    try {
        const { rows } = await sql`
            UPDATE announcements
            SET 
                title = COALESCE(${title}, title),
                content = COALESCE(${content}, content),
                "imageUrl" = COALESCE(${imageUrl}, "imageUrl")
            WHERE id = ${id}
            RETURNING *;
        `;
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: "Announcement not found" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update announcement', details: error.message });
    }
});

app.delete('/announcements/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const result = await sql`DELETE FROM announcements WHERE id = ${id};`;
        if (result.rowCount > 0) {
            res.status(200).json({ id: id });
        } else {
            res.status(404).json({ message: "Announcement not found" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete announcement', details: error.message });
    }
});

// --- PAPERS ---
app.get('/papers', async (req, res) => {
    try {
        const { rows } = await sql`SELECT * FROM papers ORDER BY id DESC;`;
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch papers', details: error.message });
    }
});

app.post('/papers', async (req, res) => {
    const { authorName, organization, paperTitle, topic } = req.body;
    try {
        const { rows } = await sql`
            INSERT INTO papers ("authorName", organization, "paperTitle", topic, "abstractStatus", "fullTextStatus", "reviewStatus", "presentationStatus")
            VALUES (${authorName}, ${organization}, ${paperTitle}, ${parseInt(topic, 10)}, 'Duyệt', 'Đang chờ duyệt', 'Đang chờ duyệt', 'Không trình bày')
            RETURNING *;
        `;
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create paper', details: error.message });
    }
});

app.put('/papers/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { authorName, organization, paperTitle, abstractStatus, fullTextStatus, reviewStatus, presentationStatus } = req.body;
    try {
         const { rows } = await sql`
            UPDATE papers
            SET 
                "authorName" = COALESCE(${authorName}, "authorName"),
                organization = COALESCE(${organization}, organization),
                "paperTitle" = COALESCE(${paperTitle}, "paperTitle"),
                "abstractStatus" = COALESCE(${abstractStatus}, "abstractStatus"),
                "fullTextStatus" = COALESCE(${fullTextStatus}, "fullTextStatus"),
                "reviewStatus" = COALESCE(${reviewStatus}, "reviewStatus"),
                "presentationStatus" = COALESCE(${presentationStatus}, "presentationStatus")
            WHERE id = ${id}
            RETURNING *;
        `;
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: "Paper not found" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update paper', details: error.message });
    }
});

app.delete('/papers/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const result = await sql`DELETE FROM papers WHERE id = ${id};`;
        if (result.rowCount > 0) {
            res.status(200).json({ id: id });
        } else {
            res.status(404).json({ message: "Paper not found" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete paper', details: error.message });
    }
});

// --- SITE CONTENT ---
app.get('/site-content', async (req, res) => {
    try {
        const { rows } = await sql`SELECT content FROM site_content WHERE id = 1;`;
        if (rows.length > 0) {
            res.json(rows[0].content);
        } else {
            res.status(404).json({ message: "Site content not found" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch site content', details: error.message });
    }
});

app.put('/site-content', async (req, res) => {
    const partialContent = req.body;
    try {
        const { rows } = await sql`
            UPDATE site_content
            SET content = content || ${JSON.stringify(partialContent)}::jsonb
            WHERE id = 1
            RETURNING content;
        `;
        if (rows.length > 0) {
            res.json(rows[0].content);
        } else {
            res.status(404).json({ message: "Site content not found" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update site content', details: error.message });
    }
});

app.get("/api/hello", (req, res) => {
  return res.send("Hello");
});

// Export the app for Vercel
module.exports = app;
