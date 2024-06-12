import { Request, Response, NextFunction } from 'express';
import { ValidationResult } from 'joi';

import CrewmembersService from '../services/crewmembersService';
import { ICrewMember } from '../utils/interfaces';
import { crewmemberSchema, patchCrewmemberSchema } from '../validations';
import GenericError from '../errors/genericError';

class CrewmembersController {
  // Get all crewmembers controller
  static async getAllCrewmembers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const crewmembers = await CrewmembersService.getAllCrewMembersQuery();
      res.status(200).json(crewmembers);
    } catch (error) {
      next(error);
    }
  }

  // Create crewmember controller
  static async createCrewmember(
    req: Request<{}, {}, Omit<ICrewMember, 'AssignedSpaceshipID'>>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const crewmember = req.body;

      const { error, value }: ValidationResult =
        crewmemberSchema.validate(crewmember);
      if (error) {
        throw new GenericError(400, error.details[0].message);
      }

      await CrewmembersService.createCrewMemberQuery({
        ...value,
        AssignedSpaceshipID:
          req.cookies && req.cookies.lastSpaceshipId
            ? req.cookies.lastSpaceshipId
            : null
      });

      res.status(201).json({ status: 201, msg: 'Crewmember created' });
    } catch (error) {
      next(error);
    }
  }

  // Get crewmember controller
  static async getCrewmember(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      const crewmember = await CrewmembersService.getCrewMemberQuery(
        Number(id)
      );
      res.status(200).json(crewmember);
    } catch (error) {
      next(error);
    }
  }

  // Update crewmember controller
  static async updateCrewmember(
    req: Request<{ id: string }, {}, Omit<ICrewMember, 'AssignedSpaceshipID'>>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { Name, Role, ExperienceLevel } = req.body;
    const { id } = req.params;
    try {
      const { error, value }: ValidationResult = crewmemberSchema.validate({
        Name,
        Role,
        ExperienceLevel
      });
      if (error) {
        throw new GenericError(400, error.details[0].message);
      }

      const crewmember = await CrewmembersService.updateCrewMemberQuery(
        Number(id),
        { ...value, AssignedSpaceshipID: req.cookies.lastSpaceshipId }
      );
      res.status(200).json(crewmember);
    } catch (error) {
      next(error);
    }
  }

  // Patch crewmember controller
  static async patchCrewmember(
    req: Request<{ id: string }, {}, ICrewMember>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const updates = req.body;
    const { id } = req.params;
    try {
      const { error, value }: ValidationResult =
        patchCrewmemberSchema.validate(updates);

      if (error) {
        throw new GenericError(400, error.details[0].message);
      }

      const updateFields = Object.keys(value)
        .map(key => `${key} = ?`)
        .join(', ');
      const updateValues: (string | number)[] = Object.values(value);
      updateValues.push(Number(id));

      const crewmember = await CrewmembersService.patchCrewmemberQuery(
        Number(id),
        updateFields,
        updateValues
      );
      res.status(200).json(crewmember);
    } catch (error) {
      next(error);
    }
  }

  // Delete crewmember controller
  static async deleteCrewmember(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    try {
      await CrewmembersService.deleteCrewMemberQuery(Number(id));
      res.status(200).json({ status: 200, msg: 'Crewmember deleted' });
    } catch (error) {
      next(error);
    }
  }
}

export default CrewmembersController;
