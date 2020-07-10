
const nodeMailer = require("nodemailer");

module.exports = {

    sendEmail: async function(email, assunto, mensagem, req, res) {
        let transporter = nodeMailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secureConnection: false,
            auth: {
                user: 'reg.botanicos@esav.ipv.pt',
                pass: 'r3g-b0t4n1c0s!19?+'
            }
        });
        let mailOptions = {
            to: email,
            subject: assunto,
            text: mensagem
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error)
                return console.log(error);
            else
                return true;
        });
    }

}