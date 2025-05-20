const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    class: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true
    },
    feeStatus: {
        type: Map,
        of: Boolean,
        default: new Map()
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Student', studentSchema); 