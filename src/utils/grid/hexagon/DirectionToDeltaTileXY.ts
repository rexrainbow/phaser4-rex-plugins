type DeltaXYType = [number, number];
export type DirectionToDeltaXYEntryType = DeltaXYType[];
type ParityToDeltaXYType = DirectionToDeltaXYEntryType[];
type DirectionToDeltaTileXYType = ParityToDeltaXYType[];

const ODD_R: ParityToDeltaXYType = [
    [
        [+1, 0],
        [0, +1],
        [-1, +1],
        [-1, 0],
        [-1, -1],
        [0, -1]
    ],
    [
        [+1, 0],
        [+1, +1],
        [0, +1],
        [-1, 0],
        [0, -1],
        [+1, -1]
    ]
];
const EVEN_R: ParityToDeltaXYType = [
    [
        [+1, 0],
        [+1, +1],
        [0, +1],
        [-1, 0],
        [0, -1],
        [+1, -1]
    ],
    [
        [+1, 0],
        [0, +1],
        [-1, +1],
        [-1, 0],
        [-1, -1],
        [0, -1]
    ]
];
const ODD_Q: ParityToDeltaXYType = [
    [
        [+1, 0],
        [0, +1],
        [-1, 0],
        [-1, -1],
        [0, -1],
        [+1, -1]
    ],
    [
        [+1, +1],
        [0, +1],
        [-1, +1],
        [-1, 0],
        [0, -1],
        [+1, 0]
    ]
];
const EVEN_Q: ParityToDeltaXYType = [
    [
        [+1, +1],
        [0, +1],
        [-1, +1],
        [-1, 0],
        [0, -1],
        [+1, 0]
    ],
    [
        [+1, 0],
        [0, +1],
        [-1, 0],
        [-1, -1],
        [0, -1],
        [+1, -1]
    ]
];

export let DirectionToDeltaTileXY: DirectionToDeltaTileXYType = [
    ODD_R,
    EVEN_R,
    ODD_Q,
    EVEN_Q
];
// DirectionToDeltaTileXYType[mode][parity][dir]: [x/y]