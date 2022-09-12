import Redis from 'redis';

import config from '../config/config.mjs';

class RedisLogic {
  redisClient;

  constructor() {
    this.redisClient = Redis.createClient({ url: config.redis.url });
  }

  /**
   *
   * @param {string} key the key to save in the redis db
   * @param {Object} data the data to save, this case a object that will saved a JSON string
   */
  async setData(key, data) {
    await this.redisClient.connect();
    this.redisClient(key, JSON.stringify(data));
  }

  /**
   *
   * @param {string} key the string key to find in the redis Database
   */
  async getData(key) {
    await this.redisClient.connect();
    return this.redisClient.get(key);
  }
}

export default RedisLogic;
