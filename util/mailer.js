const path = require('path');
const transport = require('./transport');

module.exports = function(rcp, subject, template, context) {
  return new Promise((resolve, reject) => {
    transport.sendMail(
      {
        from: '"No Reply" ' + process.env.EMAIL_USER,
        to: rcp,
        subject: subject,
        template: `./${template}`,
        context: context
      },
      (error, info) => {
        if (error) reject(error);
        else resolve(info);
      }
    );
  });
};
