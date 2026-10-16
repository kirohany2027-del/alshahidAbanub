const express = require('express');
const router = express.Router();
const Account = require('../models/Account');

// POST /api/auth/login - تسجيل الدخول
router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'يرجى إدخال اسم المستخدم وكلمة المرور' });
        }

        const query = {
            $or: [{ username: username }, { code: username }],
            password: password
        };
        if (role) {
            query.role = role;
        }

        const account = await Account.findOne(query);
        if (!account) {
            return res.status(401).json({ success: false, message: 'بيانات الدخول غير صحيحة أو الحساب غير مفعل' });
        }

        res.json({
            success: true,
            message: 'تم تسجيل الدخول بنجاح',
            user: {
                code: account.code,
                name: account.name,
                username: account.username,
                role: account.role,
                year: account.year
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/auth/accounts - جلب جميع الحسابات (للإدارة)
router.get('/accounts', async (req, res) => {
    try {
        const accounts = await Account.find().select('-password').sort({ createdAt: -1 });
        res.json({ success: true, count: accounts.length, data: accounts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/auth/accounts - إضافة حساب مستخدم جديد
router.post('/accounts', async (req, res) => {
    try {
        const { code, name, username, password, role, year } = req.body;
        const exists = await Account.findOne({ $or: [{ username }, { code }] });
        if (exists) {
            return res.status(400).json({ success: false, message: 'اسم المستخدم أو الكود مسجل بالفعل' });
        }

        const newAccount = await Account.create({ code, name, username, password, role, year });
        res.status(201).json({ success: true, message: 'تم إنشاء الحساب بنجاح', data: newAccount });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
