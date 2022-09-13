import {
  sendAppointmentType,
  sendCheckResult,
  sendDocumentNumber,
  sendDocumentType,
  sendEpsOptions,
  sendInialQuestion,
  sendOtherEps,
  sendPatientName,
  sendPatientPhoneNumber,
  sendSpecializationType,
  sendTownship,
} from '../utils/whtasapp_responses/newAppoinmentResponses.mjs';
import { sendNotValidnumber } from '../utils/whtasapp_responses/otherResponses.mjs';

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
    try {
      const user = await this.redisClient.existsData(userPhone);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  manageRequestOption(userPhone, phoneNumberId, option) {
    try {
      if (option === 'Solicitar nueva cita') {
        this.redisClient.setData(userPhone, { requestType: 1, patientName: 0 });
        sendPatientName(userPhone, phoneNumberId);
      } else if (option === 'Consultar cita') {
        this.redisClient.setData(userPhone, { requestType: 2 });
      }
    } catch (error) {
      throw new Error(error.message);
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

  manageNewAppoinment(userPhone, phoneNumberId, message, userData) {
    try {
      if (userData.patientName === 0) {
        this.redisClient.setData(userPhone, { ...userData, patientName: message, patienPhoneNumber: 0 });
        sendPatientPhoneNumber(userPhone, phoneNumberId);
      } else if (userData.patienPhoneNumber === 0) {
        this.redisClient.setData(userPhone, { ...userData, patienPhoneNumber: message, typeOfDocument: 0 });
        sendDocumentType(userPhone, phoneNumberId);
      } else {
        this.manageAddDocument(userPhone, phoneNumberId, message, userData);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  manageAddDocument(userPhone, phoneNumberId, message, userData) {
    try {
      if (userData.typeOfDocument === 0) {
        if (message === '1') {
          this.redisClient.setData(userPhone, { ...userData, typeOfDocument: 'CC', documentNumber: 0 });
        } else if (message === '2') {
          this.redisClient.setData(userPhone, { ...userData, typeOfDocument: 'TI', documentNumber: 0 });
        } else if (message === '3') {
          this.redisClient.setData(userPhone, { ...userData, typeOfDocument: 'NUIP', documentNumber: 0 });
        } else if (message === '4') {
          this.redisClient.setData(userPhone, { ...userData, typeOfDocument: 'CE', documentNumber: 0 });
        } else {
          sendNotValidnumber(userPhone, phoneNumberId);
          return;
        }
        sendDocumentNumber(userPhone, phoneNumberId);
      } else if (userData.documentNumber === 0) {
        this.redisClient.setData(userPhone, { ...userData, documentNumber: message, townShip: 0 });
        sendTownship(phoneNumberId, phoneNumberId);
      } else {
        this.manageAddInfoExtra(userPhone, phoneNumberId, message, userData);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  manageAddInfoExtra(userPhone, phoneNumberId, message, userData) {
    try {
      if (userData.townShip === 0) {
        this.redisClient.setData(userPhone, { ...userData, townShip: message, eps: 0 });
        sendEpsOptions(userPhone, phoneNumberId);
      } else {
        this.manageEps(userPhone, phoneNumberId, message, userData);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  manageEps(userPhone, phoneNumberId, message, userData) {
    try {
      if (userData.eps === 0) {
        if (message === '1') {
          this.redisClient.setData(userPhone, { ...userData, eps: 'Salud Total EPS', appoinmentType: 0 });
        } else if (message === '2') {
          this.redisClient.setData(userPhone, { ...userData, eps: 'Nueva EPS', appoinmentType: 0 });
        } else if (message === '3') {
          this.redisClient.setData(userPhone, { ...userData, eps: 'Conpensar EPS', appoinmentType: 0 });
        } else if (message === '4') {
          this.redisClient.setData(userPhone, { ...userData, eps: 'Coosalud', appoinmentType: 0 });
        } else if (message === '5') {
          this.redisClient.setData(userPhone, { ...userData, eps: 'Positiva', appoinmentType: 0 });
        } else if (message === '6') {
          this.redisClient.setData(userPhone, { ...userData, eps: 'otra', appoinmentType: 0 });
          sendOtherEps(userPhone, phoneNumberId);
          return;
        } else {
          sendNotValidnumber(userPhone, phoneNumberId);
          return;
        }
        sendAppointmentType(userPhone, phoneNumberId);
      } else if (userData.eps === 'otra') {
        this.redisClient.setData(userPhone, { ...userData, eps: message });
        sendAppointmentType(userPhone, phoneNumberId);
      } else {
        this.manageApoinmentType(userPhone, phoneNumberId, message, userData);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  manageApoinmentType(userPhone, phoneNumberId, message, userData) {
    try {
      if (userData.appoinmentType === 0) {
        if (message === '1') {
          this.redisClient.setData(userPhone, {
            ...userData,
            appoinmentType: 'Cita de medicina general',
            finish: true,
          });
        } else if (message === '2') {
          this.redisClient.setData(userPhone, {
            ...userData,
            appoinmentType: 'Cita de medicina especializada',
            SpecializationType: 0,
            finish: false,
          });
          sendSpecializationType(userPhone, phoneNumberId);
          return;
        } else if (message === '3') {
          this.redisClient.setData(userPhone, { ...userData, appoinmentType: 'Odontologia', finish: true });
        }
      } else if (!userData.finish) {
        this.manageSpecializationType(userPhone, phoneNumberId, message, userData);
        return;
      }
      sendCheckResult(userPhone, phoneNumberId, userData);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  manageSpecializationType(userPhone, phoneNumberId, message, userData) {
    try {
      if (userData.SpecializationType === 0) {
        if (message === '1') {
          this.redisClient.setData(userPhone, { ...userData, SpecializationType: 'Dermatología' });
        } else if (message === '2') {
          this.redisClient.setData(userPhone, { ...userData, SpecializationType: 'Urología' });
        } else if (message === '3') {
          this.redisClient.setData(userPhone, { ...userData, SpecializationType: 'Ginecología' });
        } else if (message === '4') {
          this.redisClient.setData(userPhone, { ...userData, SpecializationType: 'Ortopedia' });
        } else if (message === '5') {
          this.redisClient.setData(userPhone, { ...userData, SpecializationType: 'Anestesiología' });
        } else if (message === '6') {
          this.redisClient.setData(userPhone, { ...userData, SpecializationType: 'Pediatría' });
        } else if (message === '7') {
          this.redisClient.setData(userPhone, { ...userData, SpecializationType: 'Cirugía General' });
        } else if (message === '8') {
          this.redisClient.setData(userPhone, { ...userData, SpecializationType: 'Cirugía Plástica' });
        } else if (message === '9') {
          this.redisClient.setData(userPhone, { ...userData, SpecializationType: 'Cirugía Pediátrica' });
        } else if (message === '10') {
          this.redisClient.setData(userPhone, { ...userData, SpecializationType: 'Medicina Interna' });
        } else if (message === '11') {
          this.redisClient.setData(userPhone, { ...userData, SpecializationType: 'Neurología' });
        } else if (message === '12') {
          this.redisClient.setData(userPhone, { ...userData, SpecializationType: 'Neurocirugía' });
        } else if (message === '13') {
          this.redisClient.setData(userPhone, { ...userData, SpecializationType: 'Endocrinología' });
        } else if (message === '14') {
          this.redisClient.setData(userPhone, { ...userData, SpecializationType: 'Otorrinolaringología' });
        } else if (message === '15') {
          this.redisClient.setData(userPhone, { ...userData, SpecializationType: 'Medicina del dolor' });
        } else if (message === '16') {
          this.redisClient.setData(userPhone, { ...userData, SpecializationType: 'anestesiología' });
        } else {
          sendNotValidnumber(userPhone, phoneNumberId);
          return;
        }
        sendCheckResult(userPhone, phoneNumberId, userData);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default WhatsappService;
