import { XType, YType } from '../../../types';

export let GetXYKey = function (
    x: XType | undefined,
    y: YType | undefined
): string | undefined {

    return ((x === undefined) || (y === undefined)) ? undefined : `${x}|${y}`;
}