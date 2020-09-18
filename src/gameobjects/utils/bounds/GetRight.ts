import { IBoundsObject } from './IBoundsObject';

export function GetRight(
    gameobject: IBoundsObject
): number {

    return gameobject.x + ((1 - gameobject.originX) * gameobject.width);
}