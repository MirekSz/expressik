"use strict";
var MoveService_1 = require("./MoveService");
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express 223' });
});
var handleMove = function (req, res, next) {
    var move = MoveService_1.default.getNextMove(req.body);
    res.setHeader('ala', 'ma kota2');
    res.json(move);
    res.end();
};
router.post('/getNextMove', handleMove);
router.get('/getNextMove', handleMove);
module.exports = router;
//# sourceMappingURL=index.js.map