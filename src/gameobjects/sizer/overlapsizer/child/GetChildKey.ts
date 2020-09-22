import { ISizer, ISizerState, KeyType } from '../IOverlapSizer';
import { IChild } from '../../util/IChild';
import { GameObject } from '@phaserjs/phaser/gameobjects'

export function GetChildKey(
    sizer: ISizer,
    child: IChild | KeyType
): KeyType {

    if (child instanceof GameObject) {
        if ((child.parent === sizer) && child.hasOwnProperty('rexSizer')) {
            const childSizerState = (child as IChild).rexSizer as ISizerState;
            return childSizerState.key;
        } else {
            return null;
        }
    } else {
        const key = child as KeyType;
        if (sizer.sizerChildren.has(key)) {
            return key;
        } else {
            return null;
        }
    }
}