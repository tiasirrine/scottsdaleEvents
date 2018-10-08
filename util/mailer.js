const path = require('path');
const transport = require('./transport');

module.exports = function(rcp, subject, template, context, callback) {
  transport.sendMail(
    {
      from: '"No Reply" ' + process.env.EMAIL_USER,
      to: rcp,
      subject: subject,
      template: `./${template}`,
      context: context
    },
    function(error, info) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, info);
      }
    }
  );
};
