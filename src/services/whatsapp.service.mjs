class whatsappService {
  redisClient;

  constructor(client) {
    this.redisClient = client;
  }

  CheckUserManaged(userPhone) {
    const user = this.redisClient(userPhone);
    console.log(user);
    return user;
  }
}

export default whatsappService;
