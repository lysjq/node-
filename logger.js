const log4js = require('log4js');
const path = require('path');
log4js.configure({
    appenders: {
        info: {
            type: 'file',
            filename: path.resolve(__dirname, 'log/infolog.log')
        }
    },
    categories: {
        default: {
            appenders: ['info'],
            level: 'All'
        }
    }
});
let logger = log4js.getLogger('default');
module.exports = logger;