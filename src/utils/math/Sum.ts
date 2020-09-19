export function Sum(...numbers: number[]): number {
    return Array.prototype.reduce.call(numbers, Add, 0);
}

function Add(
    a: number,
    b: number
): number {

    return a + b;
}