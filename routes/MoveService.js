"use strict";
var Board = (function () {
    function Board(x1y1, x2y1, x3y1, x1y2, x2y2, x3y2, x1y3, x2y3, x3y3) {
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
    return Board;
}());
var MoveServiceImpl = (function () {
    function MoveServiceImpl() {
    }
    // @CheckParams()
    MoveServiceImpl.prototype.getNextMove = function (board) {
        var conString = "postgres://postgres:postgres@localhost:5433/postgres";
        // pg.connect(conString, (err, client, done)=> {
        //     var query = client.query("select * from teacher",(err,data)=> {
        //         console.log(data.rows[0].email);
        //     });
        //     console.log(err);
        //     console.log(done);
        // });
        var result;
        while (true) {
            var x = Math.floor((Math.random() * 3) + 1);
            var y = Math.floor((Math.random() * 3) + 1);
            var field = "x" + x + "y" + y;
            if (!board[field]) {
                result = { x: x, y: y };
                break;
            }
        }
        return result;
    };
    return MoveServiceImpl;
}());
var service = new MoveServiceImpl();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = service;
//# sourceMappingURL=MoveService.js.map