const mailer = require('nodemailer');
const path = require('path');
const mailerhbs = require('nodemailer-express-handlebars');

const transport = mailer.createTransport({
  host: '',
  port: 587,
  secure: false,
  service: 'gmail',
  auth: {
    user: 'johnsontrevor55@gmail.com',
    pass: process.env.MAILPASS
  }
});

transport.use(
  'compile',
  mailerhbs({
    viewPath: path.join(__dirname, '/emails'),
    extName: '.hbs'
  })
);

module.exports = transport;
