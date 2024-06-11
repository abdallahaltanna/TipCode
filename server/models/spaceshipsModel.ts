//  Table: Spaceships

const Spaceships = `
    CREATE TABLE IF NOT EXISTS Spaceships (
        SpaceshipID INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Capacity INT NOT NULL CHECK (Capacity > 0),
        LaunchDate DATE NOT NULL,
        Status VARCHAR(255) NOT NULL
    );
`;

export default Spaceships;
