import connection from '../database/connection';
import { FieldPacket } from 'mysql2';
import GenericError from '../errors/genericError';

type QueryResult = Array<{ count: number }>;

async function checkAssociation(
  spaceshipId: number
): Promise<{ mission: boolean; crew: boolean }> {
  const missionQuery = `SELECT COUNT(*) AS count FROM Missions WHERE SpaceshipID = ?`;
  const crewQuery = `SELECT COUNT(*) AS count FROM CrewMembers WHERE AssignedSpaceshipID = ?`;

  const results: { mission: boolean; crew: boolean } = {
    mission: false,
    crew: false
  };

  try {
    const [missionResults] = (await connection.query(missionQuery, [
      spaceshipId
    ])) as [QueryResult, FieldPacket[]];
    results.mission = missionResults[0].count > 0;

    const [crewResults] = (await connection.query(crewQuery, [
      spaceshipId
    ])) as [QueryResult, FieldPacket[]];
    results.crew = crewResults[0].count > 0;

    return results;
  } catch (err: any) {
    throw new GenericError(409, err);
  }
}

export default checkAssociation;
