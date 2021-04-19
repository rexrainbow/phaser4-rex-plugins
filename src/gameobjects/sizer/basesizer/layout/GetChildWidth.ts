import { IChild } from '../../util/IChild';
import { BaseSizer } from '../../basesizer';


export function GetChildWidth(
    child: IChild
): number {

    let childWidth: number;
    if (child instanceof BaseSizer) {  // Sizer game object
        childWidth = Math.max(child.minWidth, child.childrenWidth);
    } else {  // Normal game object
        if (child.hasOwnProperty('minWidth')) {  // Force minWidth
            childWidth = child.minWidth;
        } else {
            childWidth = child.width;
        }
    }

    return childWidth;
}