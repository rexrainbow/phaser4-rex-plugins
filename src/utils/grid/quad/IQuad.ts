export enum OrientationMode {
    'orthogonal' = 0,
    'isometric' = 1
}

export type OrientationModeString = 'orthogonal' | 'isometric';

export enum DirMode {
    '4dir' = 4,
    '8dir' = 8
};

export type DirModeString = '4dir' | '8dir';

export interface IConfig {
    x?: number,
    y?: number,
    cellWidth?: number,
    cellHeight?: number,
    type?: OrientationMode | OrientationModeString,
    dir?: DirMode | DirModeString
}

export interface IState {
    x?: number,
    y?: number,
    cellWidth?: number,
    cellHeight?: number,
    type?: OrientationMode | OrientationModeString,
    dir?: DirMode | DirModeString
}

export interface IQuad {
    x: number,
    y: number,

    width: number,
    height: number,
    _halfWidth: number,
    _halfHeight: number,

    mode: OrientationMode | OrientationModeString,
    directions: DirMode | DirModeString,
};