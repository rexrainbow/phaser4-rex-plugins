export function DistanceBetween(
    x1: number,
    y1: number,
    x2: number,
    y2: number
): number {

    let dx = x1 - x2;
    let dy = y1 - y2;

    return Math.sqrt(dx * dx + dy * dy);
};