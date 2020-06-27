import { ILogicBoard } from '../ILogicBoard';

export let SetBoardWidth = function (
    board: ILogicBoard,
    width: number
): void {

    if (board.infinityMode) {
        return;
    }
    if ((board.width === undefined) || (board.width <= width)) {
        board.width = width;
        return;
    }

    // this.width > width : collapse
    for (let x = width; x < board.width; x++) {
        for (let y = 0; y < board.height; y++) {
            // TODO: RemoveChess
        }
    }

    board.width = width;
}

export default SetBoardWidth;