const nodemailer = require('nodemailer');
require('dotenv').config();

/* Configugures email provider and authentication body via process.env. */
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
});

/* Compose automated response to client side form subissions and send to email address in req.body */
async function sendEmail(to) {
    try {
        const options = {
            from: process.env.MAIL_USER,
            to: to,
            subject: "Thanks for contacting Stellar Travel Agency",
            text: "Hello, and thanks for contacting Stellar Travel.  W'eve received your message and will response as soon as possible.  Thanks, and have a stellar day!  Cheers, Stellar Travel Agency"
        };
        const result = await transporter.sendMail(options);
        return result;
    } catch (error) {
        throw error;
    };
};

module.exports = sendEmail;