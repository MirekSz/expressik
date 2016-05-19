"use strict";
const Models_1 = require('../model/Models');
class Board {
    constructor(x1y1, x2y1, x3y1, x1y2, x2y2, x3y2, x1y3, x2y3, x3y3) {
        this.x1y1 = x1y1;
        this.x2y1 = x2y1;
        this.x3y1 = x3y1;
        this.x1y2 = x1y2;
        this.x2y2 = x2y2;
        this.x3y2 = x3y2;
        this.x1y3 = x1y3;
        this.x2y3 = x2y3;
        this.x3y3 = x3y3;
    }
}
class MoveServiceImpl {
    getValueFromDB() {
        return new Promise(function (resolve, reject) {
            console.log('start: ');
            Models_1.PasswordRule.findById(100000).then((data) => {
                console.log('data: ');
                console.log(data.name);
                data.getOperators().then((d) => {
                    console.log(d.length);
                    for (var i = 0; i < d.length; i++) {
                        var obj = d[i];
                        console.log('obj.firstName: ', obj.firstName);
                    }
                });
                return data;
            }).catch((e) => {
                console.error('e: ');
                console.error(e);
            }).then((group) => {
                group.name = 'Standardowa';
                group.save();
            });
            Models_1.Operator.findById(100000).then((data) => {
                console.log('data: ');
                console.log(data.firstName);
                return data;
            }).catch((e) => {
                console.error('e: ');
                console.error(e);
            });
            Models_1.PasswordRule.count().then(console.log.bind(console, 'Count2 :'));
            resolve("ok");
        });
    }
    // @CheckParams()
    getNextMove(board) {
        var result;
        while (true) {
            var x = Math.floor((Math.random() * 3) + 1);
            var y = Math.floor((Math.random() * 3) + 1);
            var field = `x${x}y${y}`;
            if (!board[field]) {
                result = { x: x, y: y };
                break;
            }
        }
        return result;
    }
}
const service = new MoveServiceImpl();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = service;
//# sourceMappingURL=MoveService.js.map