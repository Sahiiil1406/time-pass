const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'elliot.willms@ethereal.email',
        pass: '4gThDKBthmhSwbKt36'
    }
});
const sendEmail = async (email, subject, text) => {
   try {
    const info= await transporter.sendMail({
        from: 'SAhil',
        to: email,
        subject: subject,
        text: text
    });
    return info

   } catch (error) {
    return error
   }
}

module.exports = sendEmail;