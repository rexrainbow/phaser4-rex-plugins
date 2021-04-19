import { IBaseSizer } from '../IBaseSizer';

export function RunLayout(
    sizer: IBaseSizer,
    parent?: IBaseSizer,
    newWidth?: number,
    newHeight?: number
) {

    // Skip hidden or !dirty sizer
    if (sizer.ignoreLayout) {
        return this;
    }

    var isTopmostParent = !parent;
    // Preprocessor, top parent only
    if (isTopmostParent) {
        sizer.preLayout();
    }

    // Calculate parent width
    newWidth = sizer.resolveWidth(newWidth);
    // Calculate all children width, run width wrap
    if (isTopmostParent) {
        sizer.resolveChildrenWidth(newWidth);
        sizer.runWidthWrap(newWidth);
    }
    // Calculate parent height
    newHeight = sizer.resolveHeight(newHeight);
    // Resize parent
    sizer.resize(newWidth, newHeight);

    // Layout children    
    sizer.layoutChildren();

    // Layout background children
    sizer.layoutBackgrounds();

    sizer.postLayout();
}