const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'servant', 'student'], default: 'student' },
    year: { type: String, default: '' },
    active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);
