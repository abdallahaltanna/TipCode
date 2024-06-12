interface Config {
  nodeEnv: string;
  port: number | string;
  origin: string;
  db: {
    devDB: string;
    proDB: string;
  };
}

export default Config;
