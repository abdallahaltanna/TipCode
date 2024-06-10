import { Request, Response } from 'express';

class CrewmembersController {
  static async getAllCrewmembers(req: Request, res: Response) {
    res.send('Get all Crewmembers');
  }

  static async createCrewmember(req: Request, res: Response) {
    res.send('Create Crewmember');
  }

  static async getCrewmember(req: Request, res: Response) {
    res.send('Get Crewmember');
  }

  static async updateCrewmember(req: Request, res: Response) {
    res.send('Update Crewmember');
  }

  static async deleteCrewmember(req: Request, res: Response) {
    res.send('Delete Crewmember');
  }
}

export default CrewmembersController;
