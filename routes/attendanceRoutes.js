const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

// GET /api/attendance - جلب السجلات العامة
router.get('/', async (req, res) => {
    try {
        const { session, date, code } = req.query;
        let query = {};
        if (session) query.session = session;
        if (date) query.date = date;
        if (code) query.code = code;

        const records = await Attendance.find(query).sort({ createdAt: -1 });
        res.json({ success: true, count: records.length, data: records });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/attendance - تسجيل أو تعديل حضور مخدوم
router.post('/', async (req, res) => {
    try {
        const { code, name, session, date, time, status } = req.body;
        if (!code || !session || !date) {
            return res.status(400).json({ success: false, message: 'كود المخدوم والجلسة والتاريخ مطلوبة' });
        }

        const formattedTime = time || new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
        const existing = await Attendance.findOne({ code, session, date });

        if (existing) {
            existing.status = status || 'حاضر ✅';
            existing.time = status.includes('غائب') ? '-' : formattedTime;
            if (name) existing.name = name;
            await existing.save();
            return res.json({ success: true, message: 'تم تحديث حالة الحضور', data: existing });
        }

        const newRecord = await Attendance.create({
            code,
            name: name || '',
            session,
            date,
            time: status.includes('غائب') ? '-' : formattedTime,
            status: status || 'حاضر ✅'
        });

        res.status(201).json({ success: true, message: 'تم تسجيل الحضور بنجاح', data: newRecord });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/attendance/reports/daily - التقرير اليومي المفصل
router.get('/reports/daily', async (req, res) => {
    try {
        const { date = '2026-10-16', session = 'حصة الألحان الأسبوعية', grade = 'all' } = req.query;

        let studentQuery = {};
        if (grade !== 'all') studentQuery.year = grade;
        const students = await Student.find(studentQuery).sort({ code: 1 });

        const records = await Attendance.find({
            session,
            $or: [{ date: date }, { date: 'اليوم' }]
        });

        let presentCount = 0;
        let absentCount = 0;
        let excusedCount = 0;
        const rows = [];
        const absentees = [];

        students.forEach(st => {
            const rec = records.find(r => r.code === st.code);
            const status = rec ? rec.status : 'غائب ❌';
            const time = rec ? rec.time : '-';

            if (status.includes('حاضر')) presentCount++;
            else if (status.includes('إذن')) excusedCount++;
            else {
                absentCount++;
                absentees.push({
                    code: st.code,
                    name: st.name,
                    year: st.year,
                    parentPhone: st.parentPhone
                });
            }

            rows.push({
                code: st.code,
                name: st.name,
                year: st.year,
                parentPhone: st.parentPhone,
                status,
                time
            });
        });

        const totalStudents = students.length;
        const attendanceRate = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

        res.json({
            success: true,
            summary: {
                total: totalStudents,
                present: presentCount,
                absent: absentCount,
                excused: excusedCount,
                attendanceRate: `${attendanceRate}%`
            },
            absentees,
            data: rows
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/attendance/reports/weekly - التقرير الأسبوعي التحليلي (المصفوفة)
router.get('/reports/weekly', async (req, res) => {
    try {
        const { week = '2026-W42', grade = 'all' } = req.query;

        let startDate = '2026-10-11', endDate = '2026-10-17';
        if (week === '2026-W41') { startDate = '2026-10-04'; endDate = '2026-10-10'; }
        if (week === '2026-W40') { startDate = '2026-09-27'; endDate = '2026-10-03'; }

        let studentQuery = {};
        if (grade !== 'all') studentQuery.year = grade;
        const students = await Student.find(studentQuery).sort({ code: 1 });

        const weekRecords = await Attendance.find({
            date: { $gte: startDate, $lte: endDate }
        });

        let totalSlots = students.length * 4;
        let totalAttended = 0;
        let perfectCount = 0;
        let hymnCount = 0;
        let needCareCount = 0;

        const rows = students.map(st => {
            const hymnRec = weekRecords.find(r => r.code === st.code && r.session === 'حصة الألحان الأسبوعية');
            const friLitRec = weekRecords.find(r => r.code === st.code && r.session === 'القداس الإلهي');
            const tasbehaRec = weekRecords.find(r => r.code === st.code && r.session === 'تسبحة نصف الليل');
            const sunLitRec = weekRecords.find(r => r.code === st.code && r.session === 'قداس الأحد');

            const isHymn = hymnRec && hymnRec.status.includes('حاضر');
            const isFri = friLitRec && friLitRec.status.includes('حاضر');
            const isTas = tasbehaRec && tasbehaRec.status.includes('حاضر');
            const isSun = sunLitRec && sunLitRec.status.includes('حاضر');

            if (isHymn) hymnCount++;

            const attended = [isHymn, isFri, isTas, isSun].filter(Boolean).length;
            totalAttended += attended;
            const weekPct = Math.round((attended / 4) * 100);

            if (weekPct === 100) perfectCount++;
            if (weekPct < 50) needCareCount++;

            let badge = 'يحتاج افتقاد ⚠️';
            if (weekPct === 100) badge = 'شماس مواظب 100% 🌟';
            else if (weekPct >= 75) badge = 'جيد جداً 👍';
            else if (weekPct >= 50) badge = 'مقبول 🆗';

            return {
                code: st.code,
                name: st.name,
                year: st.year,
                hymn: hymnRec ? hymnRec.status : 'غائب ❌',
                friLiturgy: friLitRec ? friLitRec.status : 'غائب ❌',
                tasbeha: tasbehaRec ? tasbehaRec.status : 'غائب ❌',
                sunLiturgy: sunLitRec ? sunLitRec.status : 'غائب ❌',
                attendedCount: `${attended}/4`,
                weekPct: `${weekPct}%`,
                badge
            };
        });

        const avgPct = totalSlots > 0 ? Math.round((totalAttended / totalSlots) * 100) : 0;
        const hymnPct = students.length > 0 ? Math.round((hymnCount / students.length) * 100) : 0;

        res.json({
            success: true,
            summary: {
                averageRate: `${avgPct}%`,
                perfectCount,
                hymnRate: `${hymnPct}%`,
                needCareCount
            },
            data: rows
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/attendance/reports/monthly - التقرير الشهري التراكمي
router.get('/reports/monthly', async (req, res) => {
    try {
        const { month = '2026-10', grade = 'all', sort = 'pct-desc' } = req.query;

        let studentQuery = {};
        if (grade !== 'all') studentQuery.year = grade;
        const students = await Student.find(studentQuery).sort({ code: 1 });

        const monthRecords = await Attendance.find({
            $or: [{ date: new RegExp(`^${month}`) }, { date: 'اليوم' }]
        });

        const monthTotalSessions = 12;

        let rows = students.map(st => {
            const stRecs = monthRecords.filter(r => r.code === st.code);
            const present = stRecs.filter(r => r.status.includes('حاضر')).length;
            const absent = stRecs.filter(r => r.status.includes('غائب')).length;
            const excused = stRecs.filter(r => r.status.includes('إذن')).length;

            const evaluatedTotal = Math.max(monthTotalSessions, present + absent + excused);
            const rate = evaluatedTotal > 0 ? Math.round((present / evaluatedTotal) * 100) : 0;

            let evaluation = 'ممتاز 🌟';
            if (rate >= 95) evaluation = 'ممتاز مع مرتبة الشرف 🏆';
            else if (rate >= 85) evaluation = 'ممتاز 🌟';
            else if (rate >= 75) evaluation = 'جيد جداً 👍';
            else if (rate >= 65) evaluation = 'جيد 🆗';
            else evaluation = 'يحتاج افتقاد مكثف ⚠️';

            return {
                code: st.code,
                name: st.name,
                year: st.year,
                parentPhone: st.parentPhone,
                totalSessions: evaluatedTotal,
                present,
                absent,
                excused,
                rate,
                rateText: `${rate}%`,
                evaluation
            };
        });

        // ترتيب البيانات
        if (sort === 'pct-desc') rows.sort((a, b) => b.rate - a.rate);
        else if (sort === 'pct-asc') rows.sort((a, b) => a.rate - b.rate);
        else if (sort === 'name') rows.sort((a, b) => a.name.localeCompare(b.name, 'ar'));

        // مقارنة المراحل الثلاث
        const calcStage = (stageName) => {
            const list = rows.filter(r => r.year === stageName);
            if (list.length === 0) return 90;
            return Math.round(list.reduce((acc, c) => acc + c.rate, 0) / list.length);
        };

        const stage1Avg = calcStage('أولى إعدادي');
        const stage2Avg = calcStage('ثانية إعدادي');
        const stage3Avg = calcStage('ثالثة إعدادي');

        const overallAvg = rows.length > 0 ? Math.round(rows.reduce((acc, r) => acc + r.rate, 0) / rows.length) : 0;
        const excellentCount = rows.filter(r => r.rate >= 85).length;
        const careCases = rows.filter(r => r.rate < 75).length;

        res.json({
            success: true,
            summary: {
                overallRate: `${overallAvg}%`,
                excellentCount,
                totalSessions: monthTotalSessions,
                careCases,
                stages: {
                    stage1: `${stage1Avg}%`,
                    stage2: `${stage2Avg}%`,
                    stage3: `${stage3Avg}%`
                }
            },
            data: rows
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
