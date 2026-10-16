const mongoose = require('mongoose');

const servantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    stage: { type: String, default: 'الإشراف العام' },
    phone: { type: String, default: '' },
    duties: { type: String, default: '' },
    active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Servant', servantSchema);
