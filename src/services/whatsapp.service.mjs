import { sendInialQuestion } from '../utils/whtasapp_responses/newAppoinmentResponses.mjs';

class WhatsappService {
  constructor(client) {
    this.redisClient = client;
  }

  async CheckUserManaged(userPhone) {
    const user = await this.redisClient.existsData(userPhone);
    return user;
  }

  // manageNewAppoinment() {}
  manageNewUser(userPhone, phoneNumberId) {
    try {
      this.redisClient.setData(userPhone, { requestType: 0 });
      sendInialQuestion(userPhone, phoneNumberId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default WhatsappService;
