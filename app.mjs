import express from 'express';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ workin: true });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`is running in the port: ${port}`);
});
