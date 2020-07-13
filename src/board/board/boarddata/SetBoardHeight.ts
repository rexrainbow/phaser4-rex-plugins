import { IBaseBoard } from '../IBaseBoard';
import { GetAllChess } from '../chess/GetAllChess';
import { ChessToTileXYZ } from '../tilexy/ChessToTileXYZ';
import { RemoveChess } from '../chess/RemoveChess';

export function SetBoardHeight(
    board: IBaseBoard,
    height: number
): void {

    if (board.infinityMode) {
        return;
    }
    if ((board.height === undefined) || (board.height <= height)) {
        board.height = height;
        return;
    }

    // this.height > height : collapse
    let chessArray = GetAllChess(board);
    chessArray.forEach((chess) => {
        let tileXYZ = ChessToTileXYZ(board, chess);
        if (tileXYZ.y > height) {
            RemoveChess(board, chess);
        }
    })

    board.height = height;
}