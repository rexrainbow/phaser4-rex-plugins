import { IBoundsObject } from './IBoundsObject';
import { GetBottom } from './GetBottom';

export function SetBottom(
    gameobject: IBoundsObject,
    value: number
) {

    gameobject.y += (value - GetBottom(gameobject));
}