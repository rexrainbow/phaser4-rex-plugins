export let Wrap = function (
    value: number,
    min: number,
    max: number
): number {

    let range = max - min;
    return (min + ((((value - min) % range) + range) % range));
};
