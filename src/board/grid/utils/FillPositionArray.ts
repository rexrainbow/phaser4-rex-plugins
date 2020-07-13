import { Vec2Type } from '../IGrid';

export function FillPositionArray(
    length: number,
    out: Vec2Type[] = []
): Vec2Type[] {

    if (out.length === length) {
        // Do nothing
    } else if (out.length < length) {
        for (let i = out.length; i < length; i++) {
            out.push({ x: 0, y: 0 });
        }
    } else { // out.length < length
        out.length = length;
    }

    return out;
}