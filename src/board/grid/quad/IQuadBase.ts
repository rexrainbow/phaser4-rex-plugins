export enum LayoutMode {
    'orthogonal' = 0,
    'isometric' = 1
}

export type LayoutModeString = 'orthogonal' | 'isometric';

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
    type?: LayoutMode | LayoutModeString,
    dir?: DirMode | DirModeString
}

export interface IState {
    x?: number,
    y?: number,
    cellWidth?: number,
    cellHeight?: number,
    type?: LayoutMode | LayoutModeString,
    dir?: DirMode | DirModeString
}

export interface IQuadBase {
    x: number,
    y: number,
    width: number,
    height: number

    _halfWidth: number,
    _halfHeight: number,
    mode: LayoutMode,
    directions: DirMode,
};