import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(__dirname, "../.env");

dotenv.config({
  path: envPath,
});

export const config = {
  API_PORT: process.env.API_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT as string),
  DB_USER: process.env.DB_USERNAME,
  DB_PASS: process.env.DB_PASSWORD,
  DB: process.env.DB_DATABASE,
};
