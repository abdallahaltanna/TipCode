import { Request, Response, NextFunction } from 'express';
import MissionsService from '../services/missionsService';
import { missionSchema } from '../validations';
import { ValidationResult } from 'joi';
import GenericError from '../errors/genericError';
import { IMission, IPaginationSearch } from '../utils/interfaces';

class MissionsController {
  // Get all missions controller
  static async getAllMissions(
    req: Request<{}, {}, {}, IPaginationSearch>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { search, page = 1, limit = 5 } = req.query;
      const pageNum = parseInt(page as string, 10);
      const limitNum = parseInt(limit as string, 10);

      const missions = await MissionsService.getAllMissionsQuery(
        search as string,
        pageNum,
        limitNum
      );
      res.status(200).json(missions);
    } catch (error) {
      next(error);
    }
  }

  // Create mission controller
  static async createMission(
    req: Request<{}, {}, Omit<IMission, 'LaunchDate' | 'SpaceshipID'>>,
    res: Response,
    next: NextFunction
  ) {
    const mission = req.body;
    try {
      const { error, value }: ValidationResult =
        missionSchema.validate(mission);
      if (error) {
        throw new GenericError(400, error.details[0].message);
      }

      const LaunchDate = new Date(Date.now());

      await MissionsService.createMissionQuery({
        ...value,
        LaunchDate,
        SpaceshipID: req.cookies.lastSpaceshipId
      });

      res.status(201).json({ status: 201, msg: 'Mission created' });
    } catch (error) {
      next(error);
    }
  }

  // Get mission controller
  static async getMission(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      const mission = await MissionsService.getMissionQuery(Number(id));
      res.status(200).json(mission);
    } catch (error) {
      next(error);
    }
  }

  // Update mission controller
  static async updateMission(
    req: Request<
      { id: string },
      {},
      Omit<IMission, 'LaunchDate' | 'SpaceshipID'>
    >,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const { Destination, Duration } = req.body;
    try {
      const { error, value } = missionSchema.validate({
        Destination,
        Duration
      });

      if (error) {
        throw new GenericError(400, error.details[0].message);
      }

      const mission = await MissionsService.updateMissionQuery(Number(id), {
        ...value,
        LaunchDate: new Date(Date.now())
      });

      res.status(200).json(mission);
    } catch (error) {
      next(error);
    }
  }

  // Patch mission controller
  static async patchMission(
    req: Request<{ id: string }, {}, IMission>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const updates = req.body;
    const { id } = req.params;
    try {
      const { error, value }: ValidationResult =
        missionSchema.validate(updates);

      if (error) {
        throw new GenericError(400, error.details[0].message);
      }

      const updateFields = Object.keys(value)
        .map(key => `${key} = ?`)
        .join(', ');
      const updateValues: (string | number)[] = Object.values(value);
      updateValues.push(Number(id));

      const mission = await MissionsService.patchMissionQuery(
        Number(id),
        updateFields,
        updateValues
      );
      res.status(200).json(mission);
    } catch (error) {
      next(error);
    }
  }

  // Delete mission controller
  static async deleteMission(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    try {
      await MissionsService.deleteMissionQuery(Number(id));
      res.status(200).json({ status: 200, msg: 'Mission deleted' });
    } catch (error) {
      next(error);
    }
  }
}

export default MissionsController;
