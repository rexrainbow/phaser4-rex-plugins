import { LayoutMode } from './IHexagonBase';

export type CubeType = {
    x: number,
    y: number,
    z: number
}

export type ColRowType = {
    x: number,
    y: number
}

export type QRType = {
    q: number,
    r: number
}

export function cr2cube(
    mode: LayoutMode,
    col: number,
    row: number,
    out: CubeType | true = { x: 0, y: 0, z: 0 }
): CubeType {

    if (out === true) {
        out = globCube;
    }

    switch (mode) {
        case LayoutMode.ODD_R:
            out.x = col - (row - (row & 1)) / 2;
            out.z = row;
            break;

        case LayoutMode.EVEN_R:
            out.x = col - (row + (row & 1)) / 2;
            out.z = row;
            break;

        case LayoutMode.ODD_Q:
            out.x = col;
            out.z = row - (col - (col & 1)) / 2;
            break;
        case LayoutMode.EVEN_Q:
            out.x = col;
            out.z = row - (col + (col & 1)) / 2;
            break;
    }
    out.y = -out.x - out.z;
    return out;
}

export function roundcube(
    x: number | CubeType,
    y?: number,
    z?: number,
    out: CubeType | true = { x: 0, y: 0, z: 0 }
): CubeType {

    if (typeof (x) !== 'number') {
        out = x;
        x = out.x;
        y = out.y;
        z = out.z;
    }

    if (out === true) {
        out = globCube;
    }

    let rx = Math.round(x);
    let ry = Math.round(y);
    let rz = Math.round(z);

    let dx = Math.abs(rx - x);
    let dy = Math.abs(ry - y);
    let dz = Math.abs(rz - z);

    if ((dx > dy) && (dx > dz)) {
        rx = -ry - rz;
    } else if (dy > dz) {
        ry = -rx - rz;
    } else {
        rz = -rx - ry;
    }
    out.x = rx;
    out.y = ry;
    out.z = rz;
    return out;
}

export function cube2cr(
    mode: LayoutMode,
    x: number,
    y: number,
    z: number,
    out: ColRowType | true = { x: 0, y: 0 }
): ColRowType {

    if (out === true) {
        out = globCR;
    }

    switch (mode) {
        case LayoutMode.ODD_R:
            out.x = x + (z - (z & 1)) / 2;
            out.y = z;
            break;
        case LayoutMode.EVEN_R:
            out.x = x + (z + (z & 1)) / 2;
            out.y = z;
            break;

        case LayoutMode.ODD_Q:
            out.x = x;
            out.y = z + (x - (x & 1)) / 2;
            break;
        case LayoutMode.EVEN_Q:
            out.x = x;
            out.y = z + (x + (x & 1)) / 2;
            break;
    }
    return out;
}

export function qr2cube(
    q: number,
    r: number,
    out: CubeType | true = { x: 0, y: 0, z: 0 }
): CubeType {

    if (out === true) {
        out = globCube;
    }
    out.x = q;
    out.y = -q - r;
    out.z = r;
    return out;
}

export function cube2qr(
    x: number,
    y: number,
    z: number,
    out: QRType | true = { q: 0, r: 0 }
): QRType {

    if (out === true) {
        out = globQR;
    }

    out.q = x;
    out.r = z;
    return out;
}

let globCube: CubeType = { x: 0, y: 0, z: 0 };
let globCR: ColRowType = { x: 0, y: 0 };
let globQR: QRType = { q: 0, r: 0 };