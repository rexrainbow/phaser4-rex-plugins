import { XYZType } from '../Types';


export let CopyTileXYZ = function (
    src: XYZType,
    out: XYZType = { x: 0, y: 0, z: 0 }): XYZType {

    out.x = src.x;
    out.y = src.y;
    out.z = src.z;
    return out;
}