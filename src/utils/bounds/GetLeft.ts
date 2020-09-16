import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';

export function GetLeft(
    gameobject: IContainer
): number {

    return gameobject.x - (gameobject.originX * gameobject.width);
}