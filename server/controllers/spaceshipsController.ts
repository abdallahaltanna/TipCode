import { NextFunction, Request, Response } from 'express';
import { ValidationResult } from 'joi';

import SpaceshipsService from '../services/spaceshipsService';
import { ISpaceship } from '../utils/interfaces';
import { spaceshipsSchema, patchSpaceshipsSchema } from '../validations';
import GenericError from '../errors/genericError';

class SpaceshipsController {
  // Get all spaceships controller
  static async getAllSpaceships(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const spaceships = await SpaceshipsService.getAllSpaceshipsQuery();
      res.status(200).json(spaceships);
    } catch (error) {
      next(error);
    }
  }

  // Create spaceship controller
  static async createSpaceship(
    req: Request<{}, {}, Omit<ISpaceship, 'LaunchDate'>>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const spaceship = req.body;

      const { error, value }: ValidationResult =
        spaceshipsSchema.validate(spaceship);
      if (error) {
        throw new GenericError(400, error.details[0].message);
      }

      const LaunchDate = new Date(Date.now());
      await SpaceshipsService.createSpaceshipQuery({
        ...value,
        LaunchDate
      });
      res.status(201).json({ status: 201, msg: 'Spaceship created' });
    } catch (error) {
      next(error);
    }
  }

  // Get spaceship by id controller
  static async getSpaceship(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const spaceship = await SpaceshipsService.getSpaceshipQuery(Number(id));
      res.status(200).json(spaceship);
    } catch (error) {
      next(error);
    }
  }

  // Update spaceship controller
  static async updateSpaceship(
    req: Request<{ id: string }, {}, Omit<ISpaceship, 'LaunchDate'>>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { Name, Capacity, Status } = req.body;
    const { id } = req.params;
    try {
      const { error, value }: ValidationResult = spaceshipsSchema.validate({
        Name,
        Capacity,
        Status
      });
      if (error) {
        throw new GenericError(400, error.details[0].message);
      }

      const spaceship = await SpaceshipsService.updateSpaceshipQuery(
        Number(id),
        {
          ...value,
          LaunchDate: new Date(Date.now())
        }
      );
      res.status(200).json(spaceship);
    } catch (error) {
      next(error);
    }
  }

  // Patch spaceship controller
  static async patchSpaceship(
    req: Request<{ id: string }, {}, Omit<ISpaceship, 'LaunchDate'>>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const updates = req.body;
    const { id } = req.params;
    try {
      const { error, value }: ValidationResult =
        patchSpaceshipsSchema.validate(updates);

      if (error) {
        throw new GenericError(400, error.details[0].message);
      }

      const updateFields = Object.keys(value)
        .map(key => `${key} = ?`)
        .join(', ');
      const updateValues: (string | number)[] = Object.values(value);
      updateValues.push(Number(id));

      const spaceship = await SpaceshipsService.patchSpaceshipQuery(
        Number(id),
        updateFields,
        updateValues
      );
      res.status(200).json(spaceship);
    } catch (error) {
      next(error);
    }
  }

  // Delete spaceship controller
  static async deleteSpaceship(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    try {
      await SpaceshipsService.deleteSpaceshipQuery(Number(id));
      res.status(200).json({ status: 200, msg: 'Spaceship deleted' });
    } catch (error) {
      next(error);
    }
  }
}

export default SpaceshipsController;
