import db from '../database/connection';
import GenericError from '../errors/genericError';
import { IMission } from '../utils/interfaces';

class MissionsService {
  // Get all missions query
  static async getAllMissionsQuery(): Promise<IMission[]> {
    const [missions] = await db.query('SELECT * FROM Missions');
    return missions as IMission[];
  }

  // Create mission query
  static async createMissionQuery({
    Destination,
    LaunchDate,
    Duration,
    SpaceshipID
  }: IMission): Promise<IMission> {
    const [result] = await db.query(
      'INSERT INTO Missions (Destination, LaunchDate, Duration, SpaceshipID) VALUES (?, ?, ?, ?)',
      [Destination, LaunchDate, Duration, SpaceshipID]
    );

    return result as unknown as IMission;
  }

  // Get mission by id query
  static async getMissionQuery(id: number) {
    if (isNaN(id)) {
      throw new GenericError(400, 'Please enter a valid id');
    }

    const [mission] = await db.query(
      'SELECT * FROM Missions WHERE MissionID = ?',
      [id]
    );

    if (Array.isArray(mission) && mission.length === 0) {
      throw new GenericError(404, 'Mission not found');
    }

    return mission;
  }

  // Update mission query
  static async updateMissionQuery(
    id: number,
    { Destination, LaunchDate, Duration, SpaceshipID }: IMission
  ): Promise<IMission> {
    await this.getMissionQuery(id);

    await db.query(
      'UPDATE Missions SET Destination = ?, LaunchDate = ?, Duration = ?, SpaceshipID = ? WHERE MissionID = ?',
      [Destination, LaunchDate, Duration, SpaceshipID, id]
    );

    const [updatedMission] = await db.query(
      'SELECT * FROM Missions WHERE MissionID = ?',
      [id]
    );

    return updatedMission as unknown as IMission;
  }

  // Patch mission query
  static async patchMissionQuery(
    id: number,
    updateFields: string,
    updateValues: Array<string | number>
  ): Promise<IMission> {
    await this.getMissionQuery(id);

    await db.query(`UPDATE Missions SET ${updateFields} WHERE MissionID = ?`, [
      ...updateValues,
      id
    ]);
    const [updatedMission] = await db.query(
      'SELECT * FROM Missions WHERE MissionID = ?',
      [id]
    );

    return updatedMission as unknown as IMission;
  }

  // Delete mission query
  static async deleteMissionQuery(id: number): Promise<void> {
    await this.getMissionQuery(id);

    await db.query('DELETE FROM Missions WHERE MissionID = ?', [id]);
  }
}

export default MissionsService;
