"use strict";
var MoveService_1 = require("./MoveService");
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    req.model = {};
    req.model['name'] = 'mirek';
    next();
}, handle(function (req, res, model) {
    console.log(req.model);
    model.title = 'Express hura';
    res.render('index', model);
}));
var handleMove = function (req, res, next) {
    var move = MoveService_1.default.getNextMove(req.body);
    res.setHeader('ala', 'ma kota2');
    res.json(move);
    res.end();
};
function handle(handler) {
    return function (req, res) {
        handler(req, res, { menu: 'Predefined menu' });
    };
}
router.get('/users/:id/:state', handle(function (req, res, model) {
    model.title = 'User id = ' + JSON.stringify(req.params);
    res.render('index', model);
}));
router.all('/getNextMove', handleMove);
module.exports = router;
//# sourceMappingURL=index.js.map