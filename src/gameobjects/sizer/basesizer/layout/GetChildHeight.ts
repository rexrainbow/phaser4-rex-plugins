import { IChild } from '../../util/IChild';
import { BaseSizer } from '../../basesizer';


export function GetChildHeight(child: IChild) {
    let childHeight: number;
    if (child instanceof BaseSizer) {  // Sizer game object
        childHeight = Math.max(child.minHeight, child.childrenHeight);
    } else {  // Normal game object
        if (child.hasOwnProperty('minHeight')) {  // Force minHeight
            childHeight = child.minHeight;
        } else {
            childHeight = child.height;
        }
    }

    return childHeight;
}