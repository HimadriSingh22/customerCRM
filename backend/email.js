const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 25,
    host: 'localhost',
    tls: {
      rejectUnauthorized: false
    },
  });

  var message = {
    from: 'rajput.2220.himadri@gmail.com',
    to: 'developer05@hubx.ai',
    subject: 'Confirm Email',
    text: 'Please confirm your email!',
    html: '<p>Please confirm your email</p>'
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
        return console.log("transport error",error);
    }
    console.log('Message sent: %s', info.messageId);
  });