import { IBoardBase } from '../IBoardBase';

export let SetBoardHeight = function (
    board: IBoardBase,
    height: number
): void {

    if (board.infinityMode) {
        return;
    }
    if ((board.height === undefined) || (board.height <= height)) {
        board.height = height;
        return;
    }

    // board.height > height : collapse
    for (let x = 0; x < board.width; x++) {
        for (let y = height; y < board.height; y++) {

            // TODO: RemoveChess
        }
    }

    board.height = height;
}