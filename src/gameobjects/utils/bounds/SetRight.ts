import { IBoundsObject } from './IBoundsObject';
import { GetRight } from './GetRight';

export function SetRight(
    gameobject: IBoundsObject,
    value: number
) {

    gameobject.x += (value - GetRight(gameobject));
}