import {
    ILogicBoard,
    IChess, XYType
} from '../ILogicBoard';
import { Between as GetAngle } from '../../../utils/math/angle/Between';

export let AngleBetween = function (
    board: ILogicBoard,
    chessA: IChess | XYType,
    chessB: IChess | XYType
): number {

    let tileA = board.chessToTileXYZ(chessA);
    let tileB = board.chessToTileXYZ(chessB);
    let out = board.tileXYToWorldXY(tileA.x, tileA.y, true);
    let x0 = out.x;
    let y0 = out.y;
    out = board.tileXYToWorldXY(tileB.x, tileB.y, true);
    let x1 = out.x;
    let y1 = out.y;
    return GetAngle(x0, y0, x1, y1); // -PI~PI
}