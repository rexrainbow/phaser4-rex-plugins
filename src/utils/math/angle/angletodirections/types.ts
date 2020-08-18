export enum DirMode {
    'up&down' = 0,
    'left&right' = 1,
    '4dir' = 2,
    '8dir' = 3
}

export type DirModeString = 'up&down' | 'left&right' | '4dir' | '8dir';

export type DirectionsTyps = {
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean
}