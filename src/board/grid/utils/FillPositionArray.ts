import { PositionType } from '../IGrid';

export let FillPositionArray = function (
    length: number,
    out: PositionType[] = []
): PositionType[] {

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