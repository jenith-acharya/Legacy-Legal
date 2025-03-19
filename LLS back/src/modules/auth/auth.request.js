const joi = require('joi');

const LoginDTO = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

const registerUserDTO = joi.object({
    fullName: joi.string().min(3).max(100).required(),  // Fixed Fullname issue
    email: joi.string().email().required(),
    password: joi.string().min(6).max(100).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required().messages({
        'any.only': 'Passwords must match'
    }),
    number: joi.string().pattern(/^\d{10}$/).required().messages({
        'string.pattern.base': 'Invalid phone number'
    }),
    facebook: joi.string().uri().allow(null),
    twitter: joi.string().uri().allow(null),
    linkedin: joi.string().uri().allow(null),
    role: joi.object({
        label: joi.string().valid('admin', 'member').required(),
        value: joi.string().valid('admin', 'member').required(),
    }).required(),
    image: joi.any().optional().default(null),
    description: joi.string().min(10).max(5000).required(),
});

const forgotPasswordDTO = joi.object({
    email: joi.string().email().required(),
    fullName: joi.string().required()
});

const ResetPasswordDTO = joi.object({
    forgetToken: joi.string().required(),
    newPassword: joi.string().min(6).max(100).required(),
    confirmPassword: joi.string().valid(joi.ref('newPassword')).required().messages({
        'any.only': 'Passwords must match'
    })
});

module.exports = {
    LoginDTO,
    registerUserDTO,
    forgotPasswordDTO,
    ResetPasswordDTO
};
