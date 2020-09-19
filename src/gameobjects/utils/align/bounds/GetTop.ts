import { IBoundsObject } from './IBoundsObject';

export function GetTop(
    gameobject: IBoundsObject
): number {

    return gameobject.y - (gameobject.originY * gameobject.height);
}