// ISpaceship interface
interface ISpaceship {
  SpaceshipID: number;
  Name: string;
  Capacity: number;
  LaunchDate: string;
  Status: string;
}

// ISpaceshipPagination interface
interface ISpaceshipPagination {
  spaceships: ISpaceship[];
  currentPage: number;
  total: number;
  numberOfPages: number;
}

// ICrewmember interface
interface ICrewmember {
  CrewMemberID: number;
  Name: string;
  Role: number;
  ExperienceLevel: string;
  AssignedSpaceshipID: string;
}

// ICrewmemberPagination interface
interface ICrewmemberPagination {
  crewMembers: ICrewmember[];
  currentPage: number;
  total: number;
  numberOfPages: number;
}

// IMission interface
interface IMission {
  MissionID: number;
  SpaceshipID: number;
  Destination: number;
  LaunchDate: string;
  Duration: number;
}

// IMissionPagination interface
interface IMissionPagination {
  missions: IMission[];
  currentPage: number;
  total: number;
  numberOfPages: number;
}

export type {
  ISpaceship,
  ICrewmember,
  IMission,
  ICrewmemberPagination,
  ISpaceshipPagination,
  IMissionPagination
};
