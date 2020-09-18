import { IBoundsObject } from './IBoundsObject';
import { GetTop } from './GetTop';

export function SetTop(
    gameobject: IBoundsObject,
    value: number
) {

    gameobject.y += (value - GetTop(gameobject));
}