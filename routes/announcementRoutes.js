const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// GET /api/announcements - جلب التنبيهات والإعلانات
router.get('/', async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.json({ success: true, count: announcements.length, data: announcements });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/announcements - إضافة إعلان جديد
router.post('/', async (req, res) => {
    try {
        const { title, tag, date, body, author } = req.body;
        const announcement = await Announcement.create({
            title, tag: tag || 'عام',
            date: date || 'اليوم',
            body, author: author || 'أمانة الخدمة'
        });
        res.status(201).json({ success: true, message: 'تم نشر الإعلان بنجاح', data: announcement });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
