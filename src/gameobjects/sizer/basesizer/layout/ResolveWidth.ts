import { IBaseSizer } from '../IBaseSizer';

export function ResolveWidth(
    sizer: IBaseSizer,
    width?: number
): number {

    const minWidth = Math.max(sizer.childrenWidth, sizer.minWidth);
    if (width === undefined) {
        width = minWidth;
    } else {
        if (minWidth > width) {
            // Warning
        }
    }

    return width;
}