const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET /api/students - جلب قائمة المخدومين
router.get('/', async (req, res) => {
    try {
        const { year, search } = req.query;
        let query = {};
        if (year && year !== 'all') query.year = year;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { code: { $regex: search, $options: 'i' } },
                { address: { $regex: search, $options: 'i' } }
            ];
        }

        const students = await Student.find(query).sort({ code: 1 });
        res.json({ success: true, count: students.length, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/students - إضافة مخدوم جديد
router.post('/', async (req, res) => {
    try {
        const { code, name, year, phone, parentPhone, confessionFather, address } = req.body;
        const exists = await Student.findOne({ code });
        if (exists) {
            return res.status(400).json({ success: false, message: 'كود المخدوم مسجل بالفعل' });
        }

        const student = await Student.create({
            code, name, year, phone, parentPhone, confessionFather, address
        });
        res.status(201).json({ success: true, message: 'تمت إضافة المخدوم بنجاح', data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT /api/students/:code/points - تحديث درجات ونقاط المخدوم
router.put('/:code/points', async (req, res) => {
    try {
        const { points, stars, badge, hymnsLevel } = req.body;
        const student = await Student.findOne({ code: req.params.code });
        if (!student) {
            return res.status(404).json({ success: false, message: 'المخدوم غير موجود' });
        }

        if (points !== undefined) student.points = points;
        if (stars !== undefined) student.stars = stars;
        if (badge) student.badge = badge;
        if (hymnsLevel) student.hymnsLevel = hymnsLevel;

        await student.save();
        res.json({ success: true, message: 'تم تحديث تقييم المخدوم بنجاح', data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
