import { IBaseBoard } from '../IBaseBoard';
import { XYType } from '../../types';
import { GetNeighborTileXY } from '../neighbors/GetNeighborTileXY';
import { AngleBetween } from './AngleBetween';

export let AngleToward = function (
    board: IBaseBoard,
    tileXY: XYType,
    direction: number
): number {

    if (tileXY === undefined) {
        tileXY = zeroTileXY;
    }
    // Save wrapMode, infinityMode and clear them
    let wrapModeSave = board.wrapMode;
    let infinityModeSave = board.infinityMode;
    board.wrapMode = false;
    board.infinityMode = true;

    // Get neighborTileXY
    let neighborTileXY = GetNeighborTileXY(board, tileXY, direction, true) as XYType;

    // Restore wrapMode, infinityMode and clear them
    board.wrapMode = wrapModeSave;
    board.infinityMode = infinityModeSave;
    return AngleBetween(board, tileXY, neighborTileXY); // -PI~PI
}

let zeroTileXY: XYType = { x: 0, y: 0 };