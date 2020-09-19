import { IBoundsObject } from './IBoundsObject';

export function GetCenterX(
    gameobject: IBoundsObject
): number {

    return gameobject.x + ((0.5 - gameobject.originX) * gameobject.width);
}