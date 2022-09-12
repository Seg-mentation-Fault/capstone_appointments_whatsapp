import express from 'express';

import routes from './src/routes/index.mjs';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ working: true });
});

routes(app);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`is running in the port: ${port}`);
});
