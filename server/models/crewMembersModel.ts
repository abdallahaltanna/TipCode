//  Table: CrewMembers
const CrewMembers = `
    CREATE TABLE IF NOT EXISTS CrewMembers (
        CrewMemberID INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Role ENUM('Commander', 'Pilot', 'Engineer', 'Scientist', 'Medic', 'Technician') DEFAULT 'Technician' NOT NULL,
        ExperienceLevel ENUM('Novice', 'Intermediate', 'Advanced', 'Expert', 'Veteran') DEFAULT 'Novice' NOT NULL,
        AssignedSpaceshipID INT NULL,
        FOREIGN KEY (AssignedSpaceshipID) REFERENCES Spaceships(SpaceshipID) ON DELETE SET NULL
    );
`;

export default CrewMembers;
