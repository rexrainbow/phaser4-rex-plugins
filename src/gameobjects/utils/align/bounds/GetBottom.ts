import { IBoundsObject } from './IBoundsObject';

export function GetBottom(
    gameobject: IBoundsObject
): number {

    return gameobject.y + ((1 - gameobject.originY) * gameobject.height);
}