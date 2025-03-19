const { hasPermission } = require('../../middlewares/rbac.middleware');
const { uploadFile } = require('../../middlewares/uploader.middleware');
const authcontroller = require('./auth.controller');
const {setPath} = require('../../middlewares/uploader.middleware');
const { loginCheck } = require('../../middlewares/auth.middleware');
const {bodyValidator} = require('../../middlewares/validator.middlware');
const { registerUserDTO, LoginDTO, forgotPasswordDTO, ResetPasswordDTO } = require('./auth.request');


const authRouter = require('express').Router();


//register user route

authRouter.post('/register',bodyValidator(registerUserDTO), authcontroller.registerMember)
authRouter.post('/signin',bodyValidator(LoginDTO),authcontroller.loginMember);

authRouter.get('/me',loginCheck,authcontroller.getLoggedInMember);

authRouter.post('/forgot-password', bodyValidator(forgotPasswordDTO), authcontroller.forgotPassword);
authRouter.post('/reset-password', bodyValidator(ResetPasswordDTO), authcontroller.resetPassword);

authRouter.get('/activate/:token',authcontroller.activateMember);

authRouter.get('/resend-activation-token/:token ',hasPermission(['admin','members']),authcontroller.resendActivationToken)

authRouter.get('/refresh-token',authcontroller.refreshToken)




module.exports = authRouter
;