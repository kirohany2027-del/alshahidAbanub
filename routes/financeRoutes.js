const express = require('express');
const router = express.Router();
const Finance = require('../models/Finance');

// GET /api/finances - جلب حركات الخزينة
router.get('/', async (req, res) => {
    try {
        const records = await Finance.find().sort({ createdAt: -1 });
        const income = records.filter(r => r.type === 'income').reduce((s, x) => s + Number(x.amount), 0);
        const expense = records.filter(r => r.type === 'expense').reduce((s, x) => s + Number(x.amount), 0);
        const balance = income - expense;

        res.json({
            success: true,
            summary: { income, expense, balance },
            data: records
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/finances - إضافة قيد مالي جديد
router.post('/', async (req, res) => {
    try {
        const { date, desc, cat, amount, type, user } = req.body;
        if (!desc || !amount || !type) {
            return res.status(400).json({ success: false, message: 'الوصف والمبلغ ونوع القيد مطلوبة' });
        }

        const finance = await Finance.create({
            date: date || new Date().toISOString().split('T')[0],
            desc, cat, amount: Number(amount), type, user: user || 'الإدارة'
        });

        res.status(201).json({ success: true, message: 'تم تسجيل القيد المالي بنجاح', data: finance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
