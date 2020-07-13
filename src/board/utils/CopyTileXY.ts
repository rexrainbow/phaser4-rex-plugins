import { XYType } from '../Types';

export function CopyTileXY(
    src: XYType,
    out: XYType = { x: 0, y: 0 }): XYType {

    out.x = src.x;
    out.y = src.y;
    return out;
}