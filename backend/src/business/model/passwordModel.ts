export class Password {
    private _password!: string;
    private regex: RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

    constructor(password: string) {
        this.password = password;
    }

    get password(): string {
        return this._password;
    }
    set password(password: string) {
        if (password) {
            if (this.regex.test(password)) {
                this._password = password;
            } else {
                throw new Error('Password must contain at least one number, one uppercase letter, one lowercase letter, one special character and be between 8 and 16 characters long');
            }
        } else {
            throw new Error('Password is required');
        }
    }

}