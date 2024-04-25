import { User } from "../../business/model/userModel";
import SequelizeUserModel from "../../data/database/models/userSequelizeModel";

export class UserMapping {

    public mapUser(user: SequelizeUserModel): User {
        return new User(user.username, user.email);
    }
}