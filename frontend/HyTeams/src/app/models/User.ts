import * as validator from 'email-validator';

export class User {
    private _username!: string;
    private _email!: string;
    
    constructor(username: string, email: string) {
        this.username = username;
        this.email = email;
    }
    
    get username(): string {
        return this._username;
    }
    
    get email(): string {
        return this._email;
    }

    set username(username: string) {
        if (username) {
            this._username = username;
        } else {
            throw new Error('Username is required');
        }
    }

    set email(email: string) {
        if (email) {
            if (validator.validate(email)) {
                this._email = email;
            } else {
                throw new Error('Incorrect email');
            }
        } else {
            throw new Error('Email is required');
        }
    }
}