export let Linear = function (
    p0: number,
    p1: number,
    t: number
): number {

    return (p1 - p0) * t + p0;
};
