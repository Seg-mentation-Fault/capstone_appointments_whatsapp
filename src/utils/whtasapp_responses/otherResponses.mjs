import axios from 'axios';
import config from '../../config/config.mjs';

const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${config.meta.accessToken}`,
};

/**
 *
 * @param {string} fromMessageId the number of the client ot mark the message as read
 * @param {string} phoneNumberId the id for the bussiness id to send the post to the api
 */
const markAsRead = async (fromMessageId, phoneNumberId) => {
  try {
    const { data } = await axios.post(
      `${config.meta.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: fromMessageId,
      },
      { headers: HEADERS }
    );
    if (data.success === true) console.log('the messages has been set as READ');
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendNotValidOption = (fromMessageId, phoneNumberId) => {
  try {
    axios.post(
      `${config.meta.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: fromMessageId,
        type: 'text',
        text: {
          // the text object
          preview_url: false,
          body: 'optiones no validas. Por favor seleccione uno de los dos botones.',
        },
      },
      { headers: HEADERS }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

export { markAsRead, sendNotValidOption };
