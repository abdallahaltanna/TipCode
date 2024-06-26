import joi from 'joi';

const spaceshipsSchema = joi.object({
  Name: joi.string().min(3).max(100).trim().required().messages({
    'string.base': 'Name should be a string',
    'string.empty': 'Name should not be empty',
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}'
  }),
  Capacity: joi.number().integer().min(1).required(),
  Status: joi
    .string()
    .trim()
    .valid('Active', 'Inactive')
    .messages({
      'string.base': 'Status should be a string',
      'string.empty': 'Status should not be empty',
      'string.valid': 'Status should be one of Active, Inactive'
    })
    .required()
});

export const patchSpaceshipsSchema = joi.object({
  Name: joi.string().min(3).max(100).trim().required().messages({
    'string.base': 'Name should be a string',
    'string.empty': 'Name should not be empty',
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}'
  }),
  Capacity: joi.number().integer().min(1),
  Status: joi.string().trim().valid('Active', 'Inactive').messages({
    'string.base': 'Status should be a string',
    'string.empty': 'Status should not be empty',
    'string.valid': 'Status should be one of Active, Inactive'
  })
});

export default spaceshipsSchema;
