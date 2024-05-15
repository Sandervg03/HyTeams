import { User } from "../../business/model/userModel";
import { UserMapping } from "../../util/mapping/userMapping";
import SequelizePasswordModel from "../database/models/passwordSequelizeModel";
import SequelizePasswordCodeModel from "../database/models/passwordSetSequelizeModel";
import SequelizeSessionModel from "../database/models/sessionSequelizeModel";
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
        const find: SequelizePasswordCodeModel | null = await SequelizePasswordCodeModel.findOne({ where: { code: code, email: email, status: "Active" } });
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

    public async getPassword(email: string): Promise<string | null> {
        const find: SequelizePasswordModel | null = await SequelizePasswordModel.findOne({ where: { email: email } });
        if (find && find.password) {
            return find.password;
        } else {
            return null;
        }
    }

    public async findUserByEmail(email: string): Promise<User | null> {
        const find: SequelizeUserModel | null = await SequelizeUserModel.findOne({ where: { email: email } });
        if (find && find.email) {
            return this.userMapping.mapUser(find);
        } else {
            return null;
        }
    }

    public async findUserByUsername(username: string): Promise<User> {
        const user: SequelizeUserModel | null = await SequelizeUserModel.findOne({ where: { username: username } });
        if (user && user.email) {
            return this.userMapping.mapUser(user);
        }
        throw new Error(`${username} not found`);
    }

    public async setSessionId(sessionId: string, email: string): Promise<string> {
        const create: SequelizeSessionModel | null = await SequelizeSessionModel.create({ email: email, sessionid: sessionId, expires: new Date(Date.now() + 31556926000) });
        const createdSession: SequelizeSessionModel | null = await SequelizeSessionModel.findOne({ where: { email: email, sessionid: sessionId } });
        if (createdSession && createdSession.sessionid) {
            return createdSession.sessionid;
        } else {
            throw new Error("Failed to set session id.");
        }
    }

    public async findUserBySessionId(sessionId: string): Promise<User> {
        const user: SequelizeUserModel | null = await SequelizeUserModel.findOne({
            include: [{ model: SequelizeSessionModel, where: { sessionid: sessionId } }]
        });
        if (user && user.email) {
            return this.userMapping.mapUser(user);
        }
        throw new Error("User not found");
    }

    public async isLoggedIn(code: string): Promise<boolean> {
        const find: SequelizeSessionModel | null = await SequelizeSessionModel.findOne({ where: { sessionid: code } });
        if (find && find.sessionid) {
            return true;
        } else {
            return false;
        }
    }
}