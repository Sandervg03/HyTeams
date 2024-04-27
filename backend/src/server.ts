import express from "express";
import cookieparser from "cookie-parser";

const app = express();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-requested-With, content-type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());


import config from "dotenv";
config.config({ path: "./config.env" });


import { sequelize } from "./data/database/sequelizePool";
import { UserController } from "./controller/userController";
import { UserService } from "./business/service/userService";
import { UserSequelize } from "./data/sequelize/userSequelize";
sequelize.sync()
  .then((result) => { console.log(result) })
  .catch((err) => { console.log(err) });

/**
 * User Layers
 */
const userData: UserSequelize = new UserSequelize();
const userService: UserService = new UserService(userData);
const userController: UserController = new UserController(userService);

app.get("/isLoggedIn", (req, res) => {
  res.status(200).json(true);
});


app.post("/registerUser", (req, res) => {
  userController.registerUser(req, res);
});

app.post("/activateUser", isPasswordCode, (req, res) => {
  userController.activateUser(req, res);
})


async function isPasswordCode(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!await userService.findActivationCode(req.body._code, req.body._email)) {
    res.status(400).json("Code not found.");
  } else {
    next();
  }
}


const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});