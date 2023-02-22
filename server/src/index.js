import express from "express";
import cors from "cors";
import path from 'path'
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import { fileURLToPath } from 'url';
import { connectDB } from "./db/index.js";
import AuthRouter from "./routes/auth.js";
import CompanyRouter from "./routes/company.js";
import VacancyRouter from "./routes/vacancy.js";
import config from './config.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const swaggerDefinition = {
  info: {
    title: 'Users API',
    version: '1.0.0',
    description: 'API documentation for the Users API'
  },
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: [`${__dirname}/routes/auth.js`, `${__dirname}/routes/company.js`, `${__dirname}/routes/vacancy.js`]
};



const swaggerSpec = swaggerJSDoc(options)

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json({}));
app.use(cors({
  origin: '*'
}));

app.use("/auth", AuthRouter);
app.use("/company", CompanyRouter);
app.use("/vacancy", VacancyRouter);

async function start() {
  await app.listen(config.port, () => console.log("server is running"));
  await connectDB();
}

start();
