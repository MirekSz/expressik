import {Request, Response, NextFunction, RequestParamHandler} from "express";

interface ExtRequest extends Request {
    model?:{[key:string]:any};
}

interface  ExtRequestParamHandler extends RequestParamHandler {
    (req:ExtRequest, res:Response, next:NextFunction, param:any):any;
}


export function handle(handler) {
    return function (req, res, next) {
        if (!req.model) {
            req.model = {
                menu: 'Predefined menu'
            };
        }
        handler(req, res, req.model, next);
    }
}
