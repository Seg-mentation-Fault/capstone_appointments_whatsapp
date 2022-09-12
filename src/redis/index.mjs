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
}

export default RedisLogic;
