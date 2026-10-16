const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    tag: { type: String, default: 'عام' },
    date: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, default: 'أمانة الخدمة' }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);
