import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const cacheInstance = new Redis({
  host: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

export default cacheInstance;