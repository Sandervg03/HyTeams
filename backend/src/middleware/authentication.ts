import express from "express";
import * as validator from 'email-validator';

import { UserService } from "../business/service/userService";

import { UserSequelize } from "../data/sequelize/userSequelize";
const userData: UserSequelize = new UserSequelize();

export class Authentication {

    constructor() { }

    public async isPasswordCode(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (!await new UserService(userData).findActivationCode(req.body._code, req.body._email)) {
            res.status(400).json("Code not found.");
        } else {
            next();
        }
    }

    public async isUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (validator.validate(req.body._email) == true) {
            if (await new UserService(userData).findUser(req.body._email) == null) {
                res.status(400).json("User not found.");
            } else {
                next();
            }
        } else {
            res.status(400).json("Incorrect email.");

        }
    }
}