import { IBoundsObject } from './IBoundsObject';

export function GetLeft(
    gameobject: IBoundsObject
): number {

    return gameobject.x + ((0 - gameobject.originX) * gameobject.width);
}