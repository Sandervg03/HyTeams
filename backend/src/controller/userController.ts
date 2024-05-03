import { Password } from "../business/model/passwordModel";
import { User } from "../business/model/userModel";
import { UserService } from "../business/service/userService";
import express from 'express';

export class UserController {

    constructor(private service: UserService) { }

    public async registerUser(req: express.Request, res: express.Response) {
        try {
            const user: User = new User(req.body._username, req.body._email);
            res.status(202).json(await this.service.registerUser(user));
        } catch (error: any) {
            res.status(400).json(error.message);
        }
    }

    public async activateUser(req: express.Request, res: express.Response) {
        try {
            if (req.body._password == req.body._confirmPassword) {
                res.status(202).json(await this.service.activateUser(new Password(req.body._password), req.body._email, req.body._code));
            } else {
                throw new Error("Passwords do not match.");
            }
        } catch (error: any) {
            res.status(400).json(error.message);
        }
    }

    public async loginUser(req: express.Request, res: express.Response) {
        try {
            if (req.body._password) {
                const sessionId: string = await this.service.loginUser(req.body._email, req.body._password)
                res.cookie("sessionid", sessionId, {sameSite: "none", httpOnly: true});
                res.status(202).json("Logged in.");
            } else {
                throw new Error("Password is required.");
            }
        } catch (error: any) {
            res.status(400).json(error.message);
        }
    }

}