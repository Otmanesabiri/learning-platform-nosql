async function cacheData(key, data, ttl = 3600) {
  try {
    const redisClient = require('../config/db').getRedis();
    await redisClient.setEx(
      `app:${key}`, 
      ttl,
      JSON.stringify(data)
    );
  } catch (error) {
    console.error('Error caching data:', error);
    throw error;
  }
}

async function getCachedData(key) {
  try {
    const redisClient = require('../config/db').getRedis();
    const data = await redisClient.get(`app:${key}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting cached data:', error);
    throw error;
  }
}

async function invalidateCache(key) {
  try {
    const redisClient = require('../config/db').getRedis();
    await redisClient.del(`app:${key}`);
  } catch (error) {
    console.error('Error invalidating cache:', error);
    throw error;
  }
}

module.exports = {
  cacheData,
  getCachedData,
  invalidateCache
};