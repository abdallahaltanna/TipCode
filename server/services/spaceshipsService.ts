import db from '../database/connection';
import GenericError from '../errors/genericError';
import { ISpaceship } from '../utils/interfaces';

class SpaceshipsService {
  // Get all spaceships query
  static async getAllSpaceshipsQuery(): Promise<ISpaceship[]> {
    const [spaceships] = await db.query('SELECT * FROM Spaceships');
    return spaceships as ISpaceship[];
  }

  // Create spaceship query
  static async createSpaceshipQuery({
    Name,
    Capacity,
    LaunchDate,
    Status
  }: ISpaceship) {
    const [result] = await db.query(
      'INSERT INTO Spaceships (Name, Capacity, LaunchDate, Status) VALUES (?, ?, ?, ?)',
      [Name, Capacity, LaunchDate, Status]
    );

    return result;
  }

  // Get spaceship by id query
  static async getSpaceshipQuery(id: number) {
    if (isNaN(id)) {
      throw new GenericError(400, 'Please enter a valid id');
    }

    const [spaceship] = await db.query(
      'SELECT * FROM Spaceships WHERE SpaceshipID = ?',
      [id]
    );

    if (Array.isArray(spaceship) && spaceship.length === 0) {
      throw new GenericError(404, 'Spaceship not found');
    }

    return spaceship;
  }

  // Update spaceship query
  static async updateSpaceshipQuery(
    id: number,
    { Name, Capacity, Status, LaunchDate }: ISpaceship
  ) {
    await this.getSpaceshipQuery(id);

    await db.query(
      'UPDATE Spaceships SET Name = ?, Capacity = ?, LaunchDate = ?, Status = ? WHERE SpaceshipID = ?',
      [Name, Capacity, LaunchDate, Status, id]
    );

    const [updatedSpaceship] = await db.query(
      'SELECT * FROM Spaceships WHERE SpaceshipID = ?',
      [id]
    );

    return updatedSpaceship;
  }

  // Patch spaceship query
  static async patchSpaceshipQuery(
    id: number,
    updateFields: string,
    updateValues: Array<string | number>
  ) {
    await this.getSpaceshipQuery(id);

    await db.query(
      `UPDATE Spaceships SET ${updateFields} WHERE SpaceshipID = ?`,
      [...updateValues, id]
    );

    const [updatedSpaceship] = await db.query(
      'SELECT * FROM Spaceships WHERE SpaceshipID = ?',
      [id]
    );

    return updatedSpaceship;
  }

  // Delete spaceship query
  static async deleteSpaceshipQuery(id: number) {
    await this.getSpaceshipQuery(id);

    await db.query('DELETE FROM Spaceships WHERE SpaceshipID = ?', [id]);
  }
}

export default SpaceshipsService;
