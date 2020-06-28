import {
    ILogicBoard,
    IChess
} from '../ILogicBoard';

export let GetAllChess = function (
    board: ILogicBoard,
    out: IChess[] = []
): IChess[] {

    let chessToXYZ = board.boardData.chessToXYZ;
    for (const [chess, xyz] of chessToXYZ) {
        out.push(chess);
    }
    return out;
};