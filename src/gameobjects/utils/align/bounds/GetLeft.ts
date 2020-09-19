import { IBoundsObject } from './IBoundsObject';

export function GetLeft(
    gameobject: IBoundsObject
): number {

    return gameobject.x - (gameobject.originX * gameobject.width);
}