import 'dotenv/config';

import express from 'express';
import {routes} from './routes';
import { httpLogger, logger } from './utils/logger';

const app = express();

app.use(httpLogger)
app.use(express.json());
app.use('/public', express.static('public'));
app.use(routes);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  logger.info(`server is running http://localhost:${port}`);
});
