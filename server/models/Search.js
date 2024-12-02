const searchSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    profession: { type: String, enum: ['fitness trainer', 'yoga', 'pilates', 'nlp', 'psychology', 'sociology'], required: false },
    location: { 
        type: { 
            type: String, 
            enum: ['Point'], 
            default: 'Point' 
        },
        coordinates: { type: [Number], required: false } // [longitude, latitude]
    },
    maxDistance: { type: Number, required: false }, // מרחק מקסימלי
    viaZoom: { type: Boolean, required: false }, // אם רוצים סינון של זום בלבד
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Search', searchSchema);
