import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import {routes} from './routes';
import { httpLogger, logger } from './utils/logger';
import cors from "cors";

const app = express();

app.use(helmet());
app.use(cors());
app.use(httpLogger)
app.use(express.json());
app.use('/public', express.static('public'));
app.use(routes);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  logger.info(`server is running http://localhost:${port}`);
});
