"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var index_1 = require("runtime-type-checks/index");
var pg = require('pg');
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
    MoveServiceImpl.prototype.getNextMove = function (board) {
        var conString = "postgres://postgres:postgres@localhost:5433/postgres";
        pg.connect(conString, function (err, client, done) {
            var query = client.query("select * from teacher", function (err, data) {
                console.log(data.rows[0].email);
            });
            console.log(err);
            console.log(done);
        });
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
    __decorate([
        index_1.CheckParams(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Board]), 
        __metadata('design:returntype', Object)
    ], MoveServiceImpl.prototype, "getNextMove", null);
    return MoveServiceImpl;
}());
var service = new MoveServiceImpl();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = service;
//# sourceMappingURL=MoveService.js.map