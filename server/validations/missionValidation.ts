import joi from 'joi';

const missionSchema = joi.object({
  Destination: joi.number().integer().min(1).required(),
  Duration: joi.number().integer().min(1).required()
});

export default missionSchema;
