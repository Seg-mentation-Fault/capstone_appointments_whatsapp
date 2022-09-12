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
      `https://graph.facebook.com/v14.0/${phoneNumberId}/messages`,
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

// eslint-disable-next-line import/prefer-default-export
export { markAsRead };
