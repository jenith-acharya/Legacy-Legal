const joi = require('joi');



const PracticeAreaCreateDTO = joi.object({
    title: joi.string().min(3).max(150).required(),
    date: joi.date().iso().required(), // Ensures date follows ISO 8601 format
    link: joi.string().uri().required(),
    role: joi.object({
        label: joi.string().valid("admin", "member").required(),
        value: joi.string().valid("admin", "member").required(),
    }).required(),
    image: joi.any().optional().default(null),
    description: joi.string().min(10).max(5000).required(),
});

const PracticeAreaUpdateDTO = joi.object({
    title: joi.string().min(3).max(150).required(),
    date: joi.date().iso().required(), // Ensures date follows ISO 8601 format
    link: joi.string().uri().required(),
    role: joi.object({
        label: joi.string().valid("admin", "member").required(),
        value: joi.string().valid("admin", "member").required(),
    }).required(),
    image: joi.any().optional().default(null),
    description: joi.string().min(10).max(5000).required(),
});

module.exports = {
    PracticeAreaCreateDTO,
    PracticeAreaUpdateDTO
};
