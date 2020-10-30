  
let appRoot = require('app-root-path');
let winston = require('winston');


const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: `${appRoot}/monitoring/logs/activitiy.log`,
            level: 'info'
        }),
        new winston.transports.File({
            filename: `${appRoot}/monitoring/logs/error.log`,
            level: 'error'
        })
    ]
});


// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;