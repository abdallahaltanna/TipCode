import { Request, Response } from 'express';

class MissionsController {
  static async getAllMissions(req: Request, res: Response) {
    res.send('Get all Missions');
  }

  static async createMission(req: Request, res: Response) {
    res.send('Create Mission');
  }

  static async getMission(req: Request, res: Response) {
    res.send('Get Mission');
  }

  static async updateMission(req: Request, res: Response) {
    res.send('Update Mission');
  }

  static async deleteMission(req: Request, res: Response) {
    res.send('Delete Mission');
  }
}

export default MissionsController;
