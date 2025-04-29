const joi = require('joi');
const { statusType } = require('../../config/constants.config');

const BlogCreateDTO = joi.object({
    Authorname: joi.string().min(3).max(100).required(),
    date: joi.date().iso().required(), 
    title: joi.string().min(3).max(150).required(),
    status: joi.string().valid(...Object.values(statusType)).required(),
    image: joi.string().allow(null,'').optional().default(null), 
    description: joi.string().min(10).max(5000).required(),
    
});

const BlogUpdateDTO = joi.object({
    Authorname: joi.string().min(3).max(100).optional(),
    date: joi.date().iso().required(), 
    title: joi.string().min(3).max(150).optional(),
    status: joi.string().valid(...Object.values(statusType)).required(), 
     
    image: joi.string().allow(null,'').optional().default(null), 
    description: joi.string().min(10).max(5000).optional(),
    
});

module.exports = {
    BlogCreateDTO,
    BlogUpdateDTO
};
