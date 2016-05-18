"use strict";
const MoveService_1 = require("../service/MoveService");
const express = require("express");
var router = express.Router();
var handleMove = function (req, res, next) {
    var move = MoveService_1.default.getNextMove(req.body);
    res.setHeader('ala', 'ma kota2');
    res.json(move);
    res.end();
};
router.all('/getNextMove', handleMove);
module.exports = router;
//# sourceMappingURL=moves.js.map