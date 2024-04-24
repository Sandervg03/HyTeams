export class User {
    private _username!: string;
    private _email!: string;

    constructor(username: string, email: string) {
        this.username = username;
        this.email = email;
    }

    public get username(): string {
        return this._username;
    }

    public set username(username: string) {
        this._username = username;
    }

    public get email(): string {
        return this._email;
    }

    public set email(email: string) {
        this._email = email;
    }
}