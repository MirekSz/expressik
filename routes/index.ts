import service from "../service/MoveService";
import {Request, Response} from "express";
import {NextFunction} from "express";
var express = require('express');
var router = express.Router();
import {handle} from './lib';

/* GET home page. */
router.get('/', handle((req, res, model, next)=> {
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

router.get('/', handle((req, res:Response, model)=> {
    console.log('2: ');
    model.title = 'Express hura';
    res.render('index', model);
}));


module.exports = router;
