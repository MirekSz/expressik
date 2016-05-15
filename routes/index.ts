import service, {MoveService} from "./MoveService";
import {Request, Response} from "express";
import {RequestParamHandler} from "express";
import {NextFunction} from "express";
var express = require('express');
var router = express.Router();

interface ExtRequest extends Request{
    model?:{[key:string]:any};
}

interface  ExtRequestParamHandler extends RequestParamHandler{
    (req: ExtRequest, res: Response, next: NextFunction, param: any): any;

}



/* GET home page. */
router.get('/', function (req:ExtRequest, res, next) {
        req.model={};
        req.model['name'] = 'mirek';
        next();
    },
    handle((req:ExtRequest, res:Response, model)=> {
        console.log(req.model);
        model.title = 'Express hura';
        res.render('index', model);
    }));

var handleMove = function (req:Request, res:Response, next) {
    var move = service.getNextMove(req.body);
    res.setHeader('ala', 'ma kota2');
    res.json(move);
    res.end();
};

function handle(handler) {
    return function (req, res) {
        handler(req, res, {menu: 'Predefined menu'});
    }
}


router.get('/users/:id/:state',handle((req:ExtRequest, res:Response, model)=> {
    model.title = 'User id = '+JSON.stringify( req.params);
    res.render('index', model);
}));

router.all('/getNextMove', handleMove);
module.exports = router;
