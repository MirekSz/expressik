import service from "../service/MoveService";
import {Request, Response} from "express";
import {RequestParamHandler} from "express";
import {NextFunction} from "express";
var express = require('express');
var router = express.Router();

interface ExtRequest extends Request {
    model?:{[key:string]:any};
}

interface  ExtRequestParamHandler extends RequestParamHandler {
    (req:ExtRequest, res:Response, next:NextFunction, param:any):any;

}


/* GET home page. */
router.get('/', handle((req:ExtRequest, res, model, next)=> {
    console.log('1: ');
    model['name'] = 'mirek';
    service.getValueFromDB().then((data)=> {
        console.log('data: ');
        console.log(data);
        model['val'] = data;
        next();
    }).catch((err)=> {
        console.log('err: ');
        console.log(err);
        next();
    });

}));

router.get('/', handle((req:ExtRequest, res:Response, model)=> {
    console.log('2: ');
    model.title = 'Express hura';
    model.json();
    res.render('index', model);
}));

var handleMove = function (req:Request, res:Response, next) {
    var move = service.getNextMove(req.body);
    res.setHeader('ala', 'ma kota2');
    res.json(move);
    res.end();
};

function handle(handler) {
    return function (req, res, next) {
        if (!req.model) {
            req.model = {
                menu: 'Predefined menu', json: ()=> {
                    req.model.json = JSON.stringify(req.model);
                }
            };
        }
        handler(req, res, req.model, next);
    }
}


router.get('/users/:id/:state', handle((req:ExtRequest, res:Response, model)=> {
    model.title = 'User id = ' + JSON.stringify(req.params);
    res.render('index', model);
}));

router.all('/getNextMove', handleMove);
module.exports = router;
