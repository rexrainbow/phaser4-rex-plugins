export let GetRandomItem = function <T>(
    array: T[],
    startIndex: number = 0,
    length: number = array.length
): T {

    let randomIndex = startIndex + Math.floor(Math.random() * length);
    return (array[randomIndex] === undefined) ? null : array[randomIndex];
};
