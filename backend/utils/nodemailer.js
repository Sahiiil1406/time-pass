const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
const sendEmail = async (email, subject, text) => {
   try {
    const info= await transporter.sendMail({
        from: process.env.EMAIL,
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