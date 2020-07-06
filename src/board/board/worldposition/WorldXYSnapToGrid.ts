import { IBoardBase } from '../IBoardBase';
import { Vec2Type } from '../../types';
import { WorldXYToTileXY } from './WorldXYToTileXY';
import { TileXYToWorldXY } from './TileXYToWorldXY';

export let WorldXYSnapToGrid = function (
    board: IBoardBase,
    worldX: number,
    worldY: number,
    out: Vec2Type | true = { x: 0, y: 0 }
): Vec2Type {

    if (out === true) {
        out = globWorldXY;
    }

    WorldXYToTileXY(board, worldX, worldY, out);
    TileXYToWorldXY(board, out.x, out.y, out);
    return out;
};

let globWorldXY: Vec2Type = { x: 0, y: 0 };