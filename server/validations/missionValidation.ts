import joi from 'joi';

const missionSchema = joi.object({
  Destination: joi.string().min(3).max(100).trim().required().messages({
    'string.base': 'Name should be a string',
    'string.empty': 'Name should not be empty',
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}'
  }),
  Duration: joi.number().integer().min(1).required()
});

export default missionSchema;
