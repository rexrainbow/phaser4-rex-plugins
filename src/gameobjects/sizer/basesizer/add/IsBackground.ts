import { IBaseSizer } from '../IBaseSizer';

export function IsBackground(
    sizer: IBaseSizer,
    child: any
): boolean {

    if (sizer.backgroundChildren === undefined) {
        return false;
    }
    return (sizer.backgroundChildren.indexOf(child) !== -1);
}