import { User } from "../../business/model/userModel";

export interface UserInterface {

    registerUser(user: User): Promise<User | null>;
    getPasswordCode(code: string): Promise<string | null>;
    setPasswordCode(code: string, email: string): Promise<string>;

}