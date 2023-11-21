import 'dotenv/config';

import express from 'express';
import {routes} from './routes';

const app = express();

app.use(express.json());
app.use('/public', express.static('public'));
app.use(routes);

app.listen(3000, () => {
	console.log('server is running');
});
