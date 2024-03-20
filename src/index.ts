import * as dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import moment from 'moment';
import app from './app';
import { sendMessageToTelegram } from './utils';

const port = process.env.PORT || 7000;
const server = http.createServer(app);

server.listen(port);
console.log("WEB: KEEPUP Website Service Stated. Running on PORT:"+port);

if(process.env.API_MODE != 'developing'){
  sendMessageToTelegram('alert', process.env.API_MODE + '- Website Restarted: '+ moment().format('Do MMM YYYY hh:mm a'));
}