import { IPadding } from './IPadding'

export function GetPadding(
    padding: IPadding,
    key?: string
): number | IPadding {

    if (key === undefined) {
        return padding;
    }
    return padding[key];
}

export function SetPadding(
    padding: IPadding,
    key: string | number | IPadding,
    value?: number
): void {

    if (typeof (key) === 'string') {
        padding[key] = value;
    } else if (typeof (key) === 'number') {
        padding.left = key;
        padding.right = key;
        padding.top = key;
        padding.bottom = key;
    } else {
        let left: number, right: number, top: number, bottom: number;
        ({
            left = 0,
            right = 0,
            top = 0,
            bottom = 0
        } = key);

        padding.left = left;
        padding.right = right;
        padding.top = top;
        padding.bottom = bottom;
    }
}
