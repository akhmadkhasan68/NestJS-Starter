import dotenv from 'dotenv';

console.log(dotenv);

dotenv.config();

export const config = {
  /**
   * server configuration
   */
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT || '3000',
  host: process.env.HOST_API || 'http://127.0.0.1:3000',

  /**
   * database configuration
   */
  database: {
    dialect: process.env.DB_SERVER,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};
