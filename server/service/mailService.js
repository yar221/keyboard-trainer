const nodemailer = require('nodemailer')

class MailService{
    
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: "smtp.ukr.net",
            port: 465,
            secure: true,
            auth: {
                user: 'jaroslav.levchenco11@ukr.net',
                pass: 'ynoFc6hAK4dS05BS'
            },
        })
    }
    
    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from: 'jaroslav.levchenco11@ukr.net',
            to,
            subject: `Активация аккаунта на сайте http://localhost:5000`,
            text: '',
            html: `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}

module.exports = new MailService()