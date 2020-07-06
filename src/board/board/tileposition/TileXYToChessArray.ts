import { IBoardBase } from '../IBoardBase';
import { XType, YType, IChess } from '../../types';
import { ZMapType } from '../boarddata/IBoardData';

export let TileXYToChessArray = function (
    board: IBoardBase,
    tileX: XType,
    tileY: YType,
    out: IChess[] = []
): IChess[] {

    let zMap = board.boardData.getChess(tileX, tileY) as ZMapType;
    for (const [tileZ, chess] of zMap) {
        out.push(chess);
    }
    return out;
}