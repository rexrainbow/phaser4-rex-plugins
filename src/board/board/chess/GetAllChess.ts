import { IBaseBoard } from '../IBaseBoard';
import { IChess } from '../../Types';


export let GetAllChess = function (
    board: IBaseBoard,
    out: IChess[] = []
): IChess[] {

    let chessToXYZ = board.boardData.chessToXYZ;
    for (const [chess, xyz] of chessToXYZ) {
        out.push(chess);
    }
    return out;
};