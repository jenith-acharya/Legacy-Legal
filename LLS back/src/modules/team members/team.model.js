const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    role:{
        type:String,
        required: true
    },
    facebook:{
        type:String,
        unique:true
    },
    twitter:{
        type: String,
        unique:true
    },
    linkedin:{
        type: String,
        unique:true
    },
    activationtoken: {
        type: String
    },
    activatedfor: {
        type: Date
    },
    forgettoken: {
        type: String
    },
    forgetfor: {
        type: Date
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team' // Assuming team members can create other team members
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
});

const TeamModel = mongoose.model('Team', TeamSchema);

module.exports = TeamModel;
