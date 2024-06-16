import spaceshipsSchema, { patchSpaceshipsSchema } from './spaceshipValidation';
import crewmemberSchema, {
  patchCrewmemberSchema
} from './crewmemberValidation';
import missionSchema from './missionValidation';
import paginationSchema from './paginationValidation';

export {
  spaceshipsSchema,
  patchSpaceshipsSchema,
  crewmemberSchema,
  patchCrewmemberSchema,
  missionSchema,
  paginationSchema
};
