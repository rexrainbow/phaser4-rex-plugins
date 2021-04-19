import { IBaseSizer } from '../IBaseSizer';

export function ResolveHeight(
    sizer: IBaseSizer,
    height?: number
): number {

    const minHeight = Math.max(sizer.childrenHeight, sizer.minHeight);
    if (height === undefined) {
        height = minHeight;
    } else {
        if (minHeight > height) {
            // Warning
        }
    }

    return height;
}