//  Table: CrewMembers
const CrewMembers = `
    CREATE TABLE IF NOT EXISTS CrewMembers (
        CrewMemberID INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Role VARCHAR(255) NOT NULL,
        ExperienceLevel VARCHAR(255) NOT NULL,
        AssignedSpaceshipID INT NULL,
        FOREIGN KEY (AssignedSpaceshipID) REFERENCES Spaceships(SpaceshipID) ON DELETE SET NULL
    );
`;

export default CrewMembers;
