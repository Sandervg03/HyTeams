import { UserSequelize } from "../../data/sequelize/userSequelize";
import { sendUserRegistrationMail } from "../../util/emails/registerUserEmail";
import { Password } from "../model/passwordModel";
import { User } from "../model/userModel";
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export class UserService {

    constructor(private data: UserSequelize) { }

    public async registerUser(user: User): Promise<User> {
        const createdUser: User | null = await this.data.registerUser(user);
        if (createdUser == null) {
            throw new Error("Email already exists.");
        } else {
            let code: string = crypto.randomBytes(20).toString('hex');
            while (this.data.getPasswordCode(code, user.email) == null) {
                code = crypto.randomBytes(20).toString('hex')
            };
            await this.data.setPasswordCode(code, user.email);
            await sendUserRegistrationMail(user.email, user.username, code).then((result) => console.log(result)).catch((error) => console.log(error.message));
            return user;
        }
    }

    public async findActivationCode(code: string, email: string): Promise<boolean | string> {
        const activationCode: string | null = await this.data.getPasswordCode(code, email);
        if (activationCode == null) {
            return false;
        } else {
            return activationCode;
        }
    }

    public async activateUser(password: Password, email: string, code: string): Promise<string> {
        const activated: boolean = await this.data.setPassword(await bcrypt.hash(password.password, await bcrypt.genSalt(10)), email);
        if (activated == false) {
            throw new Error("Failed to activate user.");
        } else {
            if (await this.data.updatePasswordCode(code)) {
                return "User activated.";
            } else {
                throw new Error("Failed to activate user.");
            }
        }
    }
}