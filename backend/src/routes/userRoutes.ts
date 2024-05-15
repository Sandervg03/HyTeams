import express from "express";
const app = express();

import { UserSequelize } from "../data/sequelize/userSequelize";
import { UserService } from "../business/service/userService";
import { UserController } from "../controller/userController";
const userData: UserSequelize = new UserSequelize();
const userService: UserService = new UserService(userData);
const userController: UserController = new UserController(userService);

import { Authentication } from "../middleware/authentication";
const authentication: Authentication = new Authentication();

app.post("/registerUser", (req, res) => {
    userController.registerUser(req, res);
});

app.post("/activateUser", authentication.isPasswordCode, (req, res) => {
    userController.activateUser(req, res);
})

app.post("/loginUser", authentication.isUserByEmail, (req, res) => {
    userController.loginUser(req, res);
});

app.post("/isLoggedIn", async (req, res) => {
    if (req.cookies.sessionId) {
        if (await userService.isLoggedIn(req.cookies.sessionId) == true) {
            res.status(200).json(true)
        } else {
            res.clearCookie("sessionId");
            res.status(200).json(false);
        }
    } else {
        res.status(200).json(false);
    }
});

module.exports = app;