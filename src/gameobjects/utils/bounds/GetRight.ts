import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';

export function GetRight(
    gameobject: IContainer
): number {

    return gameobject.x + ((1 - gameobject.originX) * gameobject.width);
}