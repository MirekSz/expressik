import service, {MoveService} from "./MoveService";
import {Request,Response} from "express";
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req:Request, res:Response, next) {
    res.render('index', {title: 'Express 223'});
});

var handleMove = function (req:Request, res:Response, next) {
    var move = service.getNextMove(req.body);
    res.setHeader('ala', 'ma kota2');
    res.json(move);
    res.end();
};
router.post('/getNextMove', handleMove);
router.get('/getNextMove', handleMove);
module.exports = router;
