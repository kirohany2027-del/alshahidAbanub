const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventId: { type: String, unique: true },
    type: { type: String, default: 'حصة' },
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    place: { type: String, default: 'قاعة إعدادي' },
    targetTimestamp: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
