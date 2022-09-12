/* eslint-disable no-console */
import express from 'express';
import axios from 'axios';

import config from '../config/config.mjs';
import RedisLogic from '../redis/index.mjs';
import { markAsRead } from '../utils/whtasapp_responses/markAsRead.mjs';

const router = express.Router();

const redisClient = RedisLogic();

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

    if (body.object) {
      if (
        body.entry &&
        body.entry[0].changes &&
        body.entry[0].changes[0] &&
        body.entry[0].changes[0].value.messages &&
        body.entry[0].changes[0].value.messages[0]
      ) {
        const phoneNumberId = body.entry[0].changes[0].value.metadata.phone_number_id;
        const { from } = body.entry[0].changes[0].value.messages[0];
        const fromId = body.entry[0].changes[0].value.messages[0].id;
        const msgBody = body.entry[0].changes[0].value.messages[0].text.body;
        markAsRead(fromId, phoneNumberId);
        console.log(from);
        console.log(msgBody);
        redisClient.setData(from, { message: msgBody });

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
