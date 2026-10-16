const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.warn('⚠️ تنبيه: لم يتم تعيين MONGODB_URI في ملف .env!');
            return false;
        }

        console.log('🔄 جاري الاتصال بقاعدة بيانات MongoDB Atlas...');
        const conn = await mongoose.connect(uri);

        console.log(`✅ تم الاتصال بنجاح بقاعدة بيانات MongoDB: ${conn.connection.host} / [${conn.connection.name}]`);
        return true;
    } catch (error) {
        console.error('❌ خطأ أثناء الاتصال بقاعدة بيانات MongoDB:', error.message);
        console.log('💡 ملحوظة: تأكد من تفعيل Network Access (IP Whitelist 0.0.0.0/0) في لوحة تحكم MongoDB Atlas');
        return false;
    }
};

module.exports = connectDB;
