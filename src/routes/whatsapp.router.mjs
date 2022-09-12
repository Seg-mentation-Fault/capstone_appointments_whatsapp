import express from 'express';
import axios from 'axios';
import Redis from 'redis';

import config from '../config/config';
import { markAsRead } from '../utils/whtasapp_responses/markAsRead';

const router = express.Router();

const redisClient = Redis.createClient({ url: config.redis.url });
redisClient.connect();

//  Authetificates the weebhook with the whatsApp API
router.get('/', (req, res) => {
  try {
    const { verifyToken } = config.meta;

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && challenge) {
      if (mode === 'subscribe' && token === verifyToken) {
        console.log('Webhook verified');
        res.status(200).send(challenge);
      } else {
        res.sendStatus(403);
      }
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(403);
  }
});

router.post('/', (req, res) => {
  try {
    const token = config.meta.accessToken;
    const { body } = req;

    console.log(JSON.stringify(body));

    if (req.body.object) {
      if (
        req.body.entry &&
        req.body.entry[0].changes &&
        req.body.entry[0].changes[0] &&
        req.body.entry[0].changes[0].value.messages &&
        req.body.entry[0].changes[0].value.messages[0]
      ) {
        const phoneNumberId = req.body.entry[0].changes[0].value.metadata.phone_number_id;
        const { from } = req.body.entry[0].changes[0].value.messages[0];
        const fromId = req.body.entry[0].changes[0].value.messages[0].id;
        const msgBody = req.body.entry[0].changes[0].value.messages[0].text.body;
        markAsRead(fromId, phoneNumberId);
        console.log(phoneNumberId);
        console.log(msgBody);
        redisClient.set(from, JSON.stringify({ message: msgBody }));

        axios
          .post(
            `https://graph.facebook.com/v14.0/${phoneNumberId}/messages`,
            {
              messaging_product: 'whatsapp',
              recipient_type: 'individual',
              to: from,
              type: 'text',
              text: {
                // the text object
                preview_url: false,
                body: `response: ${msgBody}`,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          )
          .then((response) => console.log(JSON.stringify({ finalSend: response })))
          .catch((e) => console.error(`eror on axios: ${e.code}`));
      }
      res.sendStatus(200);
      return;
    }
    res.sendStatus(404);
  } catch (e) {
    console.error(e);
    res.sendStatus(404);
  }
});

export default router;
