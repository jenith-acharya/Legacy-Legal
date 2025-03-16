const joi = require('joi');

// Define the allowed status types for validation
const statusType = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE'
};

const TeamMemberCreateDTO = joi.object({
    fullname: joi.string().min(3).max(50).required(),
    role: joi.string().min(3).max(50).required(),
    description: joi.string().empty(null, '').optional().default(null),
    email: joi.string().email().required(),
    phone: joi.string().pattern(/^[0-9]{10,15}$/).required(), // Allows phone numbers between 10 to 15 digits
    image: joi.string().uri().empty(null, '').optional().default(null),
    facebook: joi.string(),
    twitter: joi.string(),
    linkedin: joi.string()
});

const TeamMemberUpdateDTO = joi.object({
    fullname: joi.string().min(3).max(50).optional(),
    role: joi.string().min(3).max(50).optional(),
    description: joi.string().empty(null, '').optional().default(null),
    email: joi.string().email().optional(),
    phone: joi.string().pattern(/^[0-9]{10,15}$/).optional(),
    image: joi.string().uri().empty(null, '').optional().default(null),
    facebook:joi.string(),
    twitter: joi.string(),
    linkedin: joi.string()
});

module.exports = {
    TeamMemberCreateDTO,
    TeamMemberUpdateDTO
};
