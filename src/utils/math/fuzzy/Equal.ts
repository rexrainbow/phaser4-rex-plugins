export let Equal = function (
    a: number,
    b: number,
    epsilon: number = 0.0001
): boolean {

    return Math.abs(a - b) < epsilon;
};
