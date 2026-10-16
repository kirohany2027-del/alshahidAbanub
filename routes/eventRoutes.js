const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET /api/events - جلب جدول المواعيد والأنشطة
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ targetTimestamp: 1 });
        res.json({ success: true, count: events.length, data: events });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/events - إضافة ميعاد أو نشاط جديد
router.post('/', async (req, res) => {
    try {
        const { type, title, date, time, place, targetTimestamp } = req.body;
        const newEvent = await Event.create({
            eventId: 'ev-' + Date.now(),
            type, title, date, time, place,
            targetTimestamp: targetTimestamp || (Date.now() + 86400000 * 3)
        });
        res.status(201).json({ success: true, message: 'تمت إضافة الميعاد بنجاح', data: newEvent });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
