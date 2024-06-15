//  Table: Missions
const Missions = `
    CREATE TABLE IF NOT EXISTS Missions (
        MissionID INT AUTO_INCREMENT PRIMARY KEY,
        SpaceshipID INT NULL,
        Destination INT NOT NULL CHECK (Destination > 0),
        LaunchDate DATE NOT NULL,
        Duration INT NOT NULL CHECK (Duration > 0),
        FOREIGN KEY (SpaceshipID) REFERENCES Spaceships(SpaceshipID)
    );
`;

export default Missions;
