import { IBaseSizer } from '../IBaseSizer';

export function Layout(
    sizer: IBaseSizer,
    parent?: IBaseSizer,
    minWidth?: number,
    minHeight?: number
) {

    // Skip hidden or !needLayout sizer
    if (sizer.rexSizer.hidden || (!sizer.needLayout)) {
        return sizer;
    }

    sizer.preLayout(parent, minWidth, minHeight);

    // Set size
    if (minWidth === undefined) {
        minWidth = Math.max(sizer.childrenWidth, sizer.minWidth);
    }
    if (minHeight === undefined) {
        minHeight = Math.max(sizer.childrenHeight, sizer.minHeight);
    }
    sizer.resize(minWidth, minHeight);

    // Layout background children
    sizer.layoutBackgrounds();

    sizer.postLayout(parent, minWidth, minHeight);
}