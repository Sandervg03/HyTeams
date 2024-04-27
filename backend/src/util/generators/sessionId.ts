import crypto from 'crypto';

export class SessionIdGenerator {
    public generateSessionId(): string {
        return crypto.randomBytes(20).toString('hex');
    }
}