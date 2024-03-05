import dotenv from "dotenv";
import express, { Response, Request } from "express";

import router from "./router/router";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.use(router);

export default app;
