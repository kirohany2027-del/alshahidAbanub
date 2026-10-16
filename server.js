require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedData = require('./utils/seeder');

const app = express();

// إعدادات الوسيط البرمجي (Middleware)
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// مسار فحص الحالة الحية للسيرفر (Health Check)
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        service: 'سيرفر حصة الشهيد أبانوب لإعدادي ✝️',
        timestamp: new Date().toISOString()
    });
});

// تسجيل مسارات الـ API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/hymns', require('./routes/hymnRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/finances', require('./routes/financeRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes'));
app.use('/api/backup', require('./routes/backupRoutes'));

// معالجة المسارات غير المعروفة
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'المسار المطلوب غير موجود في خادم حصة الشهيد أبانوب' });
});

// معالجة الأخطاء المركزية
app.use((err, req, res, next) => {
    console.error('❌ خطأ داخلي في السيرفر:', err.stack);
    res.status(500).json({ success: false, message: 'حدث خطأ غير متوقع في الخادم', error: err.message });
});

const PORT = process.env.PORT || 5000;

// بدء تشغيل الخادم والاتصال بقاعدة البيانات
const startServer = async () => {
    const isConnected = await connectDB();
    if (isConnected) {
        await seedData();
    } else {
        console.warn('⚠️ السيرفر يعمل بدون اتصال مباشر بـ MongoDB. يرجى ضبط MONGODB_URI في ملف .env');
    }

    app.listen(PORT, () => {
        console.log(`=======================================================`);
        console.log(`🚀 خادم حصة الشهيد أبانوب يعمل الآن على المنفذ: ${PORT}`);
        console.log(`🔗 رابط الصحة: http://localhost:${PORT}/api/health`);
        console.log(`=======================================================`);
    });
};

startServer();
