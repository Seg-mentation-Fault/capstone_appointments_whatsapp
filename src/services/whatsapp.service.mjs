import {
  sendInialQuestion,
  sendPatientName,
  sendPatientPhoneNumber,
} from '../utils/whtasapp_responses/newAppoinmentResponses.mjs';

class WhatsappService {
  constructor(client) {
    this.redisClient = client;
  }

  /**
   *
   * @param {string} userPhone the phone number of the client who sent the message
   * @returns true if the user exist else false
   */
  async CheckUserManaged(userPhone) {
    const user = await this.redisClient.existsData(userPhone);
    return user;
  }

  manageRequestOption(userPhone, phoneNumberId, option) {
    if (option === 'Solicitar nueva cita') {
      this.redisClient.setData(userPhone, { requestType: 1, patientName: 0 });
      sendPatientName(userPhone, phoneNumberId);
    } else if (option === 'Consultar cita') {
      this.redisClient.setData(userPhone, { requestType: 2 });
    }
  }

  manageNewUser(userPhone, phoneNumberId) {
    try {
      this.redisClient.setData(userPhone, { requestType: 0 });
      sendInialQuestion(userPhone, phoneNumberId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  manageNewAppoinment(userPhone, phoneNumberId, messageObj, userData) {
    try {
      if (userData.patientName === 0) {
        this.redisClient.setData(userPhone, { ...userData, patientName: messageObj });
        sendPatientPhoneNumber(userPhone, phoneNumberId);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default WhatsappService;
