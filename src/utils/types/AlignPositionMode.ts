/*
0 1 2
3 4 5
6 7 8
*/

export enum AlignPositionMode {
    left_top = 0,
    top_left = 0,

    center_top = 1,
    top_center = 1,

    right_top = 2,
    top_right = 2,

    left_center = 3,
    center_left = 3,

    center = 4,
    center_center = 4,

    right_center = 5,
    center_right = 5,

    left_bottom = 6,
    bottom_left = 6,

    center_bottom = 7,
    bottom_center = 7,

    right_bottom = 8,
    bottom_right = 8
}

export type AlignPositionModeString =
    'left_top' | 'top_left' |
    'center_top' | 'top_center' |
    'right_top' | 'top_right' |
    'left_center' | 'center_left' |
    'center' | 'center_center' |
    'right_center' | 'center_right' |
    'left_bottom' | 'bottom_left' |
    'center_bottom' | 'bottom_center' |
    'right_bottom' | 'bottom_right';