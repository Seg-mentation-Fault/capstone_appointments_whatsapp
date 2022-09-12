import 'dotenv/config';

export default {
  redis: {
    url: process.env.REDIS_URL,
  },
  meta: {
    verifyToken: process.env.VERIFY_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
    apiUrl: process.env.META_API_URL,
  },
};
