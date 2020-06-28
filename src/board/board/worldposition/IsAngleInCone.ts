import {
    ILogicBoard,
    IChess, XYType
} from '../ILogicBoard';
import { Normalize as AngleNormalize } from '../../../utils/math/angle/Normalize';
import { Equal } from '../../../utils/math/fuzzy/Equal';

export let IsAngleInCone = function (
    board: ILogicBoard,
    chessA: IChess | XYType,
    chessB: IChess | XYType,
    face: number,
    cone: number
): boolean {

    let tileXYA = board.chessToTileXYZ(chessA);
    let tileXYB = board.chessToTileXYZ(chessB);
    let targetAngle = board.angleBetween(tileXYA, tileXYB); // -PI~PI
    targetAngle = AngleNormalize(targetAngle); // 0~2PI
    let deltaAngle = Math.abs(targetAngle - face);
    deltaAngle = Math.min(deltaAngle, PI2 - deltaAngle);
    let halfCone = cone / 2;
    return Equal(deltaAngle, halfCone) || (deltaAngle < halfCone);
}

const PI2 = Math.PI * 2;