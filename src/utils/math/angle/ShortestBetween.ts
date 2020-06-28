export let ShortestBetween = function (
    angle1: number,
    angle2: number
): number {

    let difference = angle2 - angle1;
    if (difference === 0) {
        return 0;
    }

    let times = Math.floor((difference - (-180)) / 360);
    return difference - (times * 360);
};
