import { IBaseBoard } from '../IBaseBoard';
import { XType, YType, Vec2Type } from '../../Types';

export function TileXYToWorldXY(
    board: IBaseBoard,
    tileX: XType,
    tileY: YType,
    out?: Vec2Type | true
): Vec2Type {

    return board.grid.getWorldXY(tileX, tileY, out);
}