"use strict";
function handle(handler) {
    return function (req, res, next) {
        if (!req.model) {
            req.model = {
                menu: 'Predefined menu'
            };
        }
        handler(req, res, req.model, next);
    };
}
exports.handle = handle;
//# sourceMappingURL=lib.js.map