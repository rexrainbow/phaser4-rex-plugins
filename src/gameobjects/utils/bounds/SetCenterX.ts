import { IBoundsObject } from './IBoundsObject';
import { GetCenterX } from './GetCenterX';

export function SetCenterX(
    gameobject: IBoundsObject,
    value: number
) {

    gameobject.x += (value - GetCenterX(gameobject));
}