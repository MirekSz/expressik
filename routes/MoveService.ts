import {CheckParams, CheckReturn} from "runtime-type-checks/index";
import * as pg from 'pg';
interface Move {
    x:number;
    y:number;
}
interface Player {
    name:String;
    email:String;
}
class Board {

    constructor(public x1y1:Player, public x2y1:Player, public x3y1:Player,
                public x1y2:Player, public x2y2:Player, public x3y2:Player,
                public x1y3:Player, public x2y3:Player, public x3y3:Player) {
    }
}

export interface MoveService {

}
class MoveServiceImpl implements MoveService {

    @CheckParams()
    public getNextMove(board:Board):Move {
        var conString = "postgres://postgres:postgres@localhost:5433/postgres";

        pg.connect(conString, (err, client, done)=> {
            var query = client.query("select * from teacher",(err,data)=> {
                console.log(data.rows[0].email);
            });
            console.log(err);
            console.log(done);
        });


        var result;
        while (true) {
            var x = Math.floor((Math.random() * 3) + 1);
            var y = Math.floor((Math.random() * 3) + 1);

            var field = `x${x}y${y}`;
            if (!board[field]) {
                result = {x, y};
                break;
            }
        }

        return result;
    }
}
let service = new MoveServiceImpl();
export default service;
