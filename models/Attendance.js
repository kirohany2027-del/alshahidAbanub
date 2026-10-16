const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    session: { type: String, required: true },
    date: { type: String, required: true }, // صيغة YYYY-MM-DD
    time: { type: String, default: '-' },
    status: { type: String, required: true, default: 'حاضر ✅' }, // حاضر ✅، غائب ❌، إذن 📝
    notes: { type: String, default: '' }
}, { timestamps: true });

// فهرس مركب لتسريع البحث وضمان سرعة التقارير
attendanceSchema.index({ code: 1, session: 1, date: 1 });
attendanceSchema.index({ date: 1, session: 1 });

module.exports = mongoose.model('Attendance', attendanceSchema);
