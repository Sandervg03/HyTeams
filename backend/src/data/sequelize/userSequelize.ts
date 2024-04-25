import { User } from "../../business/model/userModel";
import { UserMapping } from "../../util/mapping/userMapping";
import SequelizePasswordCodeModel from "../database/models/passwordSetSequelizeModel";
import SequelizeUserModel from "../database/models/userSequelizeModel";
import { UserInterface } from "../interfaces/userInterface";

export class UserSequelize implements UserInterface {

    constructor(private userMapping: UserMapping = new UserMapping()) { }

    public async registerUser(user: User): Promise<User | null> {
        const create: SequelizeUserModel | null = await SequelizeUserModel.create({ email: user.email, username: user.username });
        const createdUser: SequelizeUserModel | null = await SequelizeUserModel.findOne({where: {email: user.email}});
        if (createdUser && createdUser.email) {
            return this.userMapping.mapUser(createdUser);
        } else {
            return null;
        }
    }

    public async getPasswordCode(code: string): Promise<string | null> {
        const find: SequelizePasswordCodeModel | null = await SequelizePasswordCodeModel.findOne({where: {code: code}});
        if (find && find.code) {
            return find.code;
        } else {
            return null;
        }
    }

    public async setPasswordCode(code: string, email: string): Promise<string> {
        const create: SequelizePasswordCodeModel | null = await SequelizePasswordCodeModel.create({ code: code, email: email });
        const createdCode: SequelizePasswordCodeModel | null = await SequelizePasswordCodeModel.findOne({where: {code: code}});
        if (createdCode && createdCode.code) {
            return createdCode.code;
        } else {
            throw new Error("Failed to set password code.");
        }
    }

    public async setPassword(password: string, code: string) {}
}