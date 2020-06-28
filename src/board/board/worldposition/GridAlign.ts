import {
    ILogicBoard,
    IChess, XType, YType, XYZType
} from '../ILogicBoard';

export let GridAlign = function (
    board: ILogicBoard,
    chess?: IChess,
    tileX?: XType,
    tileY?: YType
): void {

    if (chess === undefined) {
        let chessArray = board.getAllChess();
        for (let i = 0, cnt = chessArray.length; i < cnt; i++) {
            let chess = chessArray[i];
            let tileXYZ = board.chessToTileXYZ(chess) as XYZType;

            board.tileXYToWorldXY(tileXYZ.x, tileXYZ.y, chess);
        }
    } else {
        if (tileX === undefined) {
            let tileXYZ = board.chessToTileXYZ(chess) as XYZType;
            tileX = tileXYZ.x;
            tileY = tileXYZ.y;
        }

        board.tileXYToWorldXY(tileX, tileY, chess);
    }
};