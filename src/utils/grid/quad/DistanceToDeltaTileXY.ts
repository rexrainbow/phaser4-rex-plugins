// orthogonal or isometric
export type DirMapType = [number, number][];

const OrthogonalMap: DirMapType = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 1],
    [-1, 1],
    [-1, -1],
    [1, -1]
];
const IsometricMap: DirMapType = OrthogonalMap;

export {
    OrthogonalMap,
    IsometricMap
};