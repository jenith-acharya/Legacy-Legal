const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    fullName: {   
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    phone: {   
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    },
    facebook: {
        type: String,
        unique: true
    },
    twitter: {
        type: String,
        unique: true
    },
    linkedin: {
        type: String,
        unique: true
    },
    activationToken: {
        type: String
    },
    activatedFor: {
        type: Date
    },
    // Added Forgot Password Fields
    forgetToken: { 
        type: String,
        default: null
    },
    forgetFor: { 
        type: Date,
        default: null
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team' 
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
});

const TeamModel = mongoose.model('Team', TeamSchema);

module.exports = TeamModel;
