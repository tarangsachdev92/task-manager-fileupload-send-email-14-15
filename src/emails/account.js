const sgMail = require('@sendgrid/mail');

const sendgridAPI = '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';

sgMail.setApiKey(sendgridAPI);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'tarangsachdev@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'tarangsachdev@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back someting soon.`
    })
}

module.exports = {
    sendWelcomeEmail, sendCancelationEmail
}