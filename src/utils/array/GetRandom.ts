export let GetRandomItem = function (
    array: any[] | string,
    startIndex: number = 0,
    length: number = array.length
) {

    let randomIndex = startIndex + Math.floor(Math.random() * length);
    return (array[randomIndex] === undefined) ? null : array[randomIndex];
};
