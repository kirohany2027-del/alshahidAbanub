const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
    date: { type: String, required: true },
    desc: { type: String, required: true },
    cat: { type: String, default: 'عام' },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    user: { type: String, default: 'الإدارة' }
}, { timestamps: true });

module.exports = mongoose.model('Finance', financeSchema);
