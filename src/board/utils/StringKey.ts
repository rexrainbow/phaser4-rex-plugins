import { XType, YType, Vec2Type } from '../types';

export let XYToKey = function (
    x: XType | undefined,
    y: YType | undefined
): string | undefined {

    return ((x === undefined) || (y === undefined)) ? undefined : `${x}|${y}`;
}

export let KeyToXY = function (
    key: string,
    out?: Vec2Type
): Vec2Type {

    let xy = key.split('|');
    if (out === undefined) {
        out = globXY;
    }
    out.x = parseInt(xy[0]);
    out.y = parseInt(xy[1]);
    return out;
}

let globXY: Vec2Type = { x: 0, y: 0 }