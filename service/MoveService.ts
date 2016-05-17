import {CheckParams, CheckReturn} from "runtime-type-checks/index";
import * as pg from 'pg';
import * as orm from 'orm';
import {info} from "./lib";

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
const conString = "postgres://verto_dev:verto_devverto_dev@strumyk-next-db:5432/verto_dev?debug=true";
class MoveServiceImpl {

    public getValueFromDB():Promise<string> {
        return new Promise(function (resolve, reject) {

            var client = new pg.Client(conString);

            client.connect((err)=> {
                if (err) reject(err);
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
        yo().then((data)=> {
            console.log('ORM', data)
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

const service = new MoveServiceImpl();
export default service;

var myCustomLevels = {
    levels: {
        foo: 0,
        bar: 1,
        baz: 2,
        foobar: 3
    },
    colors: {
        foo: 'blue',
        bar: 'green',
        baz: 'yellow',
        foobar: 'red'
    }
};


async function yo() {
    return new Promise(function (resolve, reject) {
        orm.connect(conString, function (err, db) {
            if (err) throw err;

            var OperatorGroup = db.define('operator_group', {
                id: {
                    mapsTo: 'id_operator_group',
                    type: 'serial',
                    key: true
                },
                name: String,
                active: Boolean
            });
            OperatorGroup.find({name: 'Lipna'}, function (err, data) {
                if (err) throw err;
                var group = data[0];
                info('Grup', group.name);
            });
            OperatorGroup.get(119900, (err, group)=> {
                if (err) throw err;
                resolve(JSON.stringify(group));
            });
        })
    })
}
