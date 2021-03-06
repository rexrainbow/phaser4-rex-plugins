import { IBaseBoard } from '../IBaseBoard';
import { IChess, XYType } from '../../Types';
import { ChessToTileXYZ } from '../tilexy/ChessToTileXYZ';
import { AngleBetween } from './AngleBetween';
import { Normalize as AngleNormalize } from '../../../utils/math/angle/Normalize';
import { Equal } from '../../../utils/math/fuzzy/Equal';

export function IsAngleInCone(
    board: IBaseBoard,
    chessA: IChess | XYType,
    chessB: IChess | XYType,
    face: number,
    cone: number
): boolean {

    let tileXYA = ChessToTileXYZ(board, chessA);
    let tileXYB = ChessToTileXYZ(board, chessB);
    let targetAngle = AngleBetween(board, tileXYA, tileXYB); // -PI~PI
    targetAngle = AngleNormalize(targetAngle); // 0~2PI
    let deltaAngle = Math.abs(targetAngle - face);
    deltaAngle = Math.min(deltaAngle, PI2 - deltaAngle);
    let halfCone = cone / 2;
    return Equal(deltaAngle, halfCone) || (deltaAngle < halfCone);
}

const PI2 = Math.PI * 2;