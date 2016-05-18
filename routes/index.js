"use strict";
const MoveService_1 = require("../service/MoveService");
var express = require('express');
var router = express.Router();
const lib_1 = require('./lib');
/* GET home page. */
router.get('/', lib_1.handle((req, res, model, next) => {
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
router.get('/', lib_1.handle((req, res, model) => {
    console.log('2: ');
    model.title = 'Express hura ';
    res.render('index', model);
}));
module.exports = router;
//# sourceMappingURL=index.js.map