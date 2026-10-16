const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const Student = require('../models/Student');
const Servant = require('../models/Servant');
const Hymn = require('../models/Hymn');
const Attendance = require('../models/Attendance');
const Event = require('../models/Event');
const Finance = require('../models/Finance');
const Announcement = require('../models/Announcement');

// GET /api/backup/export - تصدير نسخة احتياطية كاملة من قاعدة بيانات مونجو
router.get('/export', async (req, res) => {
    try {
        const backup = {
            exportDate: new Date().toISOString(),
            service: 'حصة الشهيد أبانوب لإعدادي',
            accounts: await Account.find(),
            students: await Student.find(),
            servants: await Servant.find(),
            hymns: await Hymn.find(),
            attendanceHistory: await Attendance.find(),
            eventsData: await Event.find(),
            financesData: await Finance.find(),
            announcementsData: await Announcement.find()
        };

        res.json({ success: true, data: backup });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/backup/import - استعادة نسخة احتياطية في MongoDB
router.post('/import', async (req, res) => {
    try {
        const { backup } = req.body;
        if (!backup) {
            return res.status(400).json({ success: false, message: 'ملف النسخة الاحتياطية مفقود' });
        }

        if (backup.students && backup.students.length > 0) {
            await Student.deleteMany({});
            await Student.insertMany(backup.students);
        }
        if (backup.attendanceHistory && backup.attendanceHistory.length > 0) {
            await Attendance.deleteMany({});
            await Attendance.insertMany(backup.attendanceHistory);
        }
        if (backup.financesData && backup.financesData.length > 0) {
            await Finance.deleteMany({});
            await Finance.insertMany(backup.financesData);
        }

        res.json({ success: true, message: 'تم استعادة النسخة الاحتياطية في MongoDB بنجاح' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
