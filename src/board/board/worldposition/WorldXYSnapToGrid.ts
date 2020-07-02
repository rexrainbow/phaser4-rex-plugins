import { ILogicBoard, Vec2Type } from '../ILogicBoard';

export let WorldXYSnapToGrid = function (
    board: ILogicBoard,
    worldX: number,
    worldY: number,
    out: Vec2Type | true = { x: 0, y: 0 }
): Vec2Type {

    if (out === true) {
        out = globWorldXY;
    }

    board.worldXYToTileXY(worldX, worldY, out);
    board.tileXYToWorldXY(out.x, out.y, out);
    return out;
};

var globWorldXY: Vec2Type = { x: 0, y: 0 };