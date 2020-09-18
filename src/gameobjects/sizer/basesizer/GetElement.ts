import { IBaseSizer } from './IBaseSizer';
import { GetChildByName } from '../../utils/GetChildByName';

export function GetElement(
    sizer: IBaseSizer,
    mapNameList: string | string[],
    recursive?: boolean
): any {

    if (typeof (mapNameList) === 'string') {
        mapNameList = mapNameList.split('.');
    }
    if (mapNameList.length === 0) {
        return null;
    }

    let name = mapNameList.shift(),
        element = null;
    if (name.charAt(0) === '#') { // Get element by name
        name = name.substring(1);
        element = GetChildByName(sizer, name, recursive);

    } else if (name.indexOf('[') === (-1)) { // Get element by key
        if (sizer.childrenMap) {
            element = sizer.childrenMap[name];
        }

    } else { // Get element by key[]
        const innerMatch = name.match(RE_OBJ);
        if (innerMatch != null) {
            if (sizer.childrenMap) {
                let elements = sizer.childrenMap[innerMatch[1]];
                if (elements) {
                    element = elements[innerMatch[2]];
                }
            }
        }

    }

    if (mapNameList.length === 0) {
        return element;
    } else if (element && element.childrenMap) {
        return GetElement(element, mapNameList, recursive);
    } else {
        return null;
    }
};

const RE_OBJ = /(\S+)\[(\d+)\]/i;