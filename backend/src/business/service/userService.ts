import { UserSequelize } from "../../data/sequelize/userSequelize";
import { sendUserRegistrationMail } from "../../util/emails/registerUserEmail";
import { User } from "../model/userModel";
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export class UserService {

    constructor(private data: UserSequelize) { }

    public async registerUser(user: User): Promise<User> {
        const createdUser: User | null = await this.data.registerUser(user);
        if (createdUser == null) {
            throw new Error("Failed to create user.");
        } else {
            let code: string = crypto.randomBytes(20).toString('hex');
            while (this.data.getPasswordCode(code) == null) {
                code = crypto.randomBytes(20).toString('hex')};
            await this.data.setPasswordCode(code, user.email);
            await sendUserRegistrationMail(user.email, user.username, code).then((result) => console.log(result)).catch((error) => console.log(error.message));
            return user;
        }
    }
}