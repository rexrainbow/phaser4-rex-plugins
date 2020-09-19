import { IBoundsObject } from './IBoundsObject';
import { GetLeft } from './GetLeft';

export function SetLeft(
    gameobject: IBoundsObject,
    value: number
) {

    gameobject.x += (value - GetLeft(gameobject));
}