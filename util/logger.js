const path = require('path');
const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'app',
  streams: [
    {
      level: 'error',
      type: 'rotating-file',
      path: path.join(__dirname, '../logs/error.log'),
      period: '1d',
      count: 3
    },
    {
      level: 'debug',
      type: 'rotating-file',
      path: path.join(__dirname, '../logs/access.log'),
      period: '1d',
      count: 3
    }
  ]
});

module.exports = logger;
