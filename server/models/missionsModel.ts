const Missions = `
    CREATE TABLE IF NOT EXISTS Missions (
        MissionID INT AUTO_INCREMENT PRIMARY KEY,
        SpaceshipID INT NOT NULL,
        Destination VARCHAR(255) NOT NULL,
        LaunchDate DATE NOT NULL,
        Duration INT NOT NULL,
        FOREIGN KEY (SpaceshipID) REFERENCES Spaceships(SpaceshipID)
    );
`;

export default Missions;
