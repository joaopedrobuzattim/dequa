import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';

import '@shared/infra/Typeorm';

const app = express();

app.use('/', (request, response) => {
  return response.send('<h1> Hello World <br />');
});

app.listen(process.env.PORT, () => {
  console.log('Running');
});
