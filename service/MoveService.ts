import {CheckParams, CheckReturn} from "runtime-type-checks/index";
import {info} from "./lib";
import {PasswordRule, Operator} from '../model/Models';
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
        return new Promise<string>(function (resolve, reject) {
            console.log('start: ');


            PasswordRule.findById(100000).then((data:any)=> {
                console.log('data: ');
                console.log(data.name);
                data.getOperators().then((d)=> {
                    console.log(d.length);
                    for (var i = 0; i < d.length; i++) {
                        var obj = d[i];
                        console.log('obj.firstName: ', obj.firstName);
                    }
                });
                return data;
            }).catch((e)=> {
                console.error('e: ');
                console.error(e);
            }).then((group)=> {
                group.name = 'Standardowa';
                group.save();
            });

            Operator.findById(100000).then((data:any)=> {
                console.log('data: ');
                console.log(data.firstName);
                return data;
            }).catch((e)=> {
                console.error('e: ');
                console.error(e);
            });

            PasswordRule.count().then(console.log.bind(console, 'Count2 :'));
            resolve("ok")
        });
    }

    // @CheckParams()
    public getNextMove(board:Board):Move {
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
