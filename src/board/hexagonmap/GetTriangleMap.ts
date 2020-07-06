import { IBoardBase } from '../board/IBoardBase';
import { XYType } from '../types';
import { cube2cr } from '../grid/hexagon/CubeTransfer';

export let GetTriangleMap = function (
    board: IBoardBase,
    type: number,
    height: number,
    out: XYType[] = []
): XYType[] {

    let mode = board.grid.mode;
    let rStart: number,
        rEnd: number;
    for (let q = 0; q <= height; q++) {
        if (type === 1) {
            rStart = height - q;
            rEnd = height;
        } else {
            rStart = 0;
            rEnd = height - q;
        }

        for (let r = rStart; r <= rEnd; r++) {
            out.push(cube2cr(mode, q, r, -q - r));
        }
    }

    return out;
}