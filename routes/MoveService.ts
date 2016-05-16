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

class MoveServiceImpl {

    public getValueFromDB():Promise<string> {
        return new Promise(function (resolve, reject) {
            var conString2 = "postgres://verto_dev:verto_devverto_dev@strumyk-next-db:5432/verto_dev";
            var client = new pg.Client(conString2);

            client.connect(()=> {
                var query = "SELECT ID_OPERATOR_GROUP,NAME as name FROM OPERATOR_GROUP";
                client.query(query, (err, data)=> {
                    if (err)  reject(err);
                    for (var i = 0; i < data.rows.length; i++) {
                        var obj = data.rows[i];
                        // console.log(obj);
                        resolve(obj.name);
                    }
                })
            });
        });
    }

    // @CheckParams()
    public getNextMove(board:Board):Move {
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

const service = new MoveServiceImpl();
export default service;

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
            Person.find({firstname: 'domi'}, function (e, data) {
                var domi = data[0];
                domi.lastname = 'asd';
                domi.save();
            });
            Person.get(101, (err, person)=> {
                if (err) throw err;
                console.log(JSON.stringify(person));
                person.firstname = 'domi';
                // person.save();
                resolve(person.email);
            });
        })
    })
}
