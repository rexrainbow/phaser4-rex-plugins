import { XYType } from '../types';


export let CopyTileXY = function (
    src: XYType,
    out: XYType = { x: 0, y: 0 }): XYType {

    out.x = src.x;
    out.y = src.y;
    return out;
}