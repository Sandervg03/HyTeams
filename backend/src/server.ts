import express from "express";
import cookieparser from "cookie-parser";

const app = express();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers","X-requested-With, content-type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());


import config from "dotenv";
config.config({ path: "./config.env" });


import { sequelize } from "./data/database/sequelizePool";
sequelize.sync()
  .then((result) => { console.log(result) })
  .catch((err) => { console.log(err) });


app.get("/isLoggedIn", (req, res) => {
  res.status(200).json(isLoggedIn());
});


app.post("/registerUser", (req, res) => {
  res.status(200).json({_email: req.body._email, _username: req.body._username});
});


function isLoggedIn(): boolean {
  return true;
}


const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});