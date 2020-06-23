import { LayoutMode } from './IHexagon'

export function GetParity(
    mode: LayoutMode,
    tileX: number,
    tileY: number
): number {

    let parity;
    switch (mode) {
        case LayoutMode.ODD_R:
        case LayoutMode.EVEN_R:
            parity = tileY & 1;
            break;

        case LayoutMode.ODD_Q:
        case LayoutMode.EVEN_Q:
            parity = tileX & 1;
            break;
    }
    return parity;
}