import {
    ILogicBoard,
    XYType
} from '../ILogicBoard';

export let GetNeighborTileXYAtAngle = function (
    borad: ILogicBoard,
    srcTileXY: XYType,
    angle: number,
    out: XYType | true = { x: 0, y: 0 }
): XYType | null {

    let direction = borad.angleSnapToDirection(srcTileXY, angle);
    return borad.getTileXYAtDirection(srcTileXY, direction, 1, out) as XYType;
};