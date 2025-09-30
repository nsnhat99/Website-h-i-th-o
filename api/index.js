const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit to handle base64 images

// --- AUTH & USERS ---
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.users.find(u => u.username === username && u.password === password);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

app.get('/api/users', (req, res) => {
    const usersWithoutPasswords = db.users.map(({ password, ...user }) => user);
    res.json(usersWithoutPasswords);
});

// --- REGISTRATIONS ---
app.get('/api/registrations', (req, res) => {
    res.json(db.registrations);
});
app.post('/api/registrations', (req, res) => {
    const newRegistration = {
        id: Date.now(),
        ...req.body,
    };
    db.registrations.unshift(newRegistration);
    res.status(201).json(newRegistration);
});

// --- ANNOUNCEMENTS ---
app.get('/api/announcements', (req, res) => {
    res.json(db.announcements);
});

app.post('/api/announcements', (req, res) => {
    const newAnnouncement = {
        ...req.body,
        id: Date.now(),
        date: new Intl.DateTimeFormat('en-GB').format(new Date()),
    };
    db.announcements.unshift(newAnnouncement);
    res.status(201).json(newAnnouncement);
});

app.put('/api/announcements/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = db.announcements.findIndex(a => a.id === id);
    if (index > -1) {
        db.announcements[index] = { ...db.announcements[index], ...req.body };
        res.json(db.announcements[index]);
    } else {
        res.status(404).json({ message: "Announcement not found" });
    }
});

app.delete('/api/announcements/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const initialLength = db.announcements.length;
    db.announcements = db.announcements.filter(a => a.id !== id);
    if (db.announcements.length < initialLength) {
        res.status(200).json({ id });
    } else {
        res.status(404).json({ message: "Announcement not found" });
    }
});

// --- PAPERS ---
app.get('/api/papers', (req, res) => {
    res.json(db.papers);
});

app.post('/api/papers', (req, res) => {
    const formData = req.body;
    const newPaper = {
        id: Date.now(),
        authorName: formData.authorName,
        organization: formData.organization,
        paperTitle: formData.paperTitle,
        topic: parseInt(formData.topic, 10),
        abstractStatus: 'Duyệt',
        fullTextStatus: 'Đang chờ duyệt',
        reviewStatus: 'Đang chờ duyệt',
        presentationStatus: 'Không trình bày',
    };
    db.papers.unshift(newPaper);
    res.status(201).json(newPaper);
});

app.put('/api/papers/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = db.papers.findIndex(p => p.id === id);
    if (index > -1) {
        db.papers[index] = { ...db.papers[index], ...req.body };
        res.json(db.papers[index]);
    } else {
        res.status(404).json({ message: "Paper not found" });
    }
});

app.delete('/api/papers/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const initialLength = db.papers.length;
    db.papers = db.papers.filter(p => p.id !== id);
    if (db.papers.length < initialLength) {
        res.status(200).json({ id });
    } else {
        res.status(404).json({ message: "Paper not found" });
    }
});

// --- SITE CONTENT ---
app.get('/api/site-content', (req, res) => {
    res.json(db.siteContent);
});

app.put('/api/site-content', (req, res) => {
    db.siteContent = { ...db.siteContent, ...req.body };
    res.json(db.siteContent);
});

// Export the app for Vercel
module.exports = app;