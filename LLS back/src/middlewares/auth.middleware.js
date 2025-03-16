const jwt = require('jsonwebtoken');
const userService = require('../modules/team members/teammember.services');

const loginCheck = async (req, res, next) => {
    try {
        let token = req.headers['authorization'] || null;

        if (!token) {
            throw {
                statusCode: 401,
                message: 'Unauthorized, Please login first',
                detail: null
            };
        }

        // Extract Bearer token
        token = token.split(' ').pop(); 

        // Verify token
        const data = jwt.verify(token, process.env.JWT_SECRET);  

        // TODO: Fetch user from database
        let user = await userService.getSingleUserById({ _id: data.sub });

        //  Check if user exists
        if (!user) {
            throw {
                statusCode: 401,
                message: 'Unauthorized, User not found',
                detail: null
            };
        }

        // this is optional : Check if user is active
        if (user.status !== 'active') { 
            throw {
                statusCode: 403,
                message: 'Forbidden, User is inactive',
                detail: null
            };
        }

        // Attach user details to request
        req.authUser = {
            id: user._id,
            email: user.email,
            role: user.role,
            status: user.status,
            fullName: user?.fullName || null,
            profile: user?.image || null,
            phone: user?.phone || null,
        };

        next();
    } catch (exception) {
        console.log('Exception in login check middleware', exception);
        
        let errorMessage = 'Unauthorized';
        if (exception.name === 'JsonWebTokenError' || exception.name === 'TokenExpiredError') {
            errorMessage = 'Invalid or expired token';
        } else if (exception.message) {
            errorMessage = exception.message;
        }

        next({
            statusCode: exception.statusCode || 401,
            message: errorMessage,
            detail: null
        });
    }
};

module.exports = {
    loginCheck
};
