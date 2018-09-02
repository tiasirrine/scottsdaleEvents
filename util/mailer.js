const path = require('path');
const transport = require('./transport');

module.exports = function(rcp, subject, template, context, callback) {
  transport.sendMail(
    {
      from: '"No Reply" johnsontrevor55@gmail.com',
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
