class whatsappService {
  constructor(client) {
    this.redisClient = client;
  }

  async CheckUserManaged(userPhone) {
    const user = await this.redisClient.existsData(userPhone);
    return user;
  }
}

export default whatsappService;
