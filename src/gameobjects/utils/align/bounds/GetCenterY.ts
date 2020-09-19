import { IBoundsObject } from './IBoundsObject';

export function GetCenterY(
    gameobject: IBoundsObject
): number {

    return gameobject.y + ((0.5 - gameobject.originY) * gameobject.height);
}