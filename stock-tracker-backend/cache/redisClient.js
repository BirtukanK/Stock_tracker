const Redis = require("ioredis");
// Create a Redis client const 

redisClient = new Redis();

redisClient.on("connect", () => { console.log("Connected to Redis."); });

redisClient.on("error", (err) => { console.error("Redis connection error:", err); });

module.exports = redisClient;