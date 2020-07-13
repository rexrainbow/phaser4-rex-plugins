import { IBaseBoard } from '../board/IBaseBoard';
import { XYType } from '../Types';
import { cube2cr } from '../grid/hexagon/CubeTransfer';

export function GetHexagonMap(
    board: IBaseBoard,
    radius: number,
    out: XYType[] = []
): XYType[] {

    let mode = board.grid.mode;
    let r1: number,
        r2: number;
    for (let q = -radius; q <= radius; q++) {
        r1 = Math.max(-radius, -q - radius);
        r2 = Math.min(radius, -q + radius);
        for (let r = r1; r <= r2; r++) {
            out.push(cube2cr(mode, q, r, -q - r));
        }
    }

    return out;
}