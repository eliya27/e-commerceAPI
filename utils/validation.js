const Joi = require("joi");

const userValidation = (userdata) => {
  const userSchemaValidation = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean(),
  });
  return userSchemaValidation.validate(userdata);
};

const userLoginValidation = (userdata) => {
  const userSchemaValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  return userSchemaValidation.validate(userdata);
};

const productValidation = (productdata) => {
  const productSchemaValidation = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    img: Joi.string(),
    categories: Joi.array(),
    size: Joi.string(),
    color: Joi.string(),
    price: Joi.number().required(),
  });
  return productSchemaValidation.validate(productdata);
};
module.exports.userValidation = userValidation;
module.exports.userLoginValidation = userLoginValidation;
module.exports.productValidation = productValidation;
