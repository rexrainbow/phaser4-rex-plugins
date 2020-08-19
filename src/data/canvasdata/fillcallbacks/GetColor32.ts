export function GetColor32(
    imgData: Uint8ClampedArray,
    index: number
): number {

    return (imgData[index + 3] << 24) |
        (imgData[index + 0] << 16) |
        (imgData[index + 1] << 8) |
        imgData[index + 2];
};