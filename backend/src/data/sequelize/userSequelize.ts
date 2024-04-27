import { User } from "../../business/model/userModel";
import { UserMapping } from "../../util/mapping/userMapping";
import SequelizePasswordModel from "../database/models/passwordSequelizeModel";
import SequelizePasswordCodeModel from "../database/models/passwordSetSequelizeModel";
import SequelizeUserModel from "../database/models/userSequelizeModel";
import { UserInterface } from "../interfaces/userInterface";

export class UserSequelize implements UserInterface {

    constructor(private userMapping: UserMapping = new UserMapping()) { }

    public async registerUser(user: User): Promise<User | null> {
        const create: SequelizeUserModel | null = await SequelizeUserModel.create({ email: user.email, username: user.username });
        const createdUser: SequelizeUserModel | null = await SequelizeUserModel.findOne({ where: { email: user.email } });
        if (createdUser && createdUser.email) {
            return this.userMapping.mapUser(createdUser);
        } else {
            return null;
        }
    }

    public async getPasswordCode(code: string, email: string): Promise<string | null> {
        const find: SequelizePasswordCodeModel | null = await SequelizePasswordCodeModel.findOne({ where: { code: code, email: email, status: "Active"} });
        if (find && find.code) {
            return find.email;
        } else {
            return null;
        }
    }

    public async setPasswordCode(code: string, email: string): Promise<string> {
        const create: SequelizePasswordCodeModel | null = await SequelizePasswordCodeModel.create({ code: code, status: "Active", email: email });
        const createdCode: SequelizePasswordCodeModel | null = await SequelizePasswordCodeModel.findOne({ where: { code: code } });
        if (createdCode && createdCode.code) {
            return createdCode.code;
        } else {
            throw new Error("Failed to set password code.");
        }
    }

    public async updatePasswordCode(code: string) {
        const [affectedCount]: [number] = await SequelizePasswordCodeModel.update({ status: "Used" }, { where: { code: code } });
        if (affectedCount > 0) {
            return true;
        } else {
            return false;
        }
    }

    public async setPassword(password: string, email: string): Promise<boolean> {
        const create: SequelizePasswordModel | null = await SequelizePasswordModel.create({ password: password, email: email });
        const createdPassword: SequelizePasswordModel | null = await SequelizePasswordModel.findOne({ where: { email: email } });
        if (createdPassword && createdPassword.password) {
            return true;
        } else {
            return false;
        }
    }
}