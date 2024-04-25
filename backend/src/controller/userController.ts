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
            res.status(400).send({ error: error.message });
        }
    }

}