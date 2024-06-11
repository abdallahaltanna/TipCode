declare namespace Express {
  interface Request {
    session: {
      lastSpaceshipId?: number;
    };
  }
}
