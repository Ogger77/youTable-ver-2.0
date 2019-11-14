const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'vud@kean.edu',
        subject: 'Your admin account from yourTable',
        text: `Hello ${name}. Your admin account has been created. Please use this information for your admin priviledged: 77yourTable77.`
    })
}

module.exports = sendEmail