import {
    ILogicBoard,
    ZType,
    IChess
} from '../ILogicBoard';

export let TileZToChessArray = function (
    board: ILogicBoard,
    tileZ: ZType,
    out: IChess[] = []
): IChess[] {

    let chessSet = board.boardData.ZToChessSet.get(tileZ);
    if (chessSet) {
        for (const chess of chessSet) {
            out.push(chess);
        }
    }
    return out;
}