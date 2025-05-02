const { required } = require('joi');
const mongoose = require('mongoose');

const PracticeSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    slug:{
        type: String,
        required:true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team', // Assuming 'Team' is the collection for team members
        
    },
    date: {
        type: Date,
        
    }
});

const PracticeModel = mongoose.model('Practice', PracticeSchema);

module.exports = PracticeModel;
