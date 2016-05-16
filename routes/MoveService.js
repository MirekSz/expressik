"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const pg = require('pg');
const orm = require('orm');
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
            var conString2 = "postgres://verto_dev:verto_devverto_dev@strumyk-next-db:5432/verto_dev";
            var client = new pg.Client(conString2);
            client.connect(() => {
                var query = "SELECT ID_OPERATOR_GROUP,NAME as name FROM OPERATOR_GROUP";
                client.query(query, (err, data) => {
                    if (err)
                        reject(err);
                    for (var i = 0; i < data.rows.length; i++) {
                        var obj = data.rows[i];
                        // console.log(obj);
                        resolve(obj.name);
                    }
                });
            });
        });
    }
    // @CheckParams()
    getNextMove(board) {
        yo(); //.then((data)=>{console.log(data)});
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
function yo() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            var conString = "postgres://postgres:postgres@localhost:5433/postgres?debug=true";
            orm.connect(conString, function (err, db) {
                if (err)
                    throw err;
                var Person = db.define("teacher", {
                    id: Number,
                    email: String,
                    firstname: String,
                    lastname: String
                });
                Person.find({ firstname: 'domi' }, function (e, data) {
                    var domi = data[0];
                    domi.lastname = 'asd';
                    domi.save();
                });
                Person.get(101, (err, person) => {
                    if (err)
                        throw err;
                    console.log(JSON.stringify(person));
                    person.firstname = 'domi';
                    // person.save();
                    resolve(person.email);
                });
            });
        });
    });
}
//# sourceMappingURL=MoveService.js.map