import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';

export function GetTop(
    gameobject: IContainer
): number {

    return gameobject.y - (gameobject.originY * gameobject.height);
}