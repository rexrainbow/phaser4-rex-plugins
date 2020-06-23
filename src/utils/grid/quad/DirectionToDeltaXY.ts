// orthogonal or isometric
export type DirectionToDeltaXYType = [number, number][];

const OrthogonalMap: DirectionToDeltaXYType = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 1],
    [-1, 1],
    [-1, -1],
    [1, -1]
];
const IsometricMap: DirectionToDeltaXYType = OrthogonalMap;

export {
    OrthogonalMap,
    IsometricMap
};