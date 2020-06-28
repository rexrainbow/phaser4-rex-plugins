import {
    ILogicBoard,
    XYType
} from '../ILogicBoard'

export let AngleToward = function (
    board: ILogicBoard,
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
    let neighborTileXY = board.getNeighborTileXY(tileXY, direction, true);

    // Restore wrapMode, infinityMode and clear them
    board.wrapMode = wrapModeSave;
    board.infinityMode = infinityModeSave;
    return board.angleBetween(tileXY, neighborTileXY); // -PI~PI
}

var zeroTileXY : XYType = { x: 0, y: 0 };