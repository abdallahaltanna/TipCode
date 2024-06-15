import db from '../database/connection';
import GenericError from '../errors/genericError';
import { ICrewMember } from '../utils/interfaces';
import PaginationSearch from '../utils/paginationSearch';

class CrewMembersService {
  // Get all crew members query with pagination and search
  static async getAllCrewMembersQuery(
    search: string,
    page: number,
    limit: number
  ): Promise<{
    total: number;
    currentPage: number;
    numberOfPages: number;
    data: ICrewMember[];
  }> {
    const result = await PaginationSearch<ICrewMember>(
      'CrewMembers',
      'Name',
      search,
      page,
      limit
    );
    return {
      total: result.total,
      currentPage: result.currentPage,
      numberOfPages: result.numberOfPages,
      data: result.data
    };
  }

  // Create crew member query
  static async createCrewMemberQuery({
    Name,
    Role,
    ExperienceLevel,
    AssignedSpaceshipID
  }: ICrewMember): Promise<ICrewMember> {
    const [result] = await db.query(
      'INSERT INTO CrewMembers (Name, Role, ExperienceLevel, AssignedSpaceshipID) VALUES (?, ?, ?, ?)',
      [Name, Role, ExperienceLevel, AssignedSpaceshipID]
    );

    return result as unknown as ICrewMember;
  }

  // Get crew member by id query
  static async getCrewMemberQuery(id: number) {
    if (isNaN(id)) {
      throw new GenericError(400, 'Please enter a valid id');
    }

    const [crewMember] = await db.query(
      'SELECT * FROM CrewMembers WHERE CrewMemberID = ?',
      [id]
    );

    if (Array.isArray(crewMember) && crewMember.length === 0) {
      throw new GenericError(404, 'Crew member not found');
    }

    return crewMember;
  }

  // Update crew member query
  static async updateCrewMemberQuery(
    id: number,
    { Name, Role, ExperienceLevel }: ICrewMember
  ): Promise<ICrewMember> {
    await this.getCrewMemberQuery(id);

    await db.query(
      'UPDATE CrewMembers SET Name = ?, Role = ?, ExperienceLevel = ? WHERE CrewMemberID = ?',
      [Name, Role, ExperienceLevel, id]
    );

    const [updatedCrewMember] = await db.query(
      'SELECT * FROM CrewMembers WHERE CrewMemberID = ?',
      [id]
    );

    return updatedCrewMember as unknown as ICrewMember;
  }

  // Patch crew member query
  static async patchCrewmemberQuery(
    id: number,
    updateFields: string,
    updateValues: Array<string | number>
  ): Promise<ICrewMember> {
    await this.getCrewMemberQuery(id);

    await db.query(
      `UPDATE CrewMembers SET ${updateFields} WHERE CrewMemberID = ?`,
      [...updateValues, id]
    );
    const [updatedCrewMember] = await db.query(
      'SELECT * FROM CrewMembers WHERE CrewMemberID = ?',
      [id]
    );

    return updatedCrewMember as unknown as ICrewMember;
  }

  // Delete crew member query
  static async deleteCrewMemberQuery(id: number): Promise<void> {
    await this.getCrewMemberQuery(id);

    await db.query('DELETE FROM CrewMembers WHERE CrewMemberID = ?', [id]);
  }
}

export default CrewMembersService;
