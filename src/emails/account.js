const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'tarangsachdev@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
        // html: `<h1>Welcome to the app</h1>.`
    })
    // .then(() => {
    //     console.log('Message sent')
    // }).catch((error) => {
    //     console.log(error.response.body)
    //     // console.log(error.response.body.errors[0].message)
    // })
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