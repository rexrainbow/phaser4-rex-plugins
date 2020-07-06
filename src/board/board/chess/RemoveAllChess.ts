import { IBoardBase } from '../IBoardBase';
import { GetAllChess } from './GetAllChess';
import { RemoveChess } from './RemoveChess';

export let RemoveAllChess = function (
    board: IBoardBase,
    destroy: boolean = false,
    fromBoardRemove: boolean = false
): void {

    let chessArray = GetAllChess(board);
    for (let i = 0, cnt = chessArray.length; i < cnt; i++) {
        RemoveChess(board, chessArray[i], undefined, undefined, undefined, destroy, fromBoardRemove);
    }
}