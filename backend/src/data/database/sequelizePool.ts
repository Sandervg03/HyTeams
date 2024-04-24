import { Sequelize } from "sequelize-typescript";
import config from "dotenv";
config.config({ path: "./config.env" });

export const sequelize: Sequelize = new Sequelize({
    dialect: "mysql",
    database: process.env.DB_SCHEMA,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    models: [__dirname + "/models"],
});
