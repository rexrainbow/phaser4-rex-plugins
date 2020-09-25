import { IBoundsObject } from './IBoundsObject';

export function GetTop(
    gameobject: IBoundsObject
): number {

    return gameobject.y + ((0 - gameobject.originY) * gameobject.height);
}