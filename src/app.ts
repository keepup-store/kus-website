import express from 'express';
import path from 'path';
import requestIp from 'request-ip';
import cors from "cors";
import mustacheExpress from 'mustache-express';
import routes from './routes';
console.log("check0")
const app = express();
app.use(cors());

// Middleware to extract the user's IP address
app.use(requestIp.mw());

// for parsing application/json
app.use(express.json()); 

// Register 'mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.use('/web-assets', express.static(path.join(__dirname, '/views/website/web-assets')));
app.use('/store-assets', express.static(path.join(__dirname, '/views/storefront/store-assets')));

app.use(routes);

export default app;