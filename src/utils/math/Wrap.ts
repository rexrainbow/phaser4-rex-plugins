export function Wrap(
    value: number,
    min: number,
    max: number
): number {

    let range = max - min;
    return (min + ((((value - min) % range) + range) % range));
};
