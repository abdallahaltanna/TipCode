import db from './connection';
import { CrewMembers, Missions, Spaceships } from '../models';
import { exit } from 'process';

const createDatabaseAndTables = async (): Promise<void> => {
  try {
    // Create the database
    await db.query(`CREATE DATABASE IF NOT EXISTS SpaceshipTravelSystem`);
    console.log('Database created or already exists.');

    // Use the database
    await db.query(`USE SpaceshipTravelSystem`);
    console.log('Using SpaceshipTravelSystem database.');

    // Create tables
    const tables = [Spaceships, CrewMembers, Missions];

    for (const tableQuery of tables) {
      await db.query(tableQuery);
    }

    console.log('Tables created or already exist.');
    console.log('Database setup complete.');
    exit(0);
  } catch (err) {
    console.error('Failed to set up database:', err);
    exit(1);
  }
};

// Run the function
createDatabaseAndTables();
