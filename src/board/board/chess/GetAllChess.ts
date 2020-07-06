import { IBoardBase } from '../IBoardBase';
import { IChess } from '../../types';


export let GetAllChess = function (
    board: IBoardBase,
    out: IChess[] = []
): IChess[] {

    let chessToXYZ = board.boardData.chessToXYZ;
    for (const [chess, xyz] of chessToXYZ) {
        out.push(chess);
    }
    return out;
};