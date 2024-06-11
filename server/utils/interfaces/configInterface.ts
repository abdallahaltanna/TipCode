interface Config {
  nodeEnv: string;
  port: number | string;
  origin: string;
  db: {
    devDB: string;
    proDB: string;
  };
  sessionSecret: string;
}

export default Config;
