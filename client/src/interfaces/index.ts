// ISpaceship interface
interface ISpaceship {
  SpaceshipID: number;
  Name: string;
  Capacity: number;
  LaunchDate: string;
  Status: string;
}

// ICrewmember interface
interface ICrewmember {
  CrewMemberID: number;
  Name: string;
  Role: number;
  ExperienceLevel: string;
  AssignedSpaceshipID: string;
}

// IMission interface
interface IMission {
  MissionID: number;
  SpaceshipID: number;
  Destination: number;
  LaunchDate: string;
  Duration: number;
}

export type { ISpaceship, ICrewmember, IMission };
