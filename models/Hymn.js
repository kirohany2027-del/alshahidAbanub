const mongoose = require('mongoose');

const verseSchema = new mongoose.Schema({
    coptic: { type: String, required: true },
    arabized: { type: String, required: true },
    arabic: { type: String, required: true }
}, { _id: false });

const hymnSchema = new mongoose.Schema({
    hymnId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    season: { type: String, default: 'سنوي وطقسي' },
    grade: { type: String, default: 'جميع المراحل' },
    audioUrl: { type: String, default: '' },
    verses: [verseSchema]
}, { timestamps: true });

module.exports = mongoose.model('Hymn', hymnSchema);
