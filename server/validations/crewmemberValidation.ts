import joi from 'joi';

const crewmemberSchema = joi.object({
  Name: joi.string().min(3).max(100).trim().required().messages({
    'string.base': 'Name should be a string',
    'string.empty': 'Name should not be empty',
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}'
  }),
  Role: joi
    .string()
    .trim()
    .required()
    .valid('Commander', 'Pilot', 'Engineer', 'Scientist', 'Medic', 'Technician')
    .messages({
      'string.base': 'Role should be a string',
      'string.empty': 'Role should not be empty',
      'string.valid':
        'Role should be one of Commander, Pilot, Engineer, Scientist, Medic, Technician'
    }),
  ExperienceLevel: joi
    .string()
    .valid('Novice', 'Intermediate', 'Advanced', 'Expert', 'Veteran')
    .trim()
    .required()
    .messages({
      'string.base': 'ExperienceLevel should be a string',
      'string.empty': 'ExperienceLevel should not be empty',
      'string.valid':
        'ExperienceLevel should be one of Junior, Mid-Level, Senior'
    })
});

export const patchCrewmemberSchema = joi.object({
  Name: joi.string().min(3).max(100).trim().required().messages({
    'string.base': 'Name should be a string',
    'string.empty': 'Name should not be empty',
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}'
  }),
  Role: joi
    .string()
    .trim()
    .valid('Commander', 'Pilot', 'Engineer', 'Scientist', 'Medic', 'Technician')
    .messages({
      'string.base': 'Role should be a string',
      'string.empty': 'Role should not be empty',
      'string.valid':
        'Role should be one of Commander, Pilot, Engineer, Scientist, Medic, Technician'
    }),
  ExperienceLevel: joi
    .string()
    .valid('Novice', 'Intermediate', 'Advanced', 'Expert', 'Veteran')
    .trim()
    .messages({
      'string.base': 'ExperienceLevel should be a string',
      'string.empty': 'ExperienceLevel should not be empty',
      'string.valid':
        'ExperienceLevel should be one of Junior, Mid-Level, Senior'
    })
});

export default crewmemberSchema;
