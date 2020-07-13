import { IFieldOfView } from './IFieldOfView';
import { IChess, XYZType, XYType } from '../Types';
import { TileXY, WorldXY, Shape } from '../board';
import { IsInCone } from './IsInCone';
import { IsPathVisible } from './IsPathVisible';
import { Between as AngleBetween } from '../../utils/math/angle/Between';

const LINEOFFSET = 0.001;

export function IsInLOS(
    fov: IFieldOfView,
    chess: IChess | XYZType,
    visiblePoints?: number,
    originTileXY: XYType = fov.startTileXYZ
): boolean {

    if ((visiblePoints !== undefined) && (visiblePoints <= 0)) {
        return false;
    }

    let board = fov.board;
    let targetTileXYZ = TileXY.ChessToTileXYZ(board, chess);
    if (!IsInCone(fov, targetTileXYZ)) {
        return false;
    }

    //if (this.debugLog) {
    //    console.log('Visible test from (' + originTileXY.x + ',' + originTileXY.y + ') to (' + targetTileXYZ.x + ',' + targetTileXYZ.y + ')');
    //}

    let startTileXY = WorldXY.TileXYToWorldXY(board, originTileXY.x, originTileXY.y, true);
    let startX = startTileXY.x,
        startY = startTileXY.y;
    let endTileXY = WorldXY.TileXYToWorldXY(board, targetTileXYZ.x, targetTileXYZ.y, true);
    let endX = endTileXY.x,
        endY = endTileXY.y;
    let lineAngle = AngleBetween(startX, startY, endX, endY);
    // Shift a small distance
    lineAngle += (Math.PI / 2);
    let offsetX = LINEOFFSET * Math.cos(lineAngle);
    let offsetY = LINEOFFSET * Math.sin(lineAngle);
    let line0TileXYArray = Shape.LineToTileXYArray(board,
        (startX + offsetX),
        (startY + offsetY),
        (endX + offsetX),
        (endY + offsetY));

    // if (this.debugLog) {
    //     console.log('Line 0: ' + JSON.stringify(line0TileXYArray));
    // }

    let isVisivle = IsPathVisible(fov, line0TileXYArray, visiblePoints);
    if (isVisivle) {

        // drawLine(
        //     this.debugGraphics,
        //     this.debugVisibleLineColor,
        //     startX, startY, endX, endY
        // );
        return true;
    }

    // Shift a small distance
    lineAngle += Math.PI;
    offsetX = LINEOFFSET * Math.cos(lineAngle);
    offsetY = LINEOFFSET * Math.sin(lineAngle);
    let line1TileXYArray = Shape.LineToTileXYArray(board,
        (startX + offsetX),
        (startY + offsetY),
        (endX + offsetX),
        (endY + offsetY)
    );

    // if (this.debugLog) {
    //     console.log('Line 1: ' + JSON.stringify(line1TileXYArray));
    // }

    // No need do visible checking if path is the same as previous one
    let isEqual = (line0TileXYArray.length === line1TileXYArray.length);
    if (isEqual) {
        for (let i = 0, cnt = line0TileXYArray.length; i < cnt; i++) {
            let tileXY0 = line0TileXYArray[i],
                tileXY1 = line1TileXYArray[i];
            isEqual = (tileXY0.x === tileXY1.x) && (tileXY0.y === tileXY1.y);
            if (!isEqual) {
                break;
            }
        }
    }

    if (!isEqual) {
        isVisivle = IsPathVisible(fov, line1TileXYArray, visiblePoints);
    }

    // drawLine(
    //     this.debugGraphics,
    //     ((isVisivle) ? this.debugVisibleLineColor : this.debugInvisibleLineColor),
    //     startX, startY, endX, endY
    // );

    return isVisivle;
}

// let drawLine = function (graphics, color, startX, startY, endX, endY) {
//     if (graphics && (color !== undefined)) {
//         graphics.lineStyle(1, color, 1).lineBetween(startX, startY, endX, endY);
//     }
// }