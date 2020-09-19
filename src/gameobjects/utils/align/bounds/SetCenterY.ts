import { IBoundsObject } from './IBoundsObject';
import { GetCenterY } from './GetCenterY';

export function SetCenterY(
    gameobject: IBoundsObject,
    value: number
) {

    gameobject.y += (value - GetCenterY(gameobject));
}