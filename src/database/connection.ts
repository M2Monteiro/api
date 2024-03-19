import { config } from "../../config";
import { DataSource } from "typeorm";


import { User } from "../entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB,
  username: config.DB_USER,
  password: config.DB_PASS,
  entities: [User],
  synchronize: false,
  logging: true,
});

