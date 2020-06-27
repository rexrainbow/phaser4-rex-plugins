import { ILogicBoard } from '../ILogicBoard';

export let RemoveAllChess = function (
    board: ILogicBoard,
    destroy: boolean = false,
    fromBoardRemove: boolean = false
): void {

    let chessArray = board.getAllChess();
    for (let i = 0, cnt = chessArray.length; i < cnt; i++) {
        board.removeChess(chessArray[i], undefined, undefined, undefined, destroy, fromBoardRemove);
    }
}