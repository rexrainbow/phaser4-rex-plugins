export function IsVisible(
    imgData: Uint8ClampedArray,
    index: number
): number {

    return (imgData[index + 3]) ? 1 : 0;
}