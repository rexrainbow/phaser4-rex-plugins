export enum LayoutMode {
    ODD_R = 0,
    EVEN_R = 1,
    ODD_Q = 2,
    EVEN_Q = 3
}

export type LayoutModeString = 'ODD_R' | 'EVEN_R' | 'ODD_Q' | 'EVEN_Q'

export enum StaggerAxis {
    y = 0,
    flat = 0,
    x = 1,
    pointy = 1
}

export type StaggerAxisString = 'y' | 'x' | 'flat' | 'pointy';

export enum StaggerIndex {
    even = 0,
    odd = 1
}

export type StaggerIndexString = 'even' | 'odd';

export interface IState {
    x?: number,
    y?: number,

    radius?: number,
    cellWidth?: number,
    cellHeight?: number,

    staggerAxis?: StaggerAxis | StaggerAxisString,
    staggerIndex?: StaggerIndex | StaggerIndexString
}

export interface IConfig {
    x?: number,
    y?: number,

    radius?: number | undefined,
    cellWidth?: number,
    cellHeight?: number,

    staggerAxis?: StaggerAxis | StaggerAxisString,
    staggerIndex?: StaggerIndex | StaggerIndexString
}

export interface IHexagonBase {
    x: number,
    y: number,
    width: number,
    height: number

    _halfWidth: number,
    _halfHeight: number,
    radius: number,
    mode: LayoutMode,
    directions: number,
    staggerAxis: StaggerAxis
};