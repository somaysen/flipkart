const Redis = require("ioredis");
require("dotenv").config();


const cacheInstance = new Redis({
  host: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

module.exports = cacheInstance;