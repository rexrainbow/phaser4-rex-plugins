import { IBaseBoard } from '../IBaseBoard';
import { XYType } from '../../Types';
import { AngleToward } from './AngleToward';
import { RadToDeg } from '../../../utils/math/angle/RadToDeg';
import { ShortestBetween } from '../../../utils/math/angle/ShortestBetween';

export function AngleSnapToDirection(
    board: IBaseBoard,
    tileXY: XYType,
    angle: number
): number {

    angle = RadToDeg(angle); // -180~180
    let directions = board.grid.allDirections;
    let minDeltaAngle = Infinity,
        direction = undefined;
    for (let i = 0, cnt = directions.length; i < cnt; i++) {
        let neighborAngle = RadToDeg(AngleToward(board, tileXY, directions[i])); // -PI~PI -> -180~180
        let deltaAngle = Math.abs(ShortestBetween(angle, neighborAngle));
        if (deltaAngle < minDeltaAngle) {
            minDeltaAngle = deltaAngle;
            direction = i;
        }
    }

    return direction;
};