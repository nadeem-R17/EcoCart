const Joi = require('joi');

const validateProductAndUser = (data) => {
    const schema = Joi.object({
        productId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    });

    return schema.validate(data);
};

module.exports = validateProductAndUser;