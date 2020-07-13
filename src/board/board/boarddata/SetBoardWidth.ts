import { IBaseBoard } from '../IBaseBoard';
import { GetAllChess } from '../chess/GetAllChess';
import { ChessToTileXYZ } from '../tilexy/ChessToTileXYZ';
import { RemoveChess } from '../chess/RemoveChess';

export function SetBoardWidth(
    board: IBaseBoard,
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
    let chessArray = GetAllChess(board);
    chessArray.forEach((chess) => {
        let tileXYZ = ChessToTileXYZ(board, chess);
        if (tileXYZ.x > width) {
            RemoveChess(board, chess);
        }
    })

    board.width = width;
}