import { Request, Response } from 'express';

class SpaceshipsController {
  static async getAllSpaceships(req: Request, res: Response) {
    res.send('Get all spaceships');
  }

  static async createSpaceship(req: Request, res: Response) {
    res.send('Create spaceship');
  }

  static async getSpaceship(req: Request, res: Response) {
    res.send('Get spaceship');
  }

  static async updateSpaceship(req: Request, res: Response) {
    res.send('Update spaceship');
  }

  static async deleteSpaceship(req: Request, res: Response) {
    res.send('Delete spaceship');
  }
}

export default SpaceshipsController;
