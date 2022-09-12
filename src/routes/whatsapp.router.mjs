/* eslint-disable no-console */
import express from 'express';

import RedisLogic from '../redis/index.mjs';
import config from '../config/config.mjs';
import { markAsRead, sendNotValidOption } from '../utils/whtasapp_responses/otherResponses.mjs';
import WhatsappService from '../services/whatsapp.service.mjs';

const router = express.Router();

const redisClient = new RedisLogic();
const service = new WhatsappService(redisClient);

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

router.post('/', async (req, res) => {
  try {
    // const token = config.meta.accessToken;
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
        const { from } = body.entry[0].changes[0].value.messages[0];
        const phoneNumberId = body.entry[0].changes[0].value.metadata.phone_number_id;
        const message = body.entry[0].changes[0].value.messages[0];
        const fromId = body.entry[0].changes[0].value.messages[0].id;
        const userExists = await service.CheckUserManaged(from);
        markAsRead(fromId, phoneNumberId);

        if (userExists) {
          const userData = await redisClient.getData(from);

          if (message.type === 'text') {
            const msgBody = message.text.body;
            if (userData.requestType === 1) {
              service.manageNewAppoinment(from, phoneNumberId, msgBody, userData);
            }
            sendNotValidOption(from, phoneNumberId);
          } else if (message.type === 'button') {
            const option = message.button.text;
            service.manageRequestOption(from, phoneNumberId, option);
          } else {
            sendNotValidOption(from, phoneNumberId);
          }
        } else {
          service.manageNewUser(from, phoneNumberId);
        }
        console.log('new Version 0.5');
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
