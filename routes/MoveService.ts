interface Move {
    x:number;
    y:number;
}
interface Player {
    name:String
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
let service = new MoveServiceImpl();
export default service;
