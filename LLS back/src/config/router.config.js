const express = require('express');
const router = express.Router(); 

const blogsrouter = require('../modules/blogs/blogs.router');
const practicerouter = require('../modules/practiceareas/practice.router');
const authRouter = require("../modules/auth/auth.router");
const teammemberrouter = require('../modules/team members/teammembers.router'); 

// Define routes
router.use('/auth', authRouter);
router.use('/blogs', blogsrouter);
router.use('/practiceareas', practicerouter);
router.use('/teammembers', teammemberrouter);

module.exports = router;
