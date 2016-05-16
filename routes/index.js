"use strict";
const MoveService_1 = require("../service/MoveService");
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', handle((req, res, model, next) => {
    console.log('1: ');
    model['name'] = 'mirek';
    MoveService_1.default.getValueFromDB().then((data) => {
        console.log('data: ');
        console.log(data);
        model['val'] = data;
        next();
    }).catch((err) => {
        console.log('err: ');
        console.log(err);
        next();
    });
}));
router.get('/', handle((req, res, model) => {
    console.log('2: ');
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
    return function (req, res, next) {
        if (!req.model) {
            req.model = {
                menu: 'Predefined menu'
            };
        }
        handler(req, res, req.model, next);
    };
}
router.get('/users/:id/:state', handle((req, res, model) => {
    model.title = 'User id = ' + JSON.stringify(req.params);
    res.render('index', model);
}));
router.all('/getNextMove', handleMove);
module.exports = router;
//# sourceMappingURL=index.js.map