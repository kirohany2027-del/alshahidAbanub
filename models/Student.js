const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    year: { type: String, required: true }, // أولى إعدادي، ثانية إعدادي، ثالثة إعدادي
    phone: { type: String, default: '' },
    parentPhone: { type: String, default: '' },
    confessionFather: { type: String, default: '' },
    address: { type: String, default: '' },
    points: { type: Number, default: 0 },
    stars: { type: Number, default: 0 },
    badge: { type: String, default: 'شماس واعد ⭐' },
    attendanceRate: { type: String, default: '100%' },
    hymnsLevel: { type: String, default: 'جيد' },
    notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
