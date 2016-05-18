import * as logger from 'winston';

var transport = new (logger.transports.Console)({level: 'debug', colorize: true});
var logger2 = new (logger.Logger)({
    transports: [transport]
});
var colors = require('colors/safe');

export function info(args:Array) {
    var text = '';
    for (var i = 0; i < args.length; i++) {
        var obj = args[i];
        text += colors.magenta(obj);
    }
    logger2.info(text);
}
