import { IBaseBoard } from '../board/IBaseBoard';
import { XYType } from '../Types';
import { cube2cr } from '../grid/hexagon/CubeTransfer';

export let GetParallelogramMap = function (
    board: IBaseBoard,
    type: number,
    width: number,
    height: number,
    out: XYType[] = []
): XYType[] {

    let mode = board.grid.mode;
    switch (type) {
        case 1:
            for (let s = 0; s <= width; s++) {
                for (let q = 0; q <= height; q++) {
                    out.push(cube2cr(mode, q, -q - s, s));
                }
            }
            break;
        case 2:
            for (let r = 0; r <= width; r++) {
                for (let s = 0; s <= height; s++) {
                    out.push(cube2cr(mode, -r - s, r, s));
                }
            }
            break;
        default: // case 0
            for (let q = 0; q <= width; q++) {
                for (let r = 0; r <= height; r++) {
                    out.push(cube2cr(mode, q, r, -q - r));
                }
            }
            break;
    }

    return out;
}