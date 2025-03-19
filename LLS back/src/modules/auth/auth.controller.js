const bcrypt = require('bcryptjs');
const mailService = require('../../../services/mail.service');
const { randomStringGenerator } = require('../../../utilis/helper');
const teamService = require('../team members/teammember.services');
const { statusType } = require('../../config/constants.config');
const jwt = require('jsonwebtoken');

class AuthController {

    loginMember = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            console.log(`Received Email: ${email}`);
            console.log(`Received Password: ${password}`);
    
            const user = await teamService.getSingleMemberByFilter({ email });
            console.log('User Found:', user);
    
            if (!user) {
                console.log('User not found in database');
                throw { statusCode: 422, message: 'Member not found' };
            }
    
            console.log('Stored Hashed Password:', user.password);
    
            const isMatch = bcrypt.compareSync(password, user.password);
            console.log('Password Comparison Result:', isMatch);
    
            if (!isMatch) {
                throw { statusCode: 422, message: 'Credentials do not match' };
            }
    
            if (user.status === statusType.ACTIVE || user.status === 'active') {
                const token = jwt.sign(
                    { sub: user._id },
                    process.env.JWT_SECRET
                );
    
                res.json({
                    result: {
                        userDetail: {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        },
                        token
                    },
                    message: "Login Success",
                    meta: null
                });
            } else {
                throw { statusCode: 422, message: 'Your account has not been activated yet' };
            }
        } catch (exception) {
            console.error('Exception:', exception);
            next(exception);
        }
    };
    


    registerMember = async (req, res, next) => {
        try {
            let data = teamService.transformMemberCreate(req);
            console.log(data);

            const user = await teamService.createMember(data);
            await mailService.sendActivationEmail(data);

            res.status(200).json({
                result: user || null,
                message: "User registered successfully. Activation token sent successfully",
                meta: null
            });
        } catch (error) {
            console.error(`Error in registerUser: ${error.message}`, error);
            next(error);
        }
    };

    getLoggedInMember = async (req, res, next) => {
        try {
            res.json({
                result: req.authUser,
                message: 'User fetched successfully',
                meta: null
            });
        } catch (exception) {
            console.error(`Error in getLoggedInUser: ${exception.message}`, exception);
            next(exception);
        }
    };

    activateMember = async (req, res, next) => {
        try {
            const { token } = req.params;
            if (!token || token.length < 10) {  // Improved token length check
                throw { statusCode: 422, message: 'Invalid activationToken' };
            }

            const user = await teamService.getSingleMemberByFilter({ activationToken: token });
            console.log(user);

            const today = Date.now();
            const activateFor = new Date(user.activatedFor).getTime();

            if (today > activateFor) {
                throw { statusCode: 422, message: 'Token Expired' };
            }

            user.activationToken = null;
            user.activatedFor = null;
            user.status = statusType.ACTIVE;
            await user.save();

            res.json({
                result: null,
                message: 'User activated successfully. Please login to continue.',
                meta: null
            });
        } catch (exception) {
            console.log(exception);
            next(exception);
        }
    }


    resendActivationToken = async (req, res, next) => {
        try {
            const { token } = req.params;
            const user = await teamService.getSingleMemberByFilter({ token });

            const updatedUser = teamService.generateMemberActivationToken(user);
            await updatedUser.save();

            await mailService.sendMail({
                email: updatedUser.email,
                activationToken: updatedUser.activationToken,
                name: updatedUser.name,
                sub: 'User activation token'
            });

            res.json({
                result: null,
                message: 'Activation token sent successfully',
                meta: null
            });
        } catch (exception) {
            console.error(`Error in resendActivationToken: ${exception.message}`, exception);
            next(exception);
        }
    };

    refreshToken = async (req, res, next) => {
        try {
            const token = req.headers['authorization']?.replace('Bearer ', '') || null;// Fixed token extraction
            if (!token) {
                throw { statusCode: 401, message: 'Token required' };
            }
    
            const { sub, type } = jwt.verify(token, process.env.JWT_SECRET);
    
            if (!type || type !== 'refresh') {
                throw { statusCode: 401, message: 'Refresh token required' };
            }
    
            const user = await teamService.getSingleMemberByFilter({ _id: sub });
            if (!user) {
                throw { statusCode: 404, message: 'User not found' };
            }
    
            const accessToken = jwt.sign({ sub }, process.env.JWT_SECRET, { expiresIn: '1 day' });
            const refreshToken = jwt.sign({ sub, type: 'refresh' }, process.env.JWT_SECRET, { expiresIn: '1 day' });
    
            res.json({
                result: {
                    token: accessToken,
                    refreshToken: refreshToken,
                },
                message: 'Token refreshed successfully',
                meta: null
            });
        } catch (exception) {
            console.error('Error in refreshToken:', exception);
            next(exception);
        }
    }
    forgotPassword = async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await teamService.getSingleMemberByFilter({ email });

            if (!user) {
                throw { statusCode: 404, message: 'User not found' };
            }

            const forgetToken = randomStringGenerator(20);
            user.forgetToken = forgetToken;
            user.forgetFor = Date.now() + 3600000; // Token valid for 1 hour
            await user.save();

            await mailService.sendMail({
                to: email,
                subject: "Password Reset Request",
                message: `
                    Dear ${user.fullName},<br>
                    Click the following link to reset your password:<br>
                    <a href="${process.env.FRONTEND_URL || "legacylegal.com.np"}/reset-password/${forgetToken}">Reset Password</a>
                    <p>This link is valid for 1 hour.</p>
                `,
            });

            res.json({
                result: null,
                message: "Password reset link sent to your email",
                meta: null
            });

        } catch (exception) {
            console.error('Error in forgotPassword:', exception);
            next(exception);
        }
    }

    // Reset Password
    resetPassword = async (req, res, next) => {
        try {
            const { forgetToken, newPassword } = req.body;
            const user = await teamService.getSingleMemberByFilter({ forgetToken });

            if (!user || user.forgetFor < Date.now()) {
                throw { statusCode: 400, message: 'Invalid or expired token' };
            }

            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(newPassword, salt);

            user.forgetToken = null;
            user.forgetFor = null;
            await user.save();

            res.json({
                result: null,
                message: "Password reset successful",
                meta: null
            });

        } catch (exception) {
            console.error('Error in resetPassword:', exception);
            next(exception);
        }
    }

}

const authcontroller = new AuthController();
module.exports = authcontroller;
