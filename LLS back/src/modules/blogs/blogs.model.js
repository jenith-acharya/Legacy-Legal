const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    Authorname: {
        type: String,
        required: true,

    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team', // Assuming 'Team' is the collection for team members
        required: true
    },
    date: {
        type: Date,
        required:true
    }
});

const BlogModel = mongoose.model('Blogs', BlogSchema);

module.exports = BlogModel;
