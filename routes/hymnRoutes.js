const express = require('express');
const router = express.Router();
const Hymn = require('../models/Hymn');

// GET /api/hymns - جلب جميع الألحان
router.get('/', async (req, res) => {
    try {
        const hymns = await Hymn.find().sort({ createdAt: 1 });
        res.json({ success: true, count: hymns.length, data: hymns });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/hymns - إضافة لحن جديد
router.post('/', async (req, res) => {
    try {
        const { hymnId, title, season, grade, audioUrl, verses } = req.body;
        const hymn = await Hymn.create({
            hymnId: hymnId || 'hymn-' + Date.now(),
            title, season, grade, audioUrl, verses: verses || []
        });
        res.status(201).json({ success: true, message: 'تم حفظ اللحن بنجاح', data: hymn });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
