const nodemailer = require('nodemailer');

function mailer (request, response) {

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'g.abashkin.91@gmail.com',
      pass: '01041982gmail'
    }
  });

  const mailOptions = {
    from: 'abashkin.91@mail.ru',
    to: request.body.email,
    subject: 'Sending Email using Node.js',
    text: request.body.message
  };

  console.log(mailOptions);
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = mailer;