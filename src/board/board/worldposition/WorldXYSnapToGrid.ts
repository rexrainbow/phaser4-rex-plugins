import { ILogicBoard, PositionType } from '../ILogicBoard';

export let WorldXYSnapToGrid = function (
    board: ILogicBoard,
    worldX: number,
    worldY: number,
    out: PositionType | true = { x: 0, y: 0 }
): PositionType {

    if (out === true) {
        out = globWorldXY;
    }

    board.worldXYToTileXY(worldX, worldY, out);
    board.tileXYToWorldXY(out.x, out.y, out);
    return out;
};

var globWorldXY: PositionType = { x: 0, y: 0 };