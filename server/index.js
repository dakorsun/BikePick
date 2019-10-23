import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import http from 'http';
import helmet from 'helmet';
import compression from 'compression';
import basicAuth from 'basic-auth-connect';

import appConfig from '../config/appConfig';
// import { checkDBConnection } from './setup/sequelize';
import expressSetup from './setup/expressSetup';
import schedulers from './schedulers';

const { NODE_APP_INSTANCE } = process.env;

// initialize the application and create the routes
const app = express();

app.get('/ping', async (req, res) => {
    res.send('OK');
});
app.use(compression());
if (appConfig.AUTH.ACTIVE) {
    app.use(basicAuth(appConfig.AUTH.USERNAME, appConfig.AUTH.PASSWORD));
    axios.defaults.auth = {
        username: appConfig.AUTH.USERNAME,
        password: appConfig.AUTH.PASSWORD,
    };
}

//checkDBConnection();
axios.defaults.baseURL = `http://localhost:${appConfig.PORT}`;

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

expressSetup(app);

const server = http.Server(app);

// start server on PORT
server.listen(appConfig.PORT, () => {
    // run schedulers only on one instance
    if (NODE_APP_INSTANCE && NODE_APP_INSTANCE === '0' || !NODE_APP_INSTANCE) {
        schedulers();
    }
    console.log(`Running on http://localhost:${appConfig.PORT}`);
});

export default app;
