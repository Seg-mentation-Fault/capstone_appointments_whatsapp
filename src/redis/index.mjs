import Redis from 'redis';

import config from '../config/config.mjs';

class RedisLogic {
  constructor() {
    this.redisClient = Redis.createClient({ url: config.redis.url });
    this.redisClient.connect();
  }

  /**
   *
   * @param {string} key the key to save in the redis db
   * @param {Object} data the data to save, this case a object that will saved a JSON string
   */
  setData(key, data) {
    this.redisClient.set(key, JSON.stringify(data));
  }

  /**
   *
   * @param {string} key the string key to find in the redis Database
   */
  async getData(key) {
    const data = await this.redisClient.get(key);
    return data;
  }

  /**
   *
   * @param {string} value the key for finding the value in redis
   * @returns true if the value exist else false
   */
  async existsData(value) {
    const exists = this.redisClient.exists(value);
    if (exists === 1) {
      return true;
    }
    return false;
  }
}

export default RedisLogic;
