const nodemailer = require('nodemailer');

export async function sendUserRegistrationMail(receiver: string, username: string, code: string) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth 2',
                user: process.env.EMAIL + ' ',
                pass: process.env.EMAIL_PASSWORD,
            }
        });

        const mail = {
            from: process.env.EMAIL_FROM,
            to: receiver,
            subject: 'HyTeams Account Activation',
            html:
                `<h1>Hello ${username}, we have received your registration for HyTeams.</h1>
                <p>Before we can allow you to use our services, you will have to activate your account.<br>
                Please click the link below and fill in the required information.</p>
                <a href="http://localhost:4200/activate?code=${code}">http://localhost:4200/activate</a><br>
                <p>If you did not register for HyTeams, please ignore this email.</p>`
        };

        return await transporter.sendMail(mail);

    } catch (error: any) {
        console.log(error.message);
        return error;
    }
}
