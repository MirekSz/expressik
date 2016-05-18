import service from "../service/MoveService";
import * as express from "express";
import  {Request, Response} from "express";
var router = express.Router();


var handleMove = function (req:Request, res:Response, next) {
    var move = service.getNextMove(req.body);
    res.setHeader('ala', 'ma kota2');
    res.json(move);
    res.end();
};

router.all('/getNextMove', handleMove);

module.exports = router;
