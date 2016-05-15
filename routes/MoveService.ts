import {CheckParams, CheckReturn} from "runtime-type-checks/index";
import * as pg from 'pg';
import * as orm from 'orm';

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

    // @CheckParams()
    public getNextMove(board:Board):Move {
        var conString = "postgres://postgres:postgres@localhost:5433/postgres";

        pg.connect(conString, (err, client, done)=> {
            var query = client.query("select * from teacher", (err, data)=> {
                console.log(data.rows[0].email);
            });
            console.log(err);
            console.log(done);
        });

        yo();//.then((data)=>{console.log(data)});
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

async function yo() {
    return new Promise(function (resolve, reject) {
        var conString = "postgres://postgres:postgres@localhost:5433/postgres?debug=true";
        orm.connect(conString, function (err, db) {
            if (err) throw err;

            var Person = db.define("teacher", {
                id: Number,
                email: String,
                firstname: String,
                lastname: String
            });
            Person.find({firstname:'domi'},function (e,data) {
                var domi = data[0];
            })
            Person.get(101, (err, person)=> {
                if (err) throw err;
                console.log(JSON.stringify(person));
                person.firstname = 'domi';
                // person.save();
                resolve(person.email);
            });
        })
1
    })
};
let service = new MoveServiceImpl();
export default service;
