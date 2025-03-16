const { hasPermission } = require('../../middlewares/rbac.middleware');
const { uploadFile } = require('../../middlewares/uploader.middleware');
const authcontroller = require('./auth.controller');
const {setPath} = require('../../middlewares/uploader.middleware');
const { loginCheck } = require('../../middlewares/auth.middleware');
const {bodyValidator} = require('../../middlewares/validator.middlware');
const { LoginDTO, registerUserDTO } = require('./auth.request');
const { TeamMemberCreateDTO } = require('../team members/team.request');


const authRouter = require('express').Router();


//register user route

authRouter.post('/register',bodyValidator(registerUserDTO), authcontroller.registerUser)
authRouter.post('/signin',bodyValidator(LoginDTO),authcontroller.loginUser);

authRouter.get('/me',loginCheck,authcontroller.getLoggedInUser);











module.exports = authRouter
;