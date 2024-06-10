import db from './connection';
import { CrewMembers, Missions, Spaceships } from '../models';
import { exit } from 'process';

const createDatabase: string = `
    CREATE DATABASE IF NOT EXISTS SpaceshipTravelSystem;
`;

const useDatabase: string = `
    USE SpaceshipTravelSystem;
`;

const createDatabaseAndTables = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    db.query(createDatabase, (err: Error) => {
      if (err) reject(err);
      console.log('Database created or already exists.');

      db.query(useDatabase, (err: Error) => {
        if (err) reject(err);
        console.log('Using SpaceshipTravelSystem database.');

        Promise.all([
          new Promise<void>((resolve, reject) => {
            db.query(Spaceships, (err: Error) => {
              if (err) reject(err);
              console.log('Spaceships table created or already exists.');
              resolve();
            });
          }),
          new Promise<void>((resolve, reject) => {
            db.query(CrewMembers, (err: Error) => {
              if (err) reject(err);
              console.log('CrewMembers table created or already exists.');
              resolve();
            });
          }),
          new Promise<void>((resolve, reject) => {
            db.query(Missions, (err: Error) => {
              if (err) reject(err);
              console.log('Missions table created or already exists.');
              resolve();
            });
          })
        ])
          .then(() => resolve())
          .catch(err => reject(err));
      });
    });
  });
};

// Run the function
createDatabaseAndTables()
  .then(() => {
    console.log('Database setup complete.');
    exit(0);
  })
  .catch(err => {
    console.error('Failed to set up database:', err);
    exit(1);
  });
