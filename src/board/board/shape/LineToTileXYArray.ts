import { IBaseBoard } from '../IBaseBoard';
import { WorldXYToTileXY } from '../worldxy/WorldXYToTileXY';
import { Contains } from '../tilexy/Contains';
import { XYType } from '../../Types';
import { DistanceBetween } from '../../../utils/math/distance/DistanceBetween';
import { Linear } from '../../../utils/math/Linear';

export function LineToTileXYArray(
    board: IBaseBoard,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    out: XYType[] = []
): XYType[] {

    let totalDistance = DistanceBetween(startX, startY, endX, endY);
    let gridSize = Math.min(board.grid.width, board.grid.height);
    let quantity = Math.ceil(totalDistance / (gridSize / 4));
    let preTileXY: XYType;
    for (let i = 0; i <= quantity; i++) {
        let t = i / quantity;
        let worldX = Linear(startX, endX, t);
        let worldY = Linear(startY as number, endY, t);
        let tileXY = WorldXYToTileXY(board, worldX, worldY);

        if (!Contains(board, tileXY.x, tileXY.y)) {
            continue;
        }

        if (preTileXY &&
            (preTileXY.x === tileXY.x) && (preTileXY.y === tileXY.y)) {
            continue;
        }

        out.push(tileXY);
        preTileXY = tileXY;
    }
    return out;
}