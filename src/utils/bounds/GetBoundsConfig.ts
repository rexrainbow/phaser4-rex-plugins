import { BoundsType } from '../types/BoundsType';

export { BoundsType };
export interface IConfig {
    left?: number,
    right?: number,
    top?: number,
    bottom?: number
}

export function GetBoundsConfig(
    config: number | IConfig = 0,
    out: BoundsType = { left: 0, right: 0, top: 0, bottom: 0 }
): BoundsType {

    if (typeof (config) === 'number') {
        out.left = config;
        out.right = config;
        out.top = config;
        out.bottom = config;
    } else {
        let left: number, right: number, top: number, bottom: number;
        ({
            left = 0,
            right = 0,
            top = 0,
            bottom = 0
        } = config);

        out.left = left;
        out.right = right;
        out.top = top;
        out.bottom = bottom;
    }
    return out;
}