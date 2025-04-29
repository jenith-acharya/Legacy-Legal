const Joi = require('joi'); // Assuming Joi is being used for validation

const bodyValidator = (schema) => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      // console.log(data);

      // single file
      if (req.file) {
        data[req.file.fieldname] = req.file.filename;
        // console.log('Data after req.file field included', data);
      } else if (req.files) {
        // Handle multiple files (if needed)
      }

      // All data is stored in req.body
      // Now validate the package using Joi
      await schema.validateAsync(data, { abortEarly: false });

      next();
    } catch (error) {
      // Check if error.details exists and handle accordingly
      let detail = {};
      
      if (error.details) {
        // Validate only if error.details is defined
        error.details.forEach((err) => {
          console.log('error at validation middleware');
          detail[err.path[0]] = err.message;
        });
      } else {
        // If error.details is undefined, log the error message
        detail = { general: error.message };
      }

      // Send the error response
      next({
        statusCode: 400,
        detail: detail,
        message: 'Validation Error',
      });
    }
  };
};

module.exports = { bodyValidator };
