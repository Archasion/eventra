import { serverConfig } from '@eventra/config/server';

import express from 'express';

const app = express();
const port = serverConfig.port;

app.use(express.json());

app.get('/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Eventra API listening on port ${port}`);
});
