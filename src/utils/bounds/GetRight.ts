import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';

export function GetRight(
    gameobject: IContainer
): number {

    return gameobject.x + (gameobject.originX * gameobject.width);
}