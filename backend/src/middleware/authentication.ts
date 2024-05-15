import express from "express";
import * as validator from 'email-validator';

import { UserService } from "../business/service/userService";

import { UserSequelize } from "../data/sequelize/userSequelize";
const userData: UserSequelize = new UserSequelize();

export class Authentication {

    constructor() { }

    public async isPasswordCode(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if (!await new UserService(userData).findActivationCode(req.body._code, req.body._email)) {
                res.status(400).json("Code not found.");
            } else {
                next();
            }
        } catch (error: any) {
            res.status(400).json(error.message);
        }
    }

    public async isUserByEmail(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if (validator.validate(req.body._email) == true) {
                if (await new UserService(userData).findUserByEmail(req.body._email) == null) {
                    res.status(400).json("User not found.");
                } else {
                    next();
                }
            } else {
                res.status(400).json("Incorrect email.");
            }
        } catch (error: any) {
            res.status(400).json(error.message);
        }
    }

    public async isLoggedIn(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if (req.cookies.sessionId && await new UserService(userData).isLoggedIn(req.cookies.sessionId)) {
                next();
            } else {
                res.status(401).json("Not logged in.");
            }
        } catch (error: any) {
            res.status(400).json(error.message);
        }
    }
}