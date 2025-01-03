const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { 
        type: String, 
        enum: ['male', 'female', 'other'], 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['admin', 'professional', 'customer'], 
        required: true 
    },
    location: { 
        type: { 
            type: String, 
            enum: ['Point'], 
            default: 'Point' 
        },
        coordinates: { type: [Number], required: true } // [longitude, latitude]
    },
    birthDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });
userSchema.index({ location: '2dsphere' }); // Ensure geospatial indexing for proximity search
module.exports = mongoose.model('User', userSchema);
