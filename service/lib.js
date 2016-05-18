"use strict";
const logger = require('winston');
var transport = new (logger.transports.Console)({ level: 'debug', colorize: true });
var logger2 = new (logger.Logger)({
    transports: [transport]
});
var colors = require('colors/safe');
function info(args) {
    var text = '';
    for (var i = 0; i < args.length; i++) {
        var obj = args[i];
        text += colors.magenta(obj);
    }
    logger2.info(text);
}
exports.info = info;
//# sourceMappingURL=lib.js.map