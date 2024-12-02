const mongoose = require('mongoose');
const professionalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    professions: { 
        type: [String], 
        enum: ['fitness trainer', 'yoga', 'pilates', 'nlp', 'psychology', 'sociology'], 
        required: true 
    },
    services: {
        inPerson: { type: Boolean, default: true },
        viaZoom: { type: Boolean, default: false }
    },
    description: { type: String, required: false },
    images: { type: [String], required: false }, // גלריית תמונות
    hourlyRate: { type: Number, required: false }, // מחיר שעה אופציונלי
    rating: { type: Number, default: 0 }, // דירוג ממוצע
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] // קשר לדירוגים
});

module.exports = mongoose.model('Professional', professionalSchema);