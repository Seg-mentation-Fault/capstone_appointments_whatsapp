import express from 'express';
import whatsappRouter from './whatsapp.router.mjs';

const routes = (app) => {
  const routerV1 = express.Router();
  app.use('/webhook', routerV1);
  routerV1.use('/', whatsappRouter);
};

export default routes;
