import { ISizer } from '../IFixedWidthSizer';

export function AddNewLine(
    sizer: ISizer
) {

    sizer.sizerChildren.push('\n');
}