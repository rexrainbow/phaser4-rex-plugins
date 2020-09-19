import { IChild } from '../IChild';
import { IBaseSizer } from '../../basesizer/IBaseSizer';
import { BaseSizer } from '../../basesizer/BaseSizer';


export function GetParentSizer(
    child: IChild
): IBaseSizer {

    let parent = child.parent;
    while (parent) {
        if (parent instanceof BaseSizer) {
            return parent;
        }

        parent = parent.parent;
    }
    return null;
}