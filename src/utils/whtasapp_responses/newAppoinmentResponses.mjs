import axios from 'axios';
import config from '../../config/config.mjs';

const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${config.meta.accessToken}`,
};

/**
 *
 * @param {string} fromPhone the number of the person
 * @param {string} phoneNumberId the id of the bussiness account
 */
const sendInialQuestion = (fromPhone, phoneNumberId) => {
  try {
    axios.post(
      `${config.meta.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: fromPhone,
        type: 'template',
        template: {
          name: 'initial_question',
          language: {
            code: 'es',
          },
        },
      },
      { headers: HEADERS }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendPatientName = (fromPhone, phoneNumberId) => {
  try {
    axios.post(
      `${config.meta.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: fromPhone,
        type: 'template',
        template: {
          name: 'patient_name',
          language: {
            code: 'es',
          },
        },
      },
      { headers: HEADERS }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendPatientPhoneNumber = (fromPhone, phoneNumberId) => {
  try {
    axios.post(
      `${config.meta.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: fromPhone,
        type: 'template',
        template: {
          name: 'patient_phone_number',
          language: {
            code: 'es',
          },
        },
      },
      { headers: HEADERS }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

export { sendInialQuestion, sendPatientName, sendPatientPhoneNumber };
