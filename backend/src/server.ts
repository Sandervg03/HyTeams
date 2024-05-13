import express from "express";

import cookieParser from "cookie-parser";

import config from "dotenv";
config.config({ path: "./config.env" });

const app = express();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-requested-With, content-type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import { sequelize } from "./data/database/sequelizePool";
sequelize.sync()
  .then((result) => { console.log(result) })
  .catch((err) => { console.log(err) });

const userRoutes = require("./routes/userRoutes");
app.use(userRoutes);

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});