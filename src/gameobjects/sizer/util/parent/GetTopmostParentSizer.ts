import { IChild } from '../IChild';
import { IBaseSizer } from '../../basesizer/IBaseSizer';
import { GetParentSizer } from './GetParentSizer';

export function GetTopmostParentSizer(
    child: IChild
): IBaseSizer {

    let topmostSizer: IBaseSizer;
    let parent = GetParentSizer(child);
    while (parent) {
        topmostSizer = parent;
        parent = GetParentSizer(parent);
    }
    return topmostSizer;
}