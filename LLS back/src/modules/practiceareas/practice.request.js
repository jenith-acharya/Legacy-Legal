const joi = require('joi');



const PracticeAreaCreateDTO = joi.object({
    title: joi.string().min(3).max(150).required(),
    status: joi.string().required(),
    image: joi.any().optional().default(null),
    description: joi.string().min(10).max(5000).required(),
});

const PracticeAreaUpdateDTO = joi.object({
    title: joi.string().min(3).max(150).required(),
    status: joi.string().required(),
    image: joi.any().optional().default(null),
    description: joi.string().min(10).max(5000).required(),
});

module.exports = {
    PracticeAreaCreateDTO,
    PracticeAreaUpdateDTO
};
