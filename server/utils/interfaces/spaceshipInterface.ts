interface ISpaceship {
  SpaceshipID?: number;
  Name: string;
  Capacity: number;
  LaunchDate: string | Date;
  Status: string;
}

export default ISpaceship;
