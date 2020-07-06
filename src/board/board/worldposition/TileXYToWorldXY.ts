import { IBoardBase } from '../IBoardBase';
import { XType, YType, Vec2Type } from '../../types';


export let TileXYToWorldXY = function (
    board: IBoardBase,
    tileX: XType,
    tileY: YType,
    out?: Vec2Type | true
): Vec2Type {

    return board.grid.getWorldXY(tileX, tileY, out);
}