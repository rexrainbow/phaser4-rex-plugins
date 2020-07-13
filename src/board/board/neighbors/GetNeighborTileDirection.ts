import { IBaseBoard } from '../IBaseBoard';
import { XYType } from '../../Types';
import { GetNeighborTileXY } from './GetNeighborTileXY'

export function GetNeighborTileDirection(
    board: IBaseBoard,
    srcTileXY: XYType | null,
    neighborTileXY: XYType | null
): number | null {

    if ((srcTileXY === null) || (neighborTileXY === null)) {
        return null;
    }
    if ((srcTileXY.x === neighborTileXY.x) && (srcTileXY.y === neighborTileXY.y)) {
        return null
    }

    let direction = board.grid.getNeighborTileDirection(srcTileXY, neighborTileXY);
    if (board.wrapMode && (direction === null)) {
        let tileXYArray = GetNeighborTileXY(board, srcTileXY, null) as XYType[];
        for (let i = 0, cnt = tileXYArray.length; i < cnt; i++) {
            let tileXY = tileXYArray[i];
            if ((neighborTileXY.x === tileXY.x) && (neighborTileXY.y === tileXY.y)) {
                direction = i;
                break;
            }
        }
    }
    return direction;
}