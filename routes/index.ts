/// <reference path='../typings/express/express.d.ts' />

import {Response, Request} from "express";
import service, {MoveService} from "./MoveService";
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req:Request, res:Response, next) {
    res.render('index', {title: 'Express 223'});
});

var handleMove = function (req:Request, res:Response, next) {
    var move = service.getNextMove(req.body);

    // res.render('index', {title: JSON.stringify(result)});
    res.setHeader('ala', 'ma kota2');
    res.json(move);
    res.end();
};
router.post('/getNextMove', handleMove);
router.get('/getNextMove', handleMove);
module.exports = router;
