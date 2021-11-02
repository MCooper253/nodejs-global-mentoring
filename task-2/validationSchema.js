const Joi = require('joi');
// const validator = require('express-joi-validation').createValidator({});

const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')).required(),
  age: Joi.number().integer().min(4).max(130).required()
});



module.exports = {
  userSchema: userSchema
};