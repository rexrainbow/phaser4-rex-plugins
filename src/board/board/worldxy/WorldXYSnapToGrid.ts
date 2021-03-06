import { IBaseBoard } from '../IBaseBoard';
import { Vec2Type } from '../../Types';
import { WorldXYToTileXY } from './WorldXYToTileXY';
import { TileXYToWorldXY } from './TileXYToWorldXY';

export function WorldXYSnapToGrid(
    board: IBaseBoard,
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