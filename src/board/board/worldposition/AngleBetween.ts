import { IBaseBoard } from '../IBaseBoard';
import { IChess, XYType } from '../../types';
import { ChessToTileXYZ } from '../tileposition/ChessToTileXYZ';
import { TileXYToWorldXY } from './TileXYToWorldXY';
import { Between as GetAngle } from '../../../utils/math/angle/Between';

export let AngleBetween = function (
    board: IBaseBoard,
    chessA: IChess | XYType,
    chessB: IChess | XYType
): number {

    let tileA = ChessToTileXYZ(board, chessA);
    let tileB = ChessToTileXYZ(board, chessB);
    let out = TileXYToWorldXY(board, tileA.x, tileA.y, true);
    let x0 = out.x;
    let y0 = out.y;
    out = TileXYToWorldXY(board, tileB.x, tileB.y, true);
    let x1 = out.x;
    let y1 = out.y;
    return GetAngle(x0, y0, x1, y1); // -PI~PI
}